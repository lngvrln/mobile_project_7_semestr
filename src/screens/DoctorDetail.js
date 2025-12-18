import React, {useEffect, useState, useContext} from 'react';
import { View, Text, ScrollView, TouchableOpacity, FlatList, Alert } from 'react-native';
import { getDoctors, saveDoctors, getUsers } from '../utils/storage';
import ReviewItem from '../components/ReviewItem';
import ReviewForm from '../components/ReviewForm';
import { AuthContext } from '../../App';
import { theme } from '../styles/theme';

export default function DoctorDetail({route, navigation}){
  const {user} = useContext(AuthContext);
  const {id} = route.params;
  const [doctor, setDoctor] = useState(null);
  const [doctorsAll, setDoctorsAll] = useState([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(()=>{ load(); },[]);

  async function load(){
    const d = await getDoctors();
    setDoctorsAll(d);
    const found = d.find(x=>x.id===id);
    setDoctor(found);
  }

  async function onAdd(review){
    if(!user){ Alert.alert('Только для авторизованных','Войдите чтобы оставить отзыв'); return; }
    const updated = doctorsAll.map(d=>{
      if(d.id!==id) return d;
      const r = { id: 'r'+Date.now(), userId:user.id, userName:user.name, ...review };
      d.reviews.unshift(r);
      // recompute rating
      d.rating = (d.reviews.reduce((s,rv)=>s+rv.stars,0) / d.reviews.length).toFixed(1);
      return d;
    });
    await saveDoctors(updated);
    setDoctorsAll(updated);
    setDoctor(updated.find(x=>x.id===id));
  }

  async function onDelete(reviewId){
    const updated = doctorsAll.map(d=>{
      if(d.id!==id) return d;
      d.reviews = d.reviews.filter(r=>r.id!==reviewId);
      d.rating = d.reviews.length ? (d.reviews.reduce((s,rv)=>s+rv.stars,0) / d.reviews.length).toFixed(1) : d.rating;
      return d;
    });
    await saveDoctors(updated);
    setDoctorsAll(updated);
    setDoctor(updated.find(x=>x.id===id));
  }

  if(!doctor) return <View style={theme.container}><Text>Загрузка...</Text></View>;

  const paged = doctor.reviews.slice(0, page*PAGE_SIZE);

  return (
    <ScrollView style={theme.container}>
      <TouchableOpacity onPress={()=>navigation.goBack()} style={{marginBottom:8}}><Text style={{color:'#2b6f94'}}>Назад</Text></TouchableOpacity>
      <View style={theme.card}>
        <Text style={{fontSize:18, fontWeight:'600'}}>{doctor.name}</Text>
        <Text>{doctor.specialty} · {doctor.experience} лет</Text>
        <Text style={{marginTop:8}}>{doctor.about}</Text>
      </View>

      <View style={theme.card}>
        <Text style={{fontSize:16, fontWeight:'600'}}>Отзывы ({doctor.reviews.length})</Text>
        <FlatList data={paged} keyExtractor={i=>i.id} renderItem={({item})=>(
          <ReviewItem review={item} canEdit={user && item.userId===user.id} onDelete={()=>onDelete(item.id)} />
        )} />
        {doctor.reviews.length > paged.length && (
          <TouchableOpacity onPress={()=>setPage(p=>p+1)} style={{padding:8, marginTop:8, backgroundColor:'#eef8ff', borderRadius:8}}>
            <Text style={{textAlign:'center'}}>Показать ещё</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={theme.card}>
        <Text style={{fontSize:16, fontWeight:'600', marginBottom:8}}>Оставить отзыв</Text>
        <ReviewForm onSubmit={onAdd} />
      </View>
    </ScrollView>
  );
}
