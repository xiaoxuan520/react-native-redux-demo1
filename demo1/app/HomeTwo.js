
'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    TouchableOpacity,
    TouchableHighlight
}  from 'react-native';
import {
    SwRefreshScrollView,
    SwRefreshListView,
    RefreshStatus,
    LoadMoreStatus
} from 'react-native-swRefresh'
//import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var isPage = false;
var commonUtil = require('./common');
import { connect } from 'react-redux';
import  * as HomeTwoActions from './actions/HomeTwoActions'
import {bindActionCreators} from 'redux';
class HomeTwo extends Component {
    constructor(props) {
        super(props);
        //this.renderRow = this.renderRow.bind(this);
    }

    componentDidMount() {
            isPage = false;
        console.log('页面加载完毕');
            this.refs.listView.beginRefresh();
    }

    //显示图片的
    renderImageItemUI(imageList) {
        if (imageList.length != 0) {
            var width = 0;
            if (imageList.length > 1) {
                width = 26;
            }
            return (
                <Image
                    source={{uri:imageList[0]}}
                    style={PushMessageContainStyle.imageViewStyle}>
                    <View style={{flex:1}}/>
                    <View style={[PushMessageContainStyle.imageCountViewStyle,{width:width}]}>
                        <Text allowFontScaling={false} style={PushMessageContainStyle.imageTextStyle}>
                            {imageList.length + '图'}
                        </Text>
                    </View>
                </Image>
            )
        } else {
            return (
                <View/>
            )
        }

    }

    renderRow(data) {
        //,{height:data.ifChanged == true?7:0}
        //console.log('进入每行',data);
        var professionWidth = 0;
        if (data.profession != undefined) {
            if (data.profession.length != 0) {
                professionWidth = data.profession.length * 9 + 12
            }

        }
        return (
            <TouchableOpacity style={{backgroundColor:'#ffffff'}}>
                <View style={PushMessageContainStyle.topViewStyle}>
                    <View style={{flexDirection:'row'}}>
                        <Image
                            source={{uri:data.imageUrl}}
                            style={PushMessageContainStyle.doctorImageStyle}/>
                        <View style={[PushMessageContainStyle.redViewStyle,{height:data.ifChanged == true?7:0}]}/>
                    </View>
                    <Text allowFontScaling={false}
                          style={PushMessageContainStyle.doctorNameTextStyle}>
                        {data.name}
                    </Text>
                    <View style={[PushMessageContainStyle.doctorperfessionalViewStyle,{width:professionWidth}]}>
                        <Text
                            allowFontScaling={false}
                            style={PushMessageContainStyle.doctorperfessionalTextStyle}>
                            {data.profession}
                        </Text>
                    </View>
                    <Text allowFontScaling={false} style={PushMessageContainStyle.createTimeTextStyle}>
                        {data.createTime}
                    </Text>
                </View>
                <Text
                    numberOfLines={0}
                    allowFontScaling={false}
                    style={PushMessageContainStyle.titleTextStyle}>
                    {data.title}
                </Text>
                <Text
                    numberOfLines={3}
                    allowFontScaling={false}
                    style={PushMessageContainStyle.contentTextStyle}>
                    {data.content}
                </Text>
                {this.renderImageItemUI(data.imageList)}
                <View style={PushMessageContainStyle.bottomViewStyle}>
                    <Text allowFontScaling={false}
                          style={PushMessageContainStyle.bottomTextStyle}>
                        {'阅读' + data.readNum + ' · ' + '点赞' + data.supportNum}
                    </Text>
                </View>
                <View style={PushMessageContainStyle.lineWithViewStyle}/>
            </TouchableOpacity>

        )
    }

    //下拉刷新
    _onListRefersh(end) {
        console.log('推送消息下拉刷新');
        var thiz = this;
        this.props.getPushMessageList(0,function(isBool){
            let timer = setTimeout(()=> {
                clearTimeout(timer);
                if (thiz.refs.listView){
                    thiz.refs.listView.resetStatus(); //重置上拉加载的状态
                    end();//刷新成功后需要调用end结束刷新
                }
            }, 800);

        });

    }


    //上拉加载
    _onLoadMore(end){
        console.log('推送消息上拉刷新');
            var thiz = this;
            this.props.getPushMessageList(this.props.dataState.page,function(isBool){
                let timer = setTimeout(()=> {
                    clearTimeout(timer);
                    end(thiz.props.dataState.page >= thiz.props.dataState.pageSum)
                }, 1000);

            });

    }

    renderListView(){
        const {dataState} = this.props;
         return (
             <SwRefreshListView
                 dataSource={ds.cloneWithRows(dataState.dataList == undefined?[]:dataState.dataList)}
                 ref="listView"
                 renderRow={this.renderRow.bind(this)}
                 onRefresh={this._onListRefersh.bind(this)}
                 onLoadMore={this._onLoadMore.bind(this)}
                 isShowLoadMore={dataState.pageSum >1?true:false}
             />
         )
    }

