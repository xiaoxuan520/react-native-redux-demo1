
import * as HomeTwoActionTypes from '../actions/HomeTwoActionTypes';
//import DataUtl from '../DataUtil';
var DataUtil  = require('../DataUtil');
const initialState = {
    dataList:[],
    page:0,
    pageSum:-1,
    status:null
};
export default function HomeTwoReducer (state=initialState,action){
    switch (action.type){
        case HomeTwoActionTypes.GETPUSHMESSAGELIST_DOING:
            return {
                ...state
            };
        case HomeTwoActionTypes.GETPUSHMESSAGELIST_SUCCESS:
            //console.log('数据',JSON.parse(action.payload));
            var responseData = JSON.parse(action.payload);
           var array = DataUtil.dataArray.concat(responseData.values.list);
            DataUtil.dataArray = array;
            return {
                ...state,
                dataList:array,
                page:responseData.values.page,
                pageSum:responseData.values.pageSum,
                status:true
            };
        case HomeTwoActionTypes.GETPUSHMESSAGELIST_FAIL:
            return {
                ...state,
                status:true
            };
        case HomeTwoActionTypes.GETPUSHMESSAGELIST_ERROR:
            return {
                ...state,
                status:true
            };
        default:
            return state
    }
}