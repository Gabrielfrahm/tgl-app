import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { GamesProps } from '../../store/modules/games/types';
import { loadGames } from '../../store/modules/games/action';
import api from '../../services/api';

import Header from '../../components/Header';
import ButtonGames from '../../components/ButtonGames';
import Backdrop from '../../components/Backdrop';

import {View} from 'react-native';
import { 
    Container, 
    Title, 
    SubTitle, 
    ViewButtonGame, 
    ViewDescription,
    TitleDescription,
    BetDescription 
} from './styles';

const NewBet: React.FC = () => {
    useEffect(() => {
        dispatch(loadGames());
        setShow(true)
    }, []);
    const dispatch = useDispatch();
    
    // games
    const betsState = useSelector<IState, GamesProps[]>(state => {
        return state.games.games;
    });
    // erro games
    const errorState = useSelector<IState>(state => {
        return state.games.error;
    });

    // initial game
    const initialGame = useSelector<IState, GamesProps>(state => {//first bet of array bets
        return state.games.games[0];
    });

    // active button game
    const [active, setActive] = useState(false);

    // show erro api
    const [show, setShow] = useState(true);

    const [ gameSelected , setGameSelected] = useState('');

    const [infoGame, setInfoGame] = useState<GamesProps[]>([]);//initial game and game selected

    useEffect(() => {//initial bet
        setInfoGame([initialGame]);
        setGameSelected(initialGame?.type)
        setActive(true);
    }, [initialGame]);

    const handleClickInButtonChooseGame = useCallback((gameName: string) => {
        setGameSelected(gameName);
        setActive(true);
    },[])

    const handleDrawerClosed = useCallback(() => {
        if (errorState) {
            dispatch(loadGames());
        } else {
            setShow(false);
        }
    }, [errorState, dispatch,]);

    return (
        <>
            <Header />
            <Container>
                <Title>NEW BET FOR LOTOMANIA</Title>
                <SubTitle>Choose a game</SubTitle>
                {errorState ? <Backdrop show={show} clicked={handleDrawerClosed} ><Title>Error</Title></Backdrop> :
                    <ViewButtonGame>
                        {betsState.map(game => (
                            <ButtonGames
                                key={game.type}
                                onPress={() => handleClickInButtonChooseGame(game.type)}
                                title={game.type}
                                color={game.color}
                                isActive={
                                    gameSelected === game.type ? active : false
                                }
                                removeActive={() => console.log('dale')}
                            >{game.type}</ButtonGames>
                        ))}
                    </ViewButtonGame>
                }
                <ViewDescription>
                    <TitleDescription>Fill your bet</TitleDescription>
                    {infoGame.map(item => (
                        <BetDescription key={item?.id}>{item?.description}</BetDescription>
                    ))}
                </ViewDescription>
                <View style={{alignItems : 'center', marginTop: 10}}>
                    <View style={{ borderWidth: 6, borderRadius: 15 ,borderColor: '#C1C1C1' , width: 36, }} />
                </View>
            </Container>
        </>
    )
}

export default NewBet;