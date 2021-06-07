import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;
export const Header = styled.View`
  width: 100%;
  height: ${RFValue(114)}px;
  background-color: ${({ theme }) => theme.colors.primary};
  justify-content: flex-end;
  align-items: center;
`;
export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.shape};
  margin-bottom: ${RFValue(18)}px;
`;
export const Form = styled.View`
  flex: 1;
  padding: 24px;
  justify-content: space-between;
`;
export const Field = styled.View``;

export const TransactionType = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 8px;
`;
