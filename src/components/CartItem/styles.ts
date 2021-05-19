import styled from 'styled-components/native';

interface GamesProps {
    color: string;
}

export const Container = styled.View`
    padding: 0 25px;
`;


export const GamesButtons = styled.TouchableOpacity`
    background-color: transparent;
    border: none;
    font-size: 24px;
    margin: 15px;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 1;
`;


export const WrapperBets = styled.View`
    width: 100% ;
    margin: 10px 0;
`;

export const SecondView = styled.View<GamesProps>`
    flex-direction: column;
    border-left-width: 6px;
    padding:  10px 8px;
    border-color: ${props => props.color};
    border-bottom-left-radius: 2px;
    border-top-left-radius: 2px;
`;

export const NumbersText = styled.Text`
    margin: 0 5px;
    color: #868686;
    font-size: 13px;
    font-style: italic;
    font-weight: bold;
    line-height: 18px;
`; 

export const ThirdDView = styled.View`
`;

export const PriceText = styled.Text`
    margin: 0 5px;
    color: #868686;
    font-size: 13px;
    font-style: italic;
    font-weight: 900;
    line-height: 18px;
`;


export const TypeGame = styled.Text<GamesProps>`
    color: ${props => props.color};
    font-weight: bold;
    margin: 5px;
    font-style: italic;
    font-size: 16px;
`;
