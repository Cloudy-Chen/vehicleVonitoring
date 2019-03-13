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
import SideMenu from 'react-native-side-menu';
import TreeSelect from 'react-native-tree-select';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modalbox from 'react-native-modalbox';
import Video from 'react-native-video';
import YourEyes from '../../components/Map/YourEyes'
import VedioTest from '../../components/Map/VedioTest'
import CarCharts from '../../components/Stats/CarCharts'
import Icon from 'react-native-vector-icons/FontAwesome';
import ToolBar from '../../utils/ToolBar'

import icon_isOpen from '../../../img/car_isOpen.png'
import icon_isClose from '../../../img/car_isClose.png'
import icon_car from '../../../img/car.png'
import icon_car_ios from '../../../img/car_ios_icon.png'

var {height, width} = Dimensions.get('window');

const color_isOpen = '#36AB60';
const color_isClose = '#D81E06';
const color_car = '#8A8A8A'

class SelectCarsRN extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
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

            //驾驶信息
            driverSpeed:0,
            driverName:'获取失败',
            driverLastTime:'获取失败',
            driverCompany:'获取失败',
            driverWeather:'获取失败',
            driverAddress:'获取失败',

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

        var cars = this.props.selectedLeafs;

        // if(this.state.currentPosition==null)
        //     this.getCurrentPosition();

        var markers = this.state.markers
        var texts = this.state.texts

        var videoInfo =
            this.state.selectedVideo==-1?
                <View style={{width:width,height:300,flexDirection:'column',backgroundColor:'#fff'}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,padding:10,}}>
                            <TouchableOpacity
                                style={{backgroundColor:'#36ab60',flexDirection:'column',flex:1,justifyContent:'center',alignItems:'center'}}
                                onPress={()=>{this.setState({selectedVideo:1})}}>
                                <Image resizeMode="contain" source={require('../../../img/car_front.png')} style={{width:50,height:50}}/>
                                <Text style={{fontSize:16,color:'#fff'}}>车前</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,padding:10,}}>
                            <TouchableOpacity
                                style={{backgroundColor:'#1296db',flexDirection:'column',flex:1,justifyContent:'center',alignItems:'center'}}
                                onPress={()=>{this.setState({selectedVideo:2})}}>
                                <Image resizeMode="contain" source={require('../../../img/car_driver.png')} style={{width:50,height:50}}/>
                                <Text style={{fontSize:16,color:'#fff'}}>司机</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{flex:1,flexDirection:'row'}}>
                        <View style={{flex:1,padding:10,}}>
                            <TouchableOpacity style={{backgroundColor:'#d81e06',flexDirection:'column',flex:1,justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{this.setState({selectedVideo:3})}}>
                                <Image resizeMode="contain" source={require('../../../img/car_tunnel.png')} style={{width:50,height:50}}/>
                                <Text style={{fontSize:16,color:'#fff'}}>通道</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex:1,padding:10,}}>
                            <TouchableOpacity style={{backgroundColor:'#88147f',flexDirection:'column',flex:1,justifyContent:'center',alignItems:'center'}}
                                              onPress={()=>{this.setState({selectedVideo:4})}}>
                                <Image resizeMode="contain" source={require('../../../img/car_back.png')} style={{width:50,height:50}}/>
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

                    <TouchableOpacity
                        style={{width:width,height:270}}
                        onPress={() => this.setState({ paused: !this.state.paused })}
                    >
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
                           style={{width:width,height:300,alignItems:'center',justifyContent:'center'}} >
                    </Video>
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
                    <View style={{flex:1,flexDirection:'row'}}><Text style={{color:'#000',flex:1}}>速度</Text><Text style={{color:'#888',flex:1,textAlign:'right'}}>{this.state.driverSpeed} km/h</Text></View>
                    <View style={{flex:1,flexDirection:'row',marginLeft:10}}><Text style={{color:'#000',flex:1}}>驾驶员</Text><Text style={{color:'#888',flex:1,textAlign:'right'}}>{this.state.driverName}</Text></View>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center',borderBottomWidth:1,borderBottomColor:'#aaa'}}>
                <Text style={{color:'#000',flex:1}}>最后更新时间</Text><Text style={{color:'#888',flex:3,textAlign:'right'}}>{this.state.driverLastTime}</Text></View>
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
                        <Image resizeMode="contain" source={require('../../../img/route.png')} style={{width:40,height:40}}/>
                        <Text style={{marginTop:10,color:'#888'}}>
                            轨迹回放
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>{
                                          this.refs.modal1.close();
                                          this.refs.modal2.open();
                                          //this.navigate2VedioTest()
                                      }}>
                        <Image resizeMode="contain" source={require('../../../img/vonitoring.png')} style={{width:40,height:40}}/>
                        <Text style={{marginTop:10,color:'#888'}}>
                            视频监控
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>{
                                          this.refs.modal1.close();
                                          this.refs.modal3.open();
                                      }}>
                        <Image resizeMode="contain" source={require('../../../img/message.png')} style={{width:40,height:40}}/>
                        <Text style={{marginTop:10,color:'#888'}}>
                            短信
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1,flexDirection:'column',justifyContent:'center',alignItems:'center'}}
                                      onPress={()=>{
                                          this.refs.modal1.close();
                                          this.navigate2CarCharts();
                                      }}>
                        <Image resizeMode="contain" source={require('../../../img/stats.png')} style={{width:40,height:40}}/>
                        <Text style={{marginTop:10,color:'#888'}}>
                            统计
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>;

        return (

            <View style={{flex:1}}>
                <ToolBar title={'地图监控'}
                         onPress={()=>{this.goBack()}}/>
                <MapView
                    zoomControlsVisible={true}
                    width={width}
                    height={height-140}
                    zoom={this.state.zoom}
                    trafficEnabled={true}
                    mapType={MapTypes.NORMAL}
                    center={this.state.center}
                    onMarkerClick={(marker)=>{
                            //this.setState({carInfoVisible:true})
                            var title = marker.title;
                            var car_click = null;
                            cars.map((car)=>{
                                if(car.name==title)car_click = car;
                            })

                            car_click==null?
                            this.setState({selectedVideo:-1,driverSpeed:0,driverName:'获取失败',driverLastTime:'获取失败',
                            driverCompany:'获取失败',driverWeather:'获取失败',driverAddress:'获取失败'})
                            :
                            this.setState({selectedVideo:-1,driverSpeed:car_click.driverSpeed,driverName:car_click.driverName,driverLastTime:car_click.driverLastTime,
                            driverCompany:car_click.driverCompany,driverWeather:car_click.driverWeather,driverAddress:car_click.driverAddress})

                            this.refs.modal1.open()
                        }}
                >
                    {
                        markers!=null&&markers.length>0?
                            markers.map(marker => (
                                <Overlay.Marker
                                    title={marker.title}
                                    location={marker.location}
                                    icon={icon_car_ios}
                                    rotate={marker.rotate}
                                />
                            )):null
                    }
                    {
                        texts != null && texts.length > 0 ?
                            texts.map(text => (
                                <Overlay.Text
                                    location={text.location}
                                    text={text.text}
                                    fontSize={40}
                                    fontColor={text.fontColor}
                                    bgColor={'#FFFFFF'}
                                    rotate={text.rotate}
                                />
                            )) : null
                    }
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
        );
    }

    componentDidMount() {

        var selectedLeafs = this.props.selectedLeafs;
        this.showSelectedCarsOnMap(selectedLeafs);
    }

    getCurrentPosition(){
        Geolocation.getCurrentPosition().then(
            (data) => {
                this.setState({
                    zoom: 18,
                    center: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                    },
                    markers:[{
                        location: {
                            latitude: data.latitude,
                            longitude: data.longitude,
                        },
                    }],
                    texts:[{
                        location: {
                            latitude: data.latitude,
                            longitude: data.longitude,
                        },
                        text:'我的位置',
                        fontColor:'#8A8A8A'
                    }],
                    currentPosition:{
                        location: {
                            latitude: data.latitude,
                            longitude: data.longitude,
                        },}
                })
            }
        ).catch(error => {
            console.warn(error, 'error')
        })
    }

    showSelectedCarsOnMap(selectedLeafs){
        //在地图上显示选中的车
        //自适配移动到中心点（原生？）

        var cars = selectedLeafs;
        var markers = [];
        var texts = [];
        var center = null;//中心点暂时取某个车位置

        cars.map((car,i)=>{

            var icon = null;
            var color = null;

            switch (car.flag){
                //1表示开始2表示关闭3表示未启动
                case 1:icon = icon_isOpen;color=color_isOpen;break;
                case 2:icon = icon_isClose;color=color_isClose;break;
                case 0:icon = icon_car;color=color_car;break;
            }

            var marker =
                {
                    title:car.name,
                    location: {
                        latitude: car.latitude,
                        longitude: car.longitude,
                    },
                    rotate: car.rotate,
                    icon:icon,
                }
            var text =
                {
                    text:car.name,
                    location: {
                        latitude: car.latitude,
                        longitude: car.longitude,
                    },
                    rotate:car.rotate,
                    fontColor:color,
                }

            markers.push(marker)
            texts.push(text)
            center = {
                latitude: car.latitude,
                longitude: car.longitude,
            }
        })

        this.setState({markers:markers,texts:texts,zoom:10,center:center})

    }
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    toolbar: {
        backgroundColor: '#eee',
        height: 56,
    },
    modalContainer:{
        flex:1,
        justifyContent: 'center',
    },
    modalBackgroundStyle:{
        backgroundColor:'rgba(0,0,0,0.3)'
    },
    loader: {
        marginTop: 10
    },
});

const mapStateToProps = (state, ownProps) => {

    const props = {
        courses:state.user.courses,
    }

    return props
}

export default connect(mapStateToProps)(SelectCarsRN);
