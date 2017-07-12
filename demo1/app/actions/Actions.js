
import * as types from './actionTypes';//将actionTypes中的所有变量引进过来

////////////////////////////////如果没有配置中间件只能做类似下面的操作
export function top(){
    return {
        type:types.TOP
    };
}

export function down(){
    return {
       type:types.DOWN
    };
}