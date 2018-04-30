import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Row,
    Col,
    ControlLabel,
    Clearfix
} from 'react-bootstrap';
import {
    Paper,
    RaisedButton,
    TextField,
    CircularProgress
} from 'material-ui';
import {paperStyle} from '../common/styles';
import {show, upsert} from '../../services/admin';
import AdminsIcon from '../common/icons/admins'

class AdminForm extends Component {
    state = {
        admin: {}
    };

    componentWillMount() {
        this._retrieveAdmin();
    }

    _retrieveAdmin = () => {
        const {id} = this.props.params;
        if (!id) {
            return false
        }
        show(id).success(res => {
            this.setState({
                admin: res.admin
            })
        })
    };

    handleChange = (key, value) => {
        const {admin} = this.state;
        this.setState({
            admin: changeValue.call(admin, key, value)
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {admin} = this.state;
        upsert(admin)
            .success(res => {
                location.hash = '#/admins';
            })
            .progress(value => {
                this.setState({progress: value})
            })
    };


    render() {
        const {isLoading} = this.props.app.main;
        const {admin, progress} = this.state;

        return (
            <Paper style={paperStyle} zDepth={1}>
                <Row>
                    <Col sm={4}>
                        <h2><AdminsIcon/>&nbsp;Admin</h2>
                    </Col>
                    <Col sm={8}>
                        <RaisedButton href='#/admins' className='pull-right' secondary={true} label='Back'/>
                    </Col>
                </Row>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                    <Row>
                        <Col sm={12}>
                            <Col sm={6}>
                                <Row>
                                    <Col sm={5}>
                                        <ControlLabel>Name:</ControlLabel>
                                    </Col>
                                    <Col sm={7}>
                                        <TextField hintText='Name' fullWidth={true} value={admin.first_name}
                                                   onChange={(_, val) => this.handleChange('first_name', val)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={5}>
                                        <ControlLabel>
                                            Email:
                                        </ControlLabel>
                                    </Col>
                                    <Col sm={7}>
                                        <TextField hintText='Email' fullWidth={true} value={admin.email}
                                                   onChange={(_, val) => this.handleChange('email', val)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={5}>
                                        <ControlLabel>
                                            Password:
                                        </ControlLabel>
                                    </Col>
                                    <Col sm={7}>
                                        <TextField hintText='Password' fullWidth={true} value={admin.password}
                                                   onChange={(_, val) => this.handleChange('password', val)}/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col sm={5}>
                                        <ControlLabel>
                                            Password confirmation:
                                        </ControlLabel>
                                    </Col>
                                    <Col sm={7}>
                                        <TextField hintText='Password confirmation' fullWidth={true}
                                                   value={admin.password_confirmation}
                                                   onChange={(_, val) => this.handleChange('password_confirmation', val)}/>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm={6}>
                                <Col sm={4} smOffset={8} className="text-right">
                                    <br/>
                                    <CircularProgress
                                        className={isLoading && progress > 0 ? 'loading-spinner' : 'hidden'}
                                        mode="determinate" value={progress} size={36}/>
                                    <RaisedButton type='submit' primary={true} className='pull-right' label="Save Admin"
                                                  disabled={isLoading}/>
                                </Col>
                                <Clearfix />
                            </Col>
                        </Col>
                    </Row>
                </form>
            </Paper>
        )
    }
}

export default connect(state => state)(AdminForm)
