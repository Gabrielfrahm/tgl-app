import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  isError: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #fff;
  border-bottom-width: 2px ;
  border-bottom-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  flex-direction: row;
  align-items: center;
  
  ${props => props.isError && css`
    border-bottom-color: #c53030;
  `}

  ${props => props.isFocused && css`
    border-bottom-color: #B5C401; 
  `}


`;

export const TextInput = styled.TextInput.attrs({
})`
  flex: 1;
  color: #9D9D9D;
  font-size: 15px;
  font-style: italic;
`;

