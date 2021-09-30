import React, { Component } from 'react';

class Form extends Component {
  render() {
    return(
      <div>
        <h2>Form { this.props.formStatus }</h2>
        <form onSubmit={ this.props.onSubmit }>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" className="form-control" onChange={ this.props.fromCreate } name="first_name" value={ this.props.first_name }/>
          </div>
          <div className="form-group">
              <label>Last Name</label>
            <input type="text" className="form-control" onChange={ this.props.fromCreate } name="last_name" value={ this.props.last_name }/>
          </div>
          <button disabled={ this.props.buttonVisiblty } type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}

export default Form;