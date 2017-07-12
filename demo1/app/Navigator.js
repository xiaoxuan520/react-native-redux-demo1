
import {StackNavigator} from 'react-navigation'
import Home from './Home'
import HomeTwo from './HomeTwo'

const navigationOptions = {
    title:'第二级页面',
    //header: {  // 导航栏相关设置项
    //    backTitle: '返回',  // 左上角返回键文字
    //    style: {
    //        backgroundColor: '#fff'
    //    },
    //    titleStyle: {
    //        color: 'green'
    //    }
    //},
};

function modeName(navigation){
    console.log('跳转',navigation);
     if (navigation.action.routeName == 'Home'){
         return 'modal'
     }else {
         return 'card'
     }
}
//注册导航,StackNavigator(RouteConfigs, StackNavigatorConfig)
const Navigator = StackNavigator({
    Home:{screen:Home},
    HomeTwo:{screen:HomeTwo,
        navigationOptions:navigationOptions
    }
},
    {
    initialRouteName: 'Home', // 默认显示界面,如果不指定就按照注册的顺序,第一个是哪个就显示哪个
         mode:(navigation) => {
             return 'modal'
         }
    }
);

export default Navigator