import React from 'react';
import {  MaterialCommunityIcons  } from '@expo/vector-icons';
import { Item } from '../../store/modules/itemCart/type';
import { useDispatch } from 'react-redux';
import { formatValue } from '../../utils/formatValue';
import { removeProductToCart } from '../../store/modules/itemCart/action';
import { Container, WrapperBets, SecondView, ThirdDView, NumbersText, PriceText, TypeGame, GamesButtons } from './styles';
import { Text } from 'react-native';

interface ItemProps {
    color: string;
    type: string;
    price: number;
    numbers: string;
    item: Item;
}

const CartItem: React.FC<ItemProps> = ({color, type, price, numbers, item}) => {
    const dispatch = useDispatch();
    return (
        <Container>
    
            <WrapperBets>
                <GamesButtons onPress={() => dispatch(removeProductToCart(item))}><Text><MaterialCommunityIcons name="trash-can-outline" size={24} color="#707070" /></Text></GamesButtons>
                <SecondView color={color}>
                    <NumbersText>{numbers}</NumbersText>
                    <ThirdDView>
                        <PriceText>{formatValue(price)}</PriceText>
                        <TypeGame color={color}>{type}</TypeGame>
                    </ThirdDView>
                </SecondView>
            </WrapperBets>
        </Container>
    )
}

export default CartItem;
