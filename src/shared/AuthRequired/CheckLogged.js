import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const CheckLogged = (OriginalComponent) => {
 const ExtendsComponent = () =>{
         const logged = useSelector(({Auth})=> Auth.login.logged);
         return logged
         ? <Navigate to="/"/>
         : <OriginalComponent/>
     };
     return ExtendsComponent;
};
export default CheckLogged;
