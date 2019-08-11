import React from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const generate =(props)=>(

    <TouchableWithoutFeedback
        onPress={()=> 
            
            props.add()
        }
        //onPressIn={()=> alert('Press In')}
        //onPressOut={()=> alert('Press Out')}
        onLongPress={()=> alert('Long Press')}
        delayLongPress={5000}
    >

    <View style={styles.generate}>
        <Text>Add Number</Text>
    </View>

    </TouchableWithoutFeedback>
)

const styles= StyleSheet.create({

    generate:{
        padding:10,
        alignItems: 'center',
        backgroundColor: '#00bcd4',
        width:'100%',
        marginTop:20,
    },

});

export default generate;