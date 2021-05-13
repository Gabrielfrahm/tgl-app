import React, { useCallback, useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import Header from '../../components/Header';
import ButtonGames from '../../components/ButtonGames';
import Backdrop from '../../components/Backdrop';
import api from '../../services/api';
import Bets from '../../components/Bets';
import { formatValue } from '../../utils/formatValue';
import { formatDate } from '../../utils/formatDate';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { GamesProps } from '../../store/modules/games/types';
import { loadGames } from '../../store/modules/games/action';
import { DashHeader, Title, SubTitle, ViewButtonGame, ViewBets } from './styles';
import { View } from 'react-native';



export interface ShowBetsProps {
    id: number;
    color: string;
    type: string;
    price: number;
    numbers: string;
    created_at: Date;
    game: GamesProps;
};


const Dashboard = () => {

    const dispatch = useDispatch();

    // games
    const betsState = useSelector<IState, GamesProps[]>(state => {
        return state.games.games;
    });

    const [gameSelected, setGameSelected] = useState('');

    useEffect(() => {
        dispatch(loadGames());
    }, [dispatch]);

    useEffect(() => {
        api.get('/game/bets').then(
            response => {
                setGames(response.data)
            }
        );
    }, []);

    useEffect(() => {//initial bet
        betsState.filter(item => item.type === gameSelected ?
            api.get(`/game/bets/${item.id}`).then(
                response => {
                    setGameFind(response.data)
                }
            )
            : []
        );
    }, [betsState, gameSelected]);

    // erro games
    const errorState = useSelector<IState>(state => {
        return state.games.error;
    });

    const [active, setActive] = useState(false);

    const [show, setShow] = useState(true);
    const [games, setGames] = useState<ShowBetsProps[]>([]);
    const [gameFind, setGameFind] = useState<ShowBetsProps[]>([]);

    const handleClickButtonGameFilter = useCallback((gameName: string) => {
        setActive(!active);
        dispatch(loadGames());
        setGameSelected(gameName);
    }, [active]);

    const handleDrawerClosed = useCallback(() => {
        if (errorState) {
            dispatch(loadGames());
            api.get('/game/bets').then(
                response => {
                    setGames(response.data)
                }
            );

        } else {
            // setShow(true);
            setShow(false);
        }
    }, [errorState, dispatch,]);

    return (
        <>
            <Header />
            <DashHeader>
                <Title>RECENT GAMES</Title>
                <SubTitle>Filters</SubTitle>
                {errorState ? <Backdrop show={show} clicked={handleDrawerClosed} ><Title>Error</Title></Backdrop> :
                    <ViewButtonGame>
                        {betsState.map(game => (
                            <ButtonGames
                                key={game.type}
                                onPress={() => handleClickButtonGameFilter(game.type)}
                                title={game.type}
                                color={game.color}
                                isActive={gameSelected === game.type ? active : false}
                            >{game.type}</ButtonGames>
                        ))}
                    </ViewButtonGame>
                }


                <ViewBets>
                    {games.map(item => (
                        <Bets
                            key={item.numbers}
                            price={formatValue(item.price)}
                            color={item.game.color}
                            numbers={item.numbers}
                            date={formatDate(String(item.created_at))}
                            betType={item.game.type}
                        />
                    ))}
                </ViewBets>

            </DashHeader>
        </>
    )
}


export default Dashboard;