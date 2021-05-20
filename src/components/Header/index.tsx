import React, { useEffect } from 'react';
import {MaterialIcons} from '@expo/vector-icons';
import {useAuth} from '../../hooks/Auth';
import { useDispatch } from 'react-redux';
import { loadGames, loadGamesFailure } from '../../store/modules/games/action';
import {Container, Logo} from './styles';
import api from '../../services/api';


const Header: React.FC = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadGames());
    },[])
    const {signOut} = useAuth();

    return (
        <Container>  
            <Logo>TGL</Logo>
            <MaterialIcons name="logout" size={35} color="#C1C1C1" onPress={() => signOut() } />
        </Container>
    )
}

export default Header