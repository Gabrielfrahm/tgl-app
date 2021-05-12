import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
interface ButtonProps {
    color: string;
    isActive?: boolean;
}

export const Container = styled(RectButton) <ButtonProps>`
    width: 113px;
    height: 34px;
    border-width: 2px;
    border-radius: 25px;
    /* border-top-color: ${props => props.color}; */
    ${props => props.isActive &&
        css`
            background-color: ${props.color};
        `
    }
    justify-content: center;
    align-items: center;
`;

export const TextButton = styled.Text<ButtonProps>`
    font-size: 14px;
    font-weight: bold;
    font-style: italic;
    color: ${props => props.color};

    ${props => props.isActive &&
        css`
            color: #fff;
        `
    }
`;