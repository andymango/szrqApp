//
//  HomeViewController.swift
//  szrq
//
//  Created by 123 on 2018/8/2.
//  Copyright © 2018年 dxc. All rights reserved.
//

import UIKit

class HomeViewController: BaseViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        
//        self.navigationController?.interactivePopGestureRecognizer?.isEnabled = true;
//        self.navigationController?.isNavigationBarHidden = true;
//        print("??????", self.view.bounds.height)
        initView();
        var aa: String? = nil
        aa = "范德萨发";
        print("----", aa!);
        
        print("||||", test(numbers: 1,3,3,4, strings: ["我爱豆子", "哈哈哈"]))
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
    }
    
    func test(numbers: Int..., strings: [String]) -> String {
        var sum = 0;
        for num in numbers{
            sum += num;
        }
        
        var str = "";
        for s in strings{
            str.append(s);
        }
        
        return "string:\"\(str)\";int:\"\(sum)\"";
    }
    
    //渲染视图
    func initView() -> Void {
        self.view.backgroundColor = UIColor.init(red: 0, green: 3, blue: 240, alpha: 0.4);
        
        renderBtn(tag: 1 ,title: "进mine");
        renderBtn(tag: 2, title: "进入rn");
    }
    
    let screenWidth = UIScreen.main.bounds.width
    
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
        btn.frame = CGRect.init(x: 10, y: AppViewAdapter.StatusBarHeight + (CGFloat(tag) * (btnHeight + marginTop)), width: self.view.bounds.size.width - 20, height: btnHeight);
        
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
            self.navigationController?.pushViewController(RNViewController(), animated: true);
            break;
        default:
            self.navigationController?.pushViewController(MineViewController(), animated: true);
            break;
        }
        return "";
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
