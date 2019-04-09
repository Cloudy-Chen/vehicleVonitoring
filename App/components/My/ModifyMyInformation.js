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
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet';
import DatePicker from 'react-native-datepicker';
import ToolBar from '../../utils/ToolBar'

var {height, width} = Dimensions.get('window');

const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

class ModifyMyInformation extends Component {

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

            perName:this.props.personInfo.perName,
            perGender:this.props.personInfo.genderCode,
            perBirth:this.props.personInfo.birthday,
            perCop:this.props.personInfo.companyName,
            perAddress:this.props.personInfo.address,
            perPhone:this.props.personInfo.mobilePhone,

            perGenderOption:['取消','男','女'],
        }
    }

    show(actionSheet) {
        this[actionSheet].show();
    }

    //性别设置
    _handlePress1(index) {
        if(index>0){
            var perGender = index;
            this.setState({perGender:perGender});
        }
    }

    render() {

        var personInfo = this.props.personInfo;

        var perGender = this.state.perGender;
        var sex = perGender==1?'男':'女';//男1女2

        return (
            <View style={styles.container}>
                <ToolBar title={'我的资料'}
                         onPress={()=>{this.goBack()}}/>
                    <View style={{flexDirection:'column',backgroundColor:'#fff'}}>

                                <View style={{height:30,width:width,justifyContent:'center',textAlign:'left',backgroundColor:'#eee',paddingHorizontal:10}}>
                                    <Text style={{color:'#666',fontSize:13}}>基本信息</Text>
                                </View>

                                {/*真实姓名*/}
                                <View style={{flexDirection:'row',height:40,width:width,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}>
                                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                        <Text style={{color:'#555',fontSize:14}}>
                                            真实姓名
                                        </Text>
                                    </View>
                                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                        <TextInput
                                            placeholderTextColor='#888'
                                            style={{fontSize:14,color:'#222',justifyContent:'flex-end',textAlign:'right',flex:3,padding:0}}
                                            placeholder={this.props.perName}
                                            value={this.state.perName}
                                            onChangeText={
                                            (value)=>{
                                                this.setState({perName:value})
                                            }}
                                            underlineColorAndroid={'transparent'}
                                        />
                                    </View>
                                </View>

                            {/*性别*/}
                            <TouchableOpacity style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}
                                              onPress={()=>{
                                              this.show('actionSheet1');
                                              }}
                            >
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontSize:14}}>
                                        性别
                                    </Text>
                                </View>
                                <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    <Text style={{color:'#444',fontSize:15}}>{sex}</Text>
                                    <ActionSheet
                                        ref={(o) => {
                                        this.actionSheet1 = o;
                                    }}
                                        title="请选择性别"
                                        options={this.state.perGenderOption}
                                        cancelButtonIndex={CANCEL_INDEX}
                                        destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                        onPress={
                                        (data)=>{
                                            this._handlePress1(data); }
                                    }
                                    />
                                </View>
                            </TouchableOpacity>


                                {/*出生日期*/}
                                <View style={{flexDirection:'row',height:40,width:width,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}>
                                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                        <Text style={{color:'#555',fontSize:14}}>
                                            出生日期
                                        </Text>
                                    </View>
                                    <View style={{flex:2,marginLeft:30,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                        <Text style={{color:'#444',fontSize:15}}>{this.state.perBirth}</Text>
                                    </View>

                                    <View style={{height:40,marginRight:0,flexDirection:'row',alignItems:'center'}}>
                                        <DatePicker
                                            style={{width:40,marginLeft:0,borderWidth:0,justifyContent:'center',alignItems:'center'}}
                                            customStyles={{
                                        placeholderText:{color:'transparent',fontSize:12},
                                        dateInput:{height:30,borderWidth:0},
                                        dateTouchBody:{marginRight:0,height:25,borderWidth:0},
                                    }}
                                            mode="date"
                                            data={this.state.perBirth}
                                            placeholder="选择"
                                            format="YYYY-MM-DD"
                                            minDate="2019-03-01"
                                            maxDate="2019-04-01"
                                            confirmBtnText="确认"
                                            cancelBtnText="取消"
                                            showIcon={true}
                                            iconComponent={
                                        <View style={{height:40,width:40,justifyContent:'center',alignItems:'center'}}>
                                            <Icon name={'calendar'} size={20} color="#888"/>
                                        </View>}
                                            onDateChange={(date) => {
                                        this.setState({perBirth:date})
                                    }}
                                        />
                                    </View>
                                </View>

                                {/*手机*/}
                                <View style={{flexDirection:'row',height:40,width:width,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}>
                                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                        <Text style={{color:'#555',fontSize:14}}>
                                            手机
                                        </Text>
                                    </View>
                                    <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                        <TextInput
                                            placeholderTextColor='#888'
                                            style={{fontSize:14,color:'#222',justifyContent:'flex-end',textAlign:'right',flex:3,padding:0}}
                                            placeholder={
                                            this.props.perPhone
                                        }
                                            value={this.state.perPhone}
                                            onChangeText={
                                            (value)=>{
                                                this.setState({perPhone:value})
                                            }}
                                            underlineColorAndroid={'transparent'}
                                        />
                                    </View>
                                </View>

                            {/*公司*/}
                            <View style={{flexDirection:'row',height:40,width:width,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontSize:14}}>
                                        公司
                                    </Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    <TextInput
                                        placeholderTextColor='#888'
                                        style={{fontSize:14,color:'#222',justifyContent:'flex-end',textAlign:'right',flex:3,padding:0}}
                                        placeholder={
                                            this.props.perCop
                                        }
                                        value={this.state.perCop}
                                        onChangeText={
                                            (value)=>{
                                                this.setState({perCop:value})
                                            }}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                            </View>

                            {/*地址*/}
                            <View style={{flexDirection:'row',height:40,width:width,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee'}}>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{color:'#555',fontSize:14}}>
                                        地址
                                    </Text>
                                </View>
                                <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                    <TextInput
                                        placeholderTextColor='#888'
                                        style={{fontSize:14,color:'#222',justifyContent:'flex-end',textAlign:'right',flex:3,padding:0}}
                                        placeholder={
                                            personInfo.address
                                        }
                                        value={this.state.perAddress}
                                        onChangeText={
                                            (value)=>{
                                                this.setState({perAddress:value})
                                            }}
                                        underlineColorAndroid={'transparent'}
                                    />
                                </View>
                            </View>
                    </View>

                    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity style={{width:200,height:45,backgroundColor:'#387ef5',justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:18,color:'#fff'}}>提交</Text>
                    </TouchableOpacity>
                    </View>

            </View>
        );
    }
}

var styles = StyleSheet.create({

    container: {
        flex: 1,backgroundColor:'#eee'
    },
    toolbar: {
        backgroundColor: '#eee',
        height: 56,
    }

});

const mapStateToProps = (state, ownProps) => {

    const props = {
        personInfo:state.user.personInfo
    }

    return props
}

export default connect(mapStateToProps)(ModifyMyInformation);
