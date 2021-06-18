import React, { useState, useEffect } from 'react';
import { Alert, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import uuid from 'react-native-uuid'

import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native'

import { TransactionTypeButton } from '../components/Form/TransactionTypeButton';
import { Button } from '../components/Form/Button';
import { CategorySelectButton } from '../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect';
import { InputForm } from '../components/Form/InputForm';

import {
    Container,
    Header,
    Title,
    Form,
    Field,
    TransactionType,
} from './styled'

const schema = yup.object().shape({
    name: yup
        .string()
        .required('Nome é obrogatório'),
        amount: yup
        .number()
        .typeError('Informe um valor númerico')
        .positive('O valor nao pode ser negativo')
        .required('Preço é obrogatório'),
});

interface SubmitProps {
  name: string;
  amount: string;
}

export function Register() {
    const [transactionType, setTransactinType] = useState('')
    const [categoryModalOpen, setCategoryModalOpel ] = useState(false)
    const [category, setCategory] = useState({
        key: 'Category',
        name: 'Category',
    })
    const navigation = useNavigation()


    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    })

    function handleTransactionTypeSelect(type: 'positive'|'negative') {
      setTransactinType(type)
    };

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpel(true)
    }
    
    function handleCloseSelectCategoryModal() {
      setCategoryModalOpel(false)
    }

    async function handleRegister(form: SubmitProps) {
      
        if (!transactionType)
            return Alert.alert('','Selecione o tipo da transaçao.')
      
        if (category.name === 'Category')
            return Alert.alert('','Selecione a Categoria.')

        const newTransaction = {
        id: String(uuid.v4()),
        name: form.name,
        amount: form.amount,
        type: transactionType, 
        category: category.key,
        date: new Date()
      }
      
        try {
            const dataKey = '@gofinances:transaction'

            const data = await AsyncStorage.getItem(dataKey);
            const currentDate = data ? JSON.parse(data) : [];

            const dataFormat = [
                ...currentDate,
                newTransaction
            ]
                
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormat));
            
            setTransactinType('');
            setCategory({
                key: 'Category',
                name: 'Category',
            })
            reset();

            navigation.navigate('Listagem');

      } catch (error) {
            Alert.alert('', 'Não foi possivel salvar');
            console.log(error);
      }
    }

    return (
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Form>
                <Field>
                    <InputForm
                        control={control}
                        name='name'
                        placeholder='Nome'
                        autoCapitalize='sentences'
                        error={errors.name && errors.name.message}
                    />
                    <InputForm
                        control={control}
                        name='amount'
                        placeholder='Preço'
                        error={errors.amount && errors.amount.message}
                    />
                    <TransactionType>
                        <TransactionTypeButton
                            onPress={() => handleTransactionTypeSelect('positive')}
                            type='positive'
                            title='Income'
                            isActive={transactionType === 'positive'}
                            activeOpacity={0.7}
                        />
                        <TransactionTypeButton
                            onPress={() => handleTransactionTypeSelect('negative')}
                            type='negative'
                            title='Outcome'
                            isActive={transactionType === 'negative'}
                            activeOpacity={0.7}
                        />
                    </TransactionType>
                    <CategorySelectButton
                        title={category.name}
                        onPress={handleOpenSelectCategoryModal}
                        activeOpacity={0.5}
                    />
                </Field>
          <Button
            onPress={handleSubmit(handleRegister)}
            title='Enviar'
            
          />
            </Form>
            <Modal visible={categoryModalOpen}>
                <CategorySelect
                    category={category}
                    setCategory={setCategory}
                    closeSelectCategory={handleCloseSelectCategoryModal}
                />
            </Modal>
        </Container>
    )
}