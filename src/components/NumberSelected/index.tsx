import React from 'react';

import { Container, Value, TextX } from './styles';

interface ButtonProps {
    valueNumber: string;
    color?: string;
    onPress: () => void;
  }
  
const NumberSelected: React.FC<ButtonProps> = ({valueNumber, color ,  onPress}) => {

    return (
        <Container onPress={onPress} color={color} >
            <TextX onPress={onPress} >x</TextX> 
            <Value>{valueNumber}</Value>
        </Container>
    )
}

export default NumberSelected;
