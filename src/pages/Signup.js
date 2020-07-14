import React, {Component} from "react";
import {Link} from "react-router-dom";
import {signup, signInWithGoogle, signInWithGitHub} from "../helpers/auth";

export default class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.googleSignIn = this.googleSignIn.bind(this);
        this.githubSignIn = this.githubSignIn.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({error: ''});
        try {
            await signup(this.state.email, this.state.password)
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

    async githubSignIn() {
        try {
            await signInWithGitHub();
        } catch (error) {
            console.log(error)
            this.setState({error: error.message});
        }
    }

    render() {
        return (
            <div className='container'>
                <form onSubmit={this.handleSubmit} className='mt-5 py-5 px-5'>
                    <h1>
                        Sign Up to
                        <Link to='/' className='title ml-2'>ChatApp</Link>
                    </h1>
                    <p className='lead'>Fill in the form to create an account</p>
                    <div className='form-group'>
                        {this.state.error ? <p>{this.state.error}</p> : null}
                    </div>
                    <div className='form-group'>
                        <input className='form-control' type="email" placeholder='Email' name='email'
                               value={this.state.email}
                               onChange={this.handleChange}/>
                    </div>
                    <div className='form-group'>
                        <input className='form-control' type="password" placeholder='Password' name='password'
                               value={this.state.password}
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <button type='submit' className='btn btn-primary px-5'>Sign up</button>
                    </div>
                    <p>You can also login with below services</p>
                    <button type='button' onClick={this.googleSignIn} className='btn btn-danger mr-2'>
                        Login with Google
                    </button>
                    <button type='button' onClick={this.githubSignIn} className='btn btn-secondary'>
                        Login with GitHub
                    </button>
                    <hr/>
                    <p>Already have an account? <Link to='/login'>Login</Link></p>
                </form>
            </div>
        )
    }
}
