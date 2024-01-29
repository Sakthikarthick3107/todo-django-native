import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Frame from '../components/Frame';
import { CommonActions } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../components/api';


const Login = ({navigation}) => {
    const[username , setUsername] =  useState('');
    const[password , setPassword] = useState('');
    const[userErr , setUserErr] = useState('');
    const[passErr , setPassErr] = useState('');
    const dispatch = useDispatch();
    const validateName = () =>{
        if(username.length > 0 && username.length < 5){
            setUserErr("Username must be greater than or equal to 5");
        }
        else{
            setUserErr('');
        }
    }
    const validatePassword = () =>{
        if(password.length > 0 && password.length < 5){
            setPassErr("Password must be  greater than or equal to 5")
        }
        else{
            setPassErr('')
        }
    }
    useEffect(() =>{
        validateName();
        validatePassword();
    },[username , password])

    const handleLogin = async() =>{
        if(username === ''){
            setUserErr("Username must not be empty " );
            setTimeout(() => {
                setUserErr('')
            },4000)
        }
        else if(password === ''){
            setPassErr("Password must not be empty " );
            setTimeout(() => {
                setPassErr('')
            },4000)
        }
        else if(userErr === '' && passErr === ''){
            try{
                const data = {
                    username : username,
                    password : password
                };
                const response = await api.post('/users/login/', data);
                //console.log(response.data);
                if(response.data.message === 'Logged In Successfully'){
                    dispatch(setUserData(username , response.data.data.email));
                    AsyncStorage.setItem('username' , username);
                    AsyncStorage.setItem('email' , response.data.data.email);
                    Alert.alert("Success" , "Automatically directed to home screen");
                    setTimeout(() =>{
                        navigation.dispatch(
                            CommonActions.reset({
                                index : 0,
                                routes : [{name : 'Todos'}]
                            })
                        )
                    },2000)
                }
            }
            catch(e){
                console.error(e);
            }
            
        }
        
    }

    return(
        <Frame>
            <View tw='flex items-center justify-center h-[600] w-full'>
                <Image source={ require('../assets/todo-large.png') } tw='h-[80%] w-full' />
            </View>
            <View tw='flex items-center w-full'>
                <View tw='w-full mb-1'>
                    <TextInput placeholder='Enter your Username' defaultValue={username} onChangeText={(e) => setUsername(e)} tw='bg-white w-full p-2 rounded-md' />
                    <Text tw='text-red-400'>{userErr}</Text>
                </View>
                <View tw='w-full mb-1'>
                    <TextInput placeholder='Enter Password' defaultValue={password} onChangeText={(e) => setPassword(e)} tw='bg-white w-full p-2 rounded-md' />
                    <Text tw='text-red-400'>{passErr}</Text>
                </View>
            </View>
            <TouchableOpacity tw='flex items-center justify-center bg-yellow-400 w-full p-2 rounded-md' onPress={handleLogin}>
                <Text tw='text-slate-600 text-xl font-bold'>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity tw='flex items-center justify-center mb-10' onPress={() => navigation.navigate('Register')}>
                <Text tw='text-blue-700 underline'>Don't have an account ? Register</Text>
            </TouchableOpacity>
        </Frame> 
        

    );
}

export default Login;