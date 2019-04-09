
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
import Proxy from '../../proxy/Proxy'
import Config from '../../../config';
import Icon from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import ToolBar from '../../utils/ToolBar';
import DateFilter from '../../utils/DateFilter'
import moment from "moment/moment";

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
        this.handleMessage = this.handleMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this)
    }

    handleMessage(e) {

        var msgJson = e.nativeEvent.data;
        var msg = JSON.parse(msgJson)
        // var plateNum = msg.plateNum
        // var cars = this.state.selectedLeafs;
        // var car_click = null;
        //
        // cars.map((car)=>{
        //     if(car.plateNum==plateNum)car_click = car;
        // })
        //
        // car_click==null?
        //     this.setState({selectedVideo:-1,driverSpeed:0,driverName:'获取失败',driverLastTime:'获取失败',
        //         driverCompany:'获取失败',driverWeather:'获取失败',driverAddress:'获取失败',driverFlag:0})
        //     :
        //     this.setState({selectedVideo:-1,driverSpeed:car_click.driverSpeed,driverName:car_click.driverName,driverLastTime:car_click.driverLastTime,
        //         driverCompany:car_click.driverCompany,driverWeather:msg.weather,driverAddress:msg.address,driverFlag:car_click.driverFlag})
        //
        // this.refs.modal1.open()

    }

    sendMessage(poiArr) {
        var json = JSON.stringify(poiArr)
        this.routeWeb.postMessage(json);
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
                            mode="datetime"
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
                                    maxDate="2020-03-01 23:59"
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

                        var startTime = this.state.startTime;
                        var endTime = this.state.endTime;
                        this.beginTrajectory(startTime,endTime);

                    }}><Text style={{fontSize:14,color:'#fff'}}>确定</Text></TouchableOpacity></View>
                    <WebView
                        ref={routeWeb =>
                            this.routeWeb = routeWeb}
                        style={{marginBottom:15}}
                        automaticallyAdjustContentInsets={true}
                        source={Platform.OS=='ios'?require('../../components/Html/trajectory.html'):{uri:'file:///android_asset/trajectory.html'}}     //网页数据源
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                        //接收HTML发出的数据
                        onMessage={this.handleMessage}
                        injectedJavaScript={patchPostMessageJsCode}
                        onLoadEnd={()=>{
                            setTimeout(() => {
                                var startTimeStr = this.state.startTime;
                                var endTimeStr = this.state.endTime;
                                this.beginTrajectory(startTimeStr,endTimeStr)
                            }, 1000);
                        }}
                    />
            </View>
        )
    }

    beginTrajectory(startTime,endTime){

        //后台格式要求精确到秒
        var startTime = startTime+":00"
        var endTime = endTime+":59"

        //向服务端发送时间，获得point
        //获得point后转化为路线需要的Json格式并且发送给html
        Proxy.postes({
            url: Config.server + '/func/web/getRouteOfCarFromNet',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                mobilePhone:'13827715822',
                startTime:startTime,
                endTime:endTime,
            }
        }).then((json)=>{
            if(json.re==1) {
                var poiArr = json.data;
                this.sendMessage(poiArr);
            }
        }).catch((e)=>{
        })

    }

    componentDidMount(){
        var endTime = new Date();
        //var startTime = moment(endTime).subtract(2,'hours'); // 减7小时;
        var endTimeStr = DateFilter.filter(endTime, 'yyyy-mm-dd hh:mm');
        var startTimeStr = DateFilter.filter(endTime,'yyyy-mm-dd')+' 00:00';
        this.setState({startTime:startTimeStr,endTime:endTimeStr})

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
        flex: 1,
    },

});

export default  YourEyes
