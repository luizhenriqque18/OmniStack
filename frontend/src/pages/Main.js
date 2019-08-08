import React, { useState, useEffect } from 'react';
import api from '../services/api';
import './Main.css';
import logo from '../assets/logo.svg';
import like from '../assets/like.svg';
import dislike from '../assets/dislike.svg';

export default function Main({ match }){
    const [users, setUsers] = useState([]);
    
    function handlerlike(id){
        console.log('like', id);
    }
    
    function handlerdeslike(id){
        console.log('like', id);
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

    return(
        <div className="main-container">
            <img src={logo} alt="Tindev" />
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
                               <button type="button" onClick={handlerdeslike}>
                                   <img src={ dislike } alt="dislike" />
                               </button>
                               <button type="button" onClick={handlerlike}>
                                   <img src={ like } alt="like" />
                               </button>
                           </div>
                       </li>
                   ))}
               </ul> 
            ) : ( <div className="empty"> Acabou :( </div> )}
        </div>
    );
}