import React from 'react';
import { Scene, Router, Tabs, Stack } from 'react-native-router-flux';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import kotobaAlbum from './screens/kotobaAlbum';
import recordComponent from './screens/kotobaRecord';
import signInScreen from './screens/signInScreen';
import signUpScreen from './screens/signUpScreen';
import kotobaDetail from './screens/kotobaDetailScreen';
import test from './screens/test';
import Icon from 'react-native-vector-icons/FontAwesome'

const TabBarIcon = (props) => (
  <View style={styles.tabIconContainer}>
    <Icon
      name={props.iconName}
      color={props.focused ? '#FFE3ED' : 'grey'}
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
          <Stack
            key='album'
            iconName='book'
            icon={TabBarIcon}
            duration={0}
          >
            <Scene
              key="albumAll"
              component={kotobaAlbum}
              title="アルバム"
              iconName='book'
              icon={TabBarIcon}
            />
            <Scene
              component={kotobaDetail}
              title='言葉詳細画面'
              key='kotobaDetail'
            />
          </Stack>
          <Stack
            key='userpage'
            iconName='user'
            icon={TabBarIcon}
            initial={true}
          >
            <Scene
              key="signIn"
              initial={true}
              component={signInScreen}
              tabBarLabel='設定'
              title="ログイン画面"
              hideNavBar="true"
            />
            <Scene
              key="signUp"
              component={signUpScreen}
              title="利用登録画面"
            />
          </Stack>
        </Tabs>

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