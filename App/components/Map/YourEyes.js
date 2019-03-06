
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
    InteractionManager,
    WebView
} from 'react-native';
import {Toolbar,OPTION_SHOW,OPTION_NEVER} from 'react-native-toolbar-wrapper';
var {height, width} = Dimensions.get('window');

class YourEyes extends Component {

    goBack(){
        const { navigator } = this.props;
        if(navigator) {
            navigator.pop();
        }
    }

    constructor(props) {
        super(props);
        this.state={
            detailHtml:'http://lbsyun.baidu.com/trace/admin/manager?service_id=209740'
        }
    }

    render()
    {
        return (
            <View style={styles.container}>
                <Toolbar width={width}  title="轨迹回放" navigator={this.props.navigator} actions={[]}
                         onPress={(i)=>{
                             this.goBack()
                         }}>
                    <WebView
                        automaticallyAdjustContentInsets={true}
                        source={{uri: this.state.detailHtml}}     //网页数据源
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                    />
                </Toolbar>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

});

export default  YourEyes
