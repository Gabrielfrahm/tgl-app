import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import { View, TouchableOpacity, Text } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Footer';

import { Container, FormView, Hr, Logo, Title, Button, ButtonText, TextForgotPassword, TextSignUp } from './styles';

const SingIn = () => {
    const formRef = useRef<FormHandles>(null);
    const [hidePassword, setHidePassword] = useState(true);
    const InputPasswordRef = useRef(null);
    const navigation = useNavigation();

    const handleHidePassword = useCallback(() => {
        setHidePassword(!hidePassword);
    }, [hidePassword]);

    const handleSubmit = useCallback(() => {
        console.log('dalae')
    }, []);

    return (
        <>
            <Container>
                <Logo>TGL</Logo>
                <Hr />
                <Title>Authentication</Title>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <FormView >
                        
                        <Input
                            name="email"
                            placeholderTextColor="#9D9D9D"
                            selectionColor={'#B5C401'}
                        />
                        <View style={{ borderWidth: 1, borderColor: '#EBEBEB' }} />
                       
                        <Input
                            ref={InputPasswordRef}
                            name="password"
                            placeholderTextColor="#9D9D9D"
                            secureTextEntry={hidePassword}
                            selectionColor={'#B5C401'}
                        />
                        <TouchableOpacity
                            onPress={() => handleHidePassword()}
                            style={{ position: 'absolute', bottom: 165, right: 50, }}>
                            {hidePassword ? <FontAwesome name="eye" size={24} color="#9D9D9D" /> : <FontAwesome name="eye-slash" size={24} color="#9D9D9D" />}
                        </TouchableOpacity>

                        <View style={{ borderWidth: 1, borderColor: '#EBEBEB' }} />
                        <TextForgotPassword onPress={() => navigation.navigate('forgot-password')}>I forget my password</TextForgotPassword>
                        <Button onPress={() => {
                            formRef.current?.submitForm()
                        }}>
                            <ButtonText>
                                Log in <AntDesign name="arrowright" size={30} color="#B5C401" />
                            </ButtonText>
                        </Button>
                    </FormView>
                    <Button onPress={() => {
                        navigation.navigate('signUp');
                    }}>
                        <TextSignUp>
                            Sing Up <AntDesign name="arrowright" size={30} color="#707070" />
                        </TextSignUp>
                    </Button>
                </Form>
                <Footer />
            </Container>
        </>
    )
}

export default SingIn;