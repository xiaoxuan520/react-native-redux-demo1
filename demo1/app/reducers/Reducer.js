
import  * as types from '../actions/actionTypes';
const initialState = {
   pageText:'标题'
};

export default function Reducer(state = initialState,action){
    switch (action.type){
        case types.TOP:
            return{
                ...state,
                pageText:'向上'
            };
        case types.DOWN:
            return{
                ...state,
                pageText:'向下'
            };
        default:
            return state;
    }
}