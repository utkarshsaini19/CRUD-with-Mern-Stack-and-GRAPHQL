import React,{useState} from 'react'
import { LOGIN } from '../gqloperations/mutations';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router';

export default function Login() {
    const navigate = useNavigate();
    const [formData,setFormData] = useState({})
    const [signinUser, { data, error, loading }] = useMutation(LOGIN,{
        onCompleted: (data) => {
            localStorage.setItem('token',data.user.token)
            navigate('/')
        },
        onError: (error) => {
            console.error('Mutation error!', error.message);
            }
    })

    if(loading)
    {
        return <h1>Loading...</h1>
    }
    
    const handleChange = (e)=>{
        setFormData({
         ...formData,
         [e.target.name]:e.target.value
        })
    
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        let user = await signinUser({
            variables: {
                userSignIn: formData,
            },
        })
    }
    return (
        <div className="container my-container">
            <h5>Login!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                 type="email"
                 placeholder="email"
                 name="email"
                 onChange={handleChange}
                 required
                 />
                <input
                 type="password"
                 placeholder="password"
                 name="password"
                 onChange={handleChange}
                 required
                 />
                 <button className="btn #673ab7 deep-purple" type="submit">Login</button>
            </form>
        </div>
    )
}