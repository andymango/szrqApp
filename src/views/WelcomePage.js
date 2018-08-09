import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { View, StyleSheet, Text, Button} from 'react-native'
import Swiper from 'react-native-swiper'
// import { Button } from 'antd-mobile-rn';

export default class WelcomePage extends React.Component {
  	constructor(props) {
		super(props)
		this.state = {
		}
	}
	componentDidMount () {
	}

	//页面跳转
	skipPage() {
		this.props.navigation.navigate('main');
  	}

  render() {
    return (
      <View style={{flex: 1}}>
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
                onPress={this.skipPage.bind(this)}
                title='skip'
                backgroundColor="#fff"
                color='red'
              >进入</Button>
            </View>
          </Swiper>
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