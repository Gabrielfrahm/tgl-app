import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import { View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Container, FormView, Hr, Logo, Title, Button, ButtonText, TextForgotPassword, TextSignUp } from './styles';
import Footer from '../../components/Footer';
const SingIn = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(() => {
        console.log('dalae')
    }, [])
    return (
        <Container>
            <Logo>TGL</Logo>
            <Hr />
            <Title>Authentication</Title>
            <Form ref={formRef} onSubmit={handleSubmit}>
                <FormView >
                    <Input
                        name="email"
                        placeholder="Email"
                        placeholderTextColor="#9D9D9D"
                    />
                    <View style={{ borderWidth: 1, borderColor: '#EBEBEB' }} />
                    <Input
                        name="password"
                        placeholder="password"
                        placeholderTextColor="#9D9D9D"
                        secureTextEntry
                    />
                    <View style={{ borderWidth: 1, borderColor: '#EBEBEB' }} />
                    <TextForgotPassword>I forget my password</TextForgotPassword>
                    <Button onPress={() => {
                        formRef.current?.submitForm()
                    }}>
                        <ButtonText>
                            Log in <AntDesign name="arrowright" size={30} color="#B5C401" />
                        </ButtonText>
                    </Button>
                </FormView>
                <Button onPress={() => {
                    // formRef.current?.submitForm()
                }}>
                    <TextSignUp>
                        Sing Up <AntDesign name="arrowright" size={30} color="#707070" />
                    </TextSignUp>
                </Button>
            </Form>
            <Footer />
        </Container>
    )
}

export default SingIn;