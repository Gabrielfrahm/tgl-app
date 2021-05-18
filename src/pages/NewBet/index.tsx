import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { GamesProps } from '../../store/modules/games/types';
import { loadGames } from '../../store/modules/games/action';
import api from '../../services/api';

import Header from '../../components/Header';
import ButtonGames from '../../components/ButtonGames';
import Backdrop from '../../components/Backdrop';
import Numbers from '../../components/Numbers';
import NumberSelected from '../../components/NumberSelected';

import { View } from 'react-native';
import {
    Container,
    Title,
    SubTitle,
    ViewButtonGame,
    ViewDescription,
    TitleDescription,
    BetDescription,
    ScrollNumbers,
    ViewNumbers,
    ViewNumberSelected,
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

    const [gameSelected, setGameSelected] = useState('');

    const [infoGame, setInfoGame] = useState<GamesProps[]>([]);//initial game and game selected

    const [numbers, setNumbers] = useState<number[]>([]);//get numbers of range bet
    const [numbersUser, setNumbersUser] = useState<number[]>([]);

    const colorGame = infoGame.map(game => { return game.color });//color game selected

    useEffect(() => {//initial bet
        setInfoGame([initialGame]);
        setGameSelected(initialGame?.type)
        setActive(true);
    }, [initialGame]);

    const handleGenerateNumbers = useCallback((range: number) => {//generate numbers of range bets
        const numberArr = [];
        for (let i = 1; i <= range; i++) {
            numberArr.push(i);
        }
        return setNumbers(numberArr);
    }, []);

    useEffect(() => {//run function generate numbers of game
        handleGenerateNumbers(Number(infoGame.map(game => game?.range)));
    }, [infoGame, handleGenerateNumbers]);

    useEffect(() => {//after user selected game set information on array 
        setInfoGame(betsState.filter(game => { return gameSelected === game.type }));
    }, [betsState, gameSelected]);

    const handleClickInButtonChooseGame = useCallback((gameName: string) => {
        setGameSelected(gameName);
        setNumbersUser([]);
        setActive(true);
    }, []);


    const handleUserChoseNumber = useCallback((e: number) => {//user selected number 
        const limit = infoGame.map(game => game.maxNumber);
        const check = numbersUser.find(numb => numb === Number(e));
        if (numbersUser.length === Number(limit)) {

        }
        if (numbersUser.length < Number(limit)) {
            if (check) {


                // numbersUser.splice(findIndex, 1);
            } else {
                setNumbersUser([...numbersUser, Number(e)]);
            }
        }
    }, [numbersUser, infoGame]);


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
                                removeActive={() => console.log()}
                            >{game.type}</ButtonGames>
                        ))}
                    </ViewButtonGame>
                }
                {numbersUser.length === 0
                    ?
                    <ViewDescription>
                        <TitleDescription>Fill your bet</TitleDescription>
                        {infoGame.map(item => (
                            <BetDescription key={item?.id}>{item?.description}</BetDescription>
                        ))}
                    </ViewDescription>
                    :
                    <ViewNumberSelected>
                        {numbersUser.map(item => (
                            <NumberSelected
                                key={item.valueOf()}
                                onPress={() => handleUserChoseNumber(item)}
                                color={numbersUser.some(i => i === item) ? String(colorGame) : ''}
                                valueNumber={item > 9 ? String(item) : '0' + item}
                            />
                        ))}
                    </ViewNumberSelected>

                }
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                    <View style={{ borderWidth: 4, borderRadius: 15, borderColor: '#C1C1C1', width: 46, }} />
                </View>
                <ScrollNumbers>
                    <ViewNumbers>
                        {numbers.map(item => (
                            <Numbers
                                key={item.valueOf()}
                                onPress={() => handleUserChoseNumber(item)}
                                color={numbersUser.some(i => i === item) ? String(colorGame) : ''}
                                valueNumber={item > 9 ? String(item) : '0' + item}
                            />
                        ))}
                    </ViewNumbers>
                </ScrollNumbers>
            </Container>
        </>
    )
}

export default NewBet;