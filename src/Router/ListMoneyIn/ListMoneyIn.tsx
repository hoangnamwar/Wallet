import React from 'react'
import { Group, MoneyFlow } from '../../state/action-type';
import List from '../../components/List/List';

const ListMoneyIn = () => {
  return (
    <div>
        
      {/* <div id="co_dinh" /> */}
      <List  
        money_flow_prop={MoneyFlow.MONEY_IN}
        group_prop={Group.FIXED}
      />
      <br />
      {/* <div id="tuong_lai" /> */}
      <List  
        money_flow_prop={MoneyFlow.MONEY_IN}
        group_prop={Group.FUTURE}
      />
      <br />
      {/* <div id="hien_tai" /> */}
      <List  
      money_flow_prop={MoneyFlow.MONEY_IN}
      group_prop={Group.IMMEDIATE}
      />
    </div>
  )
}

export default ListMoneyIn
