import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'



const App = createStackNavigator();

const AppRoutes: React.FC = () => {
    return (
        <App.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: "#F7F7F7" }
            }}

        >
            {/* <App.Screen  name="Dashboard" component={Dashboard}/> */}

        </App.Navigator>
    );
}

export default AppRoutes;
