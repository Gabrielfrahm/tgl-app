import React from 'react';


import { Container, Value } from './styles';


interface ButtonProps {
    valueNumber: string;
    color?: string;
    onPress: () => void;
  }
  
const Numbers: React.FC<ButtonProps> = ({valueNumber, color , onPress}) => {

    return (
        <Container onPress={onPress} color={color} >
            <Value>{valueNumber}</Value>
        </Container>
    )
}

export default Numbers;
