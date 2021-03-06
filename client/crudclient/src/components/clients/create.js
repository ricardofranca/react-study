import React, { Component } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { updateClientForm, saveClient } from '../../api/actions';
import { Link } from 'react-router-dom';

class ClientCreate extends Component {

    constructor(props) {
        super(props);
        this.props.updateForm('name', '');
        this.props.updateForm('dateOfBirth', moment());
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.save(this.props.clients.edit.name, this.props.clients.edit.dateOfBirth.format());
    }

    render() {
        return (
            <div>
                <h3>New Client</h3>

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
        messages: state.messages,
        clients: state.clients
    };
}

const mapDispatchToProps = dispatch => {
    return {
        updateForm: (field, fieldValue) => dispatch(updateClientForm(field, fieldValue)),
        save: (name, dateOfBirth) => dispatch(saveClient(name, dateOfBirth))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ClientCreate);