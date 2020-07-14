import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {login, signInWithGoogle, signInWithGitHub} from "../helpers/auth";

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.gitHubSignIn = this.gitHubSignIn.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({error: ''});
        try {
            await login(this.state.email, this.state.password);
        } catch (error) {
            this.setState({error: error.message});
        }
    }

    async googleSignIn() {
        try {
            await signInWithGoogle();
        } catch (error) {
            this.setState({error: error.message});
        }
    }

    async gitHubSignIn() {
        try {
            await signInWithGitHub();
        } catch (error) {
            this.setState({error: error.message});
        }
    }

    render() {
        return (
            <div className='container'>
                <form autoComplete='off' onSubmit={this.handleSubmit} className='mt-5 py-5 px-5'>
                    <h1>
                        Login to <Link to='/' className='title ml-2'>ChatApp</Link>
                    </h1>
                    <p className='lead'>
                        Fill in the form to login to your account
                    </p>
                    <div className='form-group'>
                        {this.state.error ? <p className='text-danger'>{this.state.error}</p> : null}
                    </div>
                    <div className='form-group'>
                        <input type="email" placeholder='Email' name='email' value={this.state.email}
                               onChange={this.handleChange} className='form-control'/>
                    </div>
                    <div className='form-group'>
                        <input type="password" placeholder='Password' name='password' value={this.state.password}
                               onChange={this.handleChange} className='form-control'/>
                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary px-5'>Login</button>
                    </div>
                    <p>Or</p>
                    <button onClick={this.googleSignIn} type='button' className='btn btn-danger mr-2'>
                        Sign in with Google
                    </button>
                    <button onClick={this.gitHubSignIn} className='btn btn-secondary'>
                        Sign in with GitHub
                    </button>
                    <hr/>
                    <p>
                        Don't have an account yet? <Link to='/signup'>Sign up</Link>
                    </p>
                </form>
            </div>
        );
    }
}

