import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const CheckNotLogged = (OriginalComponent) => {
    const ExtendsComponent = () =>{
        const logged = useSelector(({Auth})=> Auth.login.logged);
        return !logged
        ? <Navigate to="/Login"/>
        : <OriginalComponent/>
    };
    return ExtendsComponent;
};
export default CheckNotLogged;
