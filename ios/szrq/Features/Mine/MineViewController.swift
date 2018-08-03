//
//  MineViewController.swift
//  szrq
//
//  Created by dxc on 2018/8/2.
//  Copyright © 2018年 dxc. All rights reserved.
//

import UIKit

class MineViewController: BaseLoginViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
//        self.navigationController?.interactivePopGestureRecognizer?.isEnabled = true;

        let label = UILabel();
        label.text = "这是label，我想豆子了";
        label.backgroundColor = UIColor.green;
        label.frame = CGRect.init(x: 100, y: 100, width: 300, height: 200)
        self.view.addSubview(label);
        
        
        
        let timeLabel = UILabel()
        timeLabel.text = "00:00"
        timeLabel.textColor = UIColor.white;
        timeLabel.font = UIFont(name: "Helvetica", size: 80)
        timeLabel.backgroundColor = UIColor.black;
        timeLabel.textAlignment = NSTextAlignment.center;
        
        self.view.addSubview(timeLabel);
        
        
        NSLog("渲染label")
        
        renderBtn(tag: 3 ,title: "进入登录");
        // Do any additional setup after loading the view.
    }
    func renderBtn(tag: Int, title: String) -> Void {
        let btn = UIButton();
        btn.tag = tag;
        btn.setTitle("\(title)", for: UIControlState.normal);
        btn.setTitle("我被点击了", for: UIControlState.highlighted);
        btn.setTitleColor(UIColor.blue, for: UIControlState.normal);
        btn.setTitleColor(UIColor.white, for: UIControlState.highlighted);
        btn.backgroundColor = UIColor.brown;
        
        //事件绑定
        //        btn.addTarget(self, action: Selector("clickEvent:"), for: UIControlEvents.touchUpInside)
        //        btn.addTarget(self, action: "clickEvent:", for: UIControlEvents.touchUpInside)
        
        let btnHeight = 30 as CGFloat;
        let marginTop = 10 as CGFloat;
        btn.frame = CGRect.init(x: 10, y: AppViewAdapter.statusBarHeight + (CGFloat(tag) * (btnHeight + marginTop)), width: self.view.bounds.size.width - 20, height: btnHeight);
        
        btn.addTarget(self, action: #selector(btnTouchDown), for: UIControlEvents.touchDown)
        btn.addTarget(self, action: #selector(btnTouchUpInside), for: UIControlEvents.touchUpInside)
        
        self.view.addSubview(btn);
    }
    
    //按钮按下去
    @objc func btnTouchDown(sender: UIButton) -> String{
        print("按下去", sender.tag);
        
        sender.backgroundColor = UIColor.init(red: 122, green: 311, blue: 323, alpha: 0.5)
        return "";
    }
    
    //按钮按起来
    @objc func btnTouchUpInside(sender: UIButton) -> String{
        print("按起来");
        sender.backgroundColor = UIColor.brown;
        
        //跳转
        switch sender.tag{
        case 2:
            self.navigationController?.pushRoute(path: "/rn");
            break;
        case 3:
            self.navigationController?.pushRoute(path: "/login");
            break;
        default:
            self.navigationController?.pushRoute(viewControlller: MineViewController());
            break;
        }
        return "";
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
