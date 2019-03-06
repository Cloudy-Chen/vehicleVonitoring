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
import { MapView, MapTypes, Geolocation, Overlay } from 'react-native-baidu-map'
import {connect} from 'react-redux';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import SideMenu from 'react-native-side-menu';
import TreeSelect from 'react-native-tree-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import treeselectData from '../treselect.json';
import {
} from '../actions/UserActions';
import Modalbox from 'react-native-modalbox';
import Video from 'react-native-video';
import YourEyes from '../components/Map/YourEyes'
import CarCharts from '../components/Stats/CarCharts'
import YourEyesModule from '../native/YourEyesModule'
import {getAllVehicle} from '../actions/MapActions'

var {height, width} = Dimensions.get('window');

class Stats extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),
            //百度地图
            latitude:0,
            longitude:0,
            //侧滑树状图
            isOpen:false,
            center:
                {latitude: 0,longitude: 0},
            markers:[],
            selectedLeafs:[],
            //汽车信息
            carInfoVisible:false,
            buttonRect: null,
            displayArea: null,

            selectedVideo:-1,
            videoUrl:'',
            paused:false,

        }
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

    render() {

        if(this.state.markers==null || this.state.markers.length==0){
            Geolocation.getCurrentPosition().then(
                (data) => {
                    this.setState({
                        zoom: 18,
                        markers: [
                            {
                                latitude: data.latitude,
                                longitude: data.longitude,
                                title: '我的位置'
                            }
                        ],
                        center: {
                            latitude: data.latitude,
                            longitude: data.longitude,
                        }
                    })
                }
            ).catch(error => {
                console.warn(error, 'error')
            })
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
                        style={{flex:1}}
                        onPress={() => this.setState({ paused: !this.state.paused })}
                    >
                        <Video
                            source={{uri: 'background'}} // Can be a URL or a local file.
                            rate={1.0}                   // 控制暂停/播放，0 代表暂停
                            volume={1.0}                 // 声音的放大倍数，0 代表没有声音，就是静音muted, 1 代表正常音量 normal，更大的数字表示放大的倍数
                            muted={false}                //true代表静音，默认为false.
                            paused={true}               // Pauses playback entirely.
                            resizeMode="cover"           // 视频的自适应伸缩铺放行为，
                            repeat={true}                // 是否重复播放
                            style={{width:width-20,height:200}}
                        />
                    </TouchableOpacity>
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
                    <TouchableOpacity style={{width:200,height:45,backgroundColor:'#387ef5',justifyContent:'center',alignItems:'center',borderRadius:5}}>
                    <Text style={{fontSize:18,color:'#fff'}}>发送</Text>
                    </TouchableOpacity>
                </View>
            </View>;

        var carInfo=
            <View style={{flex:1,paddingTop:10,flexDirection:'column',justifyContent:'center',alignItems:'flex-start',padding:10}}>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                    <View style={{flex:1,flexDirection:'row'}}><Text style={{color:'#000',flex:1}}>速度</Text><Text style={{color:'#888',flex:1,textAlign:'right'}}>0km/h</Text></View>
                    <View style={{flex:1,flexDirection:'row',marginLeft:10}}><Text style={{color:'#000',flex:1}}>驾驶员</Text><Text style={{color:'#888',flex:1,textAlign:'right'}}>陈海云</Text></View>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                <Text style={{color:'#000',flex:1}}>最后更新时间</Text><Text style={{color:'#888',flex:3,textAlign:'right'}}>2019-01-12 14:07:55</Text></View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                <Text style={{color:'#000',flex:1}}>所属公司</Text><Text style={{color:'#888',flex:3,textAlign:'right'}}>德州市新华汽车运输有限公司</Text></View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                <Text style={{color:'#000',flex:1}}>天气状况</Text><Text style={{color:'#888',flex:3,textAlign:'right'}}>天气信息获取失败</Text></View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                <Text style={{color:'#000',flex:1}}>地址</Text><Text style={{color:'#888',flex:3,textAlign:'right'}}>河北省，衡水市，景县...</Text></View>
                <View style={{flex:2,flexDirection:'row',justifyContent:'center',alignItems:'center',marginTop:10}}>
                    <TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                    onPress={()=>{
                        this.refs.modal1.close();
                        //this.navigate2YourEyes();
                        YourEyesModule.showYourEyesOfCar('1');
                    }}>
                        <Image resizeMode="contain" source={require('../../img/route.png')} style={{width:40,height:40}}/>
                        <Text style={{marginTop:10,color:'#888'}}>
                            轨迹回放
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>{
                                          this.refs.modal1.close();
                                          this.refs.modal2.open();
                                      }}>
                        <Image resizeMode="contain" source={require('../../img/vonitoring.png')} style={{width:40,height:40}}/>
                        <Text style={{marginTop:10,color:'#888'}}>
                            视频监控
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>{
                                          this.refs.modal1.close();
                                          this.refs.modal3.open();
                                      }}>
                        <Image resizeMode="contain" source={require('../../img/message.png')} style={{width:40,height:40}}/>
                        <Text style={{marginTop:10,color:'#888'}}>
                            短信
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>{
                                          this.refs.modal1.close();
                                          this.navigate2CarCharts();
                                      }}>
                        <Image resizeMode="contain" source={require('../../img/stats.png')} style={{width:40,height:40}}/>
                        <Text style={{marginTop:10,color:'#888'}}>
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
                        var markers = [
                        {
                            latitude: 40,
                            longitude: 110,
                            title:'位置',
                        }]
                        var center = {
                        latitude: 40,
                        longitude: 110,
                        }
                        this.setState({selectedLeafs:selectedLeafs,markers:markers,center:center,isOpen:false})
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
            <View style={{flex:1}}>
                <TouchableOpacity
                    style={{height:55,backgroundColor:'#387ef5',justifyContent:'flex-start',alignItems:'center',padding:10,flexDirection:'row'}}
                    onPress={()=>{
                    this.setState({isOpen:true})
                }}>
                    <Ionicons name={'md-search'} size={30} color="#fff"/>
                    <Text style={{fontSize:20,color:'#fff',marginLeft:5}}>选车</Text>
                </TouchableOpacity>
                    <MapView
                        width={width}
                        height={height}
                        zoom={18}
                        trafficEnabled={true}
                        mapType={MapTypes.NORMAL}
                        zoomControlsVisible={true}
                        center={this.state.center}
                        marker={this.state.marker}
                        markers={this.state.markers}
                        onMarkerClick={()=>{
                            //this.setState({carInfoVisible:true})
                            this.setState({selectedVideo:-1})
                            this.refs.modal1.open()
                        }}
                    >
                    </MapView>
                {/*汽车信息*/}
                <Modalbox
                    backdropPressToClose={true}
                    style={{ backgroundColor:"transparent"}}
                    animationType={"slide"}
                    ref={"modal1"}
                >
                    <View style={{height: 300,width:width-20, marginTop: 10,marginLeft:10,alignItems:'center',justifyContent:'center',borderWidth:1,backgroundColor:'#fff',borderRadius:10,borderColor:'#bbb'}}>
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
        );
    }

    componentDidMount() { // 获取位置

        Geolocation.getCurrentPosition().then(
            (data) => {
                this.setState({
                    zoom: 18,
                    markers: [
                        {
                            latitude: data.latitude,
                            longitude: data.longitude,
                            title: '我的位置'
                        }
                    ],
                    center: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                    }
                })
            }
        ).catch(error => {
            console.warn(error, 'error')
        })

        this.props.dispatch(getAllVehicle()).then((json)=>{
            alert(json);
        });

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
        courses:state.user.courses,
    }

    return props
}

export default connect(mapStateToProps)(Stats);
