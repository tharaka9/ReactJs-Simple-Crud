import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.fName.focus();
  }

  

  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');



    let datas = this.state.datas;
    let fName = this.refs.fName.value;
    let lName = this.refs.lName.value;
    let address = this.refs.address.value;
    let cNo = this.refs.cNo.value;
    let email = this.refs.email.value;
    let regEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    let phone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (fName == ""){
      alert("First Name Required");
      return false;
    } 
    else if (lName == ""){
      alert("Last Name Required");
      return false;

    }
    else if (address == ""){
      alert("Address Required");
      return false;

    }
    else if (!phone.test(cNo)) {
      alert("Contact Number Invalid");
      return false;

    }
    else if (email == ""){
      alert("Email Required");
      return false;
    }

    else if (!regEmail.test(email))
    {
      alert("Email Not Valid");
      return false;
    }

    if(this.state.act === 0){  
       //new
      let data = {
        fName, lName, address, cNo, email
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].fName = fName;
      datas[index].lName = lName;
      datas[index].address = address;
      datas[index].cNo = cNo;
      datas[index].email = email;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.fName.focus();
  }

  fDelete = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.fName.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.fName.value = data.fName;
    this.refs.lName.value = data.lName;
    this.refs.address.value = data.address;
    this.refs.cNo.value = data.cNo;
    this.refs.email.value = data.email;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.fName.focus();
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          
         <table>
         <th colSpan="2" className="table_header">Registration From</th>
           <tr>
             
             <th>First Name</th>
             <td><input type="text" ref="fName" placeholder="First Name" className="formField"/></td>
           </tr>
           <tr>
             <th>Last Name</th>
             <td><input type="text" ref="lName" placeholder="Last Name" className="formField"/></td>
           </tr>
           <tr>
             <th>Address</th>
             <td><input type="text" ref="address" placeholder="Address" className="formField"/></td>
           </tr>
           <tr>
             <th>Contact No</th>
             <td><input type="phone" ref="cNo" placeholder="Contact No" className="formField"/></td>
           </tr>
           <tr>
             <th>Email Address</th>
             <td><input type="email" ref="email" name="email" placeholder="Email Address" className="formField"/>
             </td>
           </tr>
         </table>
<br></br>
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Add </button>
        </form>
        <pre>
        <table className="myForm">
            <tr>
              <th>Firstname</th>
              <th>Lastname</th> 
              <th>Address</th>
              <th>Contact No</th>
              <th>Email Address</th>
              <th>Action</th>
              </tr>
          {datas.map((data, i) =>
            <tr  key={i}>
              <td>{data.fName}</td>
              <td>{data.lName}</td>
              <td>{data.address}</td>
              <td>{data.cNo}</td>
              <td>{data.email}</td>
              <td>
              <button onClick={()=>this.fDelete(i)} className="myListButton">Delete </button>

              <button onClick={()=>this.fEdit(i)} className="myListButton">edit </button>
              </td>
              </tr>
          )}
          </table>
        </pre>
      </div>
    );
  }
}

export default App;
