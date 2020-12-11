import React, { Component, useReducer } from 'react';

import {Link} from 'react-router-dom';
import { LoginUser, AuthenticateUserPage } from '../assets/auth';
import { Zoom } from "react-awesome-reveal";

class Login extends Component {
    componentDidMount() {
        (async () => {
            let permission = await AuthenticateUserPage()
                .then(response => {if (response) this.props.history.push('/quiz')})
                .catch((err) => console.log(err))
        })()
    }
    constructor(props) {
        super(props);
        this.state = {method: '', password: ''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        const {method, password } = this.state

        event.preventDefault();

         (async()  => {
            let response = await LoginUser(method, password)
                .then(async () => {
                    let permission = await AuthenticateUserPage()
                        .then(response => {if (response) this.props.history.push('/quiz'); })
                        .catch((err) => alert(err))
                    })
                .catch((err) => alert(err))
        })
        ();

    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    render() {
        return (
            <div className="Login">
                <div className="login-signup-background">
                    <Zoom><div className="login-signup-card text-center box-shadow-effect">
                        <img src="img/logo-black.png" style={{width:"120px"}}></img>
        <h1 className="login-signup-card-title">Welcome back, {this.state.method}</h1>

                        <form className="login-signup-card-user-content validate-form" onSubmit={this.handleSubmit}>

                            <div className="login-signup-group">
                                <input className="login-signup-card-input-el" name="method" onChange={this.handleChange} value={this.state.method} type="text" required />
                                <span className="login-signup-highlight"></span>
                                <span className="login-signup-input-bar"></span>
                                <label className="login-signup-label">Email/Password</label>
                            </div>

                            <div className="login-signup-group">
                                <input className="login-signup-card-input-el" name="password" onChange={this.handleChange} value={this.state.password} type="text" required />
                                <span className="login-signup-highlight"></span>
                                <span className="login-signup-input-bar"></span>
                                <label className="login-signup-label">Password</label>
                            </div>

                            <Link to="/signup">Don't have an account yet?</Link>

                            <div className="login-signup-row-container">
                                <button className="btn btn-theme effect btn-md" style={{marginTop: "36px"}}>Login</button>
                            </div>

                        </form>

                    </div></Zoom>
                </div>
            </div>
        );
    }
}

export default Login;
