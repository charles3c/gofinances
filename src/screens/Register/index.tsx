import React, { useState } from 'react'
import { Input } from '../components/Form/Input'

import {TransactionTypeButton} from '../components/TransactionTypeButton'
import {Button} from '../components/Form/Button'
import {CategorySelect} from '../components/Form/CategorySelect'

import {
    Container,
    Header,
    Title,
    Form,
    Field,
    TransactionType,
} from './styled'

export function Register() {

    const [transactionType, setTransactinType] = useState('')

    function handleTransactionType(type: 'positive'|'negative') {
      setTransactinType(type)  
    };
// caraca 1233
    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Field>
                    <Input
                        placeholder='Nome'
                    />
                    <Input
                        placeholder='Preço'
                    />
                    <TransactionType>
                        <TransactionTypeButton
                            onPress={() => handleTransactionType('positive')}
                            type='positive'
                            title='Income'
                            isActive={transactionType === 'positive'} />
                        <TransactionTypeButton
                            onPress={() => handleTransactionType('negative')}
                            type='negative'
                            title='Outcome'
                            isActive={transactionType === 'negative'} />
                    </TransactionType>
                    <CategorySelect title='Categoria'/>
                </Field>
                <Button title='Enviar'/>
            </Form>
        </Container>
    )
}