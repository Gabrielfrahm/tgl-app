import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isFocused: boolean;
  isError: boolean;
  isValue: string;
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

export const Label = styled.Text<ContainerProps>`
  position: absolute;
  margin: 15px;
  color: #999;
  font-size: 18px;
  font-weight: 700;
  font-style: italic;


  ${props => props.isFocused && css`
    color: #B5C401;
    font-size: 10px;
    margin: 5px;
    top: 0;
  `}

  ${props => props.isValue ? css`
    color: #B5C401;
    font-size: 10px;
    margin: 5px;
    top: 0;
    
  `: null}


`;