import React  from 'react';
import { ButtonProperties} from 'react-native';
import {Container, TextButton, TextX} from './styles'

type ButtonProps = ButtonProperties & {
    color: string;
    isActive?: boolean | undefined;
    removeActive?: () => void; 
}

const ButtonGames: React.FC<ButtonProps> = ({
    children, color, isActive, removeActive ,...rest
}) => {
    return (
        <Container  isActive={isActive} color={color} {...rest}>
            {isActive && <TextX onPress={removeActive} >x</TextX> }
            <TextButton isActive={isActive} color={color} >{children}</TextButton>
        </Container>
    );
}

export default ButtonGames; 