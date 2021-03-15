import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css" 
import axios from 'axios'
import '../../src/App.css' 

export default function Team(){
    const [ url, setUrl ] = useState('')
    const [ name, setName ] = useState('')
    const [ title, setTitle] = useState('')
    const [ entries, getEntries ] = useState([])
    const [ newUrl, setNewUrl ] = useState('')
    const [ newName, setNewName ] = useState('')
    const [ newTitle, setNewTitle ] = useState('')

    //axios - stringifies JSON data
    useEffect(() => {
        async function fetchEntries(){
            axios.get('http://localhost:4000/team')
            .then((response) => {
                const data = response.data
                getEntries(response.data)
                console.log(data)
            }) 
            .catch((err) => {
                console.log(err)
            })
        }

        fetchEntries()
    }, [])

    //when user clicks(event) submit button(target) hangleSubmit triggered
    //handleSubmit takes values from state and stores inside a const payload
    const handleSubmit = async (e) => {
        e.preventDefault()

        //axios uses the post method on the url to send data to database from state
        axios.post('http://localhost:4000/team', {
            url: url,
            name: name,
            title: title
        })
        .then(() => {
            console.log('Data has been sent to the server')
            resetState()
        })  
        .catch(() => {
            console.log('Internal server error')
        })    
    }

    //then returns state back to empty string if adding more or use windows.location = '/' to go homepage
    const resetState = () => {
        this.setState({
            url: '',
            name: '',
            title: '',
        }) 
    }  
    
    const updateEntry = (id) => {
        axios.put('http://localhost:4000/update', {
            id: id,
            newUrl: newUrl,
            newName: newName,
            newTitle: newTitle
        })
    }

    const deleteEntry = (id) => {
        axios.delete(`http://localhost:4000/team/${id}`)
    }    

    return (
        <div className='container'>
            <div className='form-div'>
                <h1>Create Team</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='text'
                        placeholder='url'
                        name='url'
                        onChange={(e) => {
                            setUrl(e.target.value)
                        }}
                        value={url}
                        className='form-control form-group'
                    />
                    <input 
                        type='text'
                        placeholder='name'
                        name='name'
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        value={name}
                        className='form-control form-group'
                    />
                    <input 
                        type='text'
                        placeholder='title'
                        name='title'
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                        value={title}
                        className='form-control form-group'
                    />
                    <h6>*Submit at least 1 person.</h6>

                    <input 
                        type="submit"
                        value='Add'
                        className='btn btn-primary btn-block'
                    />
                </form>
            </div>

            <div className="results">
                <h1 className="heading">Update Team</h1>                
                  { entries.map((entry, id) => {
                        return (
                            <div className="entries" id={id}>
                                <div className="new_entries">    
                                    <h5>{entry.name}</h5>
                                    <img className="entry-img" 
                                        src={entry.url} 
                                        alt={entry.title}
                                    />
                                    <p>{entry.title}</p>
                                </div>                            

                                <div className="update_entries">

                                    <input placeholder='New url - no " " ' onChange={(e) => {
                                        setNewUrl(e.target.value)
                                    }} />

                                    <input placeholder="New name" onChange={(e) => {
                                        setNewName(e.target.value)
                                    }} />
                                                                        <input placeholder="New title" onChange={(e) => {
                                        setNewTitle(e.target.value)
                                    }} />  

                                    <div className="btn_holder">
                                        <button className="update_delete" onClick={() => updateEntry(entry._id)}>Update</button> |  <button className="update_delete" onClick={() => deleteEntry(entry._id)}>Delete</button> 
                                    </div> 
                                </div>
                        </div>
                        )
                  })}
            </div>                
        </div>
    )
}