import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { SafeAreaView, ScrollView } from "react-native";


const Frame = ({children}) =>{
    return(
        <LinearGradient style={{flexGrow:1}} start={{x : 0 , y : 0.5}} end={{x : 0 , y :1}} colors={['#e3efb1' , '#d5ea7e']}>
        <SafeAreaView style={{flexGrow:1}}>
            <ScrollView showsVerticalScrollIndicator={false}  contentContainerStyle={{flexGrow : 1 , alignItems : 'center' , paddingHorizontal:20 }}>
                {children}
            </ScrollView>
        </SafeAreaView>
        </LinearGradient>
    )
}

export default Frame;