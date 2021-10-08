
import { Group, MoneyFlow, TimeRepeat } from "../state/action-type";

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
//----------------------

const data: receipt[] = 
[
    {
        id: 1,
        money_flow: MoneyFlow.MONEY_IN,
        group: Group.FIXED,
        name: "Luơng",
        money_input: 10000000,
        past: false,
        id_form: 1,
        time_now: 1632384952668,
        time_set: 1632384952668,
        time_repeat: TimeRepeat.MONTH
        
    },
    {
        id: 2,
        money_flow: MoneyFlow.MONEY_IN,
        group: Group.FIXED,
        name: "Lai suat ngan hang",
        money_input: 1000000,
        past: false,
        id_form: 2,
        time_now: 1632384952668,
        time_set: 1632384952668,
        time_repeat: TimeRepeat.QUARTER
    },
    {
        id: 3,
        money_flow: MoneyFlow.MONEY_OUT,
        group: Group.FIXED,
        name: "Tiền phòng",
        money_input: 3000000,
        past: false,
        id_form: 3,
        time_now: 1632384952668,
        time_set: 1632384952668,
        time_repeat: TimeRepeat.MONTH
    },
    {
        id: 4,
        money_flow: MoneyFlow.MONEY_OUT,
        group: Group.FIXED,
        name: "Tiền ăn",
        money_input: 200000,
        past: false,
        id_form: 4,
        time_now: 1632384952668,
        time_set: 1632384952668,
        time_repeat: TimeRepeat.WEEK
    },
    {
        id: 5,
        money_flow: MoneyFlow.MONEY_OUT,
        group: Group.IMMEDIATE,
        name: "Đổ xăng",
        money_input: 50000,
        past: true,
        id_form: null,
        time_now: 1632384952668,
        time_set: 1632384952668,
        time_repeat: TimeRepeat.NULL
    },
    {
        id: 6,
        money_flow: MoneyFlow.MONEY_OUT,
        group: Group.FUTURE,
        name: "Tiền quà",
        money_input: 200000,
        past: true,
        id_form: null,
        time_now: 1632387205736,
        time_set: 1632384952668,
        time_repeat: TimeRepeat.NULL
    },
]

export default data;