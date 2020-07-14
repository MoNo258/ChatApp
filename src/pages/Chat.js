import React, {Component} from 'react';
import Header from "../components/Header";
import {auth} from "../services/firebase";
import {db} from "../services/firebase";

export default class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: auth().currentUser,
            chats: [],
            content: '',
            readError: null,
            writeError: null,
            loadingChats: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.myRef = React.createRef();
    }

    // in original code there is async before componentDidMount, but there is no await...
     componentDidMount() {
        this.setState({readError: null, loadingChats: true});
        const chatArea = this.myRef.current;
        try {
            db.ref('chats').on('value', snapshot => {
                let chats = [];
                snapshot.forEach((snap) => {
                    chats.push(snap.val());
                });
                chats.sort((a, b) => a.timestamp - b.timestamp)
                this.setState({chats});
                chatArea.scrollBy(0, chatArea.scrollHeight);
                this.setState({loadingChats: false});
            });
        } catch (error) {
            this.setState({readError: error.message, loadingChats: false})
        }
    }

    handleChange(event) {
        this.setState({
            content: event.target.value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({writeError: null});
        const chatArea = this.myRef.current;
        try {
            await db.ref('chats').push({
                content: this.state.content,
                timestamp: Date.now(),
                uid: this.state.user.uid
            });
            this.setState({content: ''});
            chatArea.scrollBy(0, chatArea.scrollHeight)
        } catch (error) {
            this.setState({writeError: error.message});
        }
    }

    formatTime(timestamp) {
        const currDate = new Date(timestamp);
        const day = currDate.getDate().toString().length !== 2 ? '0'+ currDate.getDate() : currDate.getDate();
        const month = currDate.getMonth().toString().length !== 2 ? '0' + (currDate.getMonth() + 1) : currDate.getMonth() + 1;
        const time = `${day}/${month}/${currDate.getFullYear()} ${currDate.getHours()}:${currDate.getMinutes()}`;
        return time;
    }

    render() {
        return (
            <div>
                <Header/>
                <div className='chat-area' ref={this.myRef}>
                    {/*loading...*/}
                    {this.state.loadingChats ? <div className='spinner-border text-success' role='status'>
                            <span className='sr-only'>Loading...</span>
                        </div> : ''}
                    {/*chat*/}
                    {this.state.chats.map(chat => {
                        return <p key={chat.timestamp}
                                  className={'chat-bubble ' + (this.state.user.uid === chat.uid ? 'current-user' : '')}>
                            {chat.content}
                            <br/>
                            <span className='chat-time floating-right'>At: {this.formatTime(chat.timestamp)}</span>
                            <br/>
                            <span className='chat-time floating-right'>By: {chat.uid}</span>
                        </p>
                    })}
                </div>
                {/*message form*/}
                <form onSubmit={this.handleSubmit} className='mx-3'>
                    {this.state.writeError ? <p>{this.state.writeError}</p> : null}
                    {/*{this.state.error ? <p>{this.state.error}</p> : null}*/}
                    <textarea onChange={this.handleChange} value={this.state.content} className='form-control'
                              name='content'/>
                    <button type='submit' className='btn btn-submit px-5 mt-4'>Send</button>
                </form>
                <div className='py-5 mx-3'>
                    Login in as: <strong className='text-info'>{this.state.user.email}</strong>
                </div>
            </div>
        );
    }
}