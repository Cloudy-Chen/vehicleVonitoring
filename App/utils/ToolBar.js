
import React,{Component} from 'react';

import  {
    StyleSheet,
    Image,
    Text,
    View,
    ListView,
    Alert,
    TouchableOpacity,
    Dimensions,
    Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
var {height, width} = Dimensions.get('window');

class ToolBar extends Component{

    onPress()
    {
        if(this.props.onPress)
            this.props.onPress()
    }

    onAdd()
    {
        if(this.props.onAdd)
            this.props.onAdd()
    }

    componentWillReceiveProps(nextProps)
    {
        this.setState(nextProps)
    }

    constructor(props) {
        super(props);
        this.state = {
            title:this.props.title,
            isAdd:this.props.isAdd,
        }
    }

    render() {

        var title = this.state.title;
        var isAdd = this.state.isAdd;

        return (
            Platform.OS=='ios'?
            <View style={{width:width,height:86,backgroundColor:'#387ef5',padding:5,flexDirection:'row'}}>
                <TouchableOpacity style={{flex:1,alignItems:'flex-start',justifyContent:'flex-end',paddingLeft:5}}
                                  onPress={()=>{
                                      this.onPress()
                                  }}>
                    <Icon name='angle-left' color='#fff' size={30} /></TouchableOpacity>
                <View style={{flex:5,alignItems:'center',justifyContent:'flex-end'}}>
                    <Text style={{fontSize:20,color:'#fff'}}>{title}</Text>
                </View>
                <View style={{flex:1,alignItems:'flex-end',justifyContent:'flex-end',paddingRight:5}}>
                    {isAdd==null?null:
                        <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'flex-end'}}
                                          onPress={()=>{
                                      this.onAdd()
                                  }}>
                            <Ionicons name='md-add' color='#fff' size={30}/></TouchableOpacity>
                    }
                </View>
            </View>
                :
                <View style={{width:width,height:56,backgroundColor:'#387ef5',padding:5,flexDirection:'row'}}>
                    <TouchableOpacity style={{flex:1,alignItems:'flex-start',justifyContent:'center',paddingLeft:5}}
                                      onPress={()=>{
                                      this.onPress()
                                  }}>
                        <Icon name='angle-left' color='#fff' size={30}/></TouchableOpacity>
                    <View style={{flex:5,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:20,color:'#fff'}}>{title}</Text>
                    </View>
                    <View style={{flex:1,alignItems:'flex-start',justifyContent:'center',paddingLeft:5}}>
                    </View>
                </View>
        );
    }

}

var styles = StyleSheet.create({
});

module.exports = connect(state=>({
    })
)(ToolBar);