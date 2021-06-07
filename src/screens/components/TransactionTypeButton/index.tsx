import React from 'react'
import { TouchableOpacityProps } from 'react-native'
import {
    Container,
    Icon,
    Title,
} from './styled'

interface ButtonProps  extends TouchableOpacityProps{
    type: 'positive' | 'negative',
    title: string,
    isActive: boolean,
}

const iconType = {
    positive: 'arrow-up-circle',
    negative: 'arrow-down-circle'
}

export function TransactionTypeButton({type, title, isActive, ...rest}: ButtonProps) {
    return (
        <Container {...rest} isActive={isActive} type={type}>
            <Icon type={type} name={iconType[type]}/>
            <Title>{title}</Title>
        </Container>
    )
}