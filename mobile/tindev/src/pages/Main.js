import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, View, SafeAreaView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import io from  'socket.io-client';
import api from '../services/api'
import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

export default function Main({navigation}){
    const id = navigation.getParam('user');
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);
    
    async function handleLogout(){
        await AsyncStorage.clear();
        navigation.navigate('Login');
    }

    async function handleLike(){
        const [user, ...rest] = users; 

        await api.post(`devs/${user._id}/like`, null, {
            headers: {user: id}
        });

        setUsers(rest);
    }
    
    async function handleDeslike(){
        const [user, ...rest] = users; 

        await api.post(`devs/${user._id}/deslike`, null, {
            headers: {user:id}
        });

        setUsers(rest);
    }
    
    useEffect(() => {
        async function loadUser(){
            const response = await api.get('/devs',{
                headers: {user: id}
            });
            setUsers(response.data);
        }
        loadUser();
     }, [id])

     useEffect(()=>{
        const socket = io('http://192.168.0.15:3333', {
            query: { user: id }
        })

        socket.on('match', dev =>{
            setMatchDev(dev);
        });
     }, [id]);


    return(
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={handleLogout}>
                <Image style={styles.logo} source={logo}/>
            </TouchableOpacity>

            <View style={styles.cardsContainer}>
                { users.length === 0 
                ? <Text style={styles.empty}> Acabou :(</Text>
                : (
                    users.map((user, index)=>(
                        <View key={user._id} style={[styles.card , { zIndex: users.length - index }]}>
                            <Image style={styles.avatar} source={{uri: user.avatar}} />
                            <View style={styles.footer }>
                                <Text style={styles.name }>{ user.name }</Text>
                                <Text style={styles.bio } numberOfLines={3}>{ user.bio }</Text>
                            </View>
                        </View>
                    ))
                )}
            </View>
           { users.length > 0 && (
                <View style={ styles.buttonContainer } >
                <TouchableOpacity style={styles.button} onPress={handleDeslike}>
                    <Image source={dislike} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleLike}>
                    <Image source={like} />
                </TouchableOpacity>
            </View>
           )}
           
           { matchDev && (
               <Modal isVisible={true}>
                   <View style={styles.matchContainer}>
                   <Image style={styles.matchImage} source={ logo }/>
                   <Image style={styles.matchAvatar} source={{uri:  matchDev.avatar}}/>
                   
                   <Text style={styles.matchName}> {matchDev.name} </Text>
                   <Text style={styles.matchBio}> {matchDev.bio} </Text>

                    <TouchableOpacity onPress={()=> setMatchDev(null)}>
                        <Text  style={styles.closeMatch}>FECHAR</Text>
                    </TouchableOpacity>
               </View>
               </Modal>
           )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f5f5f5',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    cardsContainer:{
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        maxHeight: 500
    },
    card:{
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        margin: 30,
        overflow: 'hidden',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    logo:{
        marginTop: 30
    },
    empty:{
        alignSelf: 'center',
        color: '#999',
        fontSize: 24,
        fontWeight: 'bold'
    },
    avatar:{
        flex: 1,
        height: 300
    }, 
    footer:{
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    name:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333'
    },
    bio:{
        fontSize: 14,
        color: '#333',
        margin: 5,
        lineHeight: 20
    },
    buttonContainer:{
        flexDirection: 'row',
        marginBottom: 30
    },
    button:{
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20,
        elevation: 2
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
        modal3: {
        height: 300,
        width: 300
    },
    matchContainer:{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    matchImage: {
        height: 60,
        resizeMode: 'contain'
    },
    matchAvatar: {
        width: 160,
        height: 160,
        borderRadius: 80,
        borderWidth: 5,
        borderColor: '#FFF',
        marginVertical:30

    },
    matchName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#FFF'
    },
    matchBio: {
        marginTop: 10,
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.8)',
        lineHeight: 24,
        textAlign: 'center',
        paddingHorizontal: 30
    },
    closeMatch:{
        marginTop: 10,
        fontSize: 30,
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        fontWeight: 'bold'
    }
     
});