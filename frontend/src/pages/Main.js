import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  io from 'socket.io-client';
import api from '../services/api';
import './Main.css';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }){
    const [users, setUsers] = useState([]);
    const [matchDev, setMatchDev] = useState(null);
    
    async function handlerlike(id){
        await api.post(`devs/${id}/like`, null, {
            headers: {user:  match.params.id}
        });

        setUsers(users.filter((user) => user._id !== id));
    }
    
    async function handlerdeslike(id){
        await api.post(`devs/${id}/deslike`, null, {
            headers: {user:  match.params.id}
        });

        setUsers(users.filter(user => user._id !== id));
    }
    
    useEffect(() => {
        async function loadUser(){
            const response = await api.get('/devs',{
                headers: {user: match.params.id}
            });
            setUsers(response.data);
        }
        loadUser();
     }, [match.params.id])

     useEffect(()=>{
        const socket = io('http://localhost:3333', {
            query: { user: match.params.id }
        })

        socket.on('match', dev =>{
            setMatchDev(dev);
        });
     }, [match.params.id]);

    return(
        <div className="main-container">
            <Link to='/'>
                <img src={logo} alt="Tindev" />
            </Link>
            { users.length > 0 ? (
               <ul>
               { users.map( user => (
                       <li key={ user._id }>
                           <img src={ user.avatar } alt={ user.name } />
                           <footer>
                               <strong>{ user.name }</strong>
                               <p>{ user.bio }</p>
                           </footer>
                           <div className="buttons">
                               <button type="button" onClick={()=>handlerdeslike(user._id)}>
                                   <img src={ dislike } alt="dislike" />
                               </button>
                               <button type="button" onClick={()=>handlerlike(user._id)}>
                                   <img src={ like } alt="like" />
                               </button>
                           </div>
                       </li>
                   ))}
               </ul> 
            ) : ( <div className="empty"> Acabou :( </div> )
            }

           { matchDev && (
                <div className="match-container">
                    <img src={logo} alt="It's a match"/>

                    <img className="avatar" src={matchDev.avatar} alt=""/>
                    <strong>{matchDev.name}</strong>
                    <p>{ matchDev.bio }</p>

                    <button type="button" onClick={()=> setMatchDev(null)  }>FECHAR</button>
                </div>
            )}
        </div>
    );
}