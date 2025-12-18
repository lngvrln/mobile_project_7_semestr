import React, {useEffect, useState, createContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeMockData, loadSession } from './src/utils/storage';
import { ThemeProvider } from './src/styles/theme';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import DoctorDetail from './src/screens/DoctorDetail';
import ProfileScreen from './src/screens/ProfileScreen';
import { ActivityIndicator, View } from 'react-native';

export const AuthContext = createContext();

const Stack = createNativeStackNavigator();

export default function App(){
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    async function init(){
      await initializeMockData();
      const s = await loadSession();
      if(s) setUser(s);
      setLoading(false);
    }
    init();
  },[]);

  if(loading) return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size="large" />
    </View>
  );

  return (
    <ThemeProvider>
      <AuthContext.Provider value={{user, setUser}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}}>
            {user ? (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="DoctorDetail" component={DoctorDetail} />
                <Stack.Screen name="Profile" component={ProfileScreen} />
              </>
            ) : (
              <>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}
