import React  from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import {Container, TextButton} from './styles'

type ButtonProps = RectButtonProperties & {
    color: string;
    isActive?: boolean; 
}

const ButtonGames: React.FC<ButtonProps> = ({
    children, color, isActive, ...rest
}) => {
    return (
        <Container isActive={isActive} color={color} {...rest}>
            <TextButton isActive={isActive} color={color} >{children}</TextButton>
        </Container>
    );
}

export default ButtonGames; 