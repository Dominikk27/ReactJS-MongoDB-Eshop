import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from './AuthContext.js';

import config from '../../../utils/config.js';


import { FaUserCircle } from "react-icons/fa";


import "./login.css"

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const loginMethods = useForm({
    defaultValues:{
      username: "",
      password: ""
    }
  })

  const{
    register,
    handleSubmit,
  } = loginMethods;


  const onSubmit = async (data) =>{
    try{
      const res = await fetch(`${config.API_URL}/auth/login`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          password: data.password
        }),
        credentials: "include"
      });

      if(!res.ok){
        throw new Error('Neplatné prihlasovacie údaje');
      }

      const result = await res.json();
      const token = result.accessToken;

      login(token);
      navigate("/adminpanel/dashboard");
      
    }catch(e){
      console.error("Failed to login! error: ", e);
    }
  }

  return (
      <div className="loginContainer">
        <div className="loginBox">
          <div className="loginHeader">
            <FaUserCircle className='icon'/>
            <h4>Login!</h4>
          </div>
          <FormProvider {...loginMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="loginContent">
                <div className="inputBox">
                  <input type='text' placeholder='username' {...register("username", {required: true})}></input>
                </div>
                <div className="inputBox">
                  <input type='password' placeholder='password' {...register("password", {required: true})}></input>
                </div>
                <div className="submitBTNBox">
                  <button type='submit' className='loginBTN'>Prihlásiť sa</button>
                </div>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
  )
}

export default Login