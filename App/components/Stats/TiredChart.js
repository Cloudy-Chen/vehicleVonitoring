import React, { Component } from 'react'import {    StyleSheet,    View,    Text,    Platform,    Image,    TouchableOpacity,    Animated,    Dimensions,    ListView,    ScrollView,} from 'react-native'import Echarts from 'native-echarts';const {height,width} = Dimensions.get('window');export default class TiredChart extends Component {    constructor(props){        super(props);        this.state = {            speedStats:[]    }    }    renderRow(rowData,sectionId,rowId){        var month = parseInt(rowId)+1;        return (            <View style={{height:45,width:width,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:50}}>                <View style={{height:45,width:120,justifyContent:'center',alignItems:'center',borderWidth:1,borderRightWidth:0,borderTopWidth:0,borderColor:'#888',paddingVertical:10}}>                    <Text style={{fontSize:16,color:'#888'}}>{month}</Text></View>                <View style={{height:45,width:120,justifyContent:'center',alignItems:'center',borderWidth:1,borderTopWidth:0,borderColor:'#888',paddingVertical:10}}>                    <Text style={{fontSize:16,color:'#888'}}>{rowData}</Text></View>            </View>        );    }    render(){        var selectedStats=[1, 2, 1, 3, 3, 0, 2, 2, 1, 3, 3 ,0]        var selectedStatsList = null;        if(selectedStats!=null && selectedStats!=undefined && selectedStats.length>0) {            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});            selectedStatsList = (                <ListView                    automaticallyAdjustContentInsets={false}                    dataSource={ds.cloneWithRows(selectedStats)}                    renderRow={this.renderRow.bind(this)}                />            );        }        var option = {            title: {                text:'各月超速统计汇总'            },            tooltip: {trigger:'axis'},            xAxis: {                boundaryGap:true,                type : 'category',                name : '月',                data: ['1','2','3','4','5','6','7','8','9','10','11','12'],            },            yAxis: {                name:'总超速（次）',                type:'value'            },            color:['#fc6254'],            series: [                {name:'次数',type:'line',data:[0,1,3,1,2,2,0,0,2,2,1,2]},            ]        }        return(                <ScrollView style={{flex:1}}>                <Echarts                        option={option}                        height={300}                        width={width}                 />                    <View style={{flex:1,marginTop:10,alignItems:'center',justifyContent:'center'}}>                        <View style={{height:45,width:width,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:50}}>                            <View style={{height:45,width:120,justifyContent:'center',alignItems:'center',borderWidth:1,borderRightWidth:0,borderColor:'#888',paddingVertical:10}}>                                <Text style={{fontSize:16,color:'#888'}}>月份</Text></View>                            <View style={{height:45,width:120,justifyContent:'center',alignItems:'center',borderWidth:1,borderColor:'#888',paddingVertical:10}}>                                <Text style={{fontSize:16,color:'#888'}}>次数</Text></View>                        </View>                {selectedStatsList}                    </View>                </ScrollView>        )    }    componentDidMount(){        var speedStatus = [1, 2, 1, 3, 3, 0, 2, 2, 1, 3, 3 ,0]        this.setState({speedStatus:speedStatus})    }}