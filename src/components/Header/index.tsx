import React from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {useAuth} from '../../hooks/Auth';
import {Container, Logo} from './styles';


const Header: React.FC = () => {
    const {signOut} = useAuth();
    return (
        <Container>  
            <Logo>TGL</Logo>
            <MaterialIcons name="logout" size={35} color="#C1C1C1" onPress={() => signOut() } />
        </Container>
    )
}

export default Header