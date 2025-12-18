import AsyncStorage from '@react-native-async-storage/async-storage';
import mockDoctors from '../data/mockDoctors';

const DOCTORS_KEY = 'DOCTORS_V1';
const USERS_KEY = 'USERS_V1';
const SESSION_KEY = 'SESSION_V1';

// Initialize mock data only once
export async function initializeMockData(){
  const d = await AsyncStorage.getItem(DOCTORS_KEY);
  if(!d){
    await AsyncStorage.setItem(DOCTORS_KEY, JSON.stringify(mockDoctors));
  }
  const u = await AsyncStorage.getItem(USERS_KEY);
  if(!u){
    const defaultUsers = [];
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  }
}

export async function getDoctors(){
  const d = await AsyncStorage.getItem(DOCTORS_KEY);
  return JSON.parse(d || '[]');
}
export async function saveDoctors(data){
  await AsyncStorage.setItem(DOCTORS_KEY, JSON.stringify(data));
}

export async function getUsers(){
  const d = await AsyncStorage.getItem(USERS_KEY);
  return JSON.parse(d || '[]');
}
export async function saveUsers(u){
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(u));
}

export async function saveSession(user){
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
}
export async function loadSession(){
  const s = await AsyncStorage.getItem(SESSION_KEY);
  return JSON.parse(s || 'null');
}
export async function clearSession(){
  await AsyncStorage.removeItem(SESSION_KEY);
}
