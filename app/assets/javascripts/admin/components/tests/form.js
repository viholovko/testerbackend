import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormGroup, Row, Col} from 'react-bootstrap';
import {Paper, RaisedButton, TextField, CircularProgress, Toggle, Divider} from 'material-ui';
import {paperStyle} from '../common/styles';
import {show, upsert} from '../../services/test';
import AdminsIcon from '../common/icons/admins'

class TestForm extends Component {
    state = {
        test: {
          title: '',
          status: false
        }
    };

    componentWillMount() {
        this._retrieveTest();
    }

    _retrieveTest = () => {
        const {id} = this.props.params;
        if (!id) {
            return false
        }
        show(id).success(res => {
            this.setState({
                test: res.test
            })
        })
    };

    handleChange = (key, value) => {
        const {test} = this.state;
        this.setState({
            test: changeValue.call(test, key, value)
        })
    };

    handleSubmit = event => {
        event.preventDefault();
        const {test} = this.state;
        upsert(test)
            .success(res => {
                location.hash = '#/tests';
            })
            .progress(value => {
                this.setState({progress: value})
            })
    };


    render() {
        const {isLoading} = this.props.app.main;
        const {test, progress} = this.state;

        return (
            <Paper style={paperStyle} zDepth={1}>
                <Row>
                    <Col sm={4}>
                        <h2><AdminsIcon/>&nbsp;Admin</h2>
                    </Col>
                    <Col sm={8}>
                        <RaisedButton href='#/tests' className='pull-right' secondary={true} label='Back'/>
                    </Col>
                </Row>
                <hr/>
                <form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <TextField hintText='Title' fullWidth={true} value={test.title}
                               onChange={(_, val) => this.handleChange('title', val)}/>
                  </FormGroup>
                  <FormGroup>
                    <Toggle label="Active" toggled={test.status}
                            onToggle={(_, val) => this.handleChange('status', val)}
                    />
                  </FormGroup>
                  <Paper zDepth={2}>
                    <TextField hintText="First name" underlineShow={false} />
                    <Divider />
                    <TextField hintText="Middle name" underlineShow={false} />
                    <Divider />
                    <TextField hintText="Last name" underlineShow={false} />
                    <Divider />
                    <TextField hintText="Email address" underlineShow={false} />
                    <Divider />
                  </Paper>

                <FormGroup>
                  <Row>
                    <Col sm={4} smOffset={8} className="text-right">
                      <br/>
                      <CircularProgress className={isLoading && progress > 0 ? 'loading-spinner' : 'hidden'}
                                        mode="determinate" value={progress} size={36}/>
                      <RaisedButton type='submit' primary={true} className='pull-right' label="Save"
                                    disabled={isLoading}/>
                    </Col>
                  </Row>
                </FormGroup>
                </form>
            </Paper>
        )
    }
}

export default connect(state => state)(TestForm)
