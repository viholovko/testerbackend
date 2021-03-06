import React, { Component } from "react";
import { Grid, Row, Col } from 'react-bootstrap';

class HomePage extends Component {
  state = { open: false };

  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
        <div className="dashboard-page">
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
