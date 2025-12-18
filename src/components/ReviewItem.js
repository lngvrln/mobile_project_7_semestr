import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { theme } from '../styles/theme';

export default function ReviewItem({review, canEdit, onDelete}){
  return (
    <View style={{padding:8, borderBottomWidth:1, borderColor:'#eef3f6'}}>
      <Text style={{fontWeight:'600'}}>{review.userName} · {review.stars}★</Text>
      <Text>{review.text}</Text>
      <Text style={{fontSize:12, color:'#666'}}>{(new Date(review.date)).toLocaleDateString()}</Text>
      {canEdit && (
        <TouchableOpacity onPress={()=>{ if(confirm('Удалить отзыв?')) onDelete(); }} style={{marginTop:6}}>
          <Text style={{color:'#c44'}}>Удалить</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
