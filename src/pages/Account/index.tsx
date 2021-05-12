import React, { useCallback, useRef, useState } from 'react';
import Header from '../../components/Header';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/Auth';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import api from '../../services/api';
import Toast from 'react-native-tiny-toast';
import PrincipalButton from '../../components/PrincipalButton';
import Input from '../../components/Input';

import { FontAwesome } from '@expo/vector-icons';
import { Container, Title, FormView } from './styles';
import { TouchableOpacity, View } from 'react-native';

interface AccountForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

const Account: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const InputPasswordRef = useRef(null);
    const InputPasswordConfirmationRef = useRef(null);
    const [hidePassword, setHidePassword] = useState(true);
    const [hidePasswordConfirmation, setHidePasswordConfirmation] = useState(true);

    const handleHidePassword = useCallback(() => {
        setHidePassword(!hidePassword);
    }, [hidePassword]);

    const handleHidePasswordConfirmation = useCallback(() => {
        setHidePasswordConfirmation(!hidePasswordConfirmation);
    }, [hidePasswordConfirmation]);

    const HandleSubmit = useCallback(async (data: AccountForm) => {
        try {
            console.log(data.name);
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome Obrigatório'),
                email: Yup.string()
                    .required('E-Mail Obrigatório')
                    .email('Digite um Email valido'),
                password: Yup.string().required('Senha obrigatória'),
                password_confirmation: Yup.string().oneOf(
                    [Yup.ref('password')],
                    'as senhas nao batem',
                ),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            setLoading(true);
            await api.put(`/users/${user.id}`, data);
            Toast.showSuccess('Success update info user', {
                position: Toast.position.CENTER,
                containerStyle: { backgroundColor: 'green' },
                textStyle: { fontSize: 15 },
                mask: true
            });
            setLoading(false);
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

    }, [Toast])

    return (
        <>
            <Header />
            <Container>
                <Title>Account</Title>

                <Form ref={formRef} onSubmit={HandleSubmit} initialData={{ name: user.name, email: user.email }}>
                    <FormView>
                        <Input
                            name="name"
                            selectionColor={'#B5C401'}
                        
                        />
                        <View style={{ borderWidth: 1, borderColor: '#EBEBEB' }} />
                        <Input
                            name="email"
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
                        <Input
                            ref={InputPasswordConfirmationRef}
                            name="password_confirmation"
                            placeholderTextColor="#9D9D9D"
                            secureTextEntry={hidePasswordConfirmation}
                            selectionColor={'#B5C401'}
                        />
                        <TouchableOpacity
                            onPress={() => handleHidePasswordConfirmation()}
                            style={{ position: 'absolute', bottom: 105, right: 50, }}>
                            {hidePasswordConfirmation ? <FontAwesome name="eye" size={24} color="#9D9D9D" /> : <FontAwesome name="eye-slash" size={24} color="#9D9D9D" />}
                        </TouchableOpacity>
                        <View style={{ borderWidth: 1, borderColor: '#EBEBEB' }} />
                        <PrincipalButton onPress={() => formRef.current?.submitForm()} loading={loading}>
                            confirmed
                        </PrincipalButton>
                    </FormView>
                </Form>
            </Container>
        </>
    )
}

export default Account;