import React, {Component} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {Link} from 'react-router-dom';

export default class Home extends Component {
    render() {
        return (
            <div className='home'>
                <Header/>
                <section>
                    <div className='jumbotron jumbotron-fluid py-5'>
                        <div className='container text-center py-5'>
                            <h1 className='display-4'>Welcome to ChatApp</h1>
                            <p>let's chat...</p>
                            <div className='mt-4'>
                                <Link to='/signup' className='btn btn-primary px-5 mr-3'>Create New Account</Link>
                                <Link to='/login' className='btn px-5'>Login to Your Account</Link>

                            </div>
                        </div>
                    </div>
                </section>
                <Footer/>
            </div>
        )
    }
}