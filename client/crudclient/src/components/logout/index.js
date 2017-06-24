import { Component } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../api/actions';

class Logout extends Component {
    constructor(props) {
        super(props);
        props.logout();
        props.history.push('/login');
    }

    render() {
        return null;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => {
            return dispatch(logout());
        }
    };
};

export default connect(null, mapDispatchToProps)(Logout);