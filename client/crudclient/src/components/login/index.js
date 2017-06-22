import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Login extends Component {

    handleSubmit(event) {
        event.preventDefault();
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

export default connect(mapStateToProps)(Login);