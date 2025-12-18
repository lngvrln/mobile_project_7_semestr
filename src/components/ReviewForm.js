import React, {useState} from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function ReviewForm({onSubmit}){
  const [stars, setStars] = useState(5);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  function submit(){
    if(!text){ alert('Введите текст отзыва'); return; }
    onSubmit({stars, text, date: date || new Date().toISOString()});
    setText('');
    setStars(5);
    setDate('');
  }

  return (
    <View>
      <Text>Оценка: {stars}★</Text>
      <View style={{flexDirection:'row', marginVertical:6}}>
        {[1,2,3,4,5].map(n=>(
          <TouchableOpacity key={n} onPress={()=>setStars(n)} style={{marginRight:6, padding:6, backgroundColor: n<=stars ? '#d7f0ff' : '#f3f6f8', borderRadius:6}}>
            <Text>{n}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TextInput placeholder="Текст отзыва" value={text} onChangeText={setText} style={{backgroundColor:'#fff', padding:8, marginBottom:8}} />
      <TextInput placeholder="Дата посещения (опционально, YYYY-MM-DD)" value={date} onChangeText={setDate} style={{backgroundColor:'#fff', padding:8, marginBottom:8}} />
      <TouchableOpacity onPress={submit} style={{backgroundColor:'#7fb3d5', padding:10, borderRadius:8}}>
        <Text style={{textAlign:'center'}}>Отправить</Text>
      </TouchableOpacity>
    </View>
  );
}
