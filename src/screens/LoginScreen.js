import React, {useState, useContext} from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { getUsers, saveSession } from '../utils/storage';
import { AuthContext } from '../../App';
import { theme } from '../styles/theme';

export default function LoginScreen({navigation}){
  const {setUser} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function onLogin(){
    const users = await getUsers();
    const found = users.find(u=>u.email===email && u.password===password);
    if(!found){ Alert.alert('Ошибка','Неверный email или пароль'); return; }
    await saveSession(found);
    setUser(found);
  }

  return (
    <View style={[theme.container, {justifyContent:'center'}]}>
      <View style={theme.card}>
        <Text style={{fontSize:20, marginBottom:8}}>Вход</Text>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{marginBottom:8, padding:8, backgroundColor:'#fff'}} />
        <TextInput placeholder="Пароль" secureTextEntry value={password} onChangeText={setPassword} style={{marginBottom:8, padding:8, backgroundColor:'#fff'}} />
        <TouchableOpacity onPress={onLogin} style={{backgroundColor:'#7fb3d5', padding:12, borderRadius:8, marginBottom:8}}>
          <Text style={{textAlign:'center'}}>Войти</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Register')}>
          <Text style={{textAlign:'center', color:'#2b6f94'}}>Регистрация</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
