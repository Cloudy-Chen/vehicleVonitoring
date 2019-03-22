
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
    InteractionManager,
    WebView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import ToolBar from '../../utils/ToolBar'

var {height, width} = Dimensions.get('window');

class YourEyes extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state={
            startTime:'2019-03-08 14:33',
            endTime:'2019-03-08 14:33',
        }
    }

    render()
    {
        return (
            <View style={styles.container}>
                <ToolBar title={'轨迹回放'}
                         onPress={()=>{
                             this.goBack()
                         }}/>
                <View style={{height:60,paddingTop:5,paddingHorizontal:5,width:width,backgroundColor:'#fff',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                    <View style={{flex:1,flexDirection:'column'}}>
                        <Text style={{flex:1,fontSize:12,color:'#000'}}>开始时间:</Text>
                    <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#444',fontSize:14}}>{this.state.startTime}</Text>
                    <View style={{height:40,flexDirection:'row',alignItems:'center',justifyContent:'flex-start'}}>
                        <DatePicker
                            style={{width:40,marginLeft:0,borderWidth:0,justifyContent:'center',alignItems:'flex-start'}}
                            customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:0,height:25,borderWidth:0},
                                        dateIcon: {width:23,height:23},
                                    }}
                            mode="date"
                            data={this.state.startTime}
                            placeholder="选择"
                            format="YYYY-MM-DD HH:mm"
                            minDate="2019-03-01 00:00"
                            maxDate="2019-04-01 23:59"
                            confirmBtnText="确认"
                            cancelBtnText="取消"
                            onDateChange={(date) => {
                                        this.setState({startTime:date})
                                    }}
                        />
                    </View></View></View>

                    <View style={{flex:1,flexDirection:'column'}}>
                        <Text style={{flex:1,fontSize:12,color:'#000'}}>结束时间:</Text>
                        <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'#444',fontSize:14}}>{this.state.endTime}</Text>
                            <View style={{height:40,flexDirection:'row',alignItems:'center'}}>
                                <DatePicker
                                    style={{width:40,marginLeft:0,borderWidth:0,justifyContent:'center',alignItems:'center'}}
                                    customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:0,height:25,borderWidth:0},
                                        dateIcon: {width:23,height:23},
                                    }}
                                    mode="datetime"
                                    data={this.state.endTime}
                                    placeholder="选择"
                                    format="YYYY-MM-DD HH:mm"
                                    minDate="2019-03-01 00:00"
                                    maxDate="2019-04-01 23:59"
                                    confirmBtnText="确认"
                                    cancelBtnText="取消"
                                    onDateChange={(date) => {
                                        this.setState({endTime:date})
                                    }}
                                />
                            </View></View></View>
                </View>
                <View style={{height:30,width:width,backgroundColor:'#fff',alignItems:'center',justifyContent:'flex-start'}}>
                    <TouchableOpacity
                    style={{width:100,height:25,backgroundColor:'#387ef5',borderRadius:10,alignItems:'center',justifyContent:'center'}}
                    onPress={()=>{

                    }}><Text style={{fontSize:14,color:'#fff'}}>确定</Text></TouchableOpacity></View>
                    <WebView
                        style={{marginBottom:10}}
                        automaticallyAdjustContentInsets={true}
                        source={require('../Html/trajectory.html')}     //网页数据源
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                    />
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

});

export default  YourEyes
