import React from 'react';
import Header from '../../components/Header';
import ButtonGames from '../../components/ButtonGames';

import { DashHeader,Title,SubTitle } from './styles';

const Dashboard = () => {
    return (
        <>
            <Header />
            <DashHeader>
                <Title>RECENT GAMES</Title>
                <SubTitle>Filters</SubTitle>
                <ButtonGames color="red"  isActive={false} > jogo 1</ButtonGames>
            </DashHeader>
        </>
    )
}


export default Dashboard;