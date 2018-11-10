import { combineReducers } from 'redux';
import {payment} from './paymentReducer';


export default combineReducers({
  payment: payment
});
