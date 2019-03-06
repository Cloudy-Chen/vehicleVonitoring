

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Modal
} from 'react-native';
import { connect } from 'react-redux';
import Config from '../../config';
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FloatLabelTextInput from 'react-native-floating-label-text-input';
import PreferenceStore from '../utils/PreferenceStore';
import {
    PAGE_LOGIN,
    PAGE_PLATFORM
} from '../constants/PageStateConstants';
import {
    updatePageState
} from '../actions/PageStateActions';
var { height, width } = Dimensions.get('window');

class PlatformExchange extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isModalVisible:false,

            selectedPlatform:-1,//-1都不选1选2选
        }
    }

    navigate2Login(){
    //TODO:dispatch a action
    this.props.dispatch(updatePageState(
        {state:PAGE_LOGIN}))
        }

    render() {

        var selectedPlatform = this.state.selectedPlatform;

        return (
            <View style={[styles.container,{backgroundColor:'#eee',flexDirection:'column',justifyContent:'center',alignItems:'center'}]}>
                <Image resizeMode="cover" source={require('../../img/bg.jpg')} style={{flex:1}}>

                <View style={{backgroundColor:'transparent',flex:2,justifyContent:'center',alignItems:'center',}}>
                    <Text style={{fontSize:30,color:'#fff'}}>运营车辆动态管理系统</Text>
                    </View>

                    <View style={{paddingVertical:3,backgroundColor:'transparent',flex:4,alignItems:'center',justifyContent:'center'}} >

                        {/*介绍*/}
                            <View style={{height:90,width:300,justifyContent:'center',alignItems:'center'}}>
                                <Text style={{color:'#fff',fontSize:14}}>
                                    尊敬的用户，为了您使用方便，请按照帐号所在平台进行勾选，
                                    下次使用可直接进入所选平台的登录界面也可在"个人中心"中的"平台转换"模块中对应选择内容进行修改
                                </Text>
                            </View>

                        {/*两客一危系统*/}
                        <View style={{flexDirection:'row',height:45,width:300,marginBottom:10,margin:10,padding:3,borderRadius:5}}>
                            <View style={{flex:6}}>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    <TouchableOpacity
                                        style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',padding:4,marginLeft:0,paddingHorizontal:2}}
                                        onPress={()=>{
                                            selectedPlatform==1?this.setState({selectedPlatform:-1}):this.setState({selectedPlatform:1})
                                        }}>
                                        {
                                            selectedPlatform==1?
                                            <Icon size={18} name="check-square-o" color="#fff"></Icon>
                                            :
                                            <Icon size={18} name="square-o" color="#fff"></Icon>
                                        }
                                    </TouchableOpacity>
                                    <View style={{flex:6,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                                        <Text style={{fontSize:18,color:'#fff'}}>两客一危系统</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/*北斗货运系统*/}
                        <View style={{flexDirection:'row',height:45,width:300,marginBottom:10,margin:10,padding:3,borderRadius:5}}>
                            <View style={{flex:6}}>
                                <View style={{flex:1,flexDirection:'row'}}>
                                    <TouchableOpacity
                                        style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center',padding:4,marginLeft:0,paddingHorizontal:2}}
                                        onPress={()=>{
                                            selectedPlatform==2?this.setState({selectedPlatform:-1}):this.setState({selectedPlatform:2})
                                        }}>
                                        {
                                            selectedPlatform==2?
                                                <Icon size={18} name="check-square-o" color="#fff"></Icon>
                                                :
                                                <Icon size={18} name="square-o" color="#fff"></Icon>
                                        }
                                    </TouchableOpacity>
                                    <View style={{flex:6,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                                        <Text style={{fontSize:18,color:'#fff'}}>北斗货运系统</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/*进入按钮*/}
                        <TouchableOpacity style={{flexDirection:'row',height:45,width:300,marginBottom:10,backgroundColor:'#eee',margin:10,marginTop:25,padding:10,borderRadius:5}}
                                          onPress={()=>{
                                              this.navigate2Login();
                                          }}>
                                <View style={{flex:1,flexDirection:'column',alignItems:'center',justifyContent:'flex-start'}}>
                                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                                        <Text style={{color:'#1f7c9d',fontSize:18,fontWeight:'bold'}}>进入</Text>
                                    </View>
                                </View>
                        </TouchableOpacity>

                    </View>


                    <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                        <Text style={{color:'#fff'}}>
                            山东航天九通车联网有限公司
                        </Text>
                    </View>
                </Image>
            </View>

        )
    }

    componentDidMount() {
        var username = null;
        var password = null;
        PreferenceStore.get('username').then((val) => {
            username = val
            return PreferenceStore.get('password');
        }).then((val) => {
            password = val
            if (username !== undefined && username !== null && username != ''
                && password !== undefined && password !== null && password != '') {

                this.setState({
                    username: username,
                    password: password
                })

            }
        })
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        padding: 0
    },
    labelInput: {
        color: '#ff5a5d',
    },
    input: {
        borderWidth: 0
    },
    formInput: {
        borderBottomWidth: 1.5,
        borderColor: '#555',
        marginLeft: 20,
        width: width * 4 / 5,
        padding: 12
    },
    buttonText: {
        fontSize: 18,
        fontFamily: 'Gill Sans',
        textAlign: 'center',
        margin: 10,
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
    modalContainer:{
        flex:1,
        justifyContent: 'center',
    },
    modalBackgroundStyle:{
        backgroundColor:'rgba(0,0,0,0.3)'
    },
    logo: {
        width: 80,
        height:80,
        resizeMode:'cover',
        backgroundColor:'transparent',
    },
    loader: {
        marginTop: 10
    },
    row:{
        flexDirection:'row',
        borderBottomWidth:1,
        borderBottomColor:'#222'
    },
});



export default connect()(PlatformExchange);
