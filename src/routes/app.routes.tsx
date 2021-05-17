import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { View, Text, Image } from 'react-native';
import BetLogo from '../assets/bets.png';


import Dashboard from '../pages/Dashboard';
import NewBet from '../pages/NewBet';
import Account from '../pages/Account';


const App = createBottomTabNavigator();

const AppRoutes: React.FC = () => {
    return (
        <App.Navigator
            initialRouteName='Home'
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconColor;

                    if (route.name === "Home") {
                        iconColor = focused ? '#B5C401' : '#C1C1C1';
                        return (
                            <View style={{ borderTopWidth: 4, borderColor: iconColor, padding: 5 }}>
                                <Ionicons name="ios-home-outline" size={30} color={iconColor} />
                            </View>
                        )
                    }

                    if (route.name === "$") {
                        iconColor = focused ? '#B5C401' : '#C1C1C1';
                        return (
                            <View style={{ backgroundColor: '#B5C401', borderWidth: 5, borderColor: '#fff', width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
                                <Image source={BetLogo} style={{ marginTop: 4, width: 63, height: 62 }} />
                            </View>
                        )
                    }

                    if (route.name === "Account") {
                        iconColor = focused ? '#B5C401' : '#C1C1C1';
                        return (
                            <View style={{ borderTopWidth: 4, borderColor: iconColor, padding: 6 }}>
                                <FontAwesome name="user-o" size={30} color={iconColor} />
                            </View>
                        )
                    }
                }
            })}

            tabBarOptions={{
                activeTintColor: '#707070',
                inactiveTintColor: '#C1C1C1',
                style: { height: 71, borderTopLeftRadius: 25, borderTopEndRadius: 25, },
                labelStyle: { fontSize: 14, padding: 10, fontWeight: '700', fontStyle: 'italic' },
                iconStyle: { marginTop: 15, },
                tabStyle: {},
            }}

        >
            <App.Screen name="Home" component={Dashboard} />
            <App.Screen name="$" component={NewBet} options={{title: '',}} />
            <App.Screen name="Account" component={Account} />

        </App.Navigator>
    );
}

export default AppRoutes;
