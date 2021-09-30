import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import axios from 'axios';
import Members from './components/Members/Members.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      first_name: '',
      last_name: '',
      buttonVisiblty: false,
      formStatus: 'create',
      memberIdSelected: null,
    }
  }
  componentDidMount() {
    axios.get('https://reqres.in/api/users?page=1')
    .then(response => {
      this.setState({
        members: response.data.data
      });
    })
    .catch(error => {
      console.log('error', error);
    })
  }
  onSubmit = event => {
    this.setState({ buttonVisiblty: true });
    console.log("p");
    event.preventDefault();
    let payload = {
      first_name: this.state.first_name,
      last_name: this.state.last_name,
    }
    var url = '';
    if(this.state.formStatus === 'create') {
      url = 'https://reqres.in/api/users';
      this.addMember(url, payload);
    } else {
      url = `https://reqres.in/api/users/${ this.state.memberIdSelected }`;
      this.editMember(url, payload);
    }
  }
  addMember = (url, payload) => {
    axios.post(url, payload)
      .then(response => {
        console.log(response);
        let members = [...this.state.members];
        members.push(response.data);
        this.setState({ members, buttonVisiblty: false, first_name: '', last_name: '' });
      })
      .catch(error => {
        console.log(error);
      })
  };
  editMember = (url, payload) => {
    axios.put(url, payload)
      .then(response => {
        console.log(response);
        let members = [...this.state.members];
        let indexMember = members.findIndex(member => member.id === this.state.memberIdSelected);

        members[indexMember].first_name = response.data.first_name;
        members[indexMember].last_name = response.data.last_name;

        this.setState({
          members,
          formStatus: 'create',
          memberIdSelected: null,
          first_name: '',
          last_name: '',
          buttonVisiblty: false,
        });
      })
      .catch(error => {
        console.log(error);
      })
  }
  fromCreate = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  deleteMember = (member_id) => {
    let url =  `https://reqres.in/api/users/${member_id}`;
    axios.delete(url) 
      .then(response => {
        if(response.status === 204) {
          let members =[...this.state.members];
          let index = members.findIndex(member => member.id === member_id);
          members.splice(index, 1);
          this.setState({
            members,
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
  }
  editButtonHandler = member => {
    this.setState({
      first_name: member.first_name,
      last_name: member.last_name,
      formStatus: 'edit',
      memberIdSelected: member.id,
    });
  };
  render() {
    return(
      <div className="container">
        <h1>DevSchool</h1>
        <div className="row">
          <div className="col-md-6" style={{ border: '1px solid black'}}>
            <h2>Member</h2>
            <div className="row">
              <Members members={ this.state.members } editButtonClick={ (member) => this.editButtonHandler(member) } deleteButtonClick={ (member_id) => this.deleteMember(member_id) }></Members>
            </div>
          </div>
          <div className="col-6" style={{ border: '1px solid black'}}>
            <h2>Form { this.state.formStatus }</h2>
            <form onSubmit={ this.onSubmit }>
              <div className="form-group">
                <label>First Name</label>
                <input type="text" className="form-control" onChange={ this.fromCreate } name="first_name" value={ this.state.first_name }/>
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input type="text" className="form-control" onChange={ this.fromCreate } name="last_name" value={ this.state.last_name }/>
              </div>
              <button disabled={ this.state.buttonVisiblty } type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
