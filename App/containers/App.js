
import React, { Component } from 'react';
import {
    Dimensions,
    ListView,
    ScrollView,
    Image,
    View,
    StyleSheet,
    Text,
    Platform,
    TouchableOpacity,
    RefreshControl,
    Animated,
    Easing,
    Alert,
    InteractionManager,
    ToolbarAndroid,
    Modal,
    TextInput
} from 'react-native';
import { connect } from 'react-redux';
import { Navigator } from 'react-native-deprecated-custom-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons'
import TabNavigator from 'react-native-tab-navigator';
import Modalbox from 'react-native-modalbox';
import {
    PAGE_LOGIN,
    PAGE_PLATFORM,
    PAGE_PASSWORDFORGET,

} from '../constants/PageStateConstants';
import Map from './MapWeb';
import Charts from './Charts';
import Login from './Login';
import Alarm from './Alarm';
import My from './My';
import Violation from './Violation';
import PlatformExchange from './PlatformExchange'
import SocketTest from '../SocketTest'
import {
    updateRootTab
}  from '../actions/TabActions';
import {
    getAlarms
}  from '../actions/AlarmActions';
import Proxy from '../proxy/Proxy'
import Config from '../../config';
import AlarmInfo from '../AlarmInfo.json'

var {height, width} = Dimensions.get('window');

class App extends Component {

    _createNavigatorItem(route,icon)
    {
        var component=Map;
        var notify = 0;

        var alarms_notRead = this.state.alarms_notRead;
        var alarms_haveRead = this.state.alarms_haveRead;

        switch (route) {
            case '统计分析':
                component = Charts;
                break;
            case  '实时报警':
                component = Alarm;
                notify = 1;
                break;
            case  '地图':
                component = Map;
                break;
            case '交通违章':
                component = Violation;
                break;
            case '个人中心':
                component = My;
                break;
            default:
                break;
        }

        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === route}
                title={route}
                titleStyle={{color:'#9e9ca3',fontSize:13}}
                selectedTitleStyle={{color:'#387ef5'}}
                renderIcon={() => <Ionicons name={icon} size={26} color="#aaa"/>}
                renderSelectedIcon={() => <Ionicons name={icon} size={26} color='#387ef5' />}
                badgeText={notify==1?alarms_notRead.length:null}
                onPress={() => {

                    this.setState({ selectedTab: route });
                    this.props.dispatch(updateRootTab({tab:route}));

                    if(notify==1){
                        alarms_notRead.map((alarm)=>{
                            alarms_haveRead.push(alarm)
                        })
                        this.props.dispatch(getAlarms(alarms_notRead));
                        this.setState({alarms_haveRead:alarms_haveRead,alarms_notRead:[]})
                    }

                }}
                tabStyle={{backgroundColor:'transparent',}}
                onSelectedStyle={{backgroundColor:'#eeecf3',}}
            >

                <View style={{flex:1,}}>
                    <Navigator
                        initialRoute={{ name: route, component:component }}
                        configureScene={(route) => {
                            return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
                          }}
                        renderScene={(route, navigator) => {
                            let Component = route.component;
                            //if(notify==1){navigator.params={alarms:alarms_notRead}}
                            //this.props.dispatch(updateNavigator({route:route.name,navigator:navigator}))
                            return (<Component {...route.params} navigator={navigator} />);
                          }}

                    />
                </View>
            </TabNavigator.Item>
        );
    }


    constructor(props) {
        super(props);
        this.state={
            tab:'Map',
            selectedTab:props.tab.rootTab,
            name:null,
            alarms_haveRead:[],
            alarms_notRead:[]
        }

        setInterval(() => {
            if(this.props.auth==true) {
                //this.getAlarmsInfo();
            }
        }, 10000);
    }

    getAlarmsInfo(){

        //成功登录后,每10秒查看报警信息
        var alarms_haveRead = this.state.alarms_haveRead;
        var alarms_notRead = this.state.alarms_notRead;
        var alarms_get = [];

            Proxy.postes({
                url: Config.server + '/func/web/getAllAlarmProcessInfo',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: {}
            }).then((json) => {
                alarms_get = json.data;

                if (alarms_get != null) {
                    alarms_get.map((alarm, i) => {
                        var flag = 0;
                        alarms_haveRead.map((alarm_haveRead, j) => {
                            if (alarm.alarmId == alarm_haveRead.alarmId) flag = 1;
                        })
                        alarms_notRead.map((alarm_notRead, j) => {
                            if (alarm.alarmId == alarm_notRead.alarmId) flag = 1;
                        })
                        if (flag == 0) alarms_notRead.push(alarm)
                    })

                    this.setState({alarms_notRead: alarms_notRead})
                }

            }).catch((e) => {
                return null;
            })
    }


    render() {

        var props=this.props;
        let auth=this.props.auth;
        var {tab}=this.props
        if(auth==true)
        {

            var defaultStyle={
                backgroundColor:'#eeecf3',
                paddingBottom:5,
                paddingTop:5,
                height:60
            }

            var defaultSceneStyle={
            }

            if(tab.hidden==true)
            {
                defaultStyle.height=0
                defaultStyle.paddingBottom=0
                defaultStyle.paddingTop=0
                defaultSceneStyle.paddingBottom=0
            }


            return (

                <TabNavigator  tabBarStyle={defaultStyle} sceneStyle={defaultSceneStyle}>
                    {this._createNavigatorItem('统计分析','md-stats')}
                    {this._createNavigatorItem('实时报警','md-notifications')}
                    {this._createNavigatorItem('地图','md-locate')}
                    {this._createNavigatorItem('交通违章','md-close-circle')}
                    {this._createNavigatorItem('个人中心','md-person')}
                </TabNavigator>
            );
        }else{

            switch(props.page.state)
            {
                case PAGE_LOGIN:
                    return (<Login/>);
                    break;
                case PAGE_PLATFORM:
                    return (<PlatformExchange/>);
                    break;
            }

        }
    }

    componentDidMount()
    {
        //TODO:fetch username and password in cache
        if(Platform.OS=='android')
        {
            //ToastAndroid.show('Awesome', ToastAndroid.SHORT);
            //NotificationAndroid.notify('你有新的apk版本等待更新')
            //UpdateAndroid.check()
        }
    }
}

const patchPostMessageFunction = function() {
    var originalPostMessage = window.postMessage;

    var patchedPostMessage = function(message, targetOrigin, transfer) {
        originalPostMessage(message, targetOrigin, transfer);
    };

    patchedPostMessage.toString = function() {
        return String(Object.hasOwnProperty).replace('hasOwnProperty', 'postMessage');
    };

    window.postMessage = patchedPostMessage;
};

const patchPostMessageJsCode = '(' + String(patchPostMessageFunction) + ')();';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default connect(
    (state) => ({
        tab:state.tab,
        auth:state.user.auth,
        page:state.page,
        alarm:state.alarm,
    })
)(App);
