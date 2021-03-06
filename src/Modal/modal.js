import React, { Component } from 'react';
import { Text, View,StyleSheet, Button, Modal } from 'react-native';


class ModalComponent extends Component{

    state={
        modal:false
    }

    handleModal=()=>{
        this.setState({
            modal: !this.state.modal ? true : false
        })
    }


    render(){
        return(
            <View style={{width:'100%'}}>
                <Button
                title="Open Modal"
                onPress={this.handleModal}

                />
            <Modal
                visible={this.state.modal}
                animationType={'slide'}//none ,slide, fade
                //onShow={()=>{alert('modal is visible')}}
            >

                <View
                style={{marginTop:20,backgroundColor:'red'}}>
                    <Text>My Modal Component</Text>
                </View>


                <Button
                title="Close Modal"
                onPress={this.handleModal}/>


            </Modal>

            </View>
        )
    }

}

export default ModalComponent;