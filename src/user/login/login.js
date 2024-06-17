import './login.css';
import { useEffect, useState } from 'react';
import Loader from '../assets/loader';
import { loginApi } from '../services/api';
import { setLoginIdToken } from '../services/localStorage';
import { isAuthenticated } from '../services/authenticate';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    useEffect(() => {
        document.title = "Login";  
      }, []);

    const initialStateErrors = {
        email:{required:false},
        password:{required:false},
        customError:null
    }
    const navigate = useNavigate();   
    const [err,setErr] = useState(initialStateErrors);
    const [loading,setLoading] = useState(false);
    const [input,setInput] = useState({
        email:"",
        password:""
    })

    const handleInput =(e)=>{

        setInput({...input,[e.target.name]:e.target.value});
    }

    const throwErr =(msg)=>{
        if (msg === 'INVALID_LOGIN_CREDENTIALS') {
            setErr({...err,customError:"Invalid Email ID or Password "});
        }
        else if (JSON.stringify(msg).includes('TOO_MANY_ATTEMPTS_TRY_LATER')){
            alert("Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.")
        }
        else if (JSON.stringify(msg).includes('WEAK_PASSWORD')){
            setErr({...err,customError:"Password should be at least 6 characters"})
        }
        
        else{
            setErr({...err,customError:msg});
        }
    }

    const handleSubmit =(e) =>{
        e.preventDefault();
        console.log(input)
        let err = initialStateErrors;
        let hasErr = false;
        if (input.email === ""){
            err.email.required = true;
            hasErr = true;
        }
        if (input.password === ""){
            err.password.required = true;
            hasErr = true;
        }
        if(!hasErr){
            setLoading(true);
            loginApi(input).then((response)=>{
                console.log("Login Response ",response);
                setLoginIdToken(response.data.idToken);
            }).catch((er) =>{
                console.log("Login Error ", er.response.data.error.message);
                throwErr(er.response.data.error.message);
            }).finally(()=>{
                setLoading(false)
            })
        }

        setErr({...err});
    } 
    useEffect(() => {
        isAuthenticated().then(Auth => {
            if(Auth){
                navigate('/');
            }
        })
      }, [navigate,loading]);
    

    return (
        <div className="reg-page">
            <div className="reg-block">
                <h1 className="head-text basic-6">Login</h1>
                <div>
                    <form onSubmit={handleSubmit}>
                    <div className="input-field">
                            <label>Email</label>
                            <input name='email' onChange={handleInput} type="email"></input>
                            { err.email.required?
                            <span>Email Required</span>:null
                        }
                        </div>
                        <div className="input-field">
                            <label>Password</label>
                            <input name='password' onChange={handleInput} type="password"></input>
                            { err.password.required?
                            <span>Password Required</span>:null
                            }
                        </div>
                        { err.customError?
                        <span class = "customErr">{err.customError}</span>:null
                    }
                        {loading?
                            <div className='loading'>
                            <Loader />
                        </div>:null
                        }
                        <button className='submit' disabled={loading}>Submit</button>
                    </form>
                    <p className='question'>Are you a new user? <Link to='/register'>Register here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Login;