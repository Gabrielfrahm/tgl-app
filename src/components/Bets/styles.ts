import styled from 'styled-components/native';

interface BetProps {
    color: string;
}

export const Container = styled.View`
    height: 79px;
    margin-bottom: 15px;
`;

export const Content = styled.View<BetProps>`
    border-left-width: 6px;
    border-color: ${props => props.color};
    padding: 5px 10px;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
`;

export const Numbers = styled.Text`
    font-size: 15px;
    color: #868686;
    font-weight: bold;
    font-style: italic;
`;

export const TextDate = styled.Text`
    font-size: 12px;
    color: #868686;
    font-style: italic;
`;

export const TextBetType = styled.Text<BetProps>`
    font-size: 16px;
    color: ${props => props.color};
    font-style: italic;
    font-weight: bold;
`;