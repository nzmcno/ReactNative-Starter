import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';


const ListItem = (props)=> {
    return(
        props.items.map((item,i)=>(

        <TouchableOpacity
        onPress={()=>props.delete(i)}
        key={i}
        style={styles.listitem}
        >

        <View>
            <Text>{item}</Text>
        </View>

        </TouchableOpacity>

        ))
    )
}

const styles= StyleSheet.create({

    listitem:{
        
        backgroundColor: '#cecece',
        padding:10,
        alignItems: 'center',
        width:'100%',
        margin:5,
    },

});



export default ListItem;