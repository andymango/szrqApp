import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, StyleSheet, Text, Button} from 'react-native'
import { TabBar, SearchBar } from 'antd-mobile-rn';
import Swiper from 'react-native-swiper'

import HomeScreen from '../views/Home'
import MineScreen from '../views/Mine/Mine'
export default class Main extends React.Component {
  	// static navigationOptions = {
	// 	// header: null,
	// 	// title: "ff"
	// 	title: ({ state }) => `Chat with`
	// }
	// static navigationOptions = {
    //     title: ({ state }) => `Chat with`
	// };

	// static navigationOptions = ({navigation}) => {
	// 	console.log(navigation);
	// 	return {

	// 		title: `state ${aa}`
	// 	}
	// };
  	constructor(props) {
		super(props)
		this.state = {
			selectedTab: 0
		}
	}

	//切换tab选中项
	onChangeTab(tabIndex: any){
		this.props.navigation.setParams({
			tabIndex
		})
		this.setState({
			selectedTab: tabIndex,
		});
	}

	static navigationOptions = ({ navigation, screenProps }) => {
		console.log('aaa', navOptions)
		let navOptions = {
			header: null
		};
		let tabIndex = navigation.state.params && navigation.state.params.tabIndex ? navigation.state.params.tabIndex : 0
		switch(tabIndex){
			case 1:
				navOptions = {
					title: "我的",
					// headerRight:(
					// 	<Text onPress={navigation.state.params ? navigation.state.params.navigatePress:null}>
					// 		返回
					// 	</Text>
					// )
				};
				break;
			default:
				break;
		}
		return navOptions;
	};
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
						<HomeScreen {...this.props} />
					</TabBar.Item>
					<TabBar.Item
						title="我的"
						icon={require('@/imgs/common-profile.png')}
						selectedIcon={require('../imgs/common-profileh.png')}
						selected={this.state.selectedTab === 1 }
						onPress={() => this.onChangeTab(1)}
					>
						<MineScreen {...this.props} />
					</TabBar.Item>
				</TabBar>
			</View>
		)
  	}
}

const styles = StyleSheet.create({
})