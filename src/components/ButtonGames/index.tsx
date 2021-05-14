import React  from 'react';
import { ButtonProperties} from 'react-native';
import {Container, TextButton, TextX} from './styles'

type ButtonProps = ButtonProperties & {
    color: string;
    isActive?: boolean;
    removeActive?: () => void; 
}

const ButtonGames: React.FC<ButtonProps> = ({
    children, color, isActive, ...rest
}) => {
    return (
        <Container  isActive={isActive} color={color} {...rest}>
            {isActive && <TextX >x</TextX> }
            <TextButton isActive={isActive} color={color} >{children}</TextButton>
        </Container>
    );
}

export default ButtonGames; 