import React from 'react';
import { Scene, Router, Tabs, Actions } from 'react-native-router-flux';
import { View, StyleSheet } from 'react-native';
import pageA from './screens/pageA';
import recordComponent from './screens/kotobaRecord';
import loginScreen from './screens/loginScreen';
import Icon from 'react-native-vector-icons/FontAwesome'

const TabBarIcon = (props) => (
  <View style={styles.tabIconContainer}>
    <Icon
      name={props.iconName}
      color={props.focused ? '#f3a68c' : 'grey'}
      style={styles.tabIcon}
    />
  </View>
)

const RouterComponent = () => {
  return (
    <Router>
      <Tabs
        key='root'
        showLabel={false}
        swipeEnabled={true}
        animationEnabled={true}
        tabBarStyle={styles.tabBar}
      >
        <Scene
          key="recordComponent"
          initial={true}
          component={recordComponent}
          title="言葉を残す"
          iconName='plus-circle'
          icon={TabBarIcon}
        />
        <Scene
          key="album"
          component={pageA}
          title="アルバム"
          iconName='book'
          icon={TabBarIcon}
        />
        <Scene
          key="loginScreen"
          component={loginScreen}
          tabBarLabel='設定'
          title="ログイン画面"
          iconName='wrench'
          icon={TabBarIcon}
        />
      </Tabs>
    </Router>
  )
}

export default RouterComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    borderWidth: 0,
    backgroundColor:'#FFF',
  },
  tabIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
    fontSize: 30,
  },
});