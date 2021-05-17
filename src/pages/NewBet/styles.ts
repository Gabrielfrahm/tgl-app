import styled from 'styled-components/native';

export const Container = styled.View`
    padding: 25px;
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

export const ViewDescription = styled.View`
    
`;

export const TitleDescription = styled.Text`
    color: #868686;
    font-size: 17px;
    font-style: italic;
    font-weight: bold;
`;

export const BetDescription = styled.Text`
    font-size: 14px;
    color: #868686;
    font-style: italic;
    line-height: 20px;
`;