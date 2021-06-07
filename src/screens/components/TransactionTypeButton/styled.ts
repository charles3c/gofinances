import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  isActive: boolean;
  type: "positive" | "negative";
}

export const Container = styled(TouchableOpacity)<Props>`
  width: 48%;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

  padding: 16px;

  ${({ isActive, type }) =>
    isActive &&
    type === "positive" &&
    css`
      background-color: ${({ theme }) => theme.colors.success_light};
    `};

  ${({ isActive, type }) =>
    isActive &&
    type === "negative" &&
    css`
      background-color: ${({ theme }) => theme.colors.attention_light};
    `};
`;
export const Icon = styled(Feather)<Props>`
  font-size: 20px;
  margin-right: 12px;
  color: ${({ type, theme }) =>
    type === "positive" ? theme.colors.success : theme.colors.attention};
`;
export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
