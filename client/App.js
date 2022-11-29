import React from 'react';
import Navigator from './routes/homeStack';
import { Provider } from 'mobx-react';
import { appStore } from './stores/app';
import Geolocation from '@react-native-community/geolocation';

Geolocation.setRNConfiguration({
  skipPermissionRequests: false
});

const App = () => {
  return (
    <Provider appStore={appStore}>
      <Navigator />
    </Provider>
  );
};

export default App;
