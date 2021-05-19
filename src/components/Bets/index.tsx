import React from 'react';
import {View} from 'react-native';
import { formatValue } from '../../utils/formatValue';
import { Container,Content,Numbers,TextBetType,TextDate } from './styles';

interface BetProps {
    numbers: string;
    date: string;
    betType: string;
    color: string;
    price: string;
}

const Bets: React.FC<BetProps> = ({ numbers, date, betType, color, price }) => {
    return (
        <Container>
            <Content color={color}>
                <Numbers>{numbers}</Numbers>
                <TextDate>{date} - {price}</TextDate>
                <TextBetType color={color}>{betType}</TextBetType>
            </Content>
        </Container>
    )
}

export default Bets;