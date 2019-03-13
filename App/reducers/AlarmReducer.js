import {
    GET_ALARMS
} from '../constants/AlarmConstants';

const initialState = {
    alarms:[],
};

let alarm = (state = initialState, action) => {

    switch (action.type) {

        case GET_ALARMS:
            var  data  = action.payload;
            return Object.assign({}, state, {
                alarms: data
            })
        default:
            return state;
    }
}

export default alarm;
