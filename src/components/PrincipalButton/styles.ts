import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
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
