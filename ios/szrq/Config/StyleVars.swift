// 全局样式参数
//  StyleVars.swift
//  szrq
//
//  Created by dxc on 2018/8/3.
//  Copyright © 2018年 dxc. All rights reserved.
//

import UIKit

class StyleVars: NSObject {
    static let primaryColorRed = red;   //主色调
//    static let NavBarBgColor = String("").toUIColor();
//    static let BodyBgColor = String("").toUIColor();
    
//    static let DefaultFontColor
    
    static let red = String("#e83c36").toUIColor();
    static let c00 = String("#000");
    static let cff = String("#fff");
    static let orange = UIColor.orange;
    static let c44 = String("444");
    static let c66 = String("666");
    static let c99 = String("999");
    static let cee = String("eee");
    static let ce8 = String("e8e8e8");
    static let cf3 = String("f3f3f3");
    static let f30 = String("30px");
    static let f28 = String("28px");
    static let f26 = String("26px");
    static let f24 = String("24px");
    static let f22 = String("22px");
    static let f20 = String("20px");
}


extension String{
    /// 将十六进制颜色转伟UIColor
    /// - Returns: UIColor
    public func toUIColor() -> UIColor {
        //处理数值
        var cString = self.uppercased().trimmingCharacters(in: CharacterSet.whitespacesAndNewlines)
        
        let length = (cString as NSString).length
        //错误处理
        if (length < 6 || length > 7 || (!cString.hasPrefix("#") && length == 7)){
            return UIColor.white
        }
        
        if cString.hasPrefix("#"){
            cString = (cString as NSString).substring(from: 1)
        }
        
        //字符chuan截取
        var range = NSRange()
        range.location = 0
        range.length = 2
        
        let rString = (cString as NSString).substring(with: range)
        
        range.location = 2
        let gString = (cString as NSString).substring(with: range)
        
        range.location = 4
        let bString = (cString as NSString).substring(with: range)
        
        //存储转换后的数值
        var r:UInt32 = 0,g:UInt32 = 0,b:UInt32 = 0
        //进行转换
        Scanner(string: rString).scanHexInt32(&r)
        Scanner(string: gString).scanHexInt32(&g)
        Scanner(string: bString).scanHexInt32(&b)
        //根据颜色值创建UIColor
        return UIColor(red: CGFloat(r)/255.0, green: CGFloat(g)/255.0, blue: CGFloat(b)/255.0, alpha: 1.0)
    }
}
