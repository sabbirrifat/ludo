import React, { useState } from 'react';
import { Route, Redirect, useHistory } from 'react-router-native';
import firebase from 'firebase';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ component: Component, ...rest }) => {
    const history = useHistory();
    const user = useSelector(state=>state.user.id);
    if(!user){
        history.push('/login')
    }
    return (
       <Route component={Component} {...rest}/>
    )
}


export default PrivateRoute;