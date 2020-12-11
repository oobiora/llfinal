import React, { Component } from 'react';
import {Register, AuthenticateUserPage} from '../assets/auth';
import { Zoom } from "react-awesome-reveal";


class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {username: '', email: '',  password: '', password2: ''}

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        const {email, username, password, password2 } = this.state
        event.preventDefault()
        if (password !== password2){
            alert("Please ensure the passwords match")
        } else {
            (async () => {

                let response = await Register(email, username, password)
                    .then(async () => {
                        let permission = await AuthenticateUserPage()
                            .then(response => {if (response) this.props.history.push('/quiz'); })
                            .catch((err) => alert(err))
                    })
                    .catch((err) => alert(err))

            })();
        }
    }
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    render() {
        return (
            <div className="SignupClass">
                <div className="login-signup-background">
                    <Zoom><div className="login-signup-card text-center box-shadow-effect">
                        <img src="img/logo-black.png" style={{width:"120px"}}></img>
                        <h1 className="login-signup-card-title">Welcome</h1>

                        <form className="login-signup-card-user-content validate-form" onSubmit={this.handleSubmit}>

                            <div className="login-signup-group">
                                <input className="login-signup-card-input-el" name="username" onChange={this.handleChange} value={this.state.username} type="text" required />
                                <span className="login-signup-highlight"></span>
                                <span className="login-signup-input-bar"></span>
                                <label className="login-signup-label">Username</label>
                            </div>

                            <div className="login-signup-group">
                                <input className="login-signup-card-input-el" name="email" onChange={this.handleChange} value={this.state.email} type="text" required />
                                <span className="login-signup-highlight"></span>
                                <span className="login-signup-input-bar"></span>
                                <label className="login-signup-label">Email</label>
                            </div>

                            <div className="login-signup-group">
                                <input className="login-signup-card-input-el" name="password" onChange={this.handleChange} value={this.state.password} type="text" required />
                                <span className="login-signup-highlight"></span>
                                <span className="login-signup-input-bar"></span>
                                <label className="login-signup-label">Password</label>
                            </div>

                            <div className="login-signup-group" style={{ marginBottom: "12px"}}>
                                <input className="login-signup-card-input-el" name="password2" onChange={this.handleChange} value={this.state.password2} type="text" required />
                                <span className="login-signup-highlight"></span>
                                <span className="login-signup-input-bar"></span>
                                <label className="login-signup-label">Confirm Password</label>
                            </div>

                            <div className="signup-login-terms">
                                <input type="checkbox" /> I agree to the <a data-toggle="modal" data-target="#ModalLong">terms and conditions.</a>
                            </div>

                            <div className="modal fade" id="ModalLong" tabindex="-1" role="dialog" aria-labelledby="ModalLongTitle" aria-hidden="true">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="ModalLongTitle">Disclaimer</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                Please consult your physician or other health care professional before starting this or any other
                                fitness program to determine if it is right for your needs. This Personal Reformer app (PR) assumes
                                that you have studied the basic tenants of alignment, breathing and resistance as it pertains to using
                                a reformer. PR offers health, fitness and nutritional information and is designed for educational
                                purposes only. You should not rely on this information as a substitute for, nor does it replace,
                                professional medical advice, diagnosis, or treatment. If you have any concerns or questions about your
                                health, you should always consult with a physician or other health-care professional. The use of PR  is
                                solely at your own risk.<br /><br />Use of PR constitutes an agreement by the user to clear with their
                                medical provider before using the app and to not hold MBSFiness or any of its officers, employees or
                                volunteers liable or responsible for injury sustained using it nor information posted on it.<br /><br />
                                If you are in the United States and think you are having a medical or health emergency, call your
                                health care professional, or 911, immediately.
                                </div>
                                </div>
                            </div>
                            </div>

                            <div className="login-signup-row-container">
                                <button className="btn btn-theme effect btn-md">Sign Up</button>
                                {/* <a href="#">Already have an account?</a> */}
                            </div>
                        </form>

                    </div></Zoom>
                </div>
            </div>
        );
    }
}


export default Signup