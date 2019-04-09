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
import Proxy from '../../proxy/Proxy'
import Config from '../../../config';
import Modalbox from 'react-native-modalbox';
import TreeSelect from 'react-native-tree-select';

var {height, width} = Dimensions.get('window');

class MonitorViolationSearch extends Component {

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

            monitorViolationInfo:[],
            vehicleInfo:[],
            selectedVehicleInfo:[],
        }
    }

    renderRow(rowData,sectionId,rowId){

        return (
            <View style={{height:45,width:width,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:10}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:3}}>
                    <Text style={{fontSize:14,color:'#888'}}>{rowData.plateNum}</Text></View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:3}}>
                    <Text style={{fontSize:14,color:'#888'}}>{rowData.violationContent}</Text></View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:0}}>
                    <Text style={{fontSize:14,color:'#888'}} >{rowData.violationTime}</Text></View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:3}}>
                    <Text style={{fontSize:14,color:'#888'}}>{rowData.location}</Text></View>
            </View>
        );
    }

    render() {

        // 违规列表
        var monitorViolationInfo=this.state.monitorViolationInfo;
        var monitorViolationInfoList = null;

        if(monitorViolationInfo!=null && monitorViolationInfo!=undefined && monitorViolationInfo.length>0) {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            monitorViolationInfoList = (
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(monitorViolationInfo)}
                    renderRow={this.renderRow.bind(this)}
                />
            );
        }

        // 车辆树状图
        var vehicleInfo = this.state.vehicleInfo;
        var selectedVehicleInfo = this.state.selectedVehicleInfo;

        var vehicleCheckView=
            vehicleInfo!=null&&vehicleInfo!=undefined&&vehicleInfo.length>0?
                <View style={{backgroundColor:'#fff',flex:1,paddingTop:10,flexDirection:'column'}}>
                    <TreeSelect
                        data={vehicleInfo}
                        openIds={['A01']}
                        isShowTreeId={false}
                        itemStyle={{fontSize: 16}}
                        selectedItemStyle={{fontSize: 16}}
                        selectedLeafs={selectedVehicleInfo}
                        onPress={(selectedLeafs)=>{
                        this.AddSelectedCars(selectedLeafs)
                    }}/>
                </View>:
                <View style={{backgroundColor:'#fff',flex:1,paddingTop:10}}/>;

        return (
            <View style={{flex:1,backgroundColor:'transparent'}}>

                <ToolBar title={'违章查询'}
                         isAdd={'true'}
                         onPress={()=>{
                             this.goBack();
                         }}
                         onAdd={()=>{
                             this.refs.modal.open();
                         }}
                />
                <View style={{flex:5,backgroundColor:'#fff'}}>
                    <View style={{height:45,width:width,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:10,borderBottomWidth:1,borderColor:'#888'}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:14,color:'#333'}}>车牌号</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:14,color:'#333'}}>违章内容</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:14,color:'#333'}}>违章时间</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:14,color:'#333'}}>违章地址</Text></View>
                    </View>
                    {monitorViolationInfoList}
                </View>

                {/*可选择车辆信息*/}
                <Modalbox
                    backdropPressToClose={true}
                    style={{ padding: 10,borderRadius: 10,borderWidth: 1,width: width,height: width,justifyContent: 'center', alignItems: 'center',backgroundColor: '#fff'}}
                    animationType={"slide"}
                    ref={"modal"}
                    position={"bottom"}
                >
                    {vehicleCheckView}
                </Modalbox>

            </View>
        );
    }

    componentDidMount(){
        this.getAllVehicleBaeInfo();
        this.getAllViolationInfo();
    }

    getAllViolationInfo(){
        Proxy.postes({
            url: Config.server + '/func/web/getMonitorVehicleViolationInfo',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
            }
        }).then((json)=>{
            if(json.re==1) {
                var monitorViolationInfo = json.data
                this.setState({monitorViolationInfo:monitorViolationInfo})
            }
        }).catch((e)=>{
        })
    }

    getAllVehicleBaeInfo(){
        Proxy.postes({
            url: Config.server + '/func/web/getAllVehicleFormList',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
            }
        }).then((json)=>{
            if(json.re==1) {
                var vehicleInfo = json.data

                Proxy.postes({
                    url: Config.server + '/func/web/getMonitorVehicleFormList',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: {
                    }
                }).then((json)=>{
                    if(json.re==1) {
                        var selectedVehicleInfo = json.data
                        this.setState({vehicleInfo:vehicleInfo,selectedVehicleInfo:selectedVehicleInfo})
                    }
                }).catch((e)=>{
                })

            }
        }).catch((e)=>{
        })
    }

    AddSelectedCars(selectedCars){
        this.refs.modal.close();

        var selectedIds = [];

        if(selectedCars!=null && selectedCars!=undefined && selectedCars.length!=0)
        selectedCars.map((car,i)=>{
            selectedIds.push(car.vehicleId)
        })

        Proxy.postes({
            url: Config.server + '/func/web/addMonitorVehicleByPlateNum',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
                selectedIds:selectedIds
            }
        }).then((json)=>{
            if(json.re==1) {
                this.setState({selectedVehicleInfo:selectedCars})
                this.getAllViolationInfo()
            }
        }).catch((e)=>{
        })

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

export default connect(mapStateToProps)(MonitorViolationSearch);
