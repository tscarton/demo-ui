import React from 'react';
import './Login.scss';
import api from "../../services/api";
import { login } from "../../services/auth";
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button, Alert
} from 'reactstrap';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: false
    };
  }

  handleSignIn = async e => {
    e.preventDefault();
    const { username, password } = this.state;
   try {
        const loginData = {"username": username, "password": password}
        const response = await api.post("/login", loginData);
        const authorization = response.headers.authorization;
        login(authorization);
        this.props.history.push("/app");
      } catch (err) {
        console.log("Error login");
        this.setState({loginError: true});
        setTimeout(()=> {
          this.setState({loginError: false});
        }, 2500)
      }
    
  };

  render() {
    const { loginError } = this.state;
    return (
      <div className="Login">
     <Container className="App">
        <h2>Login</h2>
        <Form className="form" onSubmit={this.handleSignIn}>
          <Alert color="danger" isOpen={loginError}>
            Invalid credentials.
          </Alert>
          <Col>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                className="w-50 offset-sm-3" 
                placeholder="Username" required
                onChange={e => this.setState({ username: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                className="w-50 offset-sm-3"
                placeholder="********" required
                onChange={e => this.setState({ password: e.target.value })}
              />
            </FormGroup>
          </Col>
          <Button type="submit" color="primary">Submit</Button>
        </Form>
      </Container>
  </div>
    );
  }
}

export default Login;
