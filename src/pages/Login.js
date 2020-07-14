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
            this.setState({ error: error.message});
        }
    }

    render() {
        return (
            <div>
                <form autoComplete='off' onSubmit={this.handleSubmit}>
                    <h1>
                        Login to <Link to='/'>ChatApp</Link>
                    </h1>
                    <p>
                        Fill in the form to login to your account
                    </p>
                    <div>
                        {this.state.error ? <p>{this.state.error}</p> : null}
                    </div>
                    <div>
                        <input type="email" placeholder='Email' name='email' value={this.state.email}
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <input type="password" placeholder='Password' name='password' value={this.state.password}
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type='submit'>Login</button>
                    </div>
                    <hr/>
                    <p>
                        Don't have an account yet? <Link to='/signup'>Sign up</Link>
                    </p>
                    <p>Or</p>
                    <button onClick={this.googleSignIn} type='button'>
                        Sign in with Google
                    </button>
                    <p>Or</p>
                    <button onClick={this.gitHubSignIn} >
                        Sign in with GitHub
                    </button>
                </form>
            </div>
        );
    }
}

