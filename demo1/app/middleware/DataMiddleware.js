/**
数据处理的中间件
网络请求成功以后会返回以下格式的json
 {
    result:'ok',
    values:{},
    errorcode:'000000',
    errormsg:''
 }
*/

export default  dataMiddleware= ({dispatch}) => (next) => (action) => {
    try {
        if (action.result == undefined){
            var responseData =JSON.parse(action.payload);
            if (responseData.result == 'ok'){
                return dispatch(Object.assign({}, action, {payload: responseData.values,result:'ok'}));
            }else {
                return dispatch(Object.assign({}, action, {payload: responseData.errormsg,result:'error'}));
            }
        }else {
            return next(action)
        }

    }catch(error) {
        console.log('error',error);
    }
}
