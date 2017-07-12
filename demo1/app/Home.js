
'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import  * as actions from './actions/Actions'
import {bindActionCreators} from 'redux';
var commonUtil = require('./common');

class Home extends Component {
    constructor(props) {
        super(props);
    }

    entryClick(){
        const { navigate } = this.props.navigation;
        navigate('HomeTwo',{});
    }

   render(){

       var {pageText,top,down} = this.props;
       return (
           <View style={{height:commonUtil.ScreenHeight,width:commonUtil.ScreenWidth,backgroundColor:'red'}}>
               <Text style={{textColor:'#000000'}}>{pageText}</Text>
               <TouchableOpacity onPress={top} style={{height:50,width:100,marginLeft:20,marginTop:20,backgroundColor:'#cccccc'}}>
                   <Text>{'向上'}</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={down} style={{height:50,width:100,marginLeft:20,marginTop:20,backgroundColor:'#cccccc'}}>
                   <Text>{'向下'}</Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={()=>this.entryClick()} style={{height:50,width:100,marginLeft:20,marginTop:20,backgroundColor:'#cccccc'}}>
                   <Text>{'进入'}</Text>
               </TouchableOpacity>
           </View>
       )
   }
}

//和action绑定
function mapDispatchToProps(dispatch){
    return bindActionCreators(actions,dispatch);
}

function select(store){
    //console.log('请求下来的数据',store);
    return {
        pageText:store.reducer.pageText
    }
}

export default connect(select,mapDispatchToProps)(Home)
