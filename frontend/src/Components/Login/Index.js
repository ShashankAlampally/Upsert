import { Link, useNavigate } from 'react-router-dom'
import styles from './styles.module.css'
import React from 'react'
import { useState } from 'react'
import axios from 'axios'


function Login() {

    const [data,setData] = useState({
        email:"",
        password:""
    })
    const [error , setError] = useState("")
    const Navigate = useNavigate();
    const handleChange = ({currentTarget:input}) => {
        setData({...data,[input.name]:input.value});
    }
const handleSubmit = (e) =>{
    e.preventDefault()
        
        axios.post('http://shashanks-macbook-air.local:8080/login',data).then((res)=>{
            console.log(res.message)
            console.log(res)
            window.sessionStorage.setItem("token",res.data.data.token)
            window.sessionStorage.setItem("user",res.data.userID)
            Navigate('/shop')

        }).catch((error)=>{
            
            if(error && error.response.status == 400){
                console.log(error.response.data.message);
                setError(error.response.data.message)
            }
        })
    }
    
  return (
    <div className={styles.login_container}>
        <div className={styles.login_form_container}>
            <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Login to your account</h1>
                    <input 
                        type='email' 
                        placeholder='Email'
                        name = "email"
                        onChange={handleChange}
                        value={data.email}
                        required
                        className={styles.input}
                    />
                    <input 
                        type='password' 
                        placeholder='Password'
                        name = "password"
                        onChange={handleChange}
                        value={data.password}
                        required
                        className={styles.input}
                    />
                    {
                        error && <div className={styles.error_msg}>
                            {error}
                        </div>
                    }
                    <button type='submit' className={styles.green_btn}>
                        Sign In
                    </button>
                </form>
            </div>
            <div className={styles.right}>
            <h1>New User ?</h1>
                <Link to='/signup'>
                    <button type='button' className={styles.white_btn}>
                        Sign Up
                    </button>
                </Link>
                
            </div>
        </div>
    </div>
  )
}

export default Login