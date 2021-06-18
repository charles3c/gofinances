import React, { useState, useEffect, useCallback } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeling,
  UserName,
  LogoutButton,
  Icon,
  UserWrapper,
  HighlightCards,
  Transactions,
  Title,
  TransactionList,
} from './styles'

import { HighlightCard } from '../components/HighlightCard'
import { TransactonCard, TansactionCardProps } from '../components/TransactionCarde'

export interface DataListProps extends TansactionCardProps {
  id: string
}

export function Dashboard() {
  const [data, setData] = useState<DataListProps[]>([])

  async function loadTransactions() {
    const dataKey = '@gofinances:transaction'
    const response = await AsyncStorage.getItem(dataKey)
    const transactions = response ? JSON.parse(response) : []
    const transactionsFormatted: DataListProps[] = transactions
    .map((item: DataListProps) => {

      const currency = Number(item.amount)
      .toLocaleString('pt-BR', {
          style: 'currency',
        currency: 'BRL',
      });
      const amount = currency.replace('$', '$ ')
      const date = Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).format(new Date(item.date))

      return {
        id: item.id,
        name: item.name,
        amount,
        type: item.type,
        category: item.category,
        date
      }
      
    });

    setData(transactionsFormatted)
  }

  useEffect(() => {
    loadTransactions()
  }, [])
  
  useFocusEffect(useCallback(() => {
    loadTransactions()
  },[]))

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/60393927?v=4'}}/>
            <User>
              <UserGreeling>Olá,</UserGreeling>
              <UserName>Charles</UserName>
            </User>
          </UserInfo>
          <LogoutButton onPress={() => {}}>
            <Icon name='power' />
          </LogoutButton>
        </UserWrapper>
      </Header>

      <HighlightCards>

        <HighlightCard
          type='up'
          title='Entrada'
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
        />
        <HighlightCard
          type='down'
          title='Saida'
          amount='R$ 1.259,00'
          lastTransaction='Última saída dia 03 de abril'
        />
        <HighlightCard
          type='total'
          title='Total'   
          amount='R$ 16.141,00'
          lastTransaction='01 à 16 de abril'
        />
      </HighlightCards>

      <Transactions>
        <Title>Listagen</Title>

        <TransactionList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactonCard data={item} />}
        />
      </Transactions>

    </Container>
)}
