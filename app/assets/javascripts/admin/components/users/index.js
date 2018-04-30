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
    FlatButton,
    Dialog,
    IconButton,
    Paper,
    CircularProgress,
    RaisedButton,
    Avatar
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
import {all, destroy} from '../../services/user';
import SystemUsersIcon from '../common/icons/system_users'

class Users extends Component {
    state = {
        filters: {
            page: 1,
            per_page: 10
        },
        users: [],
        count: 0,
        showConfirm: false
    };

    componentWillMount() {
        this._retrieveUsers();
    }

    _retrieveUsers = () => {
        const {filters} = this.state;
        all(filters).success(res => {
            this.setState({
                users: res.users,
                count: res.count
            })
        })
    };

    handlePageChange = (page) => {
        this.setState({filters: {...this.state.filters, page}}, this._retrieveUsers);
    };

    handleShowSizeChange = (_, per_page) => {
        this.setState({filters: {...this.state.filters, page: 1, per_page}}, this._retrieveUsers);
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
        }, this._retrieveUsers)
    };

    closeConfirm = () => {
        this.setState({showConfirm: false})
    };

    handleDelete = () => {
        const {selectedRecord} = this.state;
        destroy(selectedRecord.id).success(res => {
            this._retrieveUsers();
            this.closeConfirm();
        });
    };

    render() {
        const {isLoading} = this.props.app.main;
        const {users, showConfirm, count} = this.state;
        const {page, per_page} = this.state.filters;
        const {palette} = this.context.muiTheme;

        return (
            <Paper style={paperStyle} zDepth={1}>
                <Row>
                    <Col sm={4}><h2><SystemUsersIcon/>Users</h2></Col>
                    <Col sm={8} className="text-right">
                        <CircularProgress className={isLoading ? 'loading-spinner' : 'hidden'} size={36}/>
                        <RaisedButton href='#/users/new' className='pull-right'
                                      primary={true} label='Add User'
                        />
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
                <Filters columns={[
                    {label: 'Name', key: 'name', type: 'string'},
                    {label: 'Email', key: 'email', type: 'string'}
                ]} update={this.updateFilters}/>
                <hr/>
                <Table>
                    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
                        <TableRow>
                            <TableHeaderColumn>""</TableHeaderColumn>
                            <TableHeaderColumn><SortingTh update={this.updateFilters}
                                                          column='name'>Name</SortingTh></TableHeaderColumn>
                            <TableHeaderColumn><SortingTh update={this.updateFilters}
                                                          column='email'>Email</SortingTh></TableHeaderColumn>
                            <TableHeaderColumn>Confirmed</TableHeaderColumn>
                            <TableHeaderColumn><SortingTh update={this.updateFilters} column='created_at'>Created
                                At</SortingTh></TableHeaderColumn>
                            <TableHeaderColumn>Actions</TableHeaderColumn>

                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {
                            users.map(item => {
                                return (
                                    <TableRow key={item.id}>
                                        <TableRowColumn><Avatar src={item.avatar} size={40}/></TableRowColumn>
                                        <TableRowColumn>{ item.first_name  }</TableRowColumn>
                                        <TableRowColumn>{ item.email  }</TableRowColumn>
                                        <TableRowColumn>{ item.confirmed?
                                                <span className="green">Yes</span> :
                                                <span className="red">No</span> }
                                        </TableRowColumn>
                                        <TableRowColumn>{ item.created_at  }</TableRowColumn>
                                        <TableRowColumn className='text-right'>
                                            <IconButton
                                                onTouchTap={() => location.hash = `#/user/${item.id}`}><ActionVisibility
                                                color={palette.primary1Color}/></IconButton>
                                            <IconButton
                                                onTouchTap={() => location.hash = `#/user/${item.id}/edit`}><ImageEdit
                                                color={palette.accent1Color}/></IconButton>
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
                    You are going to remove user.
                </Dialog>
            </Paper>
        )
    }
}

Users.contextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

export default connect(state => state)(Users)
