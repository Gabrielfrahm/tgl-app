import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import { View, TouchableOpacity, Text } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import { Container, FormView, Hr, Logo, Title, Button, ButtonText, TextForgotPassword, TextSignUp } from './styles';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
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
                <Title>Registration</Title>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <FormView >

                        <Input
                            name="name"
                            placeholderTextColor="#9D9D9D"
                            selectionColor={'#B5C401'}
                        />
                        <View style={{ borderWidth: 1, borderColor: '#EBEBEB' }} />

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
                            style={{ position: 'absolute', bottom: 100, right: 50, }}>
                            {hidePassword ? <FontAwesome name="eye" size={24} color="#9D9D9D" /> : <FontAwesome name="eye-slash" size={24} color="#9D9D9D" />}
                        </TouchableOpacity>

                        <View style={{ borderWidth: 1, borderColor: '#EBEBEB' }} />
                        <Button onPress={() => {
                            formRef.current?.submitForm()
                        }}>
                            <ButtonText>
                                Register <AntDesign name="arrowright" size={30} color="#B5C401" />
                            </ButtonText>
                        </Button>
                    </FormView>
                    <Button onPress={() => {
                        navigation.navigate("signIn");
                    }}>
                        <TextSignUp>
                            <AntDesign name="arrowleft" size={30} color="#707070" /> Back
                        </TextSignUp>
                    </Button>
                    
                </Form>
            <Footer />
        </Container>
        </>
    )
}

export default SignUp;