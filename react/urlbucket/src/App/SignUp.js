import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { validateEmail } from '../Utils';
import FormGroup from '../Component/FormGroup';
import Button from '../Component/Button';

export default class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            name: '',
            email: '',
            password: '',
            nameErr: '',
            emailErr: '',
            passwordErr: '',
            isNameInvalid: false,
            isEmailInvalid: false,
            isPwdInvalid: false
        }
    }

    handleForm(e) {
        e.preventDefault();

        let pwdValid = false,
            emailValid = false,
            nameValid = false;

        if (this.state.name === '') {
            this.setState({
                nameErr: 'Please enter a valid name.',
                isNameInvalid: true
            });
        } else {
            this.setState({
                nameErr: '',
                isNameInvalid: false
            });
            nameValid = true;
        }

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

        if (this.state.password === '' || this.state.password.length < 6) {
            this.setState({
                passwordErr: 'Please enter a valid password',
                isPswdInvalid: this.state.password.length < 6
            })
        } else {
            this.setState({
                passwordErr: '',
                isPswdInvalid: false
            });
            pwdValid = true;
        }

        if (emailValid && pwdValid && nameValid) {
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
            isPswdInvalid: e.target.value.length < 6,
        })
    }

    handleName(e) {
        this.setState({
            name: e.target.value,
            isNameInvalid: false,
        })
    }

    render() {
        return (
            <div className="container pt-5 pb-4">
                <h1 className="display-3 text-center text-secondary">
                    Sign Up
                </h1>
                <div className="row justify-content-center">
                    <div className="col-sm-5">
                        <form onSubmit={this.handleForm.bind(this)}>
                            <FormGroup
                                label="Name"
                                hasError={this.state.isNameInvalid}
                                formError={this.state.nameErr}
                                input={{
                                    type: 'text',
                                    placeholder: 'Name',
                                    value: this.state.name,
                                    onChange: this.handleName.bind(this)
                                }}
                            />
                            <FormGroup
                                label="Email"
                                hasError={this.state.isEmailInvalid}
                                formError={this.state.emailErr}
                                input={{
                                    type: 'text',
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
                                disabled={this.state.isLoading}
                                type="submit"
                            >
                                Sign Up
                            </Button>

                            <div className="row">
                                <div className="col">
                                    <p className="mt-3">
                                        <Link to="/login">
                                            Log in
                                        </Link>
                                        {' '}
                                        instead?
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
