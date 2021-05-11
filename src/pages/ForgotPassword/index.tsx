import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import { View, Alert, ToastAndroid } from 'react-native';
import { AntDesign, } from '@expo/vector-icons';
import Footer from '../../components/Footer';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import Toast from 'react-native-tiny-toast'
import { Container, FormView, Hr, Logo, Title, Button, ButtonText, TextForgotPassword, TextSignUp } from './styles';

interface ForgotPassword {
    email: string;
}

const ForgotPassword = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    // const toast = Toast.showLoading('Loading...')


    const handleSubmit = useCallback(async (data: ForgotPassword) => {
        try {
            // Toast.showLoading('Loading...', {visible: true});
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().email('Digite um email valido').required('E-mail obrigatório'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/forgot-password', data);
            Toast.showSuccess('Link enviado com sucesso', {
                position: Toast.position.CENTER,
                containerStyle: {backgroundColor: 'green'},
                textStyle: {fontSize: 20},
                mask: true,
                maskStyle: {},
            });
            Toast.showLoading('Loading...').hide();
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }
            Toast.show(err.message, {
                position: Toast.position.CENTER,
                containerStyle: {backgroundColor: 'red'},
                textStyle: {fontSize: 15},
                mask: true
            });
        }
    }, [Toast]);

    return (
        <>
            <Container>
                <Logo>TGL</Logo>
                <Hr />
                <Title>Reset password</Title>
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <FormView >

                        <Input
                            name="email"
                            placeholderTextColor="#9D9D9D"
                            selectionColor={'#B5C401'}
                        />
                        <View style={{ borderWidth: 1, borderColor: '#EBEBEB' }} />

                        <Button onPress={() => {
                            formRef.current?.submitForm()
                        }}>
                            <ButtonText>
                                Send link <AntDesign name="arrowright" size={30} color="#B5C401" />
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
                    <Button onPress={() => {
                        navigation.navigate("signUp");
                    }}>
                        <TextSignUp>
                            Sign up<AntDesign name="arrowright" size={30} color="#707070" />
                        </TextSignUp>
                    </Button>
                </Form>
                <Footer />
            </Container>
        </>
    )
}

export default ForgotPassword;