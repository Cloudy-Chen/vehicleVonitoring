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
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modalbox from 'react-native-modalbox';

var {height, width} = Dimensions.get('window');

class Notification extends Component {

    constructor(props) {
        super(props);
        this.state = {
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),

            notification:
            [   {carNo:'鲁NA7813',type:'超速',time:'2018-03-08 12:58:30'},
                {carNo:'鲁NA3356',type:'超速',time:'2018-03-09 14:55:55'},
                {carNo:'鲁NA1530',type:'超速',time:'2018-03-10 08:23:00'},
                {carNo:'鲁NA2336',type:'超速',time:'2018-03-11 23:00:01'}
            ]
        }
    }

    renderRow(rowData,sectionId,rowId){

        return (
            <View style={{height:45,width:width,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:10}}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                    <Text style={{fontSize:16,color:'#888'}}>{rowData.carNo}</Text></View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                    <Text style={{fontSize:16,color:'#888'}}>{rowData.type}</Text></View>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                    <Text style={{fontSize:16,color:'#888'}}>{rowData.time}</Text></View>
                <View style={{flex:1,padding:10,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                    <TouchableOpacity
                        style={{backgroundColor:'#387ef5',paddingVertical:5,paddingHorizontal:15,borderRadius:5}}
                        onPress={()=>{
                            this.refs.modal1.open();
                        }}><Text style={{color:'#fff',fontSize:14}}>处理</Text></TouchableOpacity></View>
            </View>
        );
    }

    render() {

        var notification=this.state.notification;
        var notificationList = null;

        if(notification!=null && notification!=undefined && notification.length>0) {
            var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            notificationList = (
                <ListView
                    automaticallyAdjustContentInsets={false}
                    dataSource={ds.cloneWithRows(notification)}
                    renderRow={this.renderRow.bind(this)}
                />
            );
        }

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

        return (
            <View style={{flex:1,backgroundColor:'transparent'}}>

                <View style={{height:48,width:width,backgroundColor:'#387ef5',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#fff',fontSize:20}}>实时报警</Text>
                </View>
                <View style={{flex:5,backgroundColor:'#fff'}}>
                    <View style={{height:45,width:width,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingHorizontal:10,borderBottomWidth:1,borderColor:'#888'}}>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:16,color:'#888'}}>车牌号</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:16,color:'#888'}}>报警类型</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:16,color:'#888'}}>时间</Text></View>
                        <View style={{flex:1,justifyContent:'center',alignItems:'center',paddingVertical:10}}>
                            <Text style={{fontSize:16,color:'#888'}}>操作</Text></View>
                    </View>
                    {notificationList}
                </View>

                {/*短信*/}
                <Modalbox
                    backdropPressToClose={true}
                    style={{ marginRight: 10,borderRadius: 10,borderWidth: 1,width: width,height: 350,justifyContent: 'center', alignItems: 'center',backgroundColor: '#fff'}}
                    animationType={"slide"}
                    ref={"modal1"}
                    position={"bottom"}
                >
                    {messageInfo}
                </Modalbox>
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

export default connect(mapStateToProps)(Notification);
