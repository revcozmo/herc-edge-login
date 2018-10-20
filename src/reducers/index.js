import { combineReducers } from 'redux';
// import Assets from './Assets';
import Web3Reducers from './Web3Reducers';
import AssetReducers from './AssetReducers';
import DataReducers from './DataReducers';
import WalletActReducers from './WalletAcctReducers';
import EDIT from './Edi-T-Sets'
  ;
const rootReducer = combineReducers({
  AssetReducers,
  // Assets,
  DataReducers,
  Web3Reducers,
  WalletActReducers,
  EDIT
})

export default rootReducer