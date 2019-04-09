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
import ViolationSearch from '../components/Violation/ViolationSearch'
import MonitorViolationSearch from '../components/Violation/MonitorViolationSearch'

var {height, width} = Dimensions.get('window');

class Violation extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
        }
    }

    navigate2ViolationSearch() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'ViolationSearch',
                component: ViolationSearch,
                params: {
                }
            })
        }
    }

    navigate2MonitorViolationSearch() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'MonitorViolationSearch',
                component: MonitorViolationSearch,
                params: {
                }
            })
        }
    }

    render() {

        return (
            <View style={{flex:1,backgroundColor:'#eee'}}>
                <View style={{height:Platform.OS=='ios'?78:48,width:width,backgroundColor:'#387ef5',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:20}}>交通违章</Text>
                </View>

                {/*九通平台车辆违章查询*/}
                <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                  onPress={()=>{
                                      this.navigate2ViolationSearch()
                        }}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'search'} size={25} color={'#387ef5'}/>
                    </View>
                    <View style={{flex:11,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                        <Text>九通平台车辆违章查询</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'angle-right'} size={25} color={'#888'}/>
                    </View>
                </TouchableOpacity>
                {/*关注车辆的添加查询*/}
                <TouchableOpacity style={{height:50,backgroundColor:'#fff',flexDirection:'row',padding:2,marginBottom:3,paddingLeft:10}}
                                  onPress={()=>{
                                      this.navigate2MonitorViolationSearch()
                        }}>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'search-plus'} size={25} color={'#387ef5'}/>
                    </View>
                    <View style={{flex:11,backgroundColor:'#fff',justifyContent:'center',marginLeft:10,paddingLeft:20}}>
                        <Text>关注车辆的添加查询</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems: 'center'}}>
                        <Icon name={'angle-right'} size={25} color={'#888'}/>
                    </View>
                </TouchableOpacity>

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

export default connect(mapStateToProps)(Violation);
