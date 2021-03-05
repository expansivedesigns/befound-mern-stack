import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import './App.css'

class App extends Component {
    state = {
        url: '',
        title: '',
        desc: '',
        link: '',
        results: []    
    }

    // componentDidMount = () => {
    //     this.getResults()
    // }

    // //not needed 
    // //get the results from database and display back to the paage from state
    // getResults = () => {
    //     axios.get('/api')
    //     .then((res) => {
    //         const data = res.data
    //         this.setState({ results: data})
    //         console.log('Data has been received')
    //     }) 
    //     .catch(() => {
    //         console.log('Error retreiving data.')
    //     })
    // }

    //when user clicks(event) inside input(target) handleChange triggered
    //handleChange gets values from event.target and updates value in state by name(key)
    handleChange = event => {
        const { name, value} = event.target  
        this.setState({ [name]: value }) 
    }

    //when user clicks(event) submit button(target) hangleSubmit triggered
    //handleSubmit takes values from state and stores inside a const payload
    handleSubmit = e =>{
        e.preventDefault()

        const payload = {  
            url: this.state.url,
            title: this.state.title,
            desc: this.state.desc,
            link: this.state.link
        }

        //axios uses the post method on the url to send payload to database
        axios.post('http://localhost:4000/api/form', payload)
        .then(() => {
            console.log('Data has been sent to the server')
            this.resetState()
        })  
        .catch(() => {
            console.log('Internal server error')
        })    
    }
            
    //then returns state back to empty string or use windows.location = '/' to go homepage
    resetState = () => {
        this.setState({
            url: '',
            title: '',
            desc: '',
            link: ''                
        }) 
    }
 
    render(){
        console.log('State: ', this.state)
        return (
            <div className='container'>
                <div className='form-div'>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                            type='text'
                            placeholder='url'
                            name='url'
                            onChange={this.handleChange}
                            value={this.state.url}
                            className='form-control form-group'
                        />
                        <input 
                            type='text'
                            placeholder='title'
                            name='title'
                            onChange={this.handleChange}
                            value={this.state.title}
                            className='form-control form-group'
                        />
                        <input 
                            type='text'
                            placeholder='desc'
                            name='desc'
                            onChange={this.handleChange}
                            value={this.state.desc}
                            className='form-control form-group'
                        />
                        <input 
                            type='text'
                            placeholder='link'
                            name='link'
                            onChange={this.handleChange}
                            value={this.state.link}
                            className='form-control form-group'
                        />
                        <input 
                            type="submit"
                            value='Submit'
                            className='btn btn-primary btn-block'
                        />
                    </form>
                </div>
            </div>

        )
    }
}

export default App