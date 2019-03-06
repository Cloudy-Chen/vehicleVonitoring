import {
    PAGE_PLATFORM,
    PAGE_LOGIN,
    UPDATE_PAGE_STATE,
} from '../constants/PageStateConstants';

const initialState = {
    state:PAGE_PLATFORM,
    navigators:{
        Stats:null,
        Notification:null,
        Rule:null,
        My:null,
    }
};

let pageState = (state = initialState, action) => {

    switch (action.type) {

        case UPDATE_PAGE_STATE:
            return Object.assign({}, state, {
                state:action.payload.state
            })
            break;
        default:
            return state;
    }
}

export default pageState;

