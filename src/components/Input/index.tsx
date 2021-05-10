import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { useField } from '@unform/core';
import { TextInputProps } from 'react-native';
import { Container, TextInput } from './styles';
import {FloatingLabelInput} from 'react-native-floating-label-input';

interface InputProps extends TextInputProps {
    name: string;
    containerStyle?: {};
}

interface InputValueReference {
    value: string;
}

interface InputRef {
    focus(): void;
}


const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = ({ name, containerStyle = {}, ...rest }, ref) => {

    const inputElementRef = useRef<any>(null);

    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    const inputValueRef = useRef<InputValueReference>({ value: '' });

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);


    const handleInputFocus = useCallback(() => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback(() => {
        setIsFocused(false);

        setIsFilled(!!inputValueRef.current.value);
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        },
    }));

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value });
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        })
    }, [fieldName, registerField]);



    return (
        <Container style={containerStyle} isFocused={isFocused} isError={!!error}>
            <TextInput
                ref={inputElementRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                placeholderTextColor="#9D9D9D"
                onChangeText={value => {
                    inputValueRef.current.value = value;
                }}
                {...rest}
            />
            {/* <FloatingLabelInput
                label={''}
                ref={inputElementRef}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                defaultValue={defaultValue}
                placeholderTextColor="#9D9D9D"
                onChangeText={value => {
                    inputValueRef.current.value = value;
                }}
                {...rest} 
            /> */}
        </Container>
    )
}

export default forwardRef(Input);