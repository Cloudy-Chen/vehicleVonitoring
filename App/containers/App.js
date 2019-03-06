
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
var {height, width} = Dimensions.get('window');
import Modalbox from 'react-native-modalbox';

import {
    PAGE_LOGIN,
    PAGE_PLATFORM,
    PAGE_PASSWORDFORGET,

} from '../constants/PageStateConstants';

import Map from './Map';
import Charts from './Charts';
import Login from './Login';
import Notification from './Notification';
import My from './My';
import Rule from './Rule';
import PlatformExchange from './PlatformExchange'

import {
    updateRootTab
}  from '../actions/TabActions';

class App extends Component {

    _createNavigatorItem(route,icon)
    {
        var component=Map;
        switch (route) {
            case '统计分析':
                component = Charts;
                break;
            case  '实时报警':
                component = Notification;
                break;
            case  '地图':
                component = Map;
                break;
            case '交通违章':
                component = Rule;
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
                selectedTitleStyle={{color:'#2478a7'}}
                renderIcon={() => <Ionicons name={icon} size={26} color="#aaa"/>}
                renderSelectedIcon={() => <Ionicons name={icon} size={26} color='#2478a7' />}
                onPress={() => {
                    this.setState({ selectedTab: route });
                    this.props.dispatch(updateRootTab({tab:route}));
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

        }
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
    })
)(App);
