import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Text`
    font-size: 44px;
    color: #707070;
    font-weight: 700;
    font-style: italic;
    margin-top: 100px;
`;

export const Hr = styled.View`
    border: 4px solid #B5C401;
    width: 100px;
    border-radius: 6px;
`;

export const Title = styled.Text`
    margin-top: 46px;
    font-size: 35px;
    font-weight: bold;
    color: #707070;
    font-style: italic;
`;

export const FormView = styled.View`
    width: 80%;
    background: #FFFFFF;
    border-radius: 10px;
    border-width: 1px  ;
    border-color: #EBEBEB;
    margin-top: 26px;
`;


export const Button = styled.TouchableOpacity`
  height: 60px;
  background: transparent;
  border-radius: 10px;
  margin-top: 8px;
  margin-bottom: 10px;
  

  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #312e38;
  font-size: 18px;
  font-size: 30px;
  font-style: italic;
  font-weight: 700;
  color: #B5C401;
`;


export const TextForgotPassword = styled.Text`
    font-style: italic;
    color: #C1C1C1;
    text-align: right;
    margin: 24px;
`;

export const TextSignUp = styled.Text`
    font-style: italic;
    font-weight: 700;
    font-size: 30px;
    color: #707070;
    margin-top: 38px;
`;

export const Cover = styled.Text`
    margin-top: 50px;
    font-size: 45px;
    color: #707070;
    max-width: 200px;
    text-align: center;
    font-weight: bold;
    font-style: italic;
`;

export const CoverFor = styled.Text`
    background: #B5C401;
    width: 102px;
    height: 27px;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    border-radius: 15px;
    margin-top: 15px;
    font-style: italic;
`;

export const CoverLottery = styled.Text`
    font-size: 58px;
    letter-spacing: 5px;
    color: #707070;
    text-align: center;
    font-weight: bold;
    font-style: italic;
`;