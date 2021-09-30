import React, { Component } from 'react';

class Members extends Component {
  render() {
    return(
      <div>
        { this.props.members.map((member) => (
          <div className="col-md-6" key={member.id}>
            <div className="card" style={{ margin: 10}}>
                <div className="card-body">
                <h5 className="card-title">{ member.id }</h5>
                <h5 className="card-title">{ member.first_name }</h5>
                <h5 className="card-title">{ member.last_name }</h5>
                <button className="btn btn-primary mr-3" onClick={ () => this.props.editButtonClick(member) }>Edit</button>
                <button onClick={ () => this.props.deleteButtonClick(member.id) } className="btn btn-danger">Delete</button>
                </div>
            </div>
          </div>
        )) }
      </div>
    );
  }
}
export default Members;