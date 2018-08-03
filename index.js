// /**
//  * 主入口
//  */
// import {AppRegistry} from 'react-native';
// import EStyleSheet from 'react-native-extended-stylesheet'
// import cssVariables from './src/libs/cssVariables'
// import {oNewRouters as routers} from './src/router';
// import routerModule from "nativeBridge/routerModule"

// EStyleSheet.build(cssVariables);

// let oRouters = routers;

// oRouters.forEach((oValue) => {
// 	let component = oValue.component.default;
// 	AppRegistry.registerComponent(oValue.path, () => component);
// });

// routerModule.setRouters();


import React from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";

class RNHighScores extends React.Component {
  render() {
    // var contents = this.props["scores"].map(score => (
    //   <Text key={score.name}>
    //     {score.name}:{score.value}
    //     {"\n"}
    //   </Text>
    // ));
    return (
      <View style={styles.container}>
        <Text style={styles.highScoresTitle}>2048 High Scores!</Text>
        {/* <Text style={styles.scores}>{contents}</Text> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  },
  highScoresTitle: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  scores: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});

// 整体js模块的名称
AppRegistry.registerComponent("RNApp", () => RNHighScores);