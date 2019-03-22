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
import ToolBar from '../../utils/ToolBar'

var {height, width} = Dimensions.get('window');

class CapturePicture extends Component {

    goBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),

        }
    }

        render()
        {
            return (
                <View style={styles.container}>
                    <ToolBar title={'图像采集'}
                             onPress={()=>{this.goBack()}}/>
                    <View style={{flex:1,flexDirection:'column',backgroundColor:'#fff'}}>

                        <View
                            style={{flexDirection:'row',height:50,width:width,paddingHorizontal:10,marginTop:10}}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <TouchableOpacity style={{width:150,height:35,backgroundColor:'#387ef5',alignItems:'center',justifyContent:'center',borderRadius:5}}
                                                  onPress={()=>{}}>
                                    <Text style={{fontSize:14,color:'#fff'}}>查询摄像头信息</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                <TouchableOpacity style={{width:150,height:35,backgroundColor:'#387ef5',alignItems:'center',justifyContent:'center',borderRadius:5}}
                                                  onPress={()=>{}}>
                                    <Text style={{fontSize:14,color:'#fff'}}>调用摄像头拍照</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{flex:1,justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
                            <Image source={require('../../../img/broken.png')} style={{width:150,height:150,borderRadius:10}} />
                            <Text style={{fontSize:16,color:'#888',marginTop:15}}>该车暂无抓拍照片</Text>
                        </View>
                </View>
                </View>
            );
        }
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:'#eee'
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

export default connect(mapStateToProps)(CapturePicture);
