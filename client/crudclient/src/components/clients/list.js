import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchClient, saveClient, removeClient } from '../../api/actions'
import { Link } from 'react-router-dom';

class ClientList extends Component {
    componentWillMount() {
        this.props.retriveClients();
    }

    handleRemove(clientId) {
        const response = window.confirm('Are you sure you want to remove this Client?');
        if (response === true) {
            this.props.remove(clientId);
        }
    }

    render() {
        const trs = this.props.clients.list.map(client => (
            <tr key={client.Id}>
                <td>{client.Name}</td>
                <td>{client.DateOfBirth}</td>
                <td><button onClick={() => this.handleRemove(client.Id)} >remove</button></td>
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
                            <td></td>
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
        retriveClients: () => dispatch(fetchClient()),
        remove: id => dispatch(removeClient(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientList);