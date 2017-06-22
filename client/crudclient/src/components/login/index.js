import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { constants } from '../../constants';
import { succesLogin } from '../../api/actions';

class Login extends Component {

    handleSubmit(event) {
        event.preventDefault();

        this.doTheRequest();
    }

    doTheRequest() {
        var details = {
            'userName': 'ricardodeoliveirafranca@gmail.com',
            'password': 'Ab-123',
            'grant_type': 'password'
        };

        var formBody = [];
        for (var property in details) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch(constants.urlToken, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        }).then(response => {
            if (!response.ok) {
                throw new Error("It was not possible to reach the server, try again in a minute");
            }

            return response.json();
        }).then(responseToken => {
            this.props.successLogin(responseToken.userName, responseToken.access_token);
            this.props.history.push('/');
        })
        .catch(error => {
            console.log('err', error);
        });
    }

    render() {
        console.log('render-login');
        return (
            <div>
                <div className="box-message">
                    {this.props.messages.errorMessage}
                </div>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label htmlFor="login">Login:</label>
                        <input type="text" id="login" ref={input => this.login = input} />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" ref={input => this.password = input} />
                    </div>

                    <div>
                        <button>Login</button> | <Link to="/register" >New here?</Link>
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
        successLogin: (login, token) => dispatch(succesLogin(login, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);