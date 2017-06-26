import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClient } from '../../api/actions'
import { Link } from 'react-router-dom';

class ClientList extends Component {
    componentWillMount() {
        this.props.retriveClients();
    }

    render() {
        const trs = this.props.clients.list.map(client => (
            <tr key={client.Id}>
                <td>{client.Name}</td>
                <td>{client.DateOfBirth}</td>
            </tr>
        ))

        return (
            <div>
                <h3>Clients List</h3>
                <Link to="/clients/create">New Client</Link>
                <br />
                <br />

                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Birth</td>
                        </tr>
                    </thead>
                    <tbody>
                        {trs}
                    </tbody>
                </table>

            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        clients: state.clients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        retriveClients: () => dispatch(fetchClient())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);