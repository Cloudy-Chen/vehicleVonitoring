
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
import Video from 'react-native-video';
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
            vedioUri:'https://media.w3.org/2010/05/sintel/trailer.mp4'
        }
    }

    render()
    {
        return (
            <View style={{flex:1}}>
                <View style={{flex:1,padding:10,justifyContent:'center',alignItems:'center',backgroundColor:'#fff'}}>
                    <Video source={ {uri:"https://media.w3.org/2010/05/sintel/trailer.mp4"}} // Looks for .mp4 file (background.mp4) in the given expansion version.
                           ref={(ref) => {
                               this.player = ref
                           }}
                           rate={1.0}                   // 0 is paused, 1 is normal.
                           volume={1.0}                 // 0 is muted, 1 is normal.
                           muted={false}                // Mutes the audio entirely.
                           paused={false}               // Pauses playback entirely.
                           resizeMode="contain"           // Fill the whole screen at aspect ratio.
                           repeat={true}                // Repeat forever.
                           onLoad={(data)=>{
                               this.state.duration=data.duration
                           }}

                           style={styles.backgroundVideo} />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    backgroundVideo: {

        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default  YourEyes
