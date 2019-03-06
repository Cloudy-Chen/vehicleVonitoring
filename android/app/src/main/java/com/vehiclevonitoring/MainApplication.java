package com.vehiclevonitoring;

import android.app.Application;
import android.app.Notification;
import android.content.Context;
import android.content.SharedPreferences;
import android.util.DisplayMetrics;

import com.baidu.mapapi.SDKInitializer;
import com.baidu.trace.LBSTraceClient;
import com.baidu.trace.Trace;
import com.baidu.trace.api.entity.LocRequest;
import com.baidu.trace.model.BaseRequest;
import com.baidu.trace.model.OnCustomAttributeListener;
import com.facebook.react.ReactApplication;
import com.brentvatne.react.ReactVideoPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import br.com.classapp.RNSensitiveInfo.RNSensitiveInfoPackage;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.vehiclevonitoring.reactPackage.AnExampleReactPackage;
import com.vehiclevonitoring.track.model.ItemInfo;
import com.vehiclevonitoring.track.utils.CommonUtil;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;

public class MainApplication extends Application implements ReactApplication {

  //百度鹰眼导航
  private AtomicInteger mSequenceGenerator = new AtomicInteger();

  private LocRequest locRequest = null;

  private Notification notification = null;

  public Context mContext = null;

  public List<ItemInfo> itemInfos = new ArrayList<>();

  public SharedPreferences trackConf = null;

  /**
   * 轨迹客户端
   */
  public LBSTraceClient mClient = null;

  /**
   * 轨迹服务
   */
  public Trace mTrace = null;

  /**
   * 轨迹服务ID
   */
  public long serviceId = 209740;

  /**
   * Entity标识
   */
  public String entityName = "myTrace";

  public boolean isRegisterReceiver = false;

  /**
   * 服务是否开启标识
   */
  public boolean isTraceStarted = false;

  /**
   * 采集是否开启标识
   */
  public boolean isGatherStarted = false;

  public static int screenWidth = 0;

  public static int screenHeight = 0;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactVideoPackage(),
            new VectorIconsPackage(),
            new RNSensitiveInfoPackage(),
              new BaiduMapPackage(getApplicationContext()),
              new AnExampleReactPackage()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);

    mContext = getApplicationContext();
    entityName = CommonUtil.getImei(this);

    // 若为创建独立进程，则不初始化成员变量
    if ("com.baidu.track:remote".equals(CommonUtil.getCurProcessName(mContext))) {
      return;
    }
    getScreenSize();
    SDKInitializer.initialize(mContext);
    mClient = new LBSTraceClient(mContext);
    mTrace = new Trace(serviceId, entityName);
    mTrace.setNotification(notification);

    trackConf = getSharedPreferences("track_conf", MODE_PRIVATE);
    locRequest = new LocRequest(serviceId);

    mClient.setOnCustomAttributeListener(new OnCustomAttributeListener() {
      @Override
      public Map<String, String> onTrackAttributeCallback() {
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", "value2");
        return map;
      }

      @Override
      public Map<String, String> onTrackAttributeCallback(long locTime) {
        System.out.println("onTrackAttributeCallback, locTime : " + locTime);
        Map<String, String> map = new HashMap<>();
        map.put("key1", "value1");
        map.put("key2", "value2");
        return map;
      }
    });

    clearTraceStatus();
  }

  /**
   * 获取屏幕尺寸
   */
  private void getScreenSize() {
    DisplayMetrics dm = getResources().getDisplayMetrics();
    screenHeight = dm.heightPixels;
    screenWidth = dm.widthPixels;
  }

  /**
   * 清除Trace状态：初始化app时，判断上次是正常停止服务还是强制杀死进程，根据trackConf中是否有is_trace_started字段进行判断。
   * <p>
   * 停止服务成功后，会将该字段清除；若未清除，表明为非正常停止服务。
   */
  private void clearTraceStatus() {
    if (trackConf.contains("is_trace_started") || trackConf.contains("is_gather_started")) {
      SharedPreferences.Editor editor = trackConf.edit();
      editor.remove("is_trace_started");
      editor.remove("is_gather_started");
      editor.apply();
    }
  }

  /**
   * 初始化请求公共参数
   *
   * @param request
   */
  public void initRequest(BaseRequest request) {
    request.setTag(getTag());
    request.setServiceId(serviceId);
  }

  /**
   * 获取请求标识
   *
   * @return
   */
  public int getTag() {
    return mSequenceGenerator.incrementAndGet();
  }

  public void clear() {
    itemInfos.clear();
  }

}
