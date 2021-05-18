import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 25px;
    height: 90%;
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
    height: 60px;
`;
export const ViewNumberSelected = styled.ScrollView.attrs({
    contentContainerStyle: { paddingHorizontal: 0 },
    horizontal: true,
    showsHorizontalScrollIndicator: false,
})`
    height: 80px;
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
    contentContainerStyle: { paddingVertical: 0 },
    showsVerticalScrollIndicator: false,
})`

`;

export const ViewNumbers = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    padding: 0 18px;
`;