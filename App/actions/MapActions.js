import _ from 'lodash'
import Proxy from '../proxy/Proxy'
import PreferenceStore from '../utils/PreferenceStore';
import Config from '../../config';

//获取所有汽车信息
export let getAllVehicle = () => {

    return (dispatch, getState) => {

        return new Promise((resolve, reject) => {
            var state=getState();
            Proxy.postes({
                url: Config.server + '/func/web/getAllVehicle',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                }
            }).then((json)=>{
                resolve(json)
            }).catch((e)=>{
                reject(e)
            })
        });
    }
}

//获取所有汽车信息
export let getCarsPosition = () => {

    return (dispatch, getState) => {

        return new Promise((resolve, reject) => {
            var state=getState();
            Proxy.postes({
                url: Config.server + '/func/web/getCarsPosition',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: {
                }
            }).then((json)=>{
                resolve(json)
            }).catch((e)=>{
                reject(e)
            })
        });
    }
}

//验证通过
export let setAuthTrue = () => {
    return {
        type: SET_AUTH_TRUE
    };
}

//更新凭证
export let updateCertificate = (payload) => {
    return {
        type: UPDATE_CERTIFICATE,
        payload: payload
    }
}

//更新个人信息
export let updatePersonInfo = (payload) => {
    return {
        type: UPDATE_PERSON_INFO,
        payload: payload
    }
}

//获取口令
let getAccessToken = (accessToken) => {
    if (accessToken !== null)
        return {
            type: ACCESS_TOKEN_ACK,
            accessToken: accessToken,
            validate: true
        };
    else
        return {
            type: ACCESS_TOKEN_ACK,
            accessToken: accessToken,
        }
}

export let acquirePlanCourseScores = () => {
    return (dispatch, getState) => {

        return new Promise((resolve, reject) => {

            var state = getState();
            var accessToken = state.user.accessToken;
            Proxy.postes({
                url: Config.server + '/gradms/user',
                headers: {
                    'Authorization': "Bearer " + accessToken,
                    'Content-Type': 'application/json'
                },
                body: {
                    request: 'getNewCultivatePlanCourse',
                }
            }).then((json)=>{
                resolve(json)
            }).catch((e)=>{
                reject(e)
            })
        })
    }
}

let _onGetCourseAchievement=(payload)=>{
    return {
        type:ON_GET_COURSE_ACHIEVEMENT,
        payload
    }
}

//获取成绩
export let onGetCourseAchievement=(payload)=>{
    return (dispatch, getState) => {
        dispatch(_onGetCourseAchievement(payload))
    }
}
