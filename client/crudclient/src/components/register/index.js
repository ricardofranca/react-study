import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { constants } from '../../constants';
import { connect } from 'react-redux';
import { addErrorMessage, clearErrorMessage } from '../../api/actions';

class Register extends Component {

    handleSubmit(event) {
        event.preventDefault();

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        const requestBody = {
            "Email": this.login.value,
            "Password": this.password.value,
            "ConfirmPassword": this.password.value
        };

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: headers
        };

        fetch(`${constants.urlBase}/Account/Register`, requestInfo)
            .then(response => {

                if (!response.ok) {
                    let message = (response.status === 400)
                        ? 'Error! please make sure that the password contains one letter Upper Case, One lower case, one number.'
                        : 'Could not reach the server, please try again in a minute';

                    throw new Error(message);
                }

                this.props.clearErrorMessage();
                this.props.history.push('/login');
            }).catch(error => {
                this.props.addErrorMessage(error.message);
            });
    }

    render() {
        return (
            <div>

                <div className="box-message">
                    {this.props.messages.errorMessage}
                </div>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label htmlFor="login">Login:</label>
                        <input type="text" id="login" required ref={input => this.login = input} />
                    </div>

                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" required ref={input => this.password = input} />
                    </div>

                    <div>
                        <button>Register</button> | <Link to="/login">Cancel</Link>
                    </div>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        messages: state.messages
    };
};

const mapDispatchToProps = dispatch => {
    return {
        addErrorMessage: (message) => dispatch(addErrorMessage(message)),
        clearErrorMessage: () => dispatch(clearErrorMessage()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);