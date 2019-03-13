import React, {Component} from 'react';
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
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import ServerPay from '../components/My/ServerPay';
import ModifyMyInformation from '../components/My/ModifyMyInformation';
import {
    getAccessToken
} from '../actions/UserActions';
import {
    PAGE_LOGIN,
    PAGE_PLATFORM
} from '../constants/PageStateConstants';
import {
    updatePageState
} from '../actions/PageStateActions';

var {height, width} = Dimensions.get('window');

class My extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
        }
    }

    navigate2ServerPay() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'ServerPay',
                component: ServerPay,
                params: {
                }
            })
        }
    }

    navigate2ModifyMyInformation() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'ModifyMyInformation',
                component: ModifyMyInformation,
                params: {
                }
            })
        }
    }

    navigate2PlatformExchange(){
        //TODO:dispatch a action
        this.props.dispatch(updatePageState(
            {state:PAGE_PLATFORM}))
    }

    render() {

        return (
            <View style={{flex:1,backgroundColor:'#eee'}}>
            <ScrollView style={{flex:1}}>
                <View style={{height:48,width:width,backgroundColor:'#387ef5',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:20}}>个人中心</Text>
                </View>

                <TouchableOpacity
                    style={{height:80,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:8,paddingLeft:10}}
                    onPress={()=>{
                        this.navigate2ModifyMyInformation()
                    }}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Image resizeMode="cover" source={require('../../img/person.png')} style={{height:50,width:50}}/>
                    </View>
                    <View style={{flex:5,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20,flexDirection:'column'}}>
                        <Text>姓名：陈海云</Text>
                        <Text>电话：13305607453</Text>
                    </View>
                    <View style={{flex:1,backgroundColor:'#fff',justifyContent:'center',alignItems:'flex-end',paddingRight:10}}>
                        <Icon name={'angle-right'} size={25}/>
                    </View>
                </TouchableOpacity>
                {/*服务费缴纳*/}
                <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                       onPress={()=>{
                       this.navigate2ServerPay()
                       }}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'yen'} size={25} color={'#387ef5'}/>
                    </View>
                    <View style={{flex:11,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                        <Text>服务费缴纳</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'angle-right'} size={25} color={'#888'}/>
                    </View>
                </TouchableOpacity>
                {/*设备保修*/}
                <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                  onPress={()=>{
                        }}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'wrench'} size={25} color={'#387ef5'}/>
                    </View>
                    <View style={{flex:11,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                        <Text>设备保修</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'angle-right'} size={25} color={'#888'}/>
                    </View>
                </TouchableOpacity>
                {/*意见反馈*/}
                <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                  onPress={()=>{
                        }}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'edit'} size={25} color={'#387ef5'}/>
                    </View>
                    <View style={{flex:11,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                        <Text>意见反馈</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'angle-right'} size={25} color={'#888'}/>
                    </View>
                </TouchableOpacity>
                {/*资讯公告*/}
                <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                  onPress={()=>{
                        }}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'bullhorn'} size={25} color={'#387ef5'}/>
                    </View>
                    <View style={{flex:11,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                        <Text>资讯公告</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'angle-right'} size={25} color={'#888'}/>
                    </View>
                </TouchableOpacity>
                {/*附近*/}
                <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                  onPress={()=>{
                        }}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'globe'} size={25} color={'#387ef5'}/>
                    </View>
                    <View style={{flex:11,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                        <Text>附近</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'angle-right'} size={25} color={'#888'}/>
                    </View>
                </TouchableOpacity>
                {/*其他*/}
                <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                  onPress={()=>{
                        }}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'align-justify'} size={25} color={'#387ef5'}/>
                    </View>
                    <View style={{flex:11,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                        <Text>其他</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'angle-right'} size={25} color={'#888'}/>
                    </View>
                </TouchableOpacity>
    {/*切换平台*/}
    <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                      onPress={()=>{
                          this.props.dispatch(getAccessToken(false));
                          this.navigate2PlatformExchange();
                        }}>
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
            <Icon name={'exchange'} size={25} color={'#387ef5'}/>
        </View>
        <View style={{flex:11,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
            <Text>切换平台</Text>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
            <Icon name={'angle-right'} size={25} color={'#888'}/>
        </View>
    </TouchableOpacity>
    {/*二维码*/}
    <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                      onPress={()=>{
                        }}>
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
            <Icon name={'barcode'} size={25} color={'#387ef5'}/>
        </View>
        <View style={{flex:11,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
            <Text>二维码</Text>
        </View>
        <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
            <Icon name={'angle-right'} size={25} color={'#888'}/>
        </View>
    </TouchableOpacity>

    <View style={{height:80,backgroundColor:'#eee',flexDirection:'row',padding:2,padding:10,justifyContent:'center',alignItems:'center'}}>
        <TouchableOpacity
            style={{backgroundColor:'#387ef5',justifyContent:'center',alignItems:'center',padding:8,paddingHorizontal:40}}
            onPress={()=>{

            }}>
            <Text style={{fontSize:16,color:'#fff'}}>退出登录</Text>
        </TouchableOpacity>
    </View>

</ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    toolbar: {
        backgroundColor: '#eee',
        height: 56,
    }

});

const mapStateToProps = (state, ownProps) => {

    const props = {
    }

    return props
}

export default connect(mapStateToProps)(My);
