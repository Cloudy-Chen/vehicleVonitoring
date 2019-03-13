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
import {SearchBar} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import ToolBar from '../../utils/ToolBar'

var {height, width} = Dimensions.get('window');

class ServerPay extends Component {

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

            pay:
            [   {carNo:'鲁NA7813',pay:'10',carId:1},
                {carNo:'鲁NA3356',pay:'20',carId:2},
                {carNo:'鲁NA1530',pay:'50',carId:3},
                {carNo:'鲁NA2336',pay:'700',carId:4},
                {carNo:'鲁NA7813',pay:'10',carId:5},
                {carNo:'鲁NA3356',pay:'20',carId:6},
                {carNo:'鲁NA1530',pay:'50',carId:7},
                {carNo:'鲁NA2336',pay:'700',carId:8},
                {carNo:'鲁NA7813',pay:'10',carId:9},
                {carNo:'鲁NA3356',pay:'20',carId:10},
                {carNo:'鲁NA1530',pay:'50',carId:11},
                {carNo:'鲁NA2336',pay:'700',carId:12},
            ],
            selectedPay:[],
            allPay:500,
        }
    }

    addItem = item => {
        this.setState({selectedPay: [...this.state.selectedPay, item]})
    };

    removeItem = removedItem => {
        this.setState({
            selectedPay: this.state.selectedPay.filter(item => {
                if (item.carId!== removedItem.carId)
                    return item;
            })
        });
    };

    renderRow(rowData,sectionId,rowId){

        var selectedPay = this.state.selectedPay;
        var isSelected = false;

        selectedPay.map((pay,i)=>{
            if(pay.carId==rowData.carId)isSelected = true;
        })

        return (
            <View style={{height:45,width:width,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:10}}>
                {
                    isSelected?
                    <TouchableOpacity
                        style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}
                        onPress={()=>{
                            this.removeItem(rowData)
                        }}>
                        <Icon name={'square-o'} size={25}/></TouchableOpacity>
                        :
                    <TouchableOpacity
                        style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}
                        onPress={()=>{
                            this.addItem(rowData)
                        }}>
                        <Icon name={'check-square-o'} size={25}/></TouchableOpacity>
                }
                <View style={{flex:5,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                    <Text style={{fontSize:16,color:'#888'}}>{rowData.carNo}</Text></View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                    <Text style={{fontSize:16,color:'#888'}}>¥ {rowData.pay}</Text></View>
            </View>
        );
    }

    render() {

        var pay=this.state.pay;
        var payList = null;

        if(pay!=null && pay!=undefined && pay.length>0) {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            payList = (
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(pay)}
                    renderRow={this.renderRow.bind(this)}
                />
            );
        }

        return (
            <View style={{flex:1,backgroundColor:'transparent'}}>

                <ToolBar title={'服务费缴纳'}
                         onPress={()=>{this.goBack()}}/>

                <View style={{flex:5,backgroundColor:'#fff'}}>
                    <View style={{height:45,width:width,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:10,borderBottomWidth:1,borderColor:'#888'}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:16,color:'#888'}}></Text></View>
                        <View style={{flex:5,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:16,color:'#888'}}>车牌号</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:16,color:'#888'}}>金额</Text></View>
                    </View>
                    {payList}
                </View>
                <View style={{width:width,height:56,marginBottom:10,backgroundColor:'#fff',borderTopWidth:1,borderTopColor:'#888',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <View style={{flex:4,alignItems:'center',justifyContent:'flex-start',flexDirection:'row',padding:10}}>
                <Text style={{fontSize:16}}>合计：</Text>
                <Text style={{fontSize:16}}>¥ {this.state.allPay}</Text>
                </View>
                <TouchableOpacity style={{flex:1,alignItems:'center',justifyContent:'center',backgroundColor:'#387ef5',padding:5,marginRight:5}}>
                    <Text style={{color:'#fff',fontSize:16}}>支付</Text>
                </TouchableOpacity>
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

export default connect(mapStateToProps)(ServerPay);
