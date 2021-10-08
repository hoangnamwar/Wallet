import { Dispatch } from "react";
import { Action, ActionType, Group, MoneyFlow, TimeRepeat } from "../action-type";



export const addMoney = (
    money_flow: MoneyFlow,
    group: Group,
    name: string,
    money_input: number,
    time_set: number,
    time_now: number,
    time_repeat: TimeRepeat,
    past: boolean,
    id_form: number | null
 ) =>
{
    return (dispatch: Dispatch<Action>) =>
    {
        dispatch({
            type: ActionType.ADD,
            payload:
            {
                money_flow : money_flow,
                group: group,
                name: name,
                money_input: money_input,
                time_set: time_set,
                time_now: time_now,
                time_repeat: time_repeat,
                past: past,
                id_form: id_form,
            }
        })
        
    }
}

export const deleteMoney = ( id : number ) =>
{
    return (dispatch: Dispatch<Action>) =>
    {
        dispatch({
            type: ActionType.DELETE,
            payload: id
        })
        
    }
}

export const fixMoney = ( 
    id : number, 
    money_input: number,
    name: string,
    time_set: number,
    time_repeat: TimeRepeat, 
    ) =>
{
    return (dispatch: Dispatch<Action>) =>
    {
        dispatch({
            type: ActionType.FIX,
            payload: 
            {
                id: id,
                money_input: money_input,
                name: name,
                time_set: time_set,
                time_repeat: time_repeat,
            }
        })
        
    }
}