import React, { Component } from 'react';
import { Text, View,StyleSheet, TextInput, Button } from 'react-native';

class Input extends Component {

    state={
        myInput:'Franz',
        users:['John', 'Murat','Ali', 'Kemal']
    }
    onChangeInput=(value)=>{
        this.setState({
            myInput:value
        });
    }


    onAddUser =()=>{
        this.setState(prevState =>{
            return {
                myInput:'',
                users:[...prevState.users, prevState.myInput]
            }
        })
    }


    render(){
        return(

          

            <View style={styles.inputWrapper}>
            <TextInput
            value={this.state.myInput}
            style={styles.input} 
            onChangeText={this.onChangeInput}
            multiline={true}//Alt satira gecmesini sagliyor
            maxLength={50}
            editable={true}
            autoCapitalize={'characters'}

            />

            <Button
                title="Add user"
                onPress={this.onAddUser}
            />
            {
                this.state.users.map(item => (
                    <Text style={styles.users}>{item}</Text>
                ))
            }

            </View>


        )


    }
}

const styles = StyleSheet.create({
    
    inputWrapper:{
        width:'100%',

    },

    input:{
        width:'100%',
        backgroundColor:'#f2f2f2',
        marginTop:20,fontSize:20,padding:10
    },

    users:{
        fontSize:40,
        borderWidth:1,
        borderColor: '#cecece',
        padding:10,
        marginBottom:20,
    },
});
export default Input;