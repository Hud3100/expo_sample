import React from 'react';
import { Scene, Router, Tabs, Actions } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import pageA from './screens/pageA';
import recordComponent from './screens/kotobaRecord';
import loginScreen from './screens/loginScreen';
import Icon from 'react-native-vector-icons/FontAwesome';

const RouterComponent = () => {
  return (
    <Router>
      <Tabs
        key='root'
        showLabel={false}
        swipeEnabled={ true }
        animationEnabled={ false }
        tabBarStyle={styles.tabBar}
      >
        <Scene
          key="pageA"
          component={pageA}
          title="pageA"
          icon={() => (
            <Icon
              name="plus-circle"
              size={30}
              color="#f3a68c"
              />)}
          // rightTitle="ログイン画面へ"
          // onRight={(//) => { Actions.loginScreen(); }
        />
        <Scene
          key="loginScreen"
          component={loginScreen}
          tabBarLabel='ログイン'
          title="ログイン画面"
          // rightTitle="言葉を残す"
          // onRight={() => { Actions.recordComponent(); }}
        />
        <Scene
          initial={ true }
          key="recordComponent"
          tabBarLabel='ログイン'
          component={recordComponent}
          title="言葉を残す"
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
    backgroundColor:'#FFF'
  }
});