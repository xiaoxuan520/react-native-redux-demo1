
import * as HomeTwoActionTypes from '../actions/HomeTwoActionTypes';
//import DataUtl from '../DataUtil';
var DataUtil  = require('../DataUtil');
const initialState = {
    dataList:[],
    page:0,
    pageSum:-1
};
export default function HomeTwoReducer (state=initialState,action){
    switch (action.type){
        case HomeTwoActionTypes.GETPUSHMESSAGELIST_DOING:
            return {
                ...state
            };
        case HomeTwoActionTypes.GETPUSHMESSAGELIST_SUCCESS:
           var array = DataUtil.dataArray.concat(action.data.list);
            DataUtil.dataArray = array;
            return {
                ...state,
                dataList:array,
                page:action.data.page,
                pageSum:action.data.pageSum
            };
        case HomeTwoActionTypes.GETPUSHMESSAGELIST_FAIL:
            return {
                ...state
            };
        case HomeTwoActionTypes.GETPUSHMESSAGELIST_ERROR:
            return {
                ...state
            };
        default:
            return state
    }
}