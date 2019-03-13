
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
var {height, width} = Dimensions.get('window');
import ToolBar from '../../utils/ToolBar'

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
        }
    }

    render()
    {
        return (
            <View style={styles.container}>
                <ToolBar title={'轨迹回放'}
                         onPress={()=>{
                             this.goBack()
                         }}/>
                    <WebView
                        style={{marginBottom:15}}
                        automaticallyAdjustContentInsets={true}
                        source={require('../Html/trajectory.html')}     //网页数据源
                        javaScriptEnabled={true}
                        domStorageEnabled={true}
                        startInLoadingState={true}
                    />
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
