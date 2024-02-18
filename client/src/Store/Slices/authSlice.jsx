import {createSlice} from '@reduxjs/toolkit';

const authSlice=createSlice({
    name:'auth',
    initialState:{
       username:"",
       email:"",
       password:"",
       isAuth:false},
    reducers:{
        logInUser:(state,action)=>{
            state.username=action.payload.username;
            state.email=action.payload.email;
            state.password=action.payload.password;
            state.isAuth=true;
            console.log("all state data",action.payload);
            console.log("state email is",state.email);
            console.log("state username is",state.username);
            console.log("state id is",state.id);
            console.log("Authenticated? ",state.isAuth)
        },
        logOutUser:(state,action)=>{
            state.username="";
            state.email="";
            state.id="";
            state.isAuth=false;
        },
    }
})
console.log(authSlice.actions);
export default authSlice.reducer;
export const {logInUser,logOutUser}=authSlice.actions;