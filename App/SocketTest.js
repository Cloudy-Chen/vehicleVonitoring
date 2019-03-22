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
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modalbox from 'react-native-modalbox';
import Communications from 'react-native-communications';

var {height, width} = Dimensions.get('window');

const ws = new WebSocket('ws://202.194.14.71:10001/LocationMsg');

class SocketTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            content:'',
        }
    }

    render() {

        ws.onopen =() =>{
            console.log("ws.open222");
        }

        ws.onmessage =(e) =>{
            console.log("ws. onMessage22");
            console.log(e.data);
            alert(e.data);
        }

        ws.onerror =(e) =>{
            console.log("ws onerror22");
            console.log(e);
        }

        var json_content = this.state.content;

        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={{height:Platform.OS=='ios'?78:48,width:width,backgroundColor:'#387ef5',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:20}}>SocketTest</Text>
                </View>
                <View style={{flex:5,backgroundColor:'#fff',padding:10}}>
                    <Text>test</Text>
                </View>

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

export default connect(mapStateToProps)(SocketTest);
