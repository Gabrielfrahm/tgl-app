import React, { useCallback, useEffect, useState } from 'react';
import Header from '../../components/Header';
import ButtonGames from '../../components/ButtonGames';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { GamesProps } from '../../store/modules/games/types';
import { loadGames } from '../../store/modules/games/action';
import { DashHeader, Title, SubTitle, ViewButtonGame, ViewBets } from './styles';
import Backdrop from '../../components/Backdrop';


const Dashboard = () => {

    useEffect(() => {
        dispatch(loadGames());
    }, [])

    // games
    const betsState = useSelector<IState, GamesProps[]>(state => {
        return state.games.games;
    });

    // erro games
    const errorState = useSelector<IState>(state => {
        return state.games.error;
    });
    console.log(errorState);

    const dispatch = useDispatch();

    const [active, setActive] = useState(false);
    const [gameSelected, setGameSelected] = useState('');
    const [show, setShow] = useState(true);

    const handleClickButtonGameFilter = useCallback((gameName: string) => {
        setActive(!active);
        setGameSelected(gameName);
    }, [active]);

    const handleDrawerClosed = useCallback(() => {
        if (errorState) {
            dispatch(loadGames());
            // api.get('/game/bets').then(
            //     response => {
            //         setGames(response.data)
            //     }
            // );

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



                <ViewBets></ViewBets>
            </DashHeader>
        </>
    )
}


export default Dashboard;