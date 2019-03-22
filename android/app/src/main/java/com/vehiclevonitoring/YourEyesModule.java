package com.vehiclevonitoring;

import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;

public class YourEyesModule extends ReactContextBaseJavaModule {

    static int invokeCount=0;
    private ReactContext reactContext;
    public WritableArray list = Arguments.createArray();
    WritableMap res = Arguments.createMap();

    public YourEyesModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "YourEyesModule";
    }

    @ReactMethod
    public static void newThread()
    {
        new Thread(new Runnable() {
            @Override
            public void run() {
                Log.v("bridge",invokeCount+++"");
            }
        }).start();
    }

    @ReactMethod
    public void showYourEyesOfCar(String CarNo){

        Intent intent=new Intent();
        intent.setClass(getCurrentActivity(), YourEyesActivity.class);

        intent.putExtra("CarNo", CarNo);

        getCurrentActivity().startActivity(intent);

    }


}

