import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { AntDesign, } from '@expo/vector-icons';
import { Container, ButtonText } from './styles';
interface ButtonProps extends RectButtonProperties {
  children: string;
  loading?: boolean;
}

const PrincipalButton: React.FC<ButtonProps> = ({ children, loading ,...rest }) => {
  return (
    <Container  {...rest}>
      <ButtonText>
        {loading ? 'Carregando...' : children +' ' }
        {loading ? '' : <AntDesign name="arrowright" size={30} color="#B5C401" />}
        
      </ButtonText>
    </Container>
  );
}

export default PrincipalButton;
