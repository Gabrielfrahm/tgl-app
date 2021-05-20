import React, { useCallback, useEffect, useState } from 'react';
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
import { loadGames, loadGamesFailure } from '../../store/modules/games/action';
import { Title, SubTitle, ViewButtonGame, ViewBets, Container } from './styles';

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
    // erro games
    const errorGamesState = useSelector<IState>(state => {
        return state.games.error;
    });

    // name game selected
    const [gameSelected, setGameSelected] = useState('');
    const [gameNames, setGameNames] = useState<String[]>([]);

    // active button game
    const [active, setActive] = useState(false);

    // show erro api
    const [show, setShow] = useState(true);

    // bets
    const [games, setGames] = useState<ShowBetsProps[]>([]);
    const [gameFilter, setGameFilter] = useState<ShowBetsProps[]>([]);
    useEffect(() => {
        dispatch(loadGames());

        api.get('/game/bets').then(
            response => {
                setGames(response.data);
            }
        ).catch(e => {
            dispatch(loadGamesFailure(true));
        }) 

        let arr: ShowBetsProps[] = [];
        gameNames.map(item => {
            return games.map(i => i.game.type === item ? arr = [...arr, i] : []);
        });

        setGameFilter(arr);
    }, [ dispatch,gameNames, ]);

   

    const handleClickButtonGameFilter = useCallback(async (gameName: string) => {
        setActive(true);
        dispatch(loadGames());
        setGameSelected(gameName);

        const findItem = gameNames.findIndex(i => {
            return gameName === i
        });

        if (findItem !== -1) {
            gameNames.splice(findItem, 1);
            setActive(false);
        } else {
            setGameNames([...gameNames, gameName]);
        }
        const count = gameFilter.filter(item => item.game.type === gameName);
        const findItemInGameFilter = gameFilter.findIndex(i => {
            return gameName === i.game.type;
        });
        if (findItemInGameFilter !== -1) {
            gameFilter.splice(findItemInGameFilter, count.length);
        }

    }, [gameNames, gameFilter]);

    const handleClickRemoveActive = useCallback((gameName: string) => {
        handleClickButtonGameFilter(gameName);
    }, [gameNames, gameFilter]);

    const handleDrawerClosed = useCallback(() => {
        if (errorGamesState) {
            dispatch(loadGames());
            api.get('/game/bets').then(
                response => {
                    setGames(response.data)
                }
            );
        } else {
            setShow(false);
        }
    }, [errorGamesState]);

    return (
        <>
            {errorGamesState && <Backdrop show={show} clicked={handleDrawerClosed} >
                <Title style={{color: '#b03b03', textAlign: 'center', width: '80%', backgroundColor: '#fff' ,}}>Ops algo deu errado, clique na tela, caso nao funcione,contate o administrador</Title>
                </Backdrop>
            } 
            <Header />
            <Container>
                <Title>RECENT GAMES</Title>
                <SubTitle>Filters</SubTitle>
                
                    <ViewButtonGame>
                        {betsState.map(game => (
                            <ButtonGames
                                key={game.type}
                                onPress={() => handleClickButtonGameFilter(game.type)}
                                title={game.type}
                                color={game.color}
                                isActive={
                                    !!(gameNames.find(item => { return item === game.type }))
                                }
                                removeActive={() => handleClickRemoveActive(game.type)}
                            >{game.type}</ButtonGames>
                        ))}
                    </ViewButtonGame>
                
            </Container>
            <ViewBets>
                    {gameFilter.length === 0 ?
                        games.length !== 0 ?
                            games.map(item => (
                                <Bets
                                    key={item.numbers}
                                    price={formatValue((item.price))}
                                    color={item.game.color}
                                    numbers={item.numbers}
                                    date={formatDate(String(item.created_at))}
                                    betType={item.game.type}
                                />
                            ))
                            : <Title>Voce nao tem jogos ainda</Title>
                        : gameFilter.map(item => (
                            <Bets
                                key={item.numbers}
                                price={formatValue(item.price)}
                                color={item.game.color}
                                numbers={item.numbers}
                                date={formatDate(String(item.created_at))}
                                betType={item.game.type}
                            />
                        ))
                    }
                </ViewBets>
        </>
    )
}

export default Dashboard;