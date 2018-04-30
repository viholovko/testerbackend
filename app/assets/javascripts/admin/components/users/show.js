import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormGroup, ControlLabel, Row, Col} from 'react-bootstrap';
import {
    Paper,
    RaisedButton,
    Avatar
} from 'material-ui';
import {show} from '../../services/user';
import { paperStyle } from '../common/styles';
import SystemUsersIcon from '../common/icons/system_users'

class User extends Component {
    state = {
        user: {
        },
        value: 'a',
        palette: ''

    };

    componentWillMount() {
        this._retrieveUser();
    }

    _retrieveUser = () => {
        const {id} = this.props.params;
        show(id).success(res => {
            this.setState({
                user: res.user,
            })
        })
    };

    render() {
        const {user} = this.state;
        const { palette } = this.context.muiTheme;

        return (
            <Paper style={paperStyle} zDepth={1}>
                <Row>
                    <Col sm={4}>
                        <ControlLabel><SystemUsersIcon/>User Profile</ControlLabel>
                    </Col>
                    <Col sm={8}>
                        <RaisedButton href='#/users' className='pull-right' secondary={true} label='Back'/>
                    </Col>
                </Row>
                <hr/>
                <FormGroup>
                    <Row>
                        <Col sm={12}>
                            <Col xs={6} md={2}>
                                <Avatar src={user.avatar} size={150}/>
                            </Col>
                            <Col sm={4}>
                                <Row>
                                    <Col sm={4}>
                                        <ControlLabel>First Name</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                    <span className="form-control-static">
                                      { user.first_name || 'Not specified' }
                                    </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <ControlLabel>Last Name</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                    <span className="form-control-static">
                                      { user.last_name || 'Not specified'}
                                    </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <ControlLabel>Email</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                    <span className="form-control-static">
                                      { user.email }
                                    </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <ControlLabel>Title</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                    <span className="form-control-static">
                                      { user.title || 'Not specified' }
                                    </span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <ControlLabel>Birthday</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                    <span className="form-control-static">
                                      { user.birthday || 'Not specified' }
                                    </span>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={4}>
                                <Row>
                                    <Col sm={4}>
                                        <ControlLabel>Confirmed</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                        <span className="form-control-static">{ user.confirmed === 'true' || 'false' }</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <ControlLabel>Created at</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                      <span className="form-control-static">{ user.created_at }</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={4}>
                                        <ControlLabel>Updated at</ControlLabel>
                                    </Col>
                                    <Col sm={8}>
                                        <span className="form-control-static">{ user.updated_at }</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                </FormGroup>
                <hr/>
            </Paper>
        )
    }
}

User.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

export default connect(state => state)(User)
