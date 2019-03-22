
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
    TextInput,
    WebView
} from 'react-native';
import Modalbox from 'react-native-modalbox';
import Video from 'react-native-video';
import YourEyes from '../components/Map/YourEyes'
import VedioTest from '../components/Map/VedioTest'
import CarCharts from '../components/Stats/CarCharts'
import SideMenu from 'react-native-side-menu';
import TreeSelect from 'react-native-tree-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import treeselectData from '../treselect.json';
import Proxy from '../proxy/Proxy'
import Config from '../../config';
import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/FontAwesome';
import CapturePicture from '../components/Map/CapturePicture'

var {height, width} = Dimensions.get('window');

var ws = new WebSocket('ws://202.194.14.71:10001/LocationMsg');

class MapTest extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state={
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
            //百度地图
            latitude:0,
            longitude:0,
            center:
                {latitude: 0,longitude: 0},
            zoom:10,
            selectedLeafs:[],

            //汽车信息
            carInfoVisible:false,
            buttonRect: null,
            displayArea: null,

            selectedVideo:-1,
            videoUrl:'',
            paused:false,
            fullscreen:false,

            //侧滑树状图
            isOpen:false,

            //驾驶信息
            driverSpeed:0,
            driverName:'获取失败',
            driverLastTime:'获取失败',
            driverCompany:'获取失败',
            driverWeather:'获取失败',
            driverAddress:'获取失败',
            driverFlag:0,
        }
        this.handleMessage = this.handleMessage.bind(this);
        this.sendMessage = this.sendMessage.bind(this)
    }

    navigate2YourEyes() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'YourEyes',
                component: YourEyes,
                params: {
                }
            })
        }
    }

    navigate2CarCharts() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'CarCharts',
                component: CarCharts,
                params: {
                }
            })
        }
    }

    navigate2CapturePicture() {
        const { navigator } = this.props;
        if (navigator) {
            navigator.push({
                name: 'CapturePicture',
                component: CapturePicture,
                params: {
                }
            })
        }
    }

    handleMessage(e) {
        //this.setState({ webViewData: e.nativeEvent.data });

        var msgJson = e.nativeEvent.data;
        var msg = JSON.parse(msgJson)
        var plateNum = msg.plateNum
        var cars = this.state.selectedLeafs;
        var car_click = null;

        cars.map((car)=>{
            if(car.plateNum==plateNum)car_click = car;
        })

        car_click==null?
            this.setState({selectedVideo:-1,driverSpeed:0,driverName:'获取失败',driverLastTime:'获取失败',
                driverCompany:'获取失败',driverWeather:'获取失败',driverAddress:'获取失败',driverFlag:0})
            :
            this.setState({selectedVideo:-1,driverSpeed:car_click.driverSpeed,driverName:car_click.driverName,driverLastTime:car_click.driverLastTime,
                driverCompany:car_click.driverCompany,driverWeather:msg.weather,driverAddress:msg.address,driverFlag:car_click.driverFlag})

        this.refs.modal1.open()

    }

    sendMessage(selectedLeafs) {
        var json = JSON.stringify(selectedLeafs)
        this.carWeb.postMessage(json);
    }

    render()
    {
        if(ws!=null) {
            ws.onopen = () => {
                console.log("ws.open");
            }

            ws.onmessage = (e) => {
                console.log(e.data);
                var wsDataJson = e.data;
                var wsData = JSON.parse(wsDataJson);
                //目前只收到一个数据
                var car = {
                    id:'A001',
                    name:'鲁NC7316',
                    plateNum: '鲁NC7316',
                    sortNo:"A011",
                    parentId:"A01",
                    latitude: wsData.latitude,
                    longitude: wsData.longitude,
                    rotate:90,
                    driverFlag:1,
                    driverSpeed: wsData.speed,
                    driverName: '陈海云',
                    driverLastTime: wsData.time,
                    driverCompany: '山东大学',
                    driverWeather: '晴天',
                    driverAddress: '山东省济南市历城区',

                }
                var selectedLeafs = [];
                selectedLeafs.push(car);
                this.setState({selectedLeafs: selectedLeafs})
                this.sendMessage(selectedLeafs)
            }

            ws.onerror = (e) => {
                console.log(e);
                alert(e.message);
            }
        }

        var driverFlagIcon = <Ionicons name={'md-radio-button-on'} color={'#8a8a8a'} size={20}/>
        var driverFlagName = <Text style={{color:'#8a8a8a',flex:1,textAlign:'left-center',marginLeft:10,fontSize:14}}>离线</Text>

        switch (this.state.driverFlag){
            case 0:driverFlagIcon = <Ionicons name={'md-radio-button-on'} color={'#8a8a8a'} size={20}/>;
                   driverFlagName = <Text style={{color:'#8a8a8a',flex:1,textAlign:'left',marginLeft:10,fontSize:14,fontWeight:'bold'}}>离线</Text>;break;//离线
            case 1:driverFlagIcon = <Ionicons name={'md-radio-button-on'} color={'#2aa515'} size={20}/>;
                   driverFlagName = <Text style={{color:'#2aa515',flex:1,textAlign:'left',marginLeft:10,fontSize:14,fontWeight:'bold'}}>运行</Text>;break;//运行
            case 2:driverFlagIcon = <Ionicons name={'md-radio-button-on'} color={'#d81e06'} size={20}/>;
                   driverFlagName = <Text style={{color:'#d81e06',flex:1,textAlign:'left',marginLeft:10,fontSize:14,fontWeight:'bold'}}>熄火</Text>;break;//熄火
        }

        var videoInfo =
            this.state.selectedVideo==-1?
                <View style={{width:width,height:300,flexDirection:'column',backgroundColor:'#fff'}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,padding:10,}}>
                            <TouchableOpacity
                                style={{backgroundColor:'#36ab60',flexDirection:'column',flex:1,justifyContent:'center',alignItems:'center'}}
                                onPress={()=>{this.setState({selectedVideo:1})}}>
                                <Image resizeMode="contain" source={require('../../img/car_front.png')} style={{width:50,height:50}}/>
                                <Text style={{fontSize:16,color:'#fff'}}>车前</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,padding:10,}}>
                            <TouchableOpacity
                                style={{backgroundColor:'#1296db',flexDirection:'column',flex:1,justifyContent:'center',alignItems:'center'}}
                                onPress={()=>{this.setState({selectedVideo:2})}}>
                                <Image resizeMode="contain" source={require('../../img/car_driver.png')} style={{width:50,height:50}}/>
                                <Text style={{fontSize:16,color:'#fff'}}>司机</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,padding:10,}}>
                            <TouchableOpacity style={{backgroundColor:'#d81e06',flexDirection:'column',flex:1,justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{this.setState({selectedVideo:3})}}>
                                <Image resizeMode="contain" source={require('../../img/car_tunnel.png')} style={{width:50,height:50}}/>
                                <Text style={{fontSize:16,color:'#fff'}}>通道</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,padding:10,}}>
                            <TouchableOpacity style={{backgroundColor:'#88147f',flexDirection:'column',flex:1,justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{this.setState({selectedVideo:4})}}>
                                <Image resizeMode="contain" source={require('../../img/car_back.png')} style={{width:50,height:50}}/>
                                <Text style={{fontSize:16,color:'#fff'}}>车后</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                :
                <View style={{width:width,height:300,marginTop:10,justifyContent:'center',alignItems:'center'}}>

                    <TouchableOpacity
                        style={{height:30,width:width,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#aaa',flexDirection:'row'}}
                        onPress={()=>{
                            this.setState({selectedVideo:-1})
                        }}>
                        <Icon name={'angle-left'} size={25}/>
                        <Text style={{fontSize:16,marginLeft:10}}>鲁NC7316</Text>
                    </TouchableOpacity>
                    <View style={{height:30,width:width,flexDirection:'row'}}>
                        <View style={{flex:4}}/>
                        <TouchableOpacity style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}><Ionicons name={'md-images'} size={20} color={'#666'}/><Text style={{marginLeft:5,color:'#666'}}>截屏</Text></TouchableOpacity>
                        <TouchableOpacity style={{flex:1,marginLeft:5,flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                                          onPress={()=>{
                                              //this.setState({fullscreen:true})
                                              this.player.presentFullscreenPlayer();
                                          }}><Ionicons name={'md-qr-scanner'} size={20} color={'#666'}/><Text style={{marginLeft:5,color:'#666'}}>全屏</Text></TouchableOpacity>
                    </View>
                    <View style={{width:width,height:240}}>
                        <Video source={ {uri:"https://media.w3.org/2010/05/sintel/trailer.mp4"}} // Looks for .mp4 file (background.mp4) in the given expansion version.
                               ref={(ref) => {this.player = ref}}
                               rate={1.0}                   // 0 is paused, 1 is normal.
                               volume={1.0}                 // 0 is muted, 1 is normal.
                               muted={false}                // Mutes the audio entirely.
                               paused={this.state.paused}               // Pauses playback entirely.
                               resizeMode="contain"           // Fill the whole screen at aspect ratio.
                               repeat={true}                // Repeat forever.
                               onLoad={(data)=>{
                               this.state.duration=data.duration
                           }}
                               onEnd={()=>{this.setState({paused: true});
                                       this.player.seek(0)}}
                               style={{width:width,height:300,alignItems:'center',justifyContent:'center'}}>
                        </Video>
                    </View>
                </View>

        var messageInfo=
            <View style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'flex-start',padding:10,paddingTop:3}}>

                <View style={{height:30,width:width,marginBottom:5,justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderColor:'#aaa'}}>
                    <Text style={{fontSize:16}}>鲁NC7316</Text>
                </View>

                <View style={{height:220,marginBottom:5,padding:10}}>
                    <TextInput
                        style={{width:width-20,height:200,padding:8,fontSize:13,marginTop:5,borderRadius:5,backgroundColor:'#eee',justifyContent:'flex-start',alignItems:'flex-start',verticalAlign:'top'}}
                        onChangeText={(text) =>
                            {
                                this.setState({content:text});
                            }}
                        value={this.state.content}
                        placeholder={this.props.content}
                        placeholderTextColor="#aaa"
                        underlineColorAndroid="transparent"
                        multiline={true}

                    />
                </View>
                <View style={{height:50,width:width,marginBottom:5,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity style={{width:200,height:45,backgroundColor:'#387ef5',justifyContent:'center',alignItems:'center',borderRadius:5}}
                                      onPress={()=>{Communications.text('13305607453',this.state.content);}}
                    >
                        <Text style={{fontSize:18,color:'#fff'}}>发送</Text>
                    </TouchableOpacity>
                </View>
            </View>;

        var carInfo=
            <View style={{flex:1,paddingTop:10,flexDirection:'column',justifyContent:'center',alignItems:'flex-start',padding:10}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>{driverFlagIcon}{driverFlagName}</View>
                    <View style={{flex:1,flexDirection:'row',marginLeft:10,alignItems:'flex-end'}}>
                        <TouchableOpacity style={{flex:1,alignItems:'flex-end'}}
                                          onPress={()=>{
                                              this.refs.modal1.close();
                                          }}>
                            <Ionicons name={'md-close'} color={'#888'} size={23}/></TouchableOpacity></View>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                    <View style={{flex:1,flexDirection:'row'}}><Text style={{color:'#000',flex:1}}>速度</Text><Text style={{color:'#888',flex:1,textAlign:'right'}}>{this.state.driverSpeed} km/h</Text></View>
                    <View style={{flex:1,flexDirection:'row',marginLeft:10}}><Text style={{color:'#000',flex:1}}>驾驶员</Text><Text style={{color:'#888',flex:1,textAlign:'right'}}>{this.state.driverName}</Text></View>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                    <Text style={{color:'#000',flex:2}}>最后更新时间</Text><Text style={{color:'#888',flex:3,textAlign:'right'}}>{this.state.driverLastTime}</Text></View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                    <Text style={{color:'#000',flex:1}}>所属公司</Text><Text style={{color:'#888',flex:3,textAlign:'right'}}>{this.state.driverCompany}</Text></View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                    <Text style={{color:'#000',flex:1}}>天气状况</Text><Text style={{color:'#888',flex:3,textAlign:'right'}}>{this.state.driverWeather}</Text></View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                    <Text style={{color:'#000',flex:1}}>地址</Text><Text style={{color:'#888',flex:3,textAlign:'right'}}>{this.state.driverAddress}</Text></View>
                <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10}}>
                    <TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>{
                        this.refs.modal1.close();
                        this.navigate2YourEyes();
                        //YourEyesModule.showYourEyesOfCar('1');
                    }}>
                        <Image resizeMode="contain" source={require('../../img/route.png')} style={{width:35,height:35}}/>
                        <Text style={{marginTop:10,fontSize:12,color:'#666'}}>
                            轨迹回放
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>{
                                          this.refs.modal1.close();
                                          this.refs.modal2.open();
                                          //this.navigate2VedioTest()
                                      }}>
                        <Image resizeMode="contain" source={require('../../img/vonitoring.png')} style={{width:35,height:35}}/>
                        <Text style={{marginTop:10,fontSize:12,color:'#666'}}>
                            视频监控
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>{
                        this.refs.modal1.close();
                        this.navigate2CapturePicture()
                    }}>
                        <Image resizeMode="contain" source={require('../../img/picture.png')} style={{width:35,height:35}}/>
                        <Text style={{marginTop:10,fontSize:12,color:'#666'}}>
                            图像采集
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>{
                                          this.refs.modal1.close();
                                          this.refs.modal3.open();
                                      }}>
                        <Image resizeMode="contain" source={require('../../img/message.png')} style={{width:35,height:35}}/>
                        <Text style={{marginTop:10,fontSize:12,color:'#666'}}>
                            短信
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>{
                                          this.refs.modal1.close();
                                          this.navigate2CarCharts();
                                      }}>
                        <Image resizeMode="contain" source={require('../../img/stats.png')} style={{width:35,height:35}}/>
                        <Text style={{marginTop:10,fontSize:12,color:'#666'}}>
                            统计
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>;

        const menu =
            <View style={{backgroundColor:'#fff',flex:1,paddingTop:10}}>
                <TreeSelect
                    data={treeselectData}
                    openIds={['A01']}
                    isShowTreeId={false}
                    itemStyle={{
                    fontSize: 14,
                    }}
                    selectedItemStyle={{
                    fontSize: 14,
                    }}
                    treeNodeStyle={{
                    }}
                    onPress={(selectedLeafs)=>{
                        //this.setState({isOpen:false,selectedLeafs:selectedLeafs})
                        //this.sendMessage(selectedLeafs)
                        this.setState({isOpen:false})
                        //ws = new WebSocket('ws://202.194.14.71:10001/LocationMsg');
                    }
                    }
                />
            </View>;

        return (
            <SideMenu
                menu={menu}                    //抽屉内的组件
                isOpen={this.state.isOpen}     //抽屉打开/关闭
                openMenuOffset={width*2 / 3}     //抽屉的宽度
                hiddenMenuOffset={0}          //抽屉关闭状态时,显示多少宽度 默认0 抽屉完全隐藏
                edgeHitWidth={40}              //距离屏幕多少距离可以滑出抽屉,默认60
                disableGestures={false}        //是否禁用手势滑动抽屉 默认false 允许手势滑动
                menuPosition={'left'}     //抽屉在左侧还是右侧
                autoClosing={true}       //默认为true 如果为true 一有事件发生抽屉就会关闭
            >
            <View style={styles.container}>

                <TouchableOpacity
                    style={{height:Platform.OS=='ios'?78:48,backgroundColor:'#387ef5',justifyContent:'flex-start',alignItems:'center',padding:10,flexDirection:'row'}}
                    onPress={()=>{
                    this.setState({isOpen:true})
                }}>
                    <Ionicons name={'md-search'} size={30} color="#fff"/>
                    <Text style={{fontSize:20,color:'#fff',marginLeft:5}}>选车</Text>
                </TouchableOpacity>

                    <WebView
                        ref={carWeb =>
                            this.carWeb = carWeb}
                        style={{marginBottom:15}}
                        automaticallyAdjustContentInsets={true}
                        //source={require('../Html/inverse_address.html')}     //网页数据源
                        source={Platform.OS=='ios'?require('../components/Html/carselect_html.html'):{uri:'file:///android_asset/carselect_html.html'}}     //网页数据源
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                        //接收HTML发出的数据
                        onMessage={this.handleMessage}
                        injectedJavaScript={patchPostMessageJsCode}

                    />

                {/*汽车信息*/}
                <Modalbox
                    backdropPressToClose={true}
                    style={{ backgroundColor:"transparent"}}
                    animationType={"slide"}
                    ref={"modal1"}
                >
                    <View style={{height: 320,width:width-20, marginTop: 30,marginLeft:10,alignItems:'center',justifyContent:'center',borderWidth:1,backgroundColor:'#fff',borderRadius:10,borderColor:'#bbb'}}>
                        {carInfo}
                    </View>
                </Modalbox>
                {/*视频信息*/}
                <Modalbox
                    backdropPressToClose={true}
                    style={{ marginRight: 10,borderRadius: 10,borderWidth: 1,width: width,height: 300,justifyContent: 'center', alignItems: 'center',backgroundColor: '#fff'}}
                    animationType={"slide"}
                    ref={"modal2"}
                    position={"bottom"}
                >
                    {videoInfo}
                </Modalbox>
                {/*短信*/}
                <Modalbox
                    backdropPressToClose={true}
                    style={{ marginRight: 10,borderRadius: 10,borderWidth: 1,width: width,height: 350,justifyContent: 'center', alignItems: 'center',backgroundColor: '#fff'}}
                    animationType={"slide"}
                    ref={"modal3"}
                    position={"bottom"}
                >
                    {messageInfo}
                </Modalbox>
            </View>
            </SideMenu>
        )
    }

    componentDidMount(){

        // Proxy.postes({
        //     url: Config.server + '/func/web/getAllAlarmProcessInfo',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: {
        //     }
        // }).then((json)=>{
        //
        // }).catch((e)=>{
        // })

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
        backgroundColor:'#fff'
    },

});

export default  MapTest
