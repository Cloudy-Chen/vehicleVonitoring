
import { combineReducers } from 'redux';

import tabReducer from './TabReducer';
import userReducer from './UserReducer';
import pageState from './PageStateReducer';
import alarmReducer from './AlarmReducer'

export default rootReducer = combineReducers({
    tab:tabReducer,
    user:userReducer,
    page:pageState,
    alarm:alarmReducer,
})
