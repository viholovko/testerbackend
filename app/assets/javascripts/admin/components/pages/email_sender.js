import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
} from 'react-bootstrap';
import {
  Paper,
  RaisedButton,
  TextField,
  CircularProgress,
  Toggle,
} from 'material-ui';
import { paperStyle } from '../common/styles';
import { show, update } from '../../services/email_sender';

class EmailSenderForm extends Component {
  state = {
    email_sender: {}
  }

  componentWillMount() {
    this._retrieveEmailSender();
  }

  _retrieveEmailSender = () => {
    show().success(res => {
      this.setState({
        email_sender: res.email_sender
      })
    })
  };

  handleChange = (key,value) => {
    this.setState({
      email_sender: {
        ...this.state.email_sender,
        [key]: value
      }
    })
  };

  handleSubmit = event => {
    event.preventDefault();
    const { email_sender } = this.state;
    update(email_sender)
      .success(res => {
        location.hash = '#/';
      })
      .progress(value => {
        this.setState({ progress: value })
      })
  };

  render() {
    const { isLoading } = this.props.app.main;
    const { email_sender, progress } = this.state;

    return (
        <Paper style={paperStyle} zDepth={1}>
            <Row>
                <Col sm={4}><h2>&nbsp;EmailSender Form</h2>
                </Col>
            </Row>
            <hr/>
          <form onSubmit={this.handleSubmit}>
              <FormGroup>
              <Row>
                  <Col sm={12}>
                      <Col sm={6}>
                         <Row>
                             <Col sm={5}>
                                <ControlLabel>Address:</ControlLabel>
                             </Col>
                             <Col sm={7}>
                                <TextField hintText='Address' fullWidth={true} value={email_sender.address} onChange={(_,val) => this.handleChange('address', val)} />
                             </Col>
                         </Row>
                         <Row>
                             <Col sm={5}>
                                <ControlLabel>Domain:</ControlLabel>
                             </Col>
                             <Col sm={7}>
                                <TextField hintText='Domain' fullWidth={true} value={email_sender.domain} onChange={(_,val) => this.handleChange('domain', val)} />
                             </Col>
                         </Row>
                         <Row>
                             <Col sm={5}>
                                <ControlLabel>User name:</ControlLabel>
                             </Col>
                             <Col sm={7}>
                                <TextField hintText='User name' fullWidth={true} value={email_sender.user_name}
                                    onChange={(_,val) => this.handleChange('user_name', val)} />
                             </Col>
                         </Row>
                         <Row>
                            <Col sm={5}>
                                <ControlLabel>Enable Starttls Auto:</ControlLabel>
                            </Col>
                            <Col sm={7}>
                                <Toggle toggled={email_sender.enable_starttls_auto}
                                    onToggle={() => this.handleChange('enable_starttls_auto', !email_sender.enable_starttls_auto)}
                                />
                            </Col>
                          </Row>
                      </Col>
                      <Col sm={6}>
                          <Row>
                              <Col sm={3}>
                                  <ControlLabel>Port:</ControlLabel>
                              </Col>
                              <Col sm={9}>
                                  <TextField hintText='Port' fullWidth={true} value={email_sender.port} onChange={(_,val) => this.handleChange('port', val)} />
                              </Col>
                          </Row>
                          <Row>
                              <Col sm={3}>
                                  <ControlLabel>Authentication:</ControlLabel>
                              </Col>
                              <Col sm={9}>
                                  <TextField hintText='Authentication' fullWidth={true}
                                             value={email_sender.authentication}
                                             onChange={(_,val) => this.handleChange('authentication', val)} />
                              </Col>
                          </Row>
                          <Row>
                              <Col sm={3}>
                                  <ControlLabel>Password:</ControlLabel>
                              </Col>
                              <Col sm={9}>
                                  <TextField hintText='Password' type='password' fullWidth={true}
                                    value={email_sender.password} onChange={(_,val) => this.handleChange('password', val)} />
                              </Col>
                          </Row>
                          <Col sm={6} smOffset={5} className="text-right">
                              <CircularProgress className={isLoading && progress > 0 ? 'loading-spinner' : 'hidden'} mode="determinate" value={progress} size={36} />
                              <RaisedButton type='submit' primary={true} className='pull-right' label="Save EmailSender" disabled={isLoading} />
                          </Col>
                      </Col>
                  </Col>
              </Row>
              </FormGroup>
          </form>
        </Paper>
    )
  }
}

export default connect(state => state)(EmailSenderForm)
