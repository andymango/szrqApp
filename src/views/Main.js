import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, Text, Button} from 'react-native'
import { TabBar } from 'antd-mobile-rn';
import EStyleSheet from 'react-native-extended-stylesheet';
import HomeScreen from '../views/Home'
import MineScreen from '../views/Mine/Mine'

export default class Main extends React.Component {
  	constructor(props) {
		super(props)
	}

	state = {
		selectedTab: 0
	}

	//切换tab选中项
	onChangeTab(tabIndex){
		this.props.navigation.setParams({
			tabIndex
		})
		this.setState({
			selectedTab: tabIndex
		});
	}

	static navigationOptions = ({ navigation, screenProps }) => {
		let navOptions = {
			header: null
		};
		let tabIndex = navigation.state.params && navigation.state.params.tabIndex ? navigation.state.params.tabIndex : 0
		switch(tabIndex){
			case 1:
				navOptions = {
					title: "我的"
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

const styles = EStyleSheet.create({
})