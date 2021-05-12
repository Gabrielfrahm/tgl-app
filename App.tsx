import React from 'react';
import 'react-native-gesture-handler';
import AppProvider from './src/hooks';
import { NavigationContainer } from '@react-navigation/native';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';


import Routes from './src/routes';
import store from './src/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar barStyle='dark-content' backgroundColor="#F7F7F7" />
        <AppProvider>
          <View style={{ flex: 1, backgroundColor: '#F7F7F7' }}>
            <Routes />
          </View>
        </AppProvider>
      </NavigationContainer>
    </Provider>
  );
};


export default App;
