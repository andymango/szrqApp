//
//  LoginViewController.swift
//  szrq
//
//  Created by 123 on 2018/8/2.
//  Copyright © 2018年 dxc. All rights reserved.
//

import UIKit

class LoginViewController: BaseViewController {

    override func viewDidLoad() {
        super.viewDidLoad()

    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated);
        self.navigationController?.interactivePopGestureRecognizer?.isEnabled = false;
        self.navigationItem.prompt = "正在加载数据";
        //        let timer = Timer(timeInterval: <#T##TimeInterval#>, invocation: <#T##NSInvocation#>, repeats: <#T##Bool#>)
        //        RunLoop.main.add(timer, forMode: RunLoopMode.commonModes)
        //        self.navigationController.trans
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
