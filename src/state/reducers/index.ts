import { combineReducers } from 'redux'
import walletReducers from './walletReducer'

const reducer = combineReducers({
    wallet: walletReducers
})  

export default reducer;
export type RootState = ReturnType<typeof reducer>