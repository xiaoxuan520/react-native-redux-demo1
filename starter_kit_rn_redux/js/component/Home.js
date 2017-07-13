import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  RefreshControl,
  Dimensions,
  ListView,
  ScrollView,
  InteractionManager,
  ProgressBarAndroid,
  Platform,
  Image,
  View
} from 'react-native';
import Counter from './counter/Counter'

export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
    this.dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2
    });
    this.demoList=[
      {
        name:"Counter",
        who:"yajun",
        component: Counter,
      }
    ];
  }

  /**
  * item点击事件
  */
  _onItemClick(rowData,rowID){
    const { navigator } = this.props;
    if(navigator) {
        navigator.push({
            name: 'DetailArticleCmp',
            component: DetailArticleCmp,
            params:{
              rowData
            }
        })
    }
  }

  _renderRow(rowData, sectionID, rowID, highlightRow){
    return(
      <TouchableHighlight underlayColor="rgba(34, 26, 38, 0.1)" onPress={()=>this._onItemClick(rowData,rowID)}>
        <View style={{flexDirection:'row',padding:12,borderBottomWidth:StyleSheet.hairlineWidth,borderColor:'#c9c9c9'}}>
          {/*<Image
            source = {{uri: rowData.small_photo}}
            style = {{height:80,width:120}}
          />*/}
          <View style={{marginLeft:10,flex:1}}>
            <Text style={{fontSize: 15,fontWeight: 'bold',color:'black'}}>{rowData.name}</Text>
            <View style={{marginTop: 4, justifyContent: 'space-between', flexDirection: 'row'}}>
              <Text style={{}}>{'作者：' + rowData.who}</Text>
              {
                //<Text style={{}}>{this._formatDate(rowData.publishedAt)}</Text>
              }

            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    const {dispatch, read, category} = this.props;

    return(

        <ListView
            enableEmptySections={true}
            style={{flex: 1}}
            dataSource={this.dataSource.cloneWithRows(this.demoList)}
            renderRow={this._renderRow.bind(this)}
          />

    );
  }

}
