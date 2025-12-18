import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { theme } from '../styles/theme';

export default function DoctorCard({doctor, onPress}){
  return (
    <TouchableOpacity onPress={onPress} style={[theme.card, {flexDirection:'row', alignItems:'center'}]}>
      <View style={{width:64, height:64, borderRadius:32, backgroundColor:'#e6eef5', justifyContent:'center', alignItems:'center', marginRight:12}}>
        <Text>{doctor.name.split(' ')[0][0]}{doctor.name.split(' ')[1] ? doctor.name.split(' ')[1][0] : ''}</Text>
      </View>
      <View style={{flex:1}}>
        <Text style={{fontWeight:'600'}}>{doctor.name}</Text>
        <Text>{doctor.specialty} · {doctor.experience} лет</Text>
        <Text>Рейтинг: {doctor.rating} ({doctor.reviews.length} отзывов)</Text>
      </View>
    </TouchableOpacity>
  );
}
