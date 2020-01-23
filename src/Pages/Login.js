
import React ,{Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'

import  ApiKeys from '../Pages/ApiKeys';
const serverUrl = ApiKeys.urlApi;


class Login extends Component{
  constructor(props){
    super(props);
    
} 
render(){
    return (
        <div>
        <div className="container py-5">
         <div className="row">
             <div className="col-md-12">
                 <h2 className="text-center text-blue mb-4">Administrador de canchas</h2>
                 <div className="row">
                     <div className="col-md-6 mx-auto">
                         <div className="card rounded-0">
                             <div className="card-header">
                                 <h3 className="mb-0">Login</h3>
                             </div>
                             <div className="card-body">
                                 <form className="form" role="form" autocomplete="off" id="formLogin" novalidate="" method="POST">
                                     <div className="form-group">
                                         <label for="uname1">Usuario</label>
                                         <input type="text" className="form-control form-control-lg rounded-0" name="uname1" id="uname1" required=""/>
                                         <div className="invalid-feedback">Oops, you missed this one.</div>
                                     </div>
                                     <div className="form-group">
                                         <label>Password</label>
                                         <input type="password" className="form-control form-control-lg rounded-0" id="pwd1" required="" autocomplete="new-password"/>
                                         <div className="invalid-feedback">Enter your password too!</div>
                                     </div> 
                                     <button type="submit" className="btn btn-outline-info btn-lg float-right" id="btnLogin">Login</button>
                                 </form>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </div>
     </div>
 
      )
}
}
export default Login;

