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
    margin: 10px;
    


    ${props => props.color && 
        css `
            background: ${props.color};
        `
    }
`;

export const Value = styled.Text`
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
`;