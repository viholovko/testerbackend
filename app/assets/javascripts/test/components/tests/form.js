import React, {Component} from 'react';
import {connect} from 'react-redux';
import {FormGroup, Row, Col} from 'react-bootstrap';
import {Paper, RaisedButton, FlatButton, TextField, CircularProgress, Toggle, Divider,
  Step, Stepper, StepLabel, StepContent, Checkbox, RadioButton, RadioButtonGroup, Table, TableBody, TableRow, TableRowColumn
} from 'material-ui';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {paperStyle} from '../common/styles';
import SortableList from '../common/sortable-list.component';
import {show, upsert} from '../../services/test';

class TestForm extends Component {
    state = {
        test: {
          title: '',
          status: false,
          questions: []
        },
      answers: [],
      stepIndex: 0,
      finished: false
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
              ...this.state,
                test: res.test
            })
        })
    };

    handleChange = (question, value, option = null) => {
      const {answers} = this.state;
      switch (question.type){
        case 'check':
          let answer = answers[question.id] || [];
          if (value){
            answer.push(option.id)
          }else{
            answer.splice(answer.indexOf(option.id), 1)
          }
          this.setState({
            answers: {
              ...answers,
              [question.id]: answer

            }
          });
          break;
        case 'numeric':
          this.setState({
            answers: {
              ...answers,
              [question.id]: value
            }
          });
          break;
        case 'radio':
          this.setState({
            answers:{
              ...answers,
              [question.id]: value
            }
          });
        case 'order':
          this.setState({
            answers:{
              ...answers,
              [question.id]: value
            }
          });
      }
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

  _getContent = (quest) => {
    const {answers} = this.state;
    switch (quest.type){
      case 'numeric':
        return(
          <Col sm={2}>
            <TextField hintText='Enter you answer' fullWidth={false} value={answers[quest.id] || ''}
                       onChange={(_, val) => this.handleChange(quest, val)}
                       type='number'
            />
          </Col>
        );
      case 'check':
        return(
          quest.options.map(item => {
            return(
              <Col sm={2} key={item.id}>
                <Checkbox
                  label={item.text}
                  checked={(answers[quest.id] || []).includes(item.id)}
                  onCheck={(_, val) => this.handleChange(quest, val, item)}
                />
              </Col>
            )
          })
        );
      case 'order':
        return(
          <Table>
            <TableBody displayRowCheckbox={false}>
              <TableRow>
                <TableRowColumn>
                  <SortableList
                    data={quest.options}
                    onChange={(options) => this.handleChange(quest, options)}
                    row={(option) => {
                      return (
                        <Table>
                          <TableBody displayRowCheckbox={false}>
                            <TableRow>
                              <TableRowColumn>{ option.text  }</TableRowColumn>
                            </TableRow>
                          </TableBody>
                        </Table>
                      )
                    }}
                  >
                  </SortableList>
                </TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        );
      case 'radio':
        return(
          <Col sm={12}>
            <RadioButtonGroup
              name={quest.id}
              onChange={(_, value) => this.handleChange(quest, value)}
            >
              {
                quest.options.map(item => {
                  return(
                      <RadioButton key={item.id}
                        value={item.id}
                        label={item.text}
                      />
                  )
                })
              }
            </RadioButtonGroup>
          </Col>
            );
      default:
        return 'kapec'
    }
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;
    const {questions} = this.state.test;
    let finished = stepIndex +1 >= questions.length;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={finished ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 ? (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        ) : null }
      </div>
    );
  }

    render() {
        const {isLoading} = this.props.app.main;
        const {test, progress, stepIndex, answers} = this.state;

      return (
        <Paper style={paperStyle} zDepth={1}>
          <Row>
            <Col sm={4}>
              <h2>Test {test.title}</h2>
            </Col>
          </Row>
          <hr/>
          <Stepper activeStep={stepIndex}
                   orientation='vertical'
          >
            {
              test.questions.map((quest, index) => {
                return(
                  <Step key={quest.id}>
                    <StepLabel>Question {index + 1}</StepLabel>
                    <StepContent>
                      <Row>
                        <Col sm={12}>
                          {quest.question}
                          <hr/>
                        </Col>
                      </Row>
                      <Row>
                        {this._getContent(quest)}
                      </Row>
                      {this.renderStepActions(index)}
                    </StepContent>
                  </Step>
                )
              })
            }
          </Stepper>
        </Paper>
      )
    }
}

export default connect(state => state)(TestForm)
