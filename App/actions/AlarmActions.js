import _ from 'lodash'
import Proxy from '../proxy/Proxy'
import PreferenceStore from '../utils/PreferenceStore';
import Config from '../../config';
import {
    GET_ALARMS
} from '../constants/AlarmConstants';

//获取更新
export let getAlarms = (payload) => {
    return {
        type: GET_ALARMS,
        payload: payload
    }
}