import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import { View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Footer from '../../components/Footer';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../hooks/Auth';
import PrincipalButton from '../../components/PrincipalButton';
import Toast from 'react-native-tiny-toast';
import LottieView from 'lottie-react-native';
import teste from '../../assets/cover1.json';
import { Animated, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store';
import { loadGames } from '../../store/modules/games/action';
import Backdrop from '../../components/Backdrop';

import { Container, FormView, Hr, Logo, Title, Button, TextForgotPassword, TextSignUp, Cover, CoverFor, CoverLottery } from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SingIn: React.FC = () => {
    const errorState = useSelector<IState>(state => {
        return state.games.error;
    });
    const formRef = useRef<FormHandles>(null);
    const [hidePassword, setHidePassword] = useState(true);
    const [loading, setLoading] = useState(false);
    const InputPasswordRef = useRef(null);
    const navigation = useNavigation();
    const { signIn } = useAuth();
    const [animation] = useState(new Animated.Value(0));
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);

    useEffect(() => {
        Animated.timing(animation, { toValue: 0, duration: 1000, useNativeDriver: true }).start();
        Animated.timing(animation, { toValue: 0, duration: 1000, useNativeDriver: true }).start();
        setActive(true);
    }, [])

    const onPressAnimation = () => {
        Animated.timing(animation, { toValue: 1000, duration: 1000, useNativeDriver: true }).start();
    }

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
                setLoading(true);
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

    const handleDrawerClosed = useCallback(() => {
        if (errorState) {
            dispatch(loadGames());
        } else {
            setShow(false);
        }
    }, [errorState, dispatch,]);

    return (
        <>
            {loading && (
                <View style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    position: 'absolute',
                    zIndex: 3,
                    backgroundColor: 'rgba(221, 221, 221, 0.8)',
                }}>
                    <ActivityIndicator size={200} style={{}} color="#B5C401" />
                </View>
            )}
            {errorState && <Backdrop show={show} clicked={handleDrawerClosed} ><Title style={{ color: '#b03b03', textAlign: 'center', width: '80%', backgroundColor: '#fff', }}>Ops algo deu errado, clique na tela, caso nao funcione,contate o administrador</Title></Backdrop>}
            {active && (
                <Animated.View onTouchStart={onPressAnimation} style={{
                    height: '100%',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    zIndex: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    transform: [{ translateY: animation }]
                }} >
                    <LottieView renderMode="SOFTWARE" source={teste} autoPlay loop duration={4000} style={{ justifyContent: 'center', alignItems: 'center' }} />
                    <Text style={{ color: '#000', position: 'absolute', top: 100, fontSize: 25, fontWeight: 'bold' }}>X</Text>
                    <Cover>The Geatest App</Cover>
                    <CoverFor>For</CoverFor>
                    <CoverLottery>LOTTERY</CoverLottery>
                </Animated.View>
            )}
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