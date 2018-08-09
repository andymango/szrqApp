import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, StyleSheet, Text, Button} from 'react-native'
import { TabBar, SearchBar } from 'antd-mobile-rn';
import Swiper from 'react-native-swiper'

import HomeScreen from '../views/Home'
import MineScreen from '../views/Mine'

export default class Main extends React.Component {
  	static navigationOptions = {
		// header: null,
    	headerTitle: '首页'
	  }

  	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 0
		}
	}

	//切换tab选中项
	onChangeTab(tabIndex: any) {
		this.setState({
			selectedTab: tabIndex,
		});
	}

	renderContent(pageText: any) {
		return (
		  	<View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
				<SearchBar placeholder="Search" showCancelButton />
				<Text style={{ margin: 50 }}>{pageText}</Text>
		  	</View>
		);
	}
	componentDidMount () {
	}

  	render() {
		return (
			<View style={{flex: 1}}>
				<TabBar
					unselectedTintColor="#888"
					tintColor="#178EEB"
					barTintColor='rgba(247,247,247,0.1)'
				>
					<TabBar.Item
						title="主页"
						icon={require('@/imgs/common-home.png')}
						selectedIcon={require('../imgs/common-homeh.png')}
						selected={this.state.selectedTab === 0 }
						onPress={() => this.onChangeTab(0)}
					>
						{this.renderContent('home')}
					</TabBar.Item>
					<TabBar.Item
						title="我的"
						icon={require('@/imgs/common-profile.png')}
						selectedIcon={require('../imgs/common-profileh.png')}
						selected={this.state.selectedTab === 1 }
						onPress={() => this.onChangeTab(1)}
					>
						{this.renderContent('mine')}
					</TabBar.Item>
				</TabBar>
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