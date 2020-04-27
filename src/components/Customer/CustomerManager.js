import React from 'react';
import './CustomerManager.scss';
import api from "../../services/api";
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Col, Form,
  FormGroup, Label, Input } from 'reactstrap';
import Moment from 'react-moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
 
import "react-datepicker/dist/react-datepicker.css";

class CustomerManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customers : [],
      openConfirmDelete: false,
      openEdit: false,
      customerSelected: {}
    }
  }

  deleteRow = (customer) => {

    api.post("/customers/delete", customer).then((response) => {
      let customers = this.state.customers.filter(function(cust) { 
        return cust.email !== customer.email
      })
      this.setState({customers: customers});
      this.closeConfirmDialog();
    })
    .catch(function (error) {
      console.log(error);
    });

   
  }

  closeConfirmDialog = e => {
    this.setState({openConfirmDelete: false});
  }

  openConfirmDialog = e => {
    this.setState({openConfirmDelete: true, customerSelected: e});
  }

  openEditDialog = e => {
    let customerSelected;
    if (e == null) {
      customerSelected = {
        name: "",
        email: "",
        birthday: new Date()
      };
    } else {
      customerSelected = e;
    }
    this.setState({openEdit: true, customerSelected: customerSelected});
  }

  addNewCustomer = e => {
    this.setState({creatingNew: true});
    this.openEditDialog(null);
  }

  componentDidMount() {
      api.get("/customers").then((response) => {
        this.setState({"customers": response.data._embedded.customers});
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  updateCustomer = event => {
    event.preventDefault();
    console.log("Customer to update ", this.state.customerSelected);
    api.post("/customers", this.state.customerSelected).then((response) => {
      let customers = this.state.customers;
      customers.push(response.data);
      this.setState({customers: customers, creatingNew: false, openEdit: false});
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }

  cancelEdit = event => {
    event.preventDefault();
    this.setState({creatingNew: false, openEdit: false});
  }

  renderRow(customer) {
    return (
      <tr key={customer.email}>
        <td>{customer.name}</td>
        <td>{customer.email}</td>
        <td><Moment format="DD-MMM-YYYY">{customer.birthday}</Moment></td>
        <td className="editRow" ><FontAwesomeIcon icon={faEdit} /></td>
        <td className="editRow" onClick={() => this.openConfirmDialog(customer)}><FontAwesomeIcon icon={faTrash} /></td>
      </tr>
    );
  }

  
  render() {
    
    const {openConfirmDelete, customerSelected, openEdit, creatingNew } = this.state;
    return (
        <div>
          <Button color="primary" className="addCustomer" onClick={this.addNewCustomer}>Add</Button>{' '}

          <Table striped>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Birthday</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              { this.state.customers.map(this.renderRow, this) }
            </tbody>
          </Table>
         
          <Modal isOpen={openConfirmDelete}>
            <ModalHeader >Confirm Delete</ModalHeader>
            <ModalBody>
              Are you sure to delete the customer {customerSelected.name}? 
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => this.deleteRow(customerSelected)}>Confirm</Button>{' '}
              <Button color="secondary" >Cancel</Button>
            </ModalFooter>
          </Modal>

          <Modal isOpen={openEdit}>
          <Form className="form" onSubmit={this.updateCustomer}>
            <ModalHeader >{creatingNew ? 'New Customer': 'Edit Customer'}</ModalHeader>
            <ModalBody>
           
         
          <Col>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name" required
                onChange={e => {
                  customerSelected.name = e.target.value;
                  this.setState({ customerSelected: customerSelected })
                }}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="email" required
                onChange={e => {
                  customerSelected.email = e.target.value;
                  this.setState({ customerSelected: customerSelected })
                }}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="birthday">Birthday</Label><br/>
              <Input
                type="date"
                id="birthday"
                placeholder="Birthday" required
                onChange={e => {
                  customerSelected.birthday = e.target.value;
                  this.setState({ customerSelected: customerSelected })
                }}
              />

             
             
            </FormGroup>
          </Col>
        
            </ModalBody>
            <ModalFooter>
              <Button color="primary">Submit</Button>{' '}
              <Button color="secondary" onClick={this.cancelEdit}>Cancel</Button>
            </ModalFooter>
            </Form>
          </Modal>

          
        </div>
    );
  }
}

export default CustomerManager;
