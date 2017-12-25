import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail } from '../Utils';
import FormGroup from '../Component/FormGroup';
import Button from '../Component/Button';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            isDisabled: true,
            isLoading: false,
            email: '',
            password: '',
            emailErr: '',
            passwordErr: '',
            isEmailInvalid: false,
            isPswdInvalid: false
        }
    }

    handleForm(e) {
        e.preventDefault();

        let pwdValid = false,
            emailValid = false;

        if (this.state.email === '') {
            this.setState({
                emailErr: 'Please enter a valid email.',
                isEmailInvalid: !validateEmail(this.state.email)
            });
        } else {
            this.setState({
                emailErr: '',
                isEmailInvalid: false
            });
            emailValid = true;
        }

        if (this.state.password === '') {
            this.setState({
                passwordErr: 'Please enter a valid password',
                isPswdInvalid: true
            })
        } else {
            this.setState({
                passwordErr: '',
                isPswdInvalid: false
            });
            pwdValid = true;
        }

        if (emailValid && pwdValid) {
            console.log(this.state);
        }
    }

    handleEmail(e) {
        this.setState({
            email: e.target.value,
            isEmailInvalid: !validateEmail(e.target.value),
        })
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value,
            isPswdInvalid: false,
        })
    }

    validatePassword() {
        if (this.state.password.length > 5) {
            this.setState({
                isPswdInvalid: false
            })
        }
    }

    render() {
        return (
            <div className="container pt-5 pb-4">
                <h1 className="display-3 text-center text-secondary">
                    Login
                </h1>
                <div className="row justify-content-center">
                    <div className="col-sm-5">
                        <form onSubmit={this.handleForm.bind(this)}>
                            <FormGroup
                                label="Email"
                                hasError={this.state.isEmailInvalid}
                                formError={this.state.emailErr}
                                input={{
                                    type: 'email',
                                    placeholder: 'Email address',
                                    value: this.state.email,
                                    onChange: this.handleEmail.bind(this)
                                }}
                            />
                            <FormGroup
                                label="Password"
                                hasError={this.state.isPswdInvalid}
                                formError={this.state.passwordErr}
                                input={{
                                    type: 'password',
                                    placeholder: 'Password',
                                    value: this.state.password,
                                    onChange: this.handlePassword.bind(this)
                                }}
                            />
                            <Button
                                disabled={false}
                                type="submit"
                            >
                                Login
                            </Button>

                            <div className="row">
                                <div className="col">
                                    <p className="mt-3">
                                        <Link to="/signup">
                                            Create an account.
                                        </Link>
                                    </p>
                                </div>
                                <div className="col text-right">
                                    <p className="mt-3">
                                        <Link to="/login">
                                            Forgot Password?
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
