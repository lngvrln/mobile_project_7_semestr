import React, {useContext, useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import { AuthContext } from '../../App';
import { getDoctors, saveDoctors, clearSession, saveUsers, getUsers } from '../utils/storage';
import { theme } from '../styles/theme';

export default function ProfileScreen({navigation}){
  const {user, setUser} = useContext(AuthContext);
  const [name, setName] = useState(user.name);
  const [avatar, setAvatar] = useState(user.avatar);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(()=>{ loadMyReviews(); },[]);

  async function loadMyReviews(){
    const d = await getDoctors();
    const reviews = [];
    d.forEach(doc=>{
      doc.reviews.forEach(r=>{
        if(r.userId === user.id) reviews.push({...r, doctorId: doc.id, doctorName: doc.name});
      });
    });
    setMyReviews(reviews);
  }

  async function onSave(){
    const users = await getUsers();
    const updated = users.map(u=> u.id===user.id ? {...u, name, avatar} : u);
    await saveUsers(updated);
    const newUser = {...user, name, avatar};
    setUser(newUser);
    Alert.alert('Сохранено');
  }

  async function onLogout(){
    await clearSession();
    setUser(null);
  }

  return (
    <View style={theme.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginBottom:8}}><Text style={{color:'#2b6f94'}}>Назад</Text></TouchableOpacity>
      <View style={theme.card}>
        <Text style={{fontSize:18, fontWeight:'600'}}>Профиль</Text>
        <TextInput value={name} onChangeText={setName} style={{backgroundColor:'#fff', padding:8, marginTop:8}} />
        <TextInput value={avatar||''} onChangeText={setAvatar} placeholder="URL аватара (опционально)" style={{backgroundColor:'#fff', padding:8, marginTop:8}} />
        <TouchableOpacity onPress={onSave} style={{backgroundColor:'#7fb3d5', padding:10, borderRadius:8, marginTop:8}}><Text style={{textAlign:'center'}}>Сохранить</Text></TouchableOpacity>
        <TouchableOpacity onPress={onLogout} style={{padding:10, marginTop:8}}><Text style={{textAlign:'center', color:'#c44'}}>Выйти</Text></TouchableOpacity>
      </View>

      <View style={theme.card}>
        <Text style={{fontSize:16, fontWeight:'600'}}>Мои отзывы ({myReviews.length})</Text>
        <FlatList data={myReviews} keyExtractor={i=>i.id} renderItem={({item})=>(
          <TouchableOpacity style={{padding:8, borderBottomWidth:1, borderColor:'#eef3f6'}} onPress={()=>navigation.navigate('DoctorDetail',{id:item.doctorId})}>
            <Text style={{fontWeight:'600'}}>{item.doctorName} · {item.stars}★</Text>
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )} />
      </View>
    </View>
  );
}
