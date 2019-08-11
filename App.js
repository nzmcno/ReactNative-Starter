import React, { Component } from 'react';
import { Text, View,StyleSheet, ScrollView, ActivityIndicator,Image } from 'react-native';

import Nav from './src/Nav/nav'
import Generate from './src/Generator/generate'
import ListItem from './src/Generator/listitem'
import Input from './src/Input/input'
import Picker from './src/Picker/picker'
import PickerComponent from './src/Picker/picker';
import Car from './src/assets/images/car.jpeg'
import ModelComponent from './src/Modal/modal'

class App extends Component {
  
  state={
    nameOfApp:"My Awesome App",
    random:[20,13],
    loading:false,
  }
  
  onAddRamdom=()=>{
    const random = Math.floor(Math.random()*100)+1;
    this.setState(prevState=>{
      return{
        random:[...prevState.random, random]
      }
    })
  }


onItemDelete=(i)=>{
  const newArray =this.state.random.filter((item,index)=>{
    return i != index;
  });
this.setState({
random:newArray
});

}

  render() {
    return (
      <View style={styles.container}>
        <Nav nameOfApp={this.state.nameOfApp}/>

        <ScrollView 
        style={{width:'100%'}}
        //onContentSizeChange={(w,h)=> alert(h)}
        //onMomentumScrollBegin={()=> alert('begin')}
        //onMomentumScrollEnd={()=> alert('end')}
        //onScroll={()=> alert('scrolling')}
        >

        <View style={styles.wrapper}>

        <Generate add={this.onAddRamdom}/>
        <ListItem items={this.state.random} delete= {this.onItemDelete}/>

        {/*<Input  />*/}
        {/* <PickerComponent/> */}

        {/* <ActivityIndicator
        size="large"
        color="red"
        animating={this.state.loading}
        /> */}

        {/* <Image
        //source={Car}
        source={{uri:'https://picsum.photos/400'}}
        style={styles.car}
        resizeMode="contain"
        onLoadEnd={()=>alert('image loaded')}
        /> */}

        <ModelComponent/>

        </View>
        </ScrollView>
 
      </View>
    );
  }




}

const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'flex-start',
    marginTop: 20
  },
  wrapper:{
    flex:1,
    width:'100%',
    padding:25,
    alignItems: 'center',
    justifyContent:'flex-start'
  },

  car:{
    width:'100%',
    height:300,
    marginTop:20,
  },

});

export default App;
