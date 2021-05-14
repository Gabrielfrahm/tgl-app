import styled, { css } from 'styled-components/native';

interface ButtonProps {
    color: string;
    isActive?: boolean;
}

export const Container = styled.TouchableOpacity<ButtonProps>`
    width: 101px;
    height: 30px;
    border-width: 2px;
    border-color: ${props => props.color};
    border-radius: 25px;

    ${props => props.isActive &&
        css`
            background-color: ${props.color};
        `
    }
    justify-content: center;
    align-items: center;
    margin-right: 10px;
    margin-bottom: 10px;
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
export const TextX = styled.Text`
    font-size: 12px;
    font-weight: bold ;
    font-style: italic;
    color: #fff;
    position: absolute;
    right: 6px;
    top: 0;
`;