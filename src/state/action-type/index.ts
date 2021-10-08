// ----------- Type Action -------------
export enum ActionType 
{
    ADD = 'ADD',
    DELETE = 'DELETE',
    FIX = 'FIX',
}
//--------------------------------------

//------------ Type each part ---------------
export enum MoneyFlow
{
    MONEY_IN = "MONEY_IN",
    MONEY_OUT = "MONEY_OUT"
} 
export enum Group
{
    FIXED = "Cố định",
    FUTURE = "Tương lai",
    IMMEDIATE = "Hiện tại"
} 
export enum TimeRepeat 
{
    NULL = 0,
    DAY = 1,
    WEEK = 7,
    MONTH = 31,
    QUARTER = 122,
    YEAR = 365,
}
export type FormData = 
{
    money_flow: MoneyFlow,
    group: Group,
    name: string,
    money_input: number,
}
//--------------------------------------

//------------ Type single action ---------------
type addMoney = 
{
    type: ActionType.ADD,
    payload: 
    {
        money_flow: MoneyFlow,
        group: Group,
        name: string,
        money_input: number,
        time_set: number,
        time_now: number,
        time_repeat: TimeRepeat,
        past: boolean,
        id_form: number | null,
    }
}
type deleteMoney = 
{
    type: ActionType.DELETE,
    payload: number,
}
type fixMoney = 
{
    type: ActionType.FIX,
    payload: 
    {
        id: number,
        money_input: number,
        name: string,
        time_set: number,
        time_repeat: TimeRepeat,
    },
}
//----------------------------------------

//------------ Type General Action ---------------
export type Action = addMoney | deleteMoney | fixMoney