import React, {useState, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getUsers, saveUsers, saveSession } from '../utils/storage';
import { AuthContext } from '../../App';
import { theme } from '../styles/theme';

export default function RegisterScreen(){
  const {setUser} = useContext(AuthContext);
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [confirm,setConfirm] = useState('');

  async function onRegister(){
    if(!email || !password){ Alert.alert('Ошибка','Заполните поля'); return; }
    if(password !== confirm){ Alert.alert('Ошибка','Пароли не совпадают'); return; }
    const users = await getUsers();
    if(users.find(u=>u.email===email)){ Alert.alert('Ошибка','Пользователь уже существует'); return; }
    const user = {id: 'u'+Date.now(), email, password, name: email.split('@')[0], avatar: null};
    users.push(user);
    await saveUsers(users);
    await saveSession(user);
    setUser(user);
  }

  return (
    <View style={[theme.container, {justifyContent:'center'}]}>
      <View style={theme.card}>
        <Text style={{fontSize:20, marginBottom:8}}>Регистрация</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{marginBottom:8, padding:8, backgroundColor:'#fff'}} />
        <TextInput placeholder="Пароль" secureTextEntry value={password} onChangeText={setPassword} style={{marginBottom:8, padding:8, backgroundColor:'#fff'}} />
        <TextInput placeholder="Подтвердите пароль" secureTextEntry value={confirm} onChangeText={setConfirm} style={{marginBottom:8, padding:8, backgroundColor:'#fff'}} />
        <TouchableOpacity onPress={onRegister} style={{backgroundColor:'#7fb3d5', padding:12, borderRadius:8, marginBottom:8}}>
          <Text style={{textAlign:'center'}}>Создать аккаунт</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
