import React from 'react'
import { FlatList } from 'react-native'

import { categories } from '../utils/categories'
import {Button} from '../components/Form/Button'

import {
    Container,
    Header,
    Title,
    Category,
    Icon,
    Name,
    Separator,
    Footer,
} from './styles'

interface Category {
    key: string;
    name: string;
}

interface Props {
    category: Category;
    setCategory: (category: Category) => void;
    closeSelectCategory: () => void;

    
}

export function CategorySelect({
    category,
    setCategory,
    closeSelectCategory
}: Props ) {
    return (
        <Container>
            <Header>
                <Title>Categoria</Title>
            </Header>
            <FlatList
                data={categories}
                renderItem={({item}) => (
                    <Category
                        onPress={() => setCategory(item)}
                        isActive={category.key === item.key}
                    >
                        <Icon name={item.icon}/>
                        <Name>{ item.name }</Name>
                    </Category>
                )}
                ItemSeparatorComponent={() => (
                    <Separator/>
                )}
            />
            <Footer>
                <Button
                    title='Selecionar'
                    activeOpacity={0.7}
                    onPress={closeSelectCategory}
                />
            </Footer>
        </Container>
    )
}