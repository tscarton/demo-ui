import React from 'react';
import CustomerManager from '../Customer/CustomerManager';
import './Home.scss';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavbarText
  } from 'reactstrap';
import { logout } from "../../services/auth";

class Home extends React.Component {
  
  doLogout = async e => {
    logout();
    this.props.history.push("/");
  }

  render() {
    return (
        <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/app">Demo</NavbarBrand>
          <Collapse isOpen={false} navbar>
            <Nav className="mr-auto" navbar />
            <NavbarText onClick={this.doLogout} className="logout">Logout</NavbarText>
          </Collapse>
        </Navbar>
        <div>
            <CustomerManager/>
        </div>
      </div>
    );
  }
}

export default Home;
