import React from 'react';
import 'react-native-gesture-handler';
import AppProvider from './src/hooks';
import {NavigationContainer} from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
// import Toast from 'react-native-toast-message';

import Routes from './src/routes';

const App: React.FC = () => {
  return(
    <NavigationContainer>
      <StatusBar barStyle='dark-content' backgroundColor="#F7F7F7"  />
      <AppProvider>
        <View  style={{ flex: 1, backgroundColor: '#F7F7F7'}}>
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};


export default App;
