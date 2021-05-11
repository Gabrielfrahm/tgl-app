import React, { useCallback, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import { View, TouchableOpacity, Alert } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Footer';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/Auth';

import { Container, FormView, Hr, Logo, Title, Button, TextForgotPassword, TextSignUp } from './styles';
import api from '../../services/api';
import PrincipalButton from '../../components/PrincipalButton';
import Toast from 'react-native-tiny-toast';

interface SignInFormData {
    email: string;
    password: string;
}

const SingIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const InputPasswordRef = useRef(null);
    const navigation = useNavigation();
    const { signIn } = useAuth();

    const handleHidePassword = useCallback(() => {
        setHidePassword(!hidePassword);
    }, [hidePassword]);


    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                formRef.current?.setErrors({});
                const schema = Yup.object().shape({
                    email: Yup.string().email('Digite um email valido').required('E-mail obrigatório'),
                    password: Yup.string().required('Senha obrigatório'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });
                
                await signIn({
                    email: data.email,
                    password: data.password,
                });

            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }
                setLoading(true);
                Toast.show(err.message, {
                    position: Toast.position.CENTER,
                    containerStyle: { backgroundColor: 'red' },
                    textStyle: { fontSize: 15 },
                    mask: true
                });
                setLoading(false);
            }
        }, [signIn, Toast, setLoading]);

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
                        <PrincipalButton
                            loading={loading}
                            onPress={() => formRef.current?.submitForm()}
                        >
                            Log In
                        </PrincipalButton>
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