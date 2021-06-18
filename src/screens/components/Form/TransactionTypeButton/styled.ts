import styled, { css } from "styled-components/native";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface Props {
  isActive: boolean;
  type: "positive" | "negative";
}

export const Container = styled(View)<Props>`
  width: 48%;

  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text};
  border-radius: 5px;

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
export const Button = styled(RectButton)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
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
