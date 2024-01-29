import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Login";
import Register from "./screens/Register";
import Todos from "./screens/Todos";
import { useSelector } from "react-redux";



const Navigation = () => {
    const Stack = createStackNavigator();
  const { username, email } = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      {username === '' ? (
        <Stack.Navigator
          initialRouteName={"Login"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen component={Login} name="Login" />
          <Stack.Screen component={Register} name="Register" />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName={"Todos"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen component={Todos} name="Todos" />
          <Stack.Screen component={Login} name="Login" />
          <Stack.Screen component={Register} name="Register" />
        </Stack.Navigator>
      )}
      
    </NavigationContainer>
  );
};

export default Navigation;
