
import  {
    AlertIOS
} from 'react-native'
import * as HOMETWOACTIONTYPES from './HomeTwoActionTypes';
import * as Api from '../Api'
import { createAction } from 'redux-actions';
var DataUtil  = require('../DataUtil');

/*
//第一种写法
//获取推送消息数据
export function getPushMessageList(page,callback){
    return (dispatch) => {
        dispatch(refreshDoing());
        if (page == 0){
            DataUtil.dataArray = [];
        }
        let url = Api.ApiUtil.GetPushMessageList + '?userId=94&userType=1&page=' + page;
        console.log(url);
        fetch(url)
            .then((response) => response.text())
        .then(response =>{
             var responseData = JSON.parse(response);
            if (responseData.result == 'ok'){
                dispatch(getListSucess(responseData.values))
            }else {
                dispatch(getListFail());
            }
            callback(true);
        }).catch((error) => {
            console.log('错误',error);
            dispatch(getListError());
            callback(true);
        });
    }
}
*/


////第二种写法
export const getPushMessageList = createAction(
    HOMETWOACTIONTYPES.GETPUSHMESSAGELIST_SUCCESS,
    (page,callback) =>{
        if (page == 0){
            DataUtil.dataArray = [];
        }
        let url = Api.ApiUtil.GetPushMessageList + '?userId=94&userType=1&page=' + page;
        console.log(url);
       return fetch(url)
            .then((response) => response.text())
            .then(callback(true));
    }
);


//开始刷新
export function refreshDoing(){
     return {
         'type':HOMETWOACTIONTYPES.GETPUSHMESSAGELIST_DOING
     }
}

//请求成功
export function getListSucess(data){
    return {
        'type':HOMETWOACTIONTYPES.GETPUSHMESSAGELIST_SUCCESS,
        'data':data
    }
}

//请求成功,但是是error
export function getListFail(){
    return {
        'type':HOMETWOACTIONTYPES.GETPUSHMESSAGELIST_FAIL
    }
}
//请求失败,没有访问通
export function getListError(){
    return {
        'type':HOMETWOACTIONTYPES.GETPUSHMESSAGELIST_ERROR
    }
}