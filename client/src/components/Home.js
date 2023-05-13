import React from 'react'
import { useQuery, gql } from '@apollo/client';
import { GET_ALL_QUOTES } from '../gqloperations/queries';
import { Link } from 'react-router-dom';

export default function Home() {

    const { loading, error, data } = useQuery(GET_ALL_QUOTES, {
        fetchPolicy: 'cache-and-network'
    })

    if (loading) return <h1>Loading...</h1>

    if (data && data.quotes && data.quotes.length === 0) {
        return <h1>No quotes available</h1>
    }

    if(data)
    {
        console.log(data);
    }

    return (
        <div className="container">
            {
               data && data.quotes && data.quotes.map((quote) => {
                    return (
                        <blockquote key={quote.name + Math.random()}>
                            <h6>{quote.name}</h6>
                            <Link to={`/profile/${quote.by._id}`} ><p className="right-align">~{quote.by.firstName}</p></Link>
                        </blockquote>
                    )
                })
            }

        </div>
    )
}