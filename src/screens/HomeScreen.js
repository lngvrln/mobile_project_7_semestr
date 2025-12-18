import React, {useEffect, useState, useContext} from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { getDoctors } from '../utils/storage';
import DoctorCard from '../components/DoctorCard';
import { AuthContext } from '../../App';
import { theme } from '../styles/theme';

export default function HomeScreen({navigation}){
  const {user, setUser} = useContext(AuthContext);
  const [doctors, setDoctors] = useState([]);
  const [q, setQ] = useState('');
  const [spec, setSpec] = useState('');
  const [sort, setSort] = useState('rating');

  useEffect(()=>{ load(); },[]);
  async function load(){
    const d = await getDoctors();
    setDoctors(d);
  }

  function filtered(){
    return doctors.filter(d=>{
      const matchesQ = (d.name + ' ' + d.specialty).toLowerCase().includes(q.toLowerCase());
      const matchesSpec = spec ? d.specialty === spec : true;
      return matchesQ && matchesSpec;
    }).sort((a,b)=>{
      if(sort==='rating') return b.rating - a.rating;
      if(sort==='name') return a.name.localeCompare(b.name);
      if(sort==='exp') return b.experience - a.experience;
      return 0;
    });
  }

  return (
    <View style={theme.container}>
      <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:8}}>
        <Text style={{fontSize:20}}>Врачи</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Profile')}>
          <Text style={{color:'#2b6f94'}}>Профиль</Text>
        </TouchableOpacity>
      </View>

      <TextInput placeholder="Поиск по имени или специальности" value={q} onChangeText={setQ} style={theme.searchBox} />
      <View style={{flexDirection:'row', marginTop:8, marginBottom:8}}>
        <TouchableOpacity onPress={()=>setSpec('')} style={{marginRight:8, padding:8, backgroundColor:'#e9f6ff', borderRadius:8}}>Все</TouchableOpacity>
        <TouchableOpacity onPress={()=>setSpec('Терапевт')} style={{marginRight:8, padding:8, backgroundColor:'#e9f6ff', borderRadius:8}}>Терапевт</TouchableOpacity>
        <TouchableOpacity onPress={()=>setSpec('Дерматолог')} style={{marginRight:8, padding:8, backgroundColor:'#e9f6ff', borderRadius:8}}>Дерматолог</TouchableOpacity>
        <TouchableOpacity onPress={()=>setSpec('Хирург')} style={{marginRight:8, padding:8, backgroundColor:'#e9f6ff', borderRadius:8}}>Хирург</TouchableOpacity>
      </View>

      <View style={{flexDirection:'row', marginBottom:8}}>
        <TouchableOpacity onPress={()=>setSort('rating')} style={{marginRight:8, padding:8, backgroundColor:'#f0f6fb', borderRadius:8}}>По рейтингу</TouchableOpacity>
        <TouchableOpacity onPress={()=>setSort('name')} style={{marginRight:8, padding:8, backgroundColor:'#f0f6fb', borderRadius:8}}>По имени</TouchableOpacity>
        <TouchableOpacity onPress={()=>setSort('exp')} style={{marginRight:8, padding:8, backgroundColor:'#f0f6fb', borderRadius:8}}>По опыту</TouchableOpacity>
      </View>

      <FlatList data={filtered()} keyExtractor={i=>i.id} renderItem={({item})=>(
        <DoctorCard doctor={item} onPress={()=>navigation.navigate('DoctorDetail',{id:item.id})} />
      )} />
    </View>
  );
}
