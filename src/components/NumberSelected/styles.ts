import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface ButtonProps {
    color?: string;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
    height: 40px;
    width: 40px;
    background-color : #ADC0C4;
    border-radius: 50px;
    margin: 0 10px 30px 0;
    ${props => props.color && 
        css `
            background: ${props.color};
        `
    }
`;

export const Value = styled.Text`
    color: #fff;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    margin-top: 13px;
`;

export const TextX = styled.Text`
    font-size: 15px;
    font-weight: bold ;
    font-style: italic;
    color: #fff;
    position: absolute;
    right: 6px;
    top: 0;
`;