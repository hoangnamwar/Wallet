import React from 'react'
import { Group, MoneyFlow } from '../../state/action-type';
import List from '../../components/List/List';

const History = () => {
  return (
    <div>
      <List  
        money_flow_prop="all"
        group_prop={Group.FIXED}
      />
      <br />
      <List  
        money_flow_prop="all"
        group_prop={Group.FUTURE}
      />
      <br />
      <List  
      money_flow_prop="all"
      group_prop={Group.IMMEDIATE}
    />
    </div>
  )
}

export default History
