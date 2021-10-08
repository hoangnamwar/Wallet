import React, { useEffect, useState } from 'react';
import './App.css';
import { StylesProvider, Container, Grid } from '@material-ui/core'
import Header from './components/Header/Header';
import TabAccordion from './components/Arcodion/TabAccordion';

import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from './state';
import Board from './Router/Board/Board';
import { BrowserRouter } from 'react-router-dom';
import { Group, MoneyFlow, TimeRepeat } from './state/action-type';
import { RootState } from './state/reducers';



function App() {

  // --------State-----------
  const walletState = useSelector((state: RootState) => state.wallet)
  const data = [...walletState.list];
  const dispatch = useDispatch();
  const { deleteMoney, addMoney } = bindActionCreators(actionCreators, dispatch);
  // ----------------------

  //------------ Lưu data -------------
  useEffect(() => {
    localStorage.setItem('dataWallet', JSON.stringify(walletState))
  }, [walletState])
  //------------------------------------

  const [timeLeft, setTimeLeft] = useState(60);
  // let time = 0;

  // useEffect(() => {
  //   if (timeLeft === 0) return setTimeLeft(60);

  //   const intervalId = setInterval(() => {
  //     // time++;
  //     let time_now = Date.now();
  //     let one = new Date(2020, 1, 1, 0, 0, 0);
  //     let two = new Date(2020, 1, 1, 0, 1, 0);
  //     let one_sec: number = (two.getTime() - one.getTime());
  //     data.map((item) => {
  //       if (item.past === false) 
  //       {
  //         if (
  //             (item.time_set < time_now ) &&
  //             (item.time_set > time_now - 60 * one_sec) &&
  //             (item.group === Group.FUTURE)
  //           ) 
  //         {
  //           addMoney(
  //             item.money_flow,
  //             Group.IMMEDIATE,
  //             item.name,
  //             item.money_input,
  //             time_now,
  //             item.time_now,
  //             item.time_repeat,
  //             true,
  //             item.id_form,
  //           )
  //         } 
  //         else 
  //         if (
  //             (item.group === Group.FIXED) 
  //           ) 
  //         {
  //           let one_d = new Date(2020, 1, 1, 0, 0, 0);
  //           let two_d = new Date(2020, 1, 1, 0, 1, 0);
  //           let one_day: number = (two_d.getTime() - one_d.getTime());
  //           // Hai khoảng thời gian: hiện tại và hiện tại sau 1 phút 
  //           // Trừ cho time_set rồi chia cho thời gian lặp lại
  //           // Nếu nó đến hạn trong khoảng đấy thì b > 1 và tròn dưới của b > tròn dưới của a
  //           // ví dụ (1.1, 0.9) (5.01, 4.99); những trường hợp sai (5.01, 5.0) (8.6, 8.5)
  //           let a = Math.floor( (time_now - item.time_set) / (one_day * item.time_repeat) );
  //           let b = Math.floor( (time_now + 60 * one_sec - item.time_set) / (one_day * item.time_repeat) );
  //           if( (b > 1) && (b > a))
  //           {
  //             addMoney(
  //               item.money_flow,
  //               Group.IMMEDIATE,
  //               item.name,
  //               item.money_input,
  //               time_now,
  //               item.time_now,
  //               item.time_repeat,
  //               true,
  //               item.id_form,
  //             )
  //           }
  //         }
  //       }

  //     })
  //   }, 60000);

  //   return () => clearInterval(intervalId);

  // }, [timeLeft]);


  return (
    <BrowserRouter>

      <StylesProvider injectFirst>
        <div className="app">
          <Header />

          {/* {console.log(timeLeft)} */}

          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item lg={3}>

                {/* Link stay inside here */}
                <TabAccordion />

              </Grid>

              <Grid item lg={9} xs={12}>

                {/* And Route in here  */}
                <Board />

              </Grid>
            </Grid>
          </Container>

        </div>

      </StylesProvider>
    </BrowserRouter>

  );
}

export default App;
function useTimer(arg0: { time: any; onExpire: () => void; }, arg1: void): { seconds: any; minutes: any; hours: any; days: any; isRunning: any; start: any; pause: any; resume: any; restart: any; } {
  throw new Error('Function not implemented.');
}

