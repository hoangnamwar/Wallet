import { Button, Input, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators } from '../../state'
import { Group, MoneyFlow, TimeRepeat } from '../../state/action-type'

import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Stack from '@mui/material/Stack';

interface Props {
    handleClose: () => void
  }

const FormInput = ( props : Props ) => {

    //--------State-----------
    const dispatch = useDispatch();
    const { addMoney } = bindActionCreators(actionCreators, dispatch);
    //----------------------

    //--------State-----------
    const [timeSet, setTimeSet] = useState(false);
    const [timeRepeat, setTimeRepeat] = useState(false);
    const [value, setValue] = React.useState<Date | null>(new Date());
    //----------------------

    //--------Form-----------
    type FormData = 
    {
        money_flow: MoneyFlow,
        group: Group,
        name: string,
        money_input: number,
        // time_set: Date,
        time_repeat: TimeRepeat
    }
    const { register, formState: {errors}, handleSubmit, reset } = useForm<FormData>();
    const onSubmitForm = 
        handleSubmit(data => {

            if (timeRepeat === false)
                data.time_repeat = TimeRepeat.NULL;
            console.log( data );
            console.log( value );
            if (
                (data.name !== "") &&
                (data.money_input >= 1000) &&
                (value !== null)
            )
            {
                console.log("formInput: time_set: " + value);

                let time_set = value?.getTime();
                let time_now = Date.now();
                if (time_set < time_now)
                    time_set = time_now;
                // console.log("formInput: time_now: " + );
                let past: boolean = false;
                if (data.group === Group.IMMEDIATE)
                    past = true;
                addMoney(
                    data.money_flow,
                    data.group,
                    data.name,
                    data.money_input,
                    time_set,
                    time_now,
                    data.time_repeat,
                    past,
                    null
                );
            }
                
            reset({
                money_flow: MoneyFlow.MONEY_OUT,
                group: Group.IMMEDIATE,
                time_repeat: TimeRepeat.MONTH,
                name: "",
                money_input: undefined,
            })

            props.handleClose();
        });

    //----------------------

    //--------Data----------
    const money_flow_data = 
    [
        {
            type: MoneyFlow.MONEY_IN,
            name: "Khoản thu"
        },
        {
            type: MoneyFlow.MONEY_OUT,
            name: "Khoản chi"
        }
    ]
    const group_data = [
        {
            type: Group.FIXED,
            name: "Cố định"
        },
        {
            type: Group.FUTURE,
            name: "Tương lai"
        },
        {
            type: Group.IMMEDIATE,
            name: "Tức thì"
        }
    ]

    const time_repeat_data = 
    [
        {
            type: TimeRepeat.DAY,
            name: "Hàng ngày"
        },
        {
            type: TimeRepeat.WEEK,
            name: "Hàng tuần"
        },
        {
            type: TimeRepeat.MONTH,
            name: "Hàng tháng"
        },
        {
            type: TimeRepeat.QUARTER,
            name: "Hàng quý"
        },
        {
            type: TimeRepeat.YEAR,
            name: "Hàng năm"
        }
    ]
    //----------------------

    return (
        <div>
            <form
                className="form_root"
                onSubmit={ onSubmitForm }
            >
                {/* {console.log(errors)} */}
                {/* Tạo 2 className đúng và sai, state nhap lan đầu bằng false, 
                nếu người dùng nhấn button submit => state = true và trigger error từ các form input */}

                {/* ---------  Chọn khoản tiền  -----------  */}
                <TextField
                    select
                    label="Chọn khoản"
                    defaultValue={MoneyFlow.MONEY_OUT}
                    {...register("money_flow")} 
                    className="form_money"
                >
                    {money_flow_data.map((option) => (
                        <MenuItem key={option.type} value={option.type}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
                {/* ---------  Chọn nhóm  -----------  */}
                <TextField
                    select
                    className="form_group"
                    label="Chọn nhóm tiền"
                    defaultValue={Group.IMMEDIATE}
                    {...register("group")} 
                    onChange={(e) => {
                        console.log("change");
                        if (e.target.value === Group.IMMEDIATE)
                            setTimeSet(false)
                        else setTimeSet (true)
                
                        if (e.target.value !== Group.FIXED)
                            setTimeRepeat(false)
                        else setTimeRepeat(true)
                    }}
                >
                    {group_data.map((option) => (
                        <MenuItem key={option.type} value={option.type}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField> <br />
                {/* --------  Nhập tên khoảng --------- */}
                <Input
                    className="form_input form_money"
                    type="text" 
                    {...register("name", {
                        required: true,
                    })} 
                    placeholder="Tên khoản..." 
                />
                {/* --------  Nhập tiền --------- */}
                <Input
                    className="form_input form_group"
                    type="number" 
                    {...register("money_input",{
                        min: 1000,
                        required: true,
                        valueAsNumber: true
                    })} 
                    placeholder="Nhập số tiền" 
                />
                {/* ------------- Time Set -------------- */}
                <div className="flex">
                <div className="form_time">
                {timeSet ? (
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <Stack spacing={2}>
                            <DateTimePicker
                                renderInput={(params) => <TextField {...params} />}
                                label="Nhập thời gian: "
                                value={value}
                                // {...register("time_set")}
                                onChange={(newValue) => {
                                    setValue(newValue);
                            }}
                                minDateTime={new Date()}

                            />
                        </Stack>
                    </LocalizationProvider>
                ) : (
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <Stack spacing={2}>
                            <DateTimePicker
                                // variant="inline"
                                renderInput={(params) => <TextField {...params} />}
                                label="Nhập thời gian: "
                                value={value}
                                disabled
                                // {...register("time_set")}
                                onChange={(newValue) => {
                                    setValue(newValue);
                            }}
                                minDateTime={new Date()}

                            />
                        </Stack>
                    </LocalizationProvider>
                )}
                </div>
                {/* ------------- Time repeat ------------ */}
                {/* <div > */}
                    {timeRepeat ? 
                    (
                        <TextField
                            select
                            className="form_timeRepeat"
                            label="Chọn thời gian lặp lại: "
                            defaultValue={TimeRepeat.MONTH}
                            {...register("time_repeat")} 
                            >
                            {time_repeat_data.map((option) => (
                                <MenuItem key={option.type} value={option.type}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    ) : 
                    (
                        <TextField
                            select
                            className="form_timeRepeat"
                            label="Chọn thời gian lặp lại: "
                            defaultValue={TimeRepeat.NULL}
                            disabled
                            {...register("time_repeat")} 
                            >
                            {time_repeat_data.map((option) => (
                                <MenuItem key={option.type} value={option.type}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    )}
                {/* </div> */}
                </div>
                {/* ------------ Submit ------------ */}
                <Button 
                    type="submit"
                    className="form_btn_submit"
                >
                    Submit
                </Button>
                <Button 
                    type="submit"
                    className="form_btn_submit"
                    color="error"
                    onClick={props.handleClose}
                >
                    Cancel
                </Button>
            </form>
            
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
                <DateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    label="Ignore date and time"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                }}
                    minDateTime={new Date()}
                />
                <DateTimePicker
                    renderInput={(params) => <TextField {...params} />}
                    label="Ignore time in each day"
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                }}
                    minDate={new Date('2020-02-14')}
                    minTime={new Date(0, 0, 0, 8)}
                    maxTime={new Date(0, 0, 0, 18, 45)}
                />
            </Stack>
        </LocalizationProvider> */}

        </div>
    )
}

export default FormInput
