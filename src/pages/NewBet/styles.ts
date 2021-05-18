import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 25px;
    /* height: 90%; */
    flex: 1;
`;

export const Title = styled.Text`
    font-size: 22px;
    color: #707070;
    font-weight: bold;
    font-style: italic;
`;

export const SubTitle = styled.Text`
    font-size: 17px;
    color: #868686;
    font-style: italic;
    margin: 15px 0 15px 0;
`;

export const ViewButtonGame = styled.ScrollView.attrs({
    contentContainerStyle: { paddingHorizontal: 0 },
    horizontal: true,
    showsHorizontalScrollIndicator: false,
})`
`;

export const ViewNumberSelected = styled.ScrollView.attrs({
    contentContainerStyle: { paddingHorizontal: 0 },
    horizontal: true,
    showsHorizontalScrollIndicator: false,
})`
    max-height: 100px;
`;

export const ViewButton = styled.View`
    flex-direction: row;
    justify-content: space-around;
`;

export const ViewDescription = styled.View`
    padding: 10px;
`;

export const TitleDescription = styled.Text`
    color: #868686;
    font-size: 17px;
    font-style: italic;
    font-weight: bold;
`;

export const BetDescription = styled.Text`
    font-size: 16px;
    color: #868686;
    font-style: italic;
    line-height: 25px;
`;

export const ScrollNumbers = styled.ScrollView.attrs({
    contentContainerStyle: { paddingVertical: 0, paddingHorizontal: 0 },
    showsVerticalScrollIndicator: false,
})`

`;

export const ViewNumbers = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    padding: 0 18px;
`;


export const ButtonCompleteGame = styled.TouchableOpacity`
    width: 110px;
    height: 32px;
    background: transparent;
    justify-content: center;
    border-width: 1px;
    border-color: #B5C401;
    border-radius: 5px;
`;

export const TextCompleteGame = styled.Text`
    color: #B5C401;
    font-size: 13px;
    font-weight: bold;
    text-align: center;

`;

export const ButtonClearGame = styled.TouchableOpacity`
    width: 110px;
    height: 32px;
    background: transparent;
    justify-content: center;
    border-width: 1px;
    border-color: #B5C401;
    border-radius: 5px;
`;

export const ButtonAddGame = styled.TouchableOpacity`
    width: 110px;
    height: 32px;
    background: #B5C401;
    justify-content: center;
    border-width: 1px;
    border-color: #B5C401;
    border-radius: 5px;
`;

export const TextAddGame = styled.Text`
    color: #fff;
    font-size: 13px;
    font-weight: bold;
    text-align: center;

`;