import { SET_USER_DATA, setUserData } from "./actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
    username :  '',
    email : ''
}

const authReducer = (state = initialState , action) => {
    switch(action.type) {
        case SET_USER_DATA :
            return{
                ...state,
                username : action.payload.username,
                email : action.payload.email
            };
            default:
                return state;
    }
}

export const loadUserDataFromStorage = () => async(dispatch) =>{
    try{
        const storedUser = await AsyncStorage.getItem('username');
        const storedEmail = await AsyncStorage.getItem('email')
        if(storedUser !==null  && storedEmail !== null){
            
            dispatch(setUserData(storedUser , storedEmail));
        }
    }   
    catch(error){
        console.error("Error while fetching the data :" ,error )
    }
}


export default authReducer;