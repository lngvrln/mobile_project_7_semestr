import React from 'react';
import { StyleSheet } from 'react-native';

export const colors = {
  bg: '#f5f7fa',
  card: '#ffffff',
  lightGray: '#e6eaee',
  blue: '#cfeffd',
  primary: '#7fb3d5',
  text: '#23343a'
};

export const theme = StyleSheet.create({
  container:{ flex:1, backgroundColor: colors.bg, padding:12 },
  card:{ backgroundColor: colors.card, borderRadius:12, padding:12, marginBottom:12 },
  searchBox:{ backgroundColor: colors.lightGray, padding:8, borderRadius:8 }
});

export const ThemeProvider = ({children}) => children;
