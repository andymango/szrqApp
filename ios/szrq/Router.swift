// 全局导航控制器
//  Router.swift
//  szrq
//
//  Created by dxc on 2018/8/2.
//  Copyright © 2018年 dxc. All rights reserved.
//

import UIKit

//导航配置
public struct NavConfig {
    var animated: Bool = true;
};

//扩展UINavigationController
extension UINavigationController{
    //重置导航控制器
    func reset() -> Void {
        self.interactivePopGestureRecognizer?.isEnabled = true;//默认开启右滑
    }
    
    //路由配置
    public static let RouterConfig: [String: () -> UIViewController] = [
        //主页
        "/home": {() -> UIViewController in
            return HomeViewController();
        },
        //我的
        "/mine": {() -> UIViewController in
            return MineViewController();
        },
        //登录
        "/login": {() -> UIViewController in
            return LoginViewController();
        },
        //rn的页面
        "/rn": {() -> UIViewController in
            return RNViewController();
        }
    ]
    
    //根据视图控制器入栈
    public func pushRoute(viewControlller: UIViewController, navConfig: NavConfig?) -> Void{
        if let nConfig = navConfig{
            self.pushViewController(viewControlller, animated: nConfig.animated)
        } else{
            self.pushViewController(viewControlller, animated: true)
        }
    }
    
    //根据path入栈
    public func pushRoute(path: String, navConfig: NavConfig?) -> Void{
        let routeVc = UINavigationController.RouterConfig[path]!();
        
        return self.pushRoute(viewControlller: routeVc, navConfig: navConfig);
    }
    
    //根据path入栈
    public func pushRoute(path: String) -> Void{
        return self.pushRoute(path: path, navConfig: NavConfig())
    }
    
    //根据path入栈
    public func pushRoute(viewControlller: UIViewController) -> Void{
        return self.pushRoute(viewControlller: viewControlller, navConfig: NavConfig())
    }
}

class Router: UINavigationController {

    override func viewDidLoad() {
        super.viewDidLoad();
        
        setNavBarStyle();
        reset();
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    //设置全局导航栏的样式
    func setNavBarStyle(){
        UINavigationBar.appearance().tintColor = UIColor.red;//导航栏字体颜色
//        UINavigationBar.appearance().isTranslucent = true;
    }
}
