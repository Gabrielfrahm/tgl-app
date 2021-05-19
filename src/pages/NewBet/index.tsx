import React, { useCallback, useEffect, useRef, useState } from 'react';
import Toast from 'react-native-tiny-toast';
import { useDispatch, useSelector } from 'react-redux';
import { addGamesFailure, addGamesRequest, addProductToCartRequest } from '../../store/modules/itemCart/action';
import { IState } from '../../store';
import { Item } from '../../store/modules/itemCart/type';
import { GamesProps } from '../../store/modules/games/types';
import { loadGames } from '../../store/modules/games/action';
import { Ionicons, AntDesign } from '@expo/vector-icons';

import { compareNumbers } from '../../utils/formSortArray';
import { formatValue } from '../../utils/formatValue';

import Header from '../../components/Header';
import ButtonGames from '../../components/ButtonGames';
import Backdrop from '../../components/Backdrop';
import Numbers from '../../components/Numbers';
import NumberSelected from '../../components/NumberSelected';
import CartItem from '../../components/CartItem';

import { View, Animated, Text, ActivityIndicator } from 'react-native';
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
    TextAddGame,
    ButtonCart,
    Notification,
    NotificationText,
    CartView,
    TitleCart,
    TotalCartText,
    TotalView,
    SubtitleTotal,
    PriceText,
    FinalButton,
    TextFinalButton
} from './styles';
import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';
import { useNavigation } from '@react-navigation/core';

export interface ItemCartProps {
    user_id: string;
    game_id: number;
    price: number;
    numbers: string;
}


