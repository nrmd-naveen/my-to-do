import './register.css';
import { useEffect, useState } from 'react';
import Loader from '../assets/loader';
import { registerApi } from '../services/api';
import { setRegIdToken } from '../services/localStorage';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authenticate';

function Register() {
    useEffect(() => {
        document.title = "Register";  
      }, []);
    
    const initialStateErrors = {
        email:{required:false},
        password:{required:false},
        name:{required:false},
        customError:null
    }
    const navigate = useNavigate();     
    const [err,setErr] = useState(initialStateErrors);
    const [loading,setLoading] = useState(false);
    const [input,setInput] = useState({
        name:"",
        email:"",
        password:""
    })
    
    const throwErr =(msg)=>{
        if (msg === 'INVALID_EMAIL') {
            setErr({...err,customError:"Enter a valid Email ID "});
        }
        else if (JSON.stringify(msg).includes('EXIST')){
            setErr({...err,customError:"Email ID already registered"})
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
        let err = initialStateErrors;
        let hasErr = false;
        if (input.name === ""){
            err.name.required = true;
            hasErr = true;
        }
        if (input.email === ""){
            err.email.required = true;
            hasErr = true;
        }
        if (input.password === ""){
            err.password.required = true;
            hasErr = true;
        }
        //sending API for reg
        if(!hasErr){
            setLoading(true);
            registerApi(input).then((response)=>{
                console.log("Register Response --- ",response);
                setRegIdToken(response.data);
                navigate('/');
            }).catch((er) =>{
                console.log('Register Error',er.response.data.error.message);
                throwErr(er.response.data.error.message);
            }).finally(()=>{
                setLoading(false);
            })
        }

        setErr({...err});
    }

    const handleInput =(e)=>{

        setInput({...input,[e.target.name]:e.target.value});
    }

    useEffect(() => {
        isAuthenticated().then(Auth => {
            if(Auth){
                navigate('/');
            }
        })
      }, [navigate]);

    

    return (
        <div className="regpage">
            <div className="regblock">
                <h1 className="head-text basic-6">Register</h1>
                <div>
                    <form onSubmit={handleSubmit} action=''>
                        <div className="input-field">
                            <label>Name</label>
                            <input name='name' onChange={handleInput} type="text"></input>
                            { err.name.required?
                            <span>Name Required</span>:null
                            }
                        </div>
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
                    <p className='question'>Do you already have an account? <Link to='/login'>Login here</Link></p>
                </div>
            </div>
        </div>
    )
}

export default Register;