import React from 'react';
import { Text, Button } from 'react-native';
import { useAuth } from '../../hooks/Auth';

const Dashboard = () => {
    const { signOut } = useAuth();
    return (
        <>
            <Text>Dashboard</Text>
            <Button title="sair" onPress={() => signOut()} />
        </>
    )
}


export default Dashboard;