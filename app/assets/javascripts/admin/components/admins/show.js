import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormGroup, ControlLabel, Row, Col} from 'react-bootstrap';
import {
    Paper,
    RaisedButton
} from 'material-ui';
import {paperStyle} from '../common/styles';
import {show} from '../../services/admin';
import AdminsIcon from '../common/icons/admins'

class Admin extends Component {
    state = {
        admin: {},
    };

    componentWillMount() {
        this._retrieveAdmin();
    }

    _retrieveAdmin = () => {
        const {id} = this.props.params;
        show(id).success(res => {
            this.setState({
                admin: res.admin
            })
        })
    };

    render() {
        const {admin} = this.state;

        return (
            <Paper style={paperStyle} zDepth={1}>
                <Row>
                    <Col sm={4}>
                        <ControlLabel><h2><AdminsIcon/>&nbsp;Admin</h2></ControlLabel>
                    </Col>
                    <Col sm={8}>
                        <RaisedButton href='#/admins' className='pull-right' secondary={true} label='Back'/>
                    </Col>
                </Row>
                <hr/>
                <FormGroup>
                    <Row>
                        <Col sm={12}>
                            <Col sm={6}>
                                <Row>
                                    <Col sm={3}>
                                        <ControlLabel>Name</ControlLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <span className="form-control-static">{ admin.first_name || '-' }</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={3}>
                                        <ControlLabel>Email</ControlLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <span className="form-control-static">{ admin.email }</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={3}>
                                        <ControlLabel>Created at</ControlLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <span className="form-control-static">{ admin.created_at }</span>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={3}>
                                        <ControlLabel>Updated at</ControlLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <span className="form-control-static">{ admin.updated_at }</span>
                                    </Col>
                                </Row>
                            </Col>
                        </Col>
                    </Row>
                </FormGroup>
            </Paper>
        )
    }
}

export default connect(state => state)(Admin)
