import React, { useEffect, useState } from 'react';
import { Button, Text, View,Image, TextInput, TouchableOpacity, Alert, } from 'react-native';
import Frame from '../components/Frame';
import api from '../components/api';



const Register = ({navigation}) => {
    const[username  , setUsername] = useState('');
    const[email , setEmail] = useState('');
    const[password , setPassword] = useState('');
    const[userErr , setUserErr] = useState('');
    const[emailErr , setEmailErr] = useState('');
    const[passErr , setPassErr] = useState('');

    const validateName = () =>{
        if(username.length > 0 && username.length < 5){
            setUserErr("Username must be greater than or equal to 5");
        }
        else{
            setUserErr('');
        }
    }
    const validateEmail = () =>{
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(email.length > 0 && !emailPattern.test(email)){
            setEmailErr('Please enter a valid email id ')
        }
        else{
            setEmailErr('');
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
        validateEmail();
        validatePassword();
    },[username ,email, password])

    const handleLogin = async() =>{
        if(username === ''){
            setUserErr("Username must not be empty " );
            setTimeout(() => {
                setUserErr('')
            },4000)
        }
        else if(email === ''){
            setEmailErr("Email must not be empty ");
            setTimeout(() =>{
                setEmailErr('');
            },4000);
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
                    email :  email.toLowerCase(),
                    password : password
                }
                const response = await api.post('/users/register/' , data);
                //console.log(response.data);
                Alert.alert("Registration Success " , "Now you can login ");
                setTimeout(() =>{
                    navigation.navigate('Login');
                },4000);
                
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
                    <TextInput placeholder='Enter your Email' defaultValue={email} onChangeText={(e) => setEmail(e)} tw='bg-white w-full p-2 rounded-md' />
                    <Text tw='text-red-400'>{emailErr}</Text>
                </View>
                <View tw='w-full mb-1'>
                    <TextInput placeholder='Enter Password' defaultValue={password} onChangeText={(e) => setPassword(e)} tw='bg-white w-full p-2 rounded-md' />
                    <Text tw='text-red-400'>{passErr}</Text>
                </View>
            </View>
            <TouchableOpacity tw='flex items-center justify-center bg-yellow-400 w-full p-2 rounded-md' onPress={handleLogin}>
                <Text tw='text-slate-600 text-xl font-bold'>Register</Text>
            </TouchableOpacity>

            <TouchableOpacity tw='flex items-center justify-center mb-20' onPress={() => navigation.navigate('Login')}>
                <Text tw='text-blue-700 underline'>Already had an account ? Login</Text>
            </TouchableOpacity>
            
        </Frame>

    );
}

export default Register;