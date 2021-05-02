import React from 'react';
import { Scene, Router, Tabs, Actions } from 'react-native-router-flux';
import { View, StyleSheet } from 'react-native';
import kotobaAlbum from './screens/kotobaAlbum';
import recordComponent from './screens/kotobaRecord';
import signInScreen from './screens/signInScreen';
import signUpScreen from './screens/signUpScreen';
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
      <Scene
        key="root"
        hideNavBar={true}
      >
        <Tabs
          key='tabs'
          showLabel={false}
          swipeEnabled={true}
          animationEnabled={true}
          tabBarStyle={styles.tabBar}
        >
          <Scene
            key="recordComponent"
            component={recordComponent}
            title="言葉を残す"
            iconName='plus-circle'
            icon={TabBarIcon}
            hideNavBar="true"
          />
          <Scene
            key="album"
            component={kotobaAlbum}
            title="アルバム"
            iconName='book'
            icon={TabBarIcon}
            hideNavBar="true"
          />
          <Scene
            initial={true}
            key="signIn"
            component={signInScreen}
            tabBarLabel='設定'
            title="ログイン画面"
            iconName='wrench'
            icon={TabBarIcon}
            hideNavBar="true"
          />
        </Tabs>
        <Scene
          key="signUp"
          component={signUpScreen}
          title="利用登録画面"
          duration={1000}
        />
      </Scene>
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