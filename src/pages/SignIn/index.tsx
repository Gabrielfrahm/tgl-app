import React, { useCallback, useRef } from 'react'

import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';

import { Container, Hr, Logo, Title } from './styles';

const SingIn = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(() => {
        console.log('dale')
    },[])
    return (
        <Container>
            <Logo>TGL</Logo>
            <Hr/>
            <Title>Authentication</Title>
           <Form ref={formRef} onSubmit={handleSubmit}>
               
           </Form>
        </Container>
    )
}

export default SingIn;