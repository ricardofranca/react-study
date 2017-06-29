import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getClient, updateClient, updateClientForm } from '../../api/actions';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';

class EditClient extends Component {
    componentWillMount() {
        const { id } = this.props.match.params;
        this.props.getClient(id);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.updateClient(this.props.clients.edit.id, this.props.clients.edit.name, this.props.clients.edit.dateOfBirth.format());
    }

    render() {
        return (
            <div>
                <h3>Edit Client</h3>

                <div className="error-message">
                    {this.props.messages.errorMessage}
                </div>

                <form onSubmit={this.handleSubmit.bind(this)}>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input type="text" name="name" value={this.props.clients.edit.name} onChange={(event) => this.props.updateForm('name', event.target.value)} required />
                    </div>

                    <div>
                        <label htmlFor="dateOfBirth">Dt Birth:</label>
                        <DatePicker name="dateOfBirth" dateFormat="DD/MM/YYYY" selected={this.props.clients.edit.dateOfBirth} onChange={(date) => this.props.updateForm('dateOfBirth', date)} />
                    </div>

                    <input type="submit" value="Save" />
                    <Link to="/clients">Cancel</Link>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        clients: state.clients,
        messages: state.messages,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getClient: (clientId) => dispatch(getClient(clientId)),
        updateClient: (id, name, dateOfBirth) => dispatch(updateClient(id, name, dateOfBirth)),
        updateForm: (field, fieldValue) => dispatch(updateClientForm(field, fieldValue)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditClient);