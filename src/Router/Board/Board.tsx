import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MainBoard from '../../components/MainBoard/MainBoard'
import ListMoneyIn from '../ListMoneyIn/ListMoneyIn'
import ListMoneyOut from '../ListMoneyOut/ListMoneyOut'
import { Typography } from '@mui/material'
import History from '../History/History'

const Board = () => {
    return (
        <div className="board">
            <Switch>
                <Route path="/" exact component={MainBoard} />
                <Route path="/money-in" component={ListMoneyIn} />  
                <Route path="/money-out" component={ListMoneyOut} />
                <Route path="/history" component={History} />
                <Route render={()=>(
                    <Typography 
                        variant="h2" 
                        color="initial"
                        className="board_wrong"
                    >
                        Ooops Link is wrong !!
                    </Typography>
                    )}/>
            </Switch>
            
            {/* </BrowserRouter> */}
            {/* <MainBoard /> */}
        </div>
    )
}

export default Board
