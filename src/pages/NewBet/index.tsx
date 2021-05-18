import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { GamesProps } from '../../store/modules/games/types';
import { loadGames } from '../../store/modules/games/action';
import api from '../../services/api';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-tiny-toast';

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
    ViewButton,
    ButtonCompleteGame,
    TextCompleteGame,
    ButtonClearGame,
    ButtonAddGame,
    TextAddGame
} from './styles';
import { addProductToCartRequest } from '../../store/modules/itemCart/action';
import { Item } from '../../store/modules/itemCart/type';


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

    const itensInCart = useSelector<IState, Item[]>(state => {//state item in cart
        return state.itemCart.items;
    })

    const cartPrice = useSelector<IState>(state => {//state cart price
        return state.itemCart.price;
    })

    console.log(itensInCart);
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
            Toast.show('voce ja tem o numero limite de números para esse jogo', {
                position: Toast.position.CENTER,
                containerStyle: { backgroundColor: 'red', width: 300 },
                textStyle: { fontSize: 20 },
                mask: true
            });
        }
        if (numbersUser.length < Number(limit)) {
            if (check) {
                Toast.show('voce ja tem o esse número para esse jogo', {
                    position: Toast.position.CENTER,
                    containerStyle: { backgroundColor: 'red', width: 300 },
                    textStyle: { fontSize: 20 },
                    mask: true
                });

            } else {
                setNumbersUser([...numbersUser, Number(e)]);
            }
        }
    }, [numbersUser, infoGame]);

    const handleGenerateBet = useCallback(() => {//generate numbers of bets
        let bet: number[] = [];
        const range = infoGame.map(game => { return game.range });
        const limit = infoGame.map(game => { return game.maxNumber });
        let arrLength = Number(limit) - numbersUser.length;
        if (numbersUser.length > 0) {
            for (let i = 1; i <= arrLength; i++) {
                let number = Math.ceil(Math.random() * Number(range));
                let check = bet.some(item => {
                    return item === number;
                });
                let check2 = numbersUser.some(item => {
                    return item === number;
                })

                if (check || check2) {
                    i--;
                } else {
                    bet.push(number);
                }
            }
            bet = bet.concat(numbersUser);
            setNumbersUser(bet);
            return bet;
        }

        for (let i = 1; i <= Number(limit); i++) {
            let number = Math.ceil(Math.random() * Number(range));
            let check = bet.some(item => {
                return item === number;
            });

            let check2 = numbersUser.some(item => {
                return item === number;
            })

            if (check || check2) {
                i--;
            } else {
                bet.push(number);
            }
        }

        setNumbersUser(bet);
        return bet;
    }, [numbersUser, infoGame]);

    const handleClearGame = useCallback(() => {//clear the game 
        if (numbersUser.length !== 0) {
            setNumbersUser([]);
        } else {
            Toast.show('selecione um jogo para limpar', {
                position: Toast.position.CENTER,
                containerStyle: { backgroundColor: 'red', width: 300 },
                textStyle: { fontSize: 20 },
                mask: true
            });
        }
    }, [Toast, numbersUser]);

    const handleRemoveNumber = useCallback((e: number) => {
        const findIndex = numbersUser.findIndex(item => item === e);
        if (findIndex !== -1) {
            numbersUser.splice(findIndex, 1);
        }
        setNumbersUser([...numbersUser]);
    }, [numbersUser]);

    const handleAddGameCart = useCallback(() => {//add item  in state cart
        if (Number(infoGame.map(game => game.maxNumber)) === numbersUser.length) {
            dispatch(addProductToCartRequest({
                id: Number(infoGame.map(game => game.id)),
                color: String(colorGame),
                // numbers: numbersUser.sort(compareNumbers).join(','),
                numbers: String(numbersUser.sort().map(numb => {
                    return numb < 10 ? '0' + numb : numb;
                })),
                type: String(infoGame.map(game => game.type)),
                price: Number(infoGame.map(game => game.price)),
                created_at: new Date(),
            }))
            setNumbersUser([]);
            // addToast({
            //     type: 'success',
            //     title: 'Adicionado no carrinho',
            //     description: 'Você adicionou um jogo ao carrinho',
            // })
        } else {
            // addToast({
            //     type: 'info',
            //     title: 'antes de adicionar no carrinho selecione todos os números',
            // })
        }
    }, [dispatch, colorGame, infoGame, numbersUser]);

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
                    <>
                        <ViewNumberSelected>
                            {numbersUser.map(item => (
                                <NumberSelected
                                    key={item.valueOf()}
                                    onPress={() => handleRemoveNumber(item)}
                                    color={numbersUser.some(i => i === item) ? String(colorGame) : ''}
                                    valueNumber={item > 9 ? String(item) : '0' + item}
                                />
                            ))}
                        </ViewNumberSelected>
                        <ViewButton>
                            <ButtonCompleteGame onPress={handleGenerateBet}><TextCompleteGame>Complete game</TextCompleteGame></ButtonCompleteGame>
                            <ButtonClearGame onPress={handleClearGame}><TextCompleteGame>Clear game</TextCompleteGame></ButtonClearGame>
                            <ButtonAddGame onPress={handleAddGameCart}><TextAddGame><Ionicons name="cart-outline" size={19} color="#fff" /> Add to cart</TextAddGame></ButtonAddGame>
                        </ViewButton>
                    </>
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