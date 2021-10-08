import React, { useCallback } from 'react'
import Typography from '@material-ui/core/Typography'
import { RootState } from '../../state/reducers';
import { useSelector } from 'react-redux';
import Grid from '@material-ui/core/Grid'
import { Group, TimeRepeat } from '../../state/action-type';


const MainBoard = () => {

    const walletState = useSelector((state: RootState) => state.wallet)
    const data = [...walletState.list];
    let money = walletState.generalMoney;
    let first = 0;
    let second = 0;
    let third = 0;
    let don_vi = "";
    let strFirst = "000", strSecond = "000", strThird = "000";

    enum timeShow
    {
        NOW = "NOW",
        A_MONTH = "A_MONTH",
        THREE_MONTH = "THREE_MONTH",
        SIX_MONTH = "SIX_MONTH"
    }

    function setShow(time: timeShow) 
    {
        // console.log(money);
        if (time !== timeShow.NOW)
        {
            let day: number = 0;
            switch (time)
            {
                case (timeShow.A_MONTH):
                    day = 30;
                    break;
                case (timeShow.THREE_MONTH):
                    day = 61;
                    break;
                case (timeShow.SIX_MONTH):
                    day = 91;
                    break;
                default:
                    day = 0;
            }

            let t = new Date();
            let one = new Date(2020, 1, 1, 0, 0, 0);
            let two = new Date(2020, 1, 31, 0, 0, 0);
            let one_day: number = (two.getTime() - one.getTime()) / 30;
            let time_now = t.getTime();
            // console.log(time_now, one_day);

            data.map((item) => {
                if(item.past === false)
                {
                    if ((item.time_set < time_now + day * one_day) &&
                        (item.time_set > time_now) &&
                        (item.group === Group.FUTURE) )
                    {
                        money -= item.money_input;
                    } else if ((item.group === Group.FIXED) &&
                                (time_now > item.time_set))
                    {
                        let time_distan: number = 1;
                        switch(item.time_repeat)
                        {
                            case(TimeRepeat.DAY):
                                time_distan = one_day;
                                break;
                            case(TimeRepeat.WEEK):
                                time_distan = 7 * one_day;
                                break;
                            case(TimeRepeat.MONTH):
                                time_distan = 30 * one_day;
                                break;
                            case(TimeRepeat.QUARTER):
                                time_distan = 91 * one_day;
                                break;
                            case(TimeRepeat.YEAR):
                                time_distan = 365 * one_day;
                                break;
                            default:
                                time_distan = one_day;
                        }
                        let a = (time_now - item.time_set) / time_distan;
                        let b = (time_now + day * one_day - item.time_set) / time_distan;
                        let c = Math.floor(b - a);
                        money -= c * item.money_input;  
                    }
                }
            })
        }

        let negative = false;
        if (money < 0)
        {
            money = Math.abs(money);
            negative = true;
        }
        if (money < 1000000000)
        {
            first =  Math.floor(money / 1000000);
            second = money / 1000;
            second = Math.floor(second % 1000);
            third = money % 1000;
            don_vi= " Triệu đồng";
        }
        else 
        {
            first = Math.floor(money / 1000000000);
            second = Math.floor(money / 1000000);
            second = second % 1000;
            third = Math.floor(money / 1000);
            third = third % 1000;
            don_vi = " Tỷ đồng";
        }
        // console.log(first.toString());   
        strFirst = first.toString();
        for (let i = strFirst.length; i<3; i++)
        {
            strFirst = "0" + strFirst;
        }
        if (negative)
            strFirst = "-" + strFirst;
        strSecond = second.toString();
        for (let i = strSecond.length; i<3; i++)
        {
            strSecond = "0" + strSecond;
        }
        strThird = third.toString();
        for (let i = strThird.length; i<3; i++)
        {
            strThird = "0" + strThird;
        }

        return(
            <div>
                {
                    (negative) ? 
                    (
                        <div 
                            className={` ${ (time === timeShow.NOW) ? "mainBoard_first_negative" : "mainBoard_first-small_negative"} `}
                        >
                            <p>
                                {strFirst}.
                            </p>
                        </div>
                    ) : 
                    (
                        <div 
                            className={` ${ (time === timeShow.NOW) ? "mainBoard_first" : "mainBoard_first-small"} `}
                        >
                            <p>
                                {strFirst}.
                            </p>
                        </div>
                    )
                }
                
                <div 
                    className={` ${ (time === timeShow.NOW) ? "mainBoard_second" : "mainBoard_second-small"} `}
                >
                    <p>
                        {strSecond}
                    </p>
                </div>
                <div 
                    className={` ${ (time === timeShow.NOW) ? "mainBoard_third" : "mainBoard_third-small"} `}
                >
                    <p>
                        {strThird}
                    </p>
                </div>
                <div 
                    className={` ${ (time === timeShow.NOW) ? "mainBoard_don_vi" : "mainBoard_don_vi-small"} `}
                >
                    <p>
                        {don_vi}
                    </p>
                </div>
            </div>
        )
    };

    

    return (
        <div className="mainBoard">
            <Grid container spacing={2}>
                <Grid item lg={8} md={8} sm={8} xs={12}>
                    {setShow(timeShow.NOW)}
                </Grid>
                <Grid item lg={4}>

                    <div className="mainBoard_flex-down">
                        <div  className="mainBoard_pd_bottom">
                            <p className="mainBoard_mini_title">
                                1 tháng sau: 
                            </p>
                            {setShow(timeShow.A_MONTH)}
                        </div>
                        <div className="mainBoard_pd_bottom">
                            <p className="mainBoard_mini_title">
                                3 tháng sau: 
                            </p>
                            {setShow(timeShow.THREE_MONTH)}
                        </div>
                        <div>
                            <p className="mainBoard_mini_title">
                                6 tháng sau: 
                            </p>
                            {setShow(timeShow.SIX_MONTH)}
                        </div>
                    </div>

                </Grid>
            </Grid>
            
        </div>
    )
}

export default MainBoard
