import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';
import {AppBar, Drawer, MenuItem, IconButton} from 'material-ui';
import { logout } from '../../../services/sessions';
import { LogoutIcon,
    AdminsIcon,
} from '../../common/icons';

class HomePage extends Component {
  state = { open: false };

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
        <div className="dashboard-page">
          <AppBar title="Admin Panel"
                  onLeftIconButtonTouchTap={ this.handleToggle }
                  iconElementRight={<IconButton onTouchTap={logout}><LogoutIcon /></IconButton>}
          />
          <Drawer
            docked={false}
            width={300}
            open={this.state.open}
            onRequestChange={(open) => this.setState({open})}
          >
            <MenuItem onTouchTap={this.handleToggle} href='#/admins' leftIcon={<AdminsIcon />}>
              Admins
            </MenuItem>
            <MenuItem onTouchTap={this.handleToggle} href='#/tests' leftIcon={<AdminsIcon />}>
              Tests
            </MenuItem>
          </Drawer>
          <Grid>
            <Row>
              <Col md={12}>
                <br/>
                {this.props.children}
              </Col>
            </Row>
          </Grid>
        </div>
    );
  }

}

export default HomePage;
