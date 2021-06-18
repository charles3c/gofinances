import React from 'react'
import { RectButtonProps } from 'react-native-gesture-handler'
import {
    Container,
    Button,
    Icon,
    Title,
} from './styled'

interface ButtonProps  extends RectButtonProps{
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
        <Container isActive={isActive} type={type}>
            <Button {...rest}>
                <Icon type={type} name={iconType[type]}/>
                <Title>{title}</Title>
            </Button>
        </Container>
    )
}