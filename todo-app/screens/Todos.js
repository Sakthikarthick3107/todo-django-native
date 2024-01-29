import React, { useEffect, useState } from "react";
import { Alert, Image, Text, TextInput, View ,Animated, Easing, Button, TouchableOpacity} from "react-native";
import Frame from "../components/Frame";
import { useSelector ,useDispatch} from "react-redux";
import {CommonActions} from '@react-navigation/native'
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  FontAwesome,
  AntDesign
} from "@expo/vector-icons";
import api from "../components/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Todos = ({ navigation }) => {
  const { username, email } = useSelector((state) => state.auth);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const[isSideBarOpen , setIsSideBarOpen] = useState(false);
  const[showFilters , setShowFilters] = useState(false);
  const[selectedFilter , setSelectedFilter] = useState("All")
  const translateX =  new Animated.Value(-200);

  const handleSideBar = () =>{
    Animated.timing(translateX , {
      toValue : isSideBarOpen ? -200 : 0,
      duration : 300,
      useNativeDriver : false,
      easing : Easing.ease
    }).start(() => setIsSideBarOpen(!isSideBarOpen));
  }

  const getUserTasks = async () => {
    try {
      const response = await api.get(`/api/todos/${username}/`);
      //console.log(response.data , username);
      setTasks(response.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getUserTasks();
  }, []);

  const createTask = async () => {
    if(newTask === ''){
        Alert.alert("Empty !" , "Task must not be an empty string");
    }
    else{
    try {
      const data = {
        user: username,
        task: newTask,
      };
      const response = await api.post("/api/todos/", data);
      if (response.status === 201) {
        Alert.alert("Created", "Task created");
        setNewTask("");
        getUserTasks();
      }
    } catch (error) {
        
    }
  }};

  const updateTaskStatus = async(sno , task) =>{
    try {
        const data = {
            user : username,
            task : task,
            completed : true
        }
        const response = await api.put(`/api/todo/${sno}/` , data);
        if(response.status === 200){
            Alert.alert("Success" , "Task updated successfully ");
            getUserTasks();
            
            
        }
    } catch (error) {
        console.log(error)
    }
  }
  const warnDeleteTask = async(sno , task) =>{
    Alert.alert(
      "Warning !",
      `Are  you sure to delete task ${task} ?` ,
      [{
        text : 'Yes',
        onPress : () => deleteTask(sno , task)
      },
      {
        text : 'No',
        style:'cancel'
      }
    
    ],
    {cancelable : false}
    )
  }
  const deleteTask = async(sno , task) =>{
    try {
        const response = await api.delete(`/api/todo/${sno}/`);
        if(response.data.message === 'Deleted successfully'){
            Alert.alert("Removed" , `Task  - "${task}" ${response.data.message}`);
            getUserTasks();
        }
    } catch (error) {
        console.error(error)
    }
  }

  const warnLogout = () =>{
    Alert.alert(
      'Are you sure to want to logout ? ',
      'Your credentials will be removed ',
      [
        {
          text : 'Yes',
          onPress : logout
        },
        {
          text : 'No',
          style:'cancel'
        }
      ],
      {cancelable : false}
    )
  }

  const logout = async() =>{
    try {
      const response = await api.post('/users/logout/');
      //console.log(response.data);
      if(response.status === 200){
        AsyncStorage.removeItem('username');
        AsyncStorage.removeItem('email');
        Alert.alert(
          `${response.data.detail}`,
          "You'll be redirected to the login page again"
        );
        setTimeout(() =>{
          navigation.dispatch(
            CommonActions.reset({
              index : 0,
              routes : [{name : 'Login'}]
            })
          )
        })
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  const handleFilter = (filter) =>{
    setSelectedFilter(filter);
    setShowFilters(false)
  }

  const completedTasks = tasks.filter((item) => item.completed === true);
  const pendingTasks = tasks.filter((item) => item.completed === false)

  const pickArray = ()=>{
    if(selectedFilter === "Completed") return completedTasks;
    else if(selectedFilter === "Pending") return pendingTasks;
    else if(selectedFilter === "All" ) return tasks;
  }

  return (
    <Frame>
      <View tw="h-[60] w-[100vw] flex flex-row items-center justify-between bg-yellow-500 absolute top-0 p-2">
        <Entypo onPress={handleSideBar} name="menu" size={35} color="black" />
        <View tw="flex flex-row items-center justify-center">
          <Text tw=" text-xl font-bold mr-2">{username}</Text>
          <FontAwesome5 name="user-circle" size={24} color="black" />
        </View>
      </View>

      <Text tw="text-center text-2xl mt-20">Create your todos...</Text>

      <View tw="flex flex-row items-center  w-full p-1 bg-white my-2 rounded-md ">
        <TextInput
          tw="w-[80vw] p-2"
          placeholder="Create tasks here..."
          defaultValue={newTask}
          onChangeText={(e) => setNewTask(e)}
        />
        <Ionicons
          onPress={createTask}
          name="md-checkmark-circle"
          size={24}
          color="black"
        />
      </View>

    {tasks.length !== 0 ? 
        
    <View tw='flex mb-10'>
        <Text tw="text-center text-2xl my-4">Your todos</Text>

        <View tw='flex flex-row w-[100%] items-center justify-end'>
          <Text tw='text-lg mr-4'>{selectedFilter}</Text>
          <TouchableOpacity onPress={()=>setShowFilters(!showFilters)} tw='flex flex-row items-center justify-center bg-white px-2 py-1 rounded-md'>
            <Text tw='text-lg mr-1' >Filters</Text>
            <AntDesign name="down" size={15} color="black" />
          </TouchableOpacity>
          {showFilters &&
            <View tw='absolute top-10 bg-white min-w-[30%] z-10 border border-slate-200 rounded-md'>
              <TouchableOpacity onPress={() => handleFilter("All")} tw='flex flex-row items-center justify-center border-b border-black rounded-md bg-white px-2 py-1 zIndex-1'>
                <Text tw='text-lg' >All</Text>
                
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter("Completed")} tw='flex flex-row items-center justify-center border-b border-black rounded-md bg-white px-2 py-1 zIndex-1'>
                <Text tw='text-lg' >Completed</Text>
                
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleFilter("Pending")} tw='flex flex-row items-center justify-center border-b border-black rounded-md bg-white px-2 py-1 zIndex-1'>
                <Text tw='text-lg' >Pending</Text>
                
          </TouchableOpacity>
            </View>
          }

        </View>
      {Array.isArray(tasks) && pickArray().map((task, index) => (
        <View
          key={index}
          tw="w-full p-4 rounded-md bg-white my-2 border border-slate-300 flex flex-row items-center justify-between"
        >
          <View tw="flex flex-row items-center w-[80%]">
            <Text tw="text-lg ">{task.task}</Text>
          </View>

          <View tw="flex flex-row items-center justify-around w-[20%]">
            <FontAwesome onPress={() => warnDeleteTask(task.sno , task.task)} name="remove" size={24} color="black" />
            <Ionicons onPress={() => updateTaskStatus(task.sno , task.task)}  name={task.completed ? "radio-button-on" :"radio-button-off"} size={24} color="black" />
          </View>
        </View>
      ))}
    </View>
    :
    <View tw='h-[60vh] w-full flex items-center justify-center'>
        <Image source ={ require('../assets/todo-large.png')} tw='h-[80%] w-[80vw]' />
        <Text tw='text-lg italic text-center'>You don't had any active tasks . Click on the top textfield and start tracking</Text>
    </View>
      }

      {/* Sidebar */}

      <Animated.View tw='flex-1 w-[200] absolute top-16 left-0 h-[100%] flex items-center justify-center' style={{transform : [{translateX : translateX}]}}>
        <View tw='flex items-center justify-center  bg-white py-10 px-4 w-full h-[100%]'>
          <TouchableOpacity onPress={warnLogout} tw='w-full p-2 bg-black flex items-center justify-center rounded-md my-2'>
            <Text tw='text-white text-lg'>Logout</Text>
          </TouchableOpacity>
          <Button onPress={handleSideBar} title="Close"/>
        </View>
      </Animated.View>
    </Frame>
  );
};

export default Todos;
