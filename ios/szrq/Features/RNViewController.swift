// rn 管理器
//  RNViewController.swift
//  szrq
//
//  Created by dxc on 2018/8/2.
//  Copyright © 2018年 dxc. All rights reserved.
//

import UIKit
import React;

class RNViewController: BaseViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
//        self.navigationController?.interactivePopGestureRecognizer?.isEnabled = false;
        print("this is rn page");
        
        let strUrl = "http://localhost:8081/index.bundle?platform=ios&dev=true"
        let jsCodeLocation = URL(string: strUrl)

        let rootView = RCTRootView(bundleURL: jsCodeLocation!, moduleName: "RNApp", initialProperties: nil, launchOptions: nil)
//        let rootView = RCTRootView(bundleURL: <#T##URL!#>, moduleName: <#T##String!#>, initialProperties: <#T##[AnyHashable : Any]!#>, launchOptions: <#T##[AnyHashable : Any]!#>)
        self.view = rootView;
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
