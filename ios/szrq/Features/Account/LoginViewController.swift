//
//  LoginViewController.swift
//  szrq
//
//  Created by dxc on 2018/8/2.
//  Copyright © 2018年 dxc. All rights reserved.
//

import UIKit

class LoginViewController: BaseViewController, UITextFieldDelegate {
//    @IBOutlet weak var textField: UITextField!

    override func viewDidLoad() {
        super.viewDidLoad()

//        textField.delegate = self
    }
    
//    //设置返回按钮的点击事件
//    func textFieldShouldReturn(_ textField: UITextField) -> Bool {
////        textField.resignFirstResponder()           //关闭键盘
//        print("点击了返回")
//        return true
//    }
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated);
        
//        self.navigationController?.isNavigationBarHidden = false;//是否隐藏导航栏
        self.navigationController?.interactivePopGestureRecognizer?.isEnabled = false;
        self.navigationItem.prompt = "正在加载数据";
        
        self.navigationItem.title = "登录";
 
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