    renderNoPushMessageDataUI(){
        const {dataState} = this.props;
        //console.log('请求下来的数据',dataState);
        return (
            <View style={PushMessageContainStyle.containstyle}>
                <TouchableOpacity style={PushMessageContainStyle.searchStyle}>
                    <View style={PushMessageContainStyle.searchViewStyle}>
                        <Image
                            style={PushMessageContainStyle.searchImageStyle}
                            source={require('./image/searchmessage.png')}/>
                        <View style={{alignSelf:'center',marginLeft:14,marginRight:10}}>
                            <Text allowFontScaling={false} style={PushMessageContainStyle.searchTextputStyle}>{'按医生姓名、文章标题搜索'}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                {

                    //<ListView
                    //    dataSource={ds.cloneWithRows(dataState.dataList == undefined?[]:dataState.dataList)}
                    //    renderRow={this.renderRow.bind(this)}/>
                }
                {this.renderListView()}

            </View>
        )
    }

    render(){
        return (
               <View style={PushMessageContainStyle.containstyle}>
                    {this.renderNoPushMessageDataUI()}
               </View>

        )
    }
}
var PushMessageContainStyle = StyleSheet.create({
    containstyle:{
        flex:1,
        backgroundColor:'#fafafa'
    },
    topViewStyle:{
        flexDirection:'row',

    },
    doctorImageStyle:{
        marginLeft:10,
        marginTop:10,
        width:29,
        height:29,
        borderRadius:29/2,
        //backgroundColor:'red'
    },
    redViewStyle:{
        height:7,
        width:7,
        borderRadius:3.5,
        backgroundColor:'#F32938',
        marginTop:10.4,
        marginLeft:-7
    },
    doctorNameTextStyle:{
        marginLeft:17,
        marginTop:19,
        fontSize:14,
        color:'#333333'
    },
    doctorperfessionalViewStyle:{
        height:15,
        backgroundColor:'#AFD87E',
        borderRadius:7,
        justifyContent:'center',
        marginTop:19,
        marginLeft:12
    },
    doctorperfessionalTextStyle:{
        fontSize:9,
        color:'#ffffff',
        backgroundColor:'#00000000',
        textAlign:'center'
    },
    createTimeTextStyle:{
        marginLeft:13,
        marginTop:21.,
        fontSize:10,
        color:'#b3b3b3'
    },
    titleTextStyle:{
        marginTop:19,
        marginLeft:11,
        marginRight:11,
        fontSize:16,
        color:'#202020'
    },
    contentTextStyle:{
        marginTop:11,
        marginLeft:13,
        marginRight:14,
        fontSize:14,
        color:'#4F4F4F',
        lineHeight:11+14,
        //backgroundColor:'red'
    },
    bottomViewStyle:{
        marginTop:18,
        marginBottom:12,
        alignSelf:'flex-end',
        marginRight:11
    },
    bottomTextStyle:{
        fontSize:10,
        color:'#b3b3b3'

    },
    lineWithViewStyle:{
        width:commonUtil.ScreenWidth,
        height:9,
        backgroundColor:'#F6F6F6'
    },
    imageViewStyle:{
        marginTop:14,
        marginLeft:10,
        marginRight:10,
        width:commonUtil.ScreenWidth-20,
        height:181
    },
    imageCountViewStyle:{
        backgroundColor:'#6A88C8',
        alignSelf:'flex-end',
        //width:26,
        height:16,
        justifyContent:'center'
    },
    imageTextStyle:{
        backgroundColor:'#00000000',
        fontSize:9,
        color:'#ffffff',
        textAlign:'center'
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: 'red',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginBottom:9
    },
    backTextWhite: {
        color: '#FFF'
    },

    searchStyle:{
        height:43,
        width:commonUtil.ScreenWidth,
        backgroundColor:'#e6e6e6',
        justifyContent:'center'
    },
    searchViewStyle:{
        marginLeft:10,
        height:29,
        alignSelf:'center',
        marginRight:10,
        backgroundColor:'#ffffff',
        width:commonUtil.ScreenWidth-20,
        borderRadius:5,
        flexDirection:'row'
    },
    searchImageStyle:{
        marginLeft:8,
        alignSelf:'center'
    },
    searchTextputStyle:{
        fontSize:14,
        color:'#C6C6C6'
    },


});

function select(state){
    return {
        dataState:state.homeTwoReducer
    }
}

function mapDispatchToProps(dispatch){
   return bindActionCreators(HomeTwoActions,dispatch);
}

export default connect(select,mapDispatchToProps)(HomeTwo)