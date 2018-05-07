import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Row, Col} from 'react-bootstrap';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  RaisedButton,
  FlatButton,
  Dialog,
  IconButton,
  Paper,
  CircularProgress
} from 'material-ui';
import {
  ActionVisibility,
  ImageEdit,
  ActionDelete
} from 'material-ui/svg-icons';
import Select from 'rc-select';
import Pagination from 'rc-pagination';
import en_US from 'rc-pagination/lib/locale/en_US';
import SortingTh from '../common/sorting_th';
import Filters from '../common/filters_component';
import {paperStyle} from '../common/styles';
import {all, destroy} from '../../services/test';
import AdminsIcon from '../common/icons/admins'

class Tests extends Component {
  state = {
    filters: {
      page: 1,
      per_page: 10
    },
    tests: [],
    count: 0,
    showConfirm: false
  };

  componentWillMount() {
    this._retrieveTests();
  }

  _retrieveTests = () => {
    const {filters} = this.state;
    all(filters).success(res => {
      this.setState({
        tests: res.tests,
        count: res.count
      })
    })
  };

  handlePageChange = (page) => {
    this.setState({filters: {...this.state.filters, page}}, this._retrieveTests);
  };

  handleShowSizeChange = (_, per_page) => {
    this.setState({filters: {...this.state.filters, page: 1, per_page}}, this._retrieveTests);
  };

  prepareToDestroy = record => {
    this.setState({
      selectedRecord: record,
      showConfirm: true
    })
  };

  updateFilters = (filters = []) => {
    let hash = {};
    filters.forEach(item => Object.keys(item).forEach(key => hash[key] = item[key]));
    this.setState({
      filters: {
        ...this.state.filters,
        ...hash,
        page: 1
      }
    }, this._retrieveTests)
  };

  closeConfirm = () => {
    this.setState({showConfirm: false})
  };

  handleDelete = () => {
    const {selectedRecord} = this.state;
    destroy(selectedRecord.id).success(() => {
      this._retrieveTests();
      this.closeConfirm();
    });
  };

  render() {
    const {isLoading} = this.props.app.main;
    const {tests, showConfirm, count} = this.state;
    const {page, per_page} = this.state.filters;
    const {palette} = this.context.muiTheme;

    return (
      <Paper style={paperStyle} zDepth={1}>
        <Row>
          <Col sm={4}><h2><AdminsIcon/>Tests</h2></Col>
          <Col sm={8} className="text-right">
            <CircularProgress className={isLoading ? 'loading-spinner' : 'hidden'} size={36}/>
            <RaisedButton href='#/test/new' className='pull-right' primary={true} label='New Test'/>
          </Col>
        </Row>
        <hr/>

        <Row>
          <Col sm={8}>
            <Pagination
              selectComponentClass={Select}
              onChange={this.handlePageChange}
              showQuickJumper={true}
              showSizeChanger={true}
              pageSizeOptions={['10', '20', '50']}
              pageSize={per_page}
              onShowSizeChange={this.handleShowSizeChange}
              current={page}
              total={count}
              locale={en_US}
            />
          </Col>
        </Row>
        <Filters columns={[{label: 'Title', key: 'title', type: 'string'}]} update={this.updateFilters}/>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>
                <SortingTh update={this.updateFilters} column='title'>Title</SortingTh>
              </TableHeaderColumn>
              <TableHeaderColumn>Active</TableHeaderColumn>
              <TableHeaderColumn>
                <SortingTh update={this.updateFilters} column='created_at'>Created At</SortingTh>
              </TableHeaderColumn>
              <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              tests.map(item => {
                return (
                  <TableRow key={item.id}>
                    <TableRowColumn>{item.title}</TableRowColumn>
                    <TableRowColumn>{item.status ? <span className="green">Yes</span> :
                      <span className="red">No</span>}</TableRowColumn>
                    <TableRowColumn>{item.created_at}</TableRowColumn>
                    <TableRowColumn className='text-right'>
                      <IconButton
                        onTouchTap={() => location.hash = `#/test/${item.id}`}><ActionVisibility
                        color={palette.primary1Color}/></IconButton>
                      <IconButton
                        onTouchTap={() => location.hash = `#/test/${item.id}/edit`}><ImageEdit
                        color={palette.accent1Color}/></IconButton>
                      <IconButton
                        onTouchTap={this.prepareToDestroy.bind(this, item)}><ActionDelete
                        color="#c62828"/></IconButton>
                    </TableRowColumn>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
        <hr/>
        <Dialog
          title="Are you sure?"
          actions={[
            <FlatButton onTouchTap={this.closeConfirm} label='Cancel'/>,
            <FlatButton secondary={true} onTouchTap={this.handleDelete} label='Confirm'/>
          ]}
          modal={false}
          open={showConfirm}
          onRequestClose={this.closeConfirm}
        >
          You are going to remove test.
        </Dialog>
      </Paper>
    );
  }
}

Tests.contextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

export default connect(state => state)(Tests)