const NewBet: React.FC = () => {
    useEffect(() => {
        dispatch(loadGames());
        setShow(true)
    }, []);

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
    });

    const cartPrice = useSelector<IState>(state => {//state cart price
        return state.itemCart.price;
    });

    const dispatch = useDispatch();

    const { user } = useAuth();

    const [animation] = useState(new Animated.Value(0));

    const [showAnimation, setShowAnimation] = useState(false);

    const navigation = useNavigation();

    const [loader, setLoader] = useState(false);

    const [active, setActive] = useState(false);

    const [show, setShow] = useState(true);

    const [gameSelected, setGameSelected] = useState('');

    const [infoGame, setInfoGame] = useState<GamesProps[]>([]);

    const [numbers, setNumbers] = useState<number[]>([]);
    const [numbersUser, setNumbersUser] = useState<number[]>([]);

    const colorGame = infoGame.map(game => { return game.color });

    useEffect(() => {
        setInfoGame([initialGame]);
        setGameSelected(initialGame?.type);
        setActive(true);
        Animated.timing(animation, { toValue: 1000, duration: 1000, useNativeDriver: true }).start();
    }, [Animated]);

    const handleGenerateNumbers = useCallback((range: number) => {
        const numberArr = [];
        for (let i = 1; i <= range; i++) {
            numberArr.push(i);
        }
        return setNumbers(numberArr);
    }, []);

    useEffect(() => {
        handleGenerateNumbers(Number(infoGame.map(game => game?.range)));
    }, [infoGame, handleGenerateNumbers]);

    useEffect(() => {
        setInfoGame(betsState.filter(game => { return gameSelected === game.type }));
        // setLoader(false);
    }, [betsState, gameSelected]);

    const handleClickInButtonChooseGame = useCallback((gameName: string) => {
        setGameSelected(gameName);
        setNumbersUser([]);
        setActive(true);
        // setLoader(true);

    }, []);

    const handleUserChoseNumber = useCallback((e: number) => {
        const limit = infoGame.map(game => game.maxNumber);
        const check = numbersUser.find(numb => numb === Number(e));
        if (numbersUser.length === Number(limit)) {
            Toast.show('limite de números', {
                position: Toast.position.CENTER,
                containerStyle: { backgroundColor: 'red', width: 300 },
                textStyle: { fontSize: 20 },
                mask: true
            });
        }
        if (numbersUser.length < Number(limit)) {
            if (check) {
                Toast.show('ja tem o esse número ', {
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

    const handleGenerateBet = useCallback(() => {
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
                numbers: String(numbersUser.sort(compareNumbers).map(numb => {
                    return numb < 10 ? '0' + numb : numb;
                })),
                type: String(infoGame.map(game => game.type)),
                price: Number(infoGame.map(game => game.price)),
                created_at: new Date(),
            }))
            setNumbersUser([]);
            Toast.showSuccess('adicionou ao carrinho', {
                position: Toast.position.CENTER,
                duration: 500,
                containerStyle: { backgroundColor: 'green', width: 300 },
                textStyle: { fontSize: 20 },
                mask: true
            });
        } else {
            Toast.show('selecione todos os números', {
                position: Toast.position.CENTER,
                duration: 1000,
                containerStyle: { backgroundColor: 'red', width: 300 },
                textStyle: { fontSize: 20 },
                mask: true
            });
        }
    }, [dispatch, colorGame, infoGame, numbersUser]);

    const handleOpenCart = useCallback(() => {
        Animated.timing(animation, { toValue: 0, duration: 1000, useNativeDriver: true }).start();
        setShowAnimation(true);
    }, []);

    const closedCart = useCallback(() => {
        Animated.timing(animation, { toValue: 1000, duration: 1000, useNativeDriver: true }).start();
    }, []);

    const handleSaveGame = useCallback(async () => {

        if (Number(cartPrice) >= 30) {
            setLoader(true);
            const itemInCart: ItemCartProps[] = [];
            itensInCart.map(item => {
                return itemInCart.push({
                    user_id: user.id,
                    game_id: item.id,
                    numbers: item.numbers,
                    price: item.price
                })
            });

            await api.post(`/game/bets`, { itemInCart }).then(
                response => {
                    if (response.data) {
                        dispatch(addGamesRequest(itensInCart));
                        Toast.showSuccess('apostas realizadas', {
                            position: Toast.position.CENTER,
                            containerStyle: { backgroundColor: 'green', width: 300 },
                            textStyle: { fontSize: 20 },
                            mask: true
                        });
                        setLoader(false);
                        closedCart();
                        navigation.navigate('Home');
                    }
                }
            ).catch(err => {
                return dispatch(addGamesFailure(err.message))
            });
        }
        if (Number(cartPrice) < 30) {
            Toast.show('faça jogos, ate chegar no valor de R$ 30,00', {
                position: Toast.position.CENTER,
                containerStyle: { backgroundColor: 'red', width: 300 },
                textStyle: { fontSize: 20 },
                mask: true
            });
        }
    }, [dispatch, itensInCart, cartPrice, Toast, user])


    const handleDrawerClosed = useCallback(() => {
        if (errorState) {
            dispatch(loadGames());
        } else {
            setShow(false);
        }
    }, [errorState, dispatch,]);

    return (
        <>
            {loader && (
                <View style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    position: 'absolute',
                    zIndex: 3,
                    backgroundColor: 'rgba(221, 221, 221, 0.8)',
                }}>
                    <ActivityIndicator size={200} style={{ }} color="#B5C401" />
                </View>
            )}
            {showAnimation && (
                <Animated.View style={{
                    height: '100%',
                    width: '100%',
                    // justifyContent: 'center',
                    alignItems: 'flex-end',
                    position: 'absolute',
                    zIndex: 3,
                    backgroundColor: 'rgba(221, 221, 221, 0.4)',
                    transform: [{ translateX: animation }]
                }}>
                    <View style={{ backgroundColor: '#fff', width: 265 }}>
                        <Text onPress={closedCart} style={{ color: '#B5C401', textAlign: 'right', paddingRight: 18, fontSize: 30, fontWeight: 'bold', }}>x</Text>
                    </View>
                    <TitleCart><Ionicons name="cart-outline" size={35} color="#B5C401" /> CART</TitleCart>
                    <CartView>
                        {itensInCart.map(item => (
                            <CartItem
                                key={item.numbers}
                                color={item.color}
                                type={item.type}
                                numbers={item.numbers}
                                price={item.price}
                                item={item}
                            />
                        ))}
                    </CartView>
                    <TotalView>
                        <TotalCartText>CART</TotalCartText>
                        <SubtitleTotal>TOTAL</SubtitleTotal>
                        <PriceText>{formatValue(Number(cartPrice))}</PriceText>
                    </TotalView>
                    <FinalButton onPress={handleSaveGame}>
                        <TextFinalButton>Save <AntDesign name="arrowright" size={24} color="#B5C401" /></TextFinalButton>
                    </FinalButton>
                </Animated.View>

            )}
            {itensInCart.length > 0 ? (
                <>
                    <ButtonCart onPress={handleOpenCart}><Ionicons name="cart-outline" size={35} color="#B5C401" /></ButtonCart>
                    <Notification><NotificationText>{itensInCart.length}</NotificationText></Notification>
                </>
            ) : null}
            <Header />
            <Container>
                <Title>NEW BET FOR LOTOMANIA</Title>
                <SubTitle>Choose a game</SubTitle>
                {errorState ? <Backdrop show={show} clicked={handleDrawerClosed} ><Title style={{color: '#b03b03', textAlign: 'center', width: '80%', backgroundColor: '#fff' ,}}>Ops algo deu errado, clique na tela, caso nao funcione,contate o administrador</Title></Backdrop> :
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