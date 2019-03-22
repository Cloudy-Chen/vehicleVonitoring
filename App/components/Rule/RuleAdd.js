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
import Icon from 'react-native-vector-icons/FontAwesome';
import ActionSheet from 'react-native-actionsheet';

var {height, width} = Dimensions.get('window');
const CANCEL_INDEX = 0;
const DESTRUCTIVE_INDEX = 1;

class RuleAdd extends Component {

    goBack() {
        const {navigator} = this.props;
        if (navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            doingFetch: false,
            isRefreshing: false,
            fadeAnim: new Animated.Value(1),

            carNo:'',
            carType:-1,//-1请选择类型1大型汽车号牌2挂车号牌3小型车号牌
            carTypeOptions:['取消','大型汽车号牌','挂车号牌','小型车号牌'],
        }
    }

        show(actionSheet)
        {
            this[actionSheet].show();
        }

        //车辆类型设置
        _handlePress1(index)
        {
            if (index > 0) {
                var carType = index;
                this.setState({carType: carType});
            }
        }

        render()
        {

            var carType = this.state.carType;
            var carTypeName = '请选择类型';
            switch(carType){
                case 1:carTypeName='大型汽车号牌';break;
                case 2:carTypeName='挂车号牌';break;
                case 3:carTypeName='小型车号牌';break;
            }

            return (
                <View style={styles.container}>
                    <ToolBar title={'违章加车'}
                             onPress={()=>{this.goBack()}}/>
                    <View style={{flex:1,flexDirection:'column',backgroundColor:'#eee'}}>

                        {/*车牌号*/}
                        <View
                            style={{flexDirection:'row',height:40,width:width,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee',backgroundColor:'#fff'}}>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontSize:14}}>
                                    车牌号
                                </Text>
                            </View>
                            <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                <TextInput
                                    placeholderTextColor='#888'
                                    style={{fontSize:14,color:'#222',justifyContent:'flex-end',textAlign:'right',flex:3,padding:0}}
                                    placeholder={'车牌号'}
                                    value={this.state.carNo}
                                    onChangeText={
                                            (value)=>{
                                                this.setState({carNo:value})
                                            }}
                                    underlineColorAndroid={'transparent'}
                                />
                            </View>
                        </View>

                        {/*车辆类型*/}
                        <TouchableOpacity
                            style={{flexDirection:'row',padding:12,paddingHorizontal:10,borderBottomWidth:1,borderColor:'#eee',backgroundColor:'#fff'}}
                            onPress={()=>{
                                              this.show('actionSheet1');
                                              }}
                        >
                            <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                                <Text style={{color:'#555',fontSize:14}}>
                                    车辆类型
                                </Text>
                            </View>
                            <View style={{flex:2,flexDirection:'row',alignItems:'center',justifyContent:'flex-end'}}>
                                <Text style={{color:'#444',fontSize:15}}>{carTypeName}</Text>
                                <ActionSheet
                                    ref={(o) => {
                                        this.actionSheet1 = o;
                                    }}
                                    title="请选择车辆类型"
                                    options={this.state.carTypeOptions}
                                    cancelButtonIndex={CANCEL_INDEX}
                                    destructiveButtonIndex={DESTRUCTIVE_INDEX}
                                    onPress={
                                        (data)=>{
                                            this._handlePress1(data); }
                                    }
                                />
                            </View>
                        </TouchableOpacity>

                        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity style={{width:200,height:45,backgroundColor:'#387ef5',justifyContent:'center',alignItems:'center'}}>
                                <Text style={{fontSize:18,color:'#fff'}}>添加</Text>
                            </TouchableOpacity>
                        </View>

                </View>
                </View>
            );
        }
}

var styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor:'#eee'
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

export default connect(mapStateToProps)(RuleAdd);
