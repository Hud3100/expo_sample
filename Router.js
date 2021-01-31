import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import pageA from './pages/pageA';
import pageB from './pages/pageB';
import recordComponent from './pages/kotobaRecord';

const RouterComponent = () => {
  return (
    <Router>
        <Scene key="root">
            <Scene
              key="pageA"
              component={pageA}
              title="pageA"
              rightTitle="Bへ"
              onRight={() => { Actions.pageB(); }}
            />
            <Scene
              key="pageB"
              component={pageB}
              title="Page B"
              rightTitle="言葉を残す"
              onRight={() => { Actions.recordComponent(); }}
            />
            <Scene
              key="recordComponent"
              component={recordComponent}
              title="言葉を残す"
            />
        </Scene>
    </Router>
  )
}

export default RouterComponent;