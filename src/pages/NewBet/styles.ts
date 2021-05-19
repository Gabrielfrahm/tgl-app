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
    height: 70px;
`;

export const ViewNumberSelected = styled.ScrollView.attrs({
    contentContainerStyle: { paddingHorizontal: 0 },
    horizontal: true,
    showsHorizontalScrollIndicator: false,
})`
    height: 100px;
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

export const ButtonCart = styled.TouchableOpacity`
    position: absolute;
    z-index: 1;
    right: 80px;
    top: 26px;
`;

export const Notification = styled.View`
    position: absolute;
    z-index: 2;
    right: 70px;
    top: 26px;
    background-color: #b30;
    height: 20px;
    width: 20px;
    border-radius: 10px;
`;

export const NotificationText = styled.Text`
    color: #fff;
    text-align: center;
`;

export const CartView = styled.ScrollView`
    background-color: #fff;
    width: 265px;
`;

export const TitleCart = styled.Text`
    color: #707070;
    font-size: 22px;
    font-weight: bold;
    font-style:italic;
    padding: 10px 15px; 
    text-align: left;
    width: 265px;
    background-color: #fff;
`;

export const TotalView = styled.View`
    width: 265px;
    background-color: #fff;
    /* height: 150px; */
    flex-direction: row;
    padding: 18px 25px;
`;

export const TotalCartText = styled.Text`
    color: #707070;
    font-size: 15px;
    font-weight: bold;
    font-style: italic;
`;

export const SubtitleTotal = styled.Text`
    color: #707070;
    font-size: 15px;
    font-weight: 900;
    font-style: italic;
    margin-left: 5px;
`;

export const PriceText = styled.Text`
    color: #707070;
    font-size: 15px;
    font-weight: bold;
    font-style: italic;
    margin-left: 80px;
`;

export const FinalButton = styled.TouchableOpacity`
    width: 265px;
    align-items: center;
    justify-content: center;
    background-color: #EBEBEB;
    height: 96px;
    border: none;
    border-radius: 10px;
`;

export const TextFinalButton = styled.Text`
    font-size: 30px;
    font-weight: bold;
    color: #B5C401;
`;