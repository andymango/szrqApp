//
//  AppViewAdapter.swift
//  szrq
//
//  Created by dxc on 2018/8/2.
//  Copyright © 2018年 dxc. All rights reserved.
//

import UIKit

class AppViewAdapter: NSObject {
    // Screen Height
    static let screenWidth = UIScreen.main.bounds.size.width
    // Screen Width
    static let screenHeight = UIScreen.main.bounds.size.height
    // iPhone X
    static let isIPhoneX = (screenWidth == 375 && screenHeight == 812 ? true : false)
    // Status bar height.
    static let statusBarHeight = (isIPhoneX ? 44 : 20) as CGFloat;
    // Navigation bar height.
    static let  navigationBarHeight = 44 as CGFloat;
    // Tabbar height.
    static let tabbarHeight = (isIPhoneX ? (49 + 34) : 49) as CGFloat;
    // Tabbar safe bottom margin.
    static let tabbarSafeBottomMargin = (isIPhoneX ? 34 : 0) as CGFloat;
    // Status bar & navigation bar height.
    static let statusBarAndNavigationBarHeight = (isIPhoneX ? 88 : 64) as CGFloat;
    //总高度-状态栏-导航栏
    static let screenHeightExcludeTabbar = screenHeight - tabbarHeight;
    static let suitHeight = screenHeightExcludeTabbar - navigationBarHeight - statusBarHeight;
    //获取安全区域
    //    let ViewSafeAreInsets(view) = ({UIEdgeInsets insets; if(@available(iOS 11.0, *)) {insets = view.safeAreaInsets;} else {insets = UIEdgeInsetsZero;} insets;})
    
    //实例的构造函数
    init(param: String) {
        super.init();
        print("000000000000000构造器\(param)");
    }
}
