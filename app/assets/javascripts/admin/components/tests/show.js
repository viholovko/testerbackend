import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormGroup, ControlLabel, Row, Col} from 'react-bootstrap';
import {
    Paper,
    RaisedButton
} from 'material-ui';
import {paperStyle} from '../common/styles';
import {show} from '../../services/test';
import AdminsIcon from '../common/icons/admins'

class Test extends Component {
    state = {
        test: {
          title: ''
        },
    };

    componentWillMount() {
        this._retrieveTest();
    }

    _retrieveTest = () => {
        const {id} = this.props.params;
        show(id).success(res => {
            this.setState({
                test: res.test
            })
        })
    };

    render() {
        const {test} = this.state;

        return (
            <Paper style={paperStyle} zDepth={1}>
                <Row>
                    <Col sm={4}>
                        <ControlLabel><h2><AdminsIcon/>&nbsp;Test</h2></ControlLabel>
                    </Col>
                    <Col sm={8}>
                        <RaisedButton href='#/tests' className='pull-right' secondary={true} label='Back'/>
                    </Col>
                </Row>
                <hr/>
                <FormGroup>
                    <Row>
                        <Col sm={12}>
                                <Row>
                                    <Col sm={3}>
                                        <ControlLabel>Title</ControlLabel>
                                    </Col>
                                    <Col sm={9}>
                                        <span className="form-control-static">{ test.title || '-' }</span>
                                    </Col>
                                </Row>
                        </Col>
                    </Row>
                </FormGroup>
            </Paper>
        )
    }
}

export default connect(state => state)(Test)
