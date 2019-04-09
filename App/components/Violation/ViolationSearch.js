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
import Proxy from '../../proxy/Proxy'
import Config from '../../../config';

var {height, width} = Dimensions.get('window');

class ViolationSearch extends Component {

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

            allViolationInfo: [],
            searchViolationInfo:[],
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

        var searchViolationInfo=this.state.searchViolationInfo;
        var searchViolationInfoList = null;

        if(searchViolationInfo!=null && searchViolationInfo!=undefined && searchViolationInfo.length>0) {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            searchViolationInfoList = (
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(searchViolationInfo)}
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
                    <SearchBar
                        lightTheme
                        onChangeText={
                            //模糊查询
                            (text)=>{
                                this.searchByText(text)
                            }
                        }
                        placeholder='搜索' />
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
                    {searchViolationInfoList}
                </View>
            </View>
        );
    }

    searchByText(text){
        var searchViolationInfo = [];
        var allViolationInfo = this.state.allViolationInfo;
        allViolationInfo.map((violation,i)=>{
            if(violation.plateNum.indexOf(text)!=-1){
                searchViolationInfo.push(violation)
            }
        })
        this.setState({searchViolationInfo:searchViolationInfo})
    }

    componentDidMount(){

        Proxy.postes({
            url: Config.server + '/func/web/getAllViolationInfo',
            headers: {
                'Content-Type': 'application/json',
            },
            body: {
            }
        }).then((json)=>{
            if(json.re==1) {
                var violationInfo = json.data
                this.setState({searchViolationInfo:violationInfo,allViolationInfo:violationInfo})
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

export default connect(mapStateToProps)(ViolationSearch);
