import React, {Component} from "react";
import {Link} from "react-router-dom";
import {signup} from "../helpers/auth";

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState( {
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ error: '' });
        try {
            await signup(this.state.email, this.state.password)
        } catch (error) {
            this.setState({ error: error.message });
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>
                        Sign Up to
                        <Link to='/'>ChatApp</Link>
                    </h1>
                    <p>Fill in the form to create an account</p>
                    <div>
                        {this.state.error ? <p>{this.state.error}</p> : null}
                    </div>
                    <div>
                        <input type="email" placeholder='Email' name='email' value={this.state.email}
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="password" placegolder='Password' name='password' value={this.state.password}
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type='submit'>Sign up</button>
                    </div>
                    <hr/>
                    <p>Already have an account? <link to='/login'>Login</link></p>
                </form>
            </div>
        )
    }
}
