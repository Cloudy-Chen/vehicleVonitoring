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
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modalbox from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome';

var {height, width} = Dimensions.get('window');

class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
        }
    }

    render() {

        return (
            <View style={{flex:1,backgroundColor:'transparent'}}>
<ScrollView style={{flex:1}}>
                <View style={{height:48,width:width,backgroundColor:'#387ef5',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:20}}>个人中心</Text>
                </View>

                <TouchableOpacity
                    style={{height:80,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:8,paddingLeft:10}}
                    onPress={()=>{

                    }}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Ionicons name={'md-person'} size={50} color={'#888'}/>
                    </View>
                    <View style={{flex:5,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20,flexDirection:'column'}}>
                        <Text>姓名：陈海云</Text>
                        <Text>电话：13305607453</Text>
                    </View>
                </TouchableOpacity>
                {/*服务费缴纳*/}
                <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                  onPress={()=>{
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
            style={{backgroundColor:'#387ef5',justifyContent:'center',alignItems:'center',padding:5,paddingHorizontal:40}}
            onPress={()=>{

            }}>
            <Text style={{fontSize:18,color:'#fff'}}>退出登录</Text>
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

export default connect(mapStateToProps)(Notification);
