import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Nav = (props)=>(
    <View style={styles.nav}>
        <Text> {props.nameOfApp}</Text>
    </View>
)

const styles= StyleSheet.create({
    nav:{
        backgroundColor: '#e066ff',
        alignItems: 'center',
        padding: 10,
        width:'100%',
        borderBottomWidth:2,
        borderBottomColor:'#dddddd',
       
    },
});

export default Nav;