import { useNavigate } from 'react-router-dom';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from './AuthContext.js';


import { FaUserCircle } from "react-icons/fa";


import "./login.css"
import { use } from 'react';

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
    formState: {isSubmitting}
  } = loginMethods;


  const onSubmit = async (data) =>{
    try{
      const res = await fetch("http://localhost:3005/adminpanel/auth/login",{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: data.username,
          password: data.password
        }),
      });

      if(!res.ok){
        throw new Error('Neplatné prihlasovacie údaje');
      }

      const result = await res.json();
      const token = result.token;
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
                  <input type='text' placeholder='username' {...register("username")}></input>
                </div>
                <div className="inputBox">
                  <input type='password' placeholder='password' {...register("password")}></input>
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