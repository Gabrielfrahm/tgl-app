import React from 'react'
import { Text } from 'react-native'
import { Container } from './styles'

const Footer = () => {
    return (
        <Container>
            <Text style={{ color: '#707070', fontSize: 15,}}>
                Copyright 2020 Luby Software
            </Text>
        </Container>
    )
}

export default Footer;