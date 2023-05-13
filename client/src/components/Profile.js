import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_MY_PROFILE } from '../gqloperations/queries';

export default function Profile() {
    const { data, error, loading } = useQuery(GET_MY_PROFILE,{
        onError: (error) => {
            console.error('Mutation error!', error.message);
        },
        fetchPolicy: 'cache-and-network'
    })
    if(loading)
    {
        return <h1>Loading Profile...</h1>
    }
    return (
        <div className="container my-container">
        {
            data && data.user && 
            <>
            <div className="center-align">
                <img className="circle" style={{ border: "2px solid", marginTop: "10px" }} src={`https://robohash.org/${data.user.firstName}.png?size=200x200`} alt="pic" />
                <h5>{data.user.firstName} {data.user.lastName}</h5>
                <h6>Email - {data.user.email}</h6>
            </div>
            <h3>Your quotes</h3>
            {
                data.user?.quotes.map((quote) => {
                    return (
                        <blockquote key={quote.name+Math.random()+Math.random()}>
                            <h6>{quote.name}</h6>
                        </blockquote>
                    )
                })
            }
            </>
        }
        </div>
    )
}