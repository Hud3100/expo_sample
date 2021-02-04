import React from 'react';
import { Scene, Router, Tabs, Actions } from 'react-native-router-flux';
import pageA from './screens/pageA';
import recordComponent from './screens/kotobaRecord';
import loginScreen from './screens/loginScreen';

const RouterComponent = () => {
  return (
    <Router>
      <Tabs
        key='root'
        swipeEnabled={ true }
        animationEnabled={ false }
        tabBarStyle={{backgroundColor:'#F8F8F8'}}
      >
            <Scene
              key="pageA"
              component={pageA}
              tabBarLabel='ログイン'
              title="pageA"
              // rightTitle="ログイン画面へ"
              // onRight={(//) => { Actions.loginScreen(); }}
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