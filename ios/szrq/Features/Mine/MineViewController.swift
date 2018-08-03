//
//  MineViewController.swift
//  szrq
//
//  Created by 123 on 2018/8/2.
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
        // Do any additional setup after loading the view.
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
