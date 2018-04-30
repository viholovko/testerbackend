import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Row,
    Col,
    ControlLabel
} from 'react-bootstrap';
import {
    Paper,
    RaisedButton,
    TextField,
    DatePicker,
    CircularProgress
} from 'material-ui';

import {paperStyle} from '../common/styles';
import {show, upsert} from '../../services/user';
import SystemUsersIcon from '../common/icons/system_users';

class UserForm extends Component {
    state = {
        user: {
            title: '',
            first_name: '',
            last_name: '',
        }
    };

    componentWillMount() {
        this._retrieveUser();
    }

    _retrieveUser = () => {
        const {id} = this.props.params;
        if (!id) {
            return false
        }
        show(id).success(res => {
            this.setState({
                user: res.user
            })
        })
    };

    handleChange = (key, value) => {
        const {user} = this.state;
        this.setState({
            user: changeValue.call(user, key, value)
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {user} = this.state;
        upsert(user)
            .success(res => {
                location.hash = '#/users';
            })
            .progress(value => {
                this.setState({progress: value})
            })
    };

    render() {
        const {isLoading} = this.props.app.main;
        const {user, progress} = this.state;

        return (
            <Paper style={paperStyle} zDepth={1}>
                <Row>
                    <Col sm={4}>
                        <h2><SystemUsersIcon/> User</h2>
                    </Col>
                    <Col sm={8}>
                        <RaisedButton href='#/users' className='pull-right' secondary={true} label='Back'/>
                    </Col>
                </Row>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={12}>
                            <Col sm={6}>
                                <Row>
                                    <Col sm={3}>
                                        <ControlLabel>Title:</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                        <TextField hintText='title' fullWidth={true} value={user.title}
                                                   onChange={(_, val) => this.handleChange('title', val)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={3}>
                                        <ControlLabel>First Name:</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                        <TextField hintText='First Name' fullWidth={true} value={user.first_name}
                                                   onChange={(_, val) => this.handleChange('first_name', val)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={3}>
                                        <ControlLabel>Last Name:</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                        <TextField hintText='Last Name' fullWidth={true} value={user.last_name}
                                                   onChange={(_, val) => this.handleChange('last_name', val)}/>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4} smOffset={8} className="text-right">
                            <br/>
                            <CircularProgress className={isLoading && progress > 0 ? 'loading-spinner' : 'hidden'}
                                              mode="determinate" value={progress} size={36}/>
                            <RaisedButton type='submit' primary={true} className='pull-right' label="Save"
                                          disabled={isLoading}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={4}>
                            <ControlLabel>Date of Birth</ControlLabel>
                        </Col>
                        <Col sm={8}>
                            <DatePicker
                                value={user.birthday}
                                name='dob'
                                onChange={(_, val) => this.handleChange('birthday', val)}
                                container="inline"
                                mode="landscape"
                            />
                        </Col>
                    </Row>
                </form>
            </Paper>
        )
    }
}

export default connect(state => state)(UserForm)
