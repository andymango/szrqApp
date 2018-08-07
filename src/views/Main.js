import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, StyleSheet, Text, Button} from 'react-native'
import { TabBar } from 'antd-mobile'
import Swiper from 'react-native-swiper'

import HomeScreen from '../views/Home'
import MineScreen from '../views/Mine'

export default class Main extends React.Component {
  static navigationOptions = {
    header: null,
    title: '首页'
  }

  constructor(props) {
    super(props)
    this.state = {
      showIntro: true
    }
    this.tabs = {
      1: {
        title: '首页',
        icon: require('@/imgs/common-home.png'),
        selectedIcon: require('../imgs/common-homeh.png'),
        selected: this.props.currentTab == 1,
        onPress: () => this.props.actions.onChangeTab(1),
        children: <HomeScreen {...this.props} />
      },
      2: {
        title: '我的',
        icon: require('@/imgs/common-profile.png'),
        selectedIcon: require('../imgs/common-profileh.png'),
        selected: this.props.currentTab == 2,
        onPress: () => this.props.actions.onChangeTab(2),
        children: <MineScreen {...this.props} />
      }
    }
  }

  componentDidMount () {
    this.props.actions.tabRequest()
  }

  change() {
    this.setState({
      showIntro: false
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {
          this.state.showIntro ?
          <Swiper style={styles.wrapper} showsButtons={false} loop={false}>
            <View style={styles.slide1}>
              <Text style={styles.text}>Hello Swiper</Text>
            </View>
            <View style={styles.slide2}>
              <Text style={styles.text}>Beautiful</Text>
            </View>
            <View style={styles.slide3}>
              <Text style={styles.text}>And simple</Text>
              <Button
                onPress={this.change.bind(this)}
                title='skip'
                backgroundColor="#fff"
                color='red'
              ></Button>
            </View>
          </Swiper>
          :
          <TabBar
            unselectedTintColor="gary"
            tintColor="#178EEB"
            barTintColor='rgba(247,247,247,0.1)'
          >
          {
            this.props.tabs.map((item, index) =>
              <TabBar.Item
                title={this.tabs[item.tabId].title}
                icon={this.tabs[item.tabId].icon}
                selectedIcon={this.tabs[item.tabId].selectedIcon}
                selected={this.props.currentTab == item.tabId}
                onPress={this.tabs[item.tabId].onPress}
                key={index}
              >
                {this.tabs[item.tabId].children}
              </TabBar.Item>
            )
          }
          </TabBar>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})