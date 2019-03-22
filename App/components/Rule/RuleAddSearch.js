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
import ToolBar from '../../utils/ToolBar'

var {height, width} = Dimensions.get('window');

class RuleAddSearch extends Component {

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

            all_Rule:
            [
                {carId:1,carNo:'鲁NA7813',carAddress:'山东省济南市',carTime:'2018-03-08 12:58:30'},
                {carId:2,carNo:'鲁NA3356',carAddress:'安徽省合肥市',carTime:'2018-03-09 14:55:55'},
                {carId:3,carNo:'鲁NA1530',carAddress:'安徽省合肥市',carTime:'2018-03-10 08:23:00'},
                {carId:4,carNo:'鲁NA2336',carAddress:'山东省威海市',carTime:'2018-03-11 23:00:01'}
            ],
            search_Rule:[
                {carId:1,carNo:'鲁NA7813',carAddress:'山东省济南市',carTime:'2018-03-08 12:58:30'},
                {carId:2,carNo:'鲁NA3356',carAddress:'安徽省合肥市',carTime:'2018-03-09 14:55:55'},
                {carId:3,carNo:'鲁NA1530',carAddress:'安徽省合肥市',carTime:'2018-03-10 08:23:00'},
                {carId:4,carNo:'鲁NA2336',carAddress:'山东省威海市',carTime:'2018-03-11 23:00:01'}
            ],
        }
    }

    renderRow(rowData,sectionId,rowId){

        return (
            <View style={{height:45,width:width,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:10}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:3}}>
                    <Text style={{fontSize:16,color:'#888'}}>{rowData.carNo}</Text></View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:0}}>
                    <Text style={{fontSize:14,color:'#888'}} >{rowData.carTime}</Text></View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:3}}>
                    <Text style={{fontSize:16,color:'#888'}}>{rowData.carAddress}</Text></View>
            </View>
        );
    }

    render() {

        var rule=this.state.search_Rule;
        var ruleList = null;

        if(rule!=null && rule!=undefined && rule.length>0) {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            ruleList = (
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(rule)}
                    renderRow={this.renderRow.bind(this)}
                />
            );
        }

        return (
            <View style={{flex:1,backgroundColor:'transparent'}}>

                <ToolBar title={'违章查询'}
                         onPress={()=>{
                             this.goBack();
                         }}/>
                <View style={{flex:5,backgroundColor:'#fff'}}>
                    <View style={{height:45,width:width,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:10,borderBottomWidth:1,borderColor:'#888'}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:16,color:'#888'}}>车牌号</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:16,color:'#888'}}>违章时间</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:16,color:'#888'}}>违章地址</Text></View>
                    </View>
                    {ruleList}
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

export default connect(mapStateToProps)(RuleAddSearch);
