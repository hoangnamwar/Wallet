import dummyData from '../../assets/dummyData';
import data from '../../assets/dummyData'
import { Action, ActionType, Group, MoneyFlow, TimeRepeat } from '../action-type'

const intinialState = 
{
    generalMoney: 12345678,
    list: data,
}

let test = localStorage.getItem('dataWallet');
let testData: stateType;
if (test === null )
{
    testData = {...intinialState};
}
else
{
    testData = JSON.parse(test);
    // testData = JSON.parse(test);
}

type receipt = 
{
    id: number,
    money_flow: MoneyFlow,
    group: Group,
    name: string,
    money_input: number,
    past: boolean,
    id_form: number | null,
    time_set: number,
    time_now: number,
    time_repeat: TimeRepeat,
}

type stateType =
{
    generalMoney: number,
    list: receipt[]
}

const walletReducers = (state: stateType = testData, action: Action) =>
{
    switch (action.type)
    {
        case ActionType.ADD:
        {
            let id = state.list[state.list.length - 1].id + 1;
            let list: receipt[] = [...state.list];
            let payload = action.payload;
            switch (payload.group)
            {
                case Group.FIXED:
                {
                    let id_form: number | null = 1;
                    for(let i=list.length - 1; i >= 0; i-- )
                    {
                        if ( (list[i].group === Group.FIXED) && (list[i].id_form !== null) )
                        {
                            id_form = list[i].id_form;
                            break;
                        }
                        payload.id_form = id_form;
                        list = [ ...list, 
                            {
                                id: id,
                                ...payload,
                            }
                        ]
                    }
                    return{
                        generalMoney: state.generalMoney,
                        list : [ ...list]
                    }
                }
                case Group.FUTURE:
                {
                    list = [ ...list, 
                        {
                            id: id,
                            // id_form: null,
                            ...action.payload,
                        }
                    ]
                    return{
                        generalMoney: state.generalMoney,
                        list : [ ...list]
                    }
                }
                case Group.IMMEDIATE:
                {
                    let money = state.generalMoney;
                    if (payload.money_flow === MoneyFlow.MONEY_IN)
                        money += payload.money_input;
                    else 
                        money -= payload.money_input;
                    list = [ 
                        ...list, 
                        {
                            id: id,
                            // id_form: null,
                            ...action.payload,
                        }
                    ]
                    return{
                        generalMoney: money,
                        list: [ ...list]
                    }
                }
                default: 
                    return state;
            }
        }
        case ActionType.DELETE:
        {
            let list=[...state.list];
            list.forEach((item, index) =>
            {
                if (item.id === action.payload)
                {
                    list.splice(index, 1);
                }
            })
            return{
                generalMoney: state.generalMoney,
                list: [...list],
            }
        }
        case ActionType.FIX:
            {
                let list=[...state.list];
                let money = 0;
                list.forEach((item, index) =>
                {
                    if (item.id === action.payload.id)
                    {
                        if(item.money_flow === MoneyFlow.MONEY_IN)
                            money = action.payload.money_input - item.money_input;
                        else money = item.money_input - action.payload.money_input;
                        item.money_input = action.payload.money_input;
                        item.name = action.payload.name;
                        item.time_set = action.payload.time_set;
                        item.time_repeat = action.payload.time_repeat;
                    }
                })
                return{
                    generalMoney: state.generalMoney + money,
                    list: [...list],
                }
            }
        default:
            return state;
    }
}

export default walletReducers;