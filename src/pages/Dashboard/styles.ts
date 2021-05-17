import styled from 'styled-components/native';


export const DashHeader = styled.View`
    flex:1;
    /* height: 185px; */
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
    contentContainerStyle: { paddingHorizontal: 0},
    horizontal: true,
    showsHorizontalScrollIndicator: false,
})`
`;

export const ViewBets = styled.ScrollView.attrs({
    contentContainerStyle: {   },
    showsVerticalScrollIndicator: false,
})`
    margin-top: 15px;
`; 