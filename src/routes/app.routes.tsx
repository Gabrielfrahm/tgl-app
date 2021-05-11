import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '../pages/Dashboard';
import { Ionicons, FontAwesome } from '@expo/vector-icons';


const App = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
    return (
        <App.Navigator
            initialRouteName='Home'

            tabBarOptions={{
                activeTintColor: '#707070',
                inactiveTintColor: '#C1C1C1',
                style: { height: 71, borderTopLeftRadius: 25, borderTopEndRadius: 25,  },
                labelStyle: { fontSize: 14, padding: 10, fontWeight: '700', fontStyle: 'italic' },
                iconStyle: { marginTop: 15,  },
                tabStyle: { }
            }}
        >
            <App.Screen name="Home" component={Dashboard} options={{
                tabBarIcon: () => <Ionicons name="ios-home-outline" size={24} color="#B5C401" />,
            }}
            />
            <App.Screen name="Bet" component={Dashboard} />
            <App.Screen name="Account" component={Dashboard} options={{
                tabBarIcon: () => <FontAwesome name="user-o" size={24} color="#B5C401" />,
                
            }}
            />

        </App.Navigator>
    );
}

export default AppRoutes;
