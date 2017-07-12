
import * as HomeTwoActionTypes from '../actions/HomeTwoActionTypes';
//import DataUtl from '../DataUtil';
var DataUtil  = require('../DataUtil');
const initialState = {
    dataList:[],
    page:0,
    pageSum:-1,
    isRefreshing:false
};
export default function HomeTwoReducer (state=initialState,action){
    switch (action.type){
        case HomeTwoActionTypes.GETPUSHMESSAGELIST_DOING:
            return {
                ...state,
                isRefreshing:true
            };
        case HomeTwoActionTypes.GETPUSHMESSAGELIST_SUCCESS:
           var array = DataUtil.dataArray.concat(action.data.list);
            DataUtil.dataArray = array;
            return {
                ...state,
                isRefreshing:false,
                dataList:array,
                page:action.data.page,
                pageSum:action.data.pageSum
            };
        case HomeTwoActionTypes.GETPUSHMESSAGELIST_FAIL:
            return {
                ...state,
                isRefreshing:false
            };
        case HomeTwoActionTypes.GETPUSHMESSAGELIST_ERROR:
            return {
                ...state,
                isRefreshing:false
            };
        default:
            return state
    }
}