import { useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { CREATE_QUOTE } from '../gqloperations/mutations'
import { GET_ALL_QUOTES } from '../gqloperations/queries'

export default function CreateQuote() {
    const [quote, setQuote] = useState("")
    const [createQuote, { data, error, loading }] = useMutation(CREATE_QUOTE, {
        refetchQueries: [
            'getUserDetails',
            'getAllQuotes'
        ],
        onError: (error) => {
            console.error('Mutation error!', error.message);
        }
    })

    if (loading) return <h1>Loading</h1>


    const handleSubmit = async (e) => {
        e.preventDefault()
        await createQuote({
            variables: {
                name: quote,
            },
        })
    }
    return (
        <div className="container my-container">
            {
                error &&
                <div className="red card-panel">{error.message}</div>
            }
            {
                data &&
                <div className="green card-panel">{data.createQuote}</div>
            }
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={quote}
                    onChange={e => setQuote(e.target.value)}
                    placeholder="write your quote here"
                />
                <button className="btn green">create</button>
            </form>

        </div>
    )
}