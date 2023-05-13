import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { SIGN_UP } from '../gqloperations/mutations'

export default function Signup() {
    const [formData, setFormData] = useState({})
    const [signupUser, { data, error, loading }] = useMutation(SIGN_UP,{
        onError: (error) => {
            console.error('Mutation error!', error.message);
            
          }
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
            
            let user = await signupUser({
                variables: {
                    userNew: formData,
                },
            })
        
    };

    return (
        <div className="container my-container">
            {loading && <h1>Loading...</h1>}
            {error && (
                <div className='red red-panel'>
                    <h2>Error: {error.message}</h2>
                </div>
            )}
            {data && data.user && (
                <div className='green green-panel'>
                    <h2>User Saved Successfully! You can login Now!</h2>
                </div>
            )}
            <h5>Signup!!</h5>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="First Name"
                    name="firstName"
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={handleChange}
                    required
                />
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
                <button className="btn #673ab7 deep-purple" type="submit">Submit</button>
            </form>
        </div>
    )
}
