import React, { Component } from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import NavLink from "react-bootstrap/NavLink";
class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Navbar bg="primary" variant="dark" expand="lg">
      <div className="container">
        <Navbar.Brand href="">Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
         
          <li className="nav-item">
           <Link  className="nav-link" to="/usuarios">Registro Usuarios</Link>
          </li>
          <li className="nav-item">
          <Link  className="nav-link" to="/canchas">Canchas</Link>
          </li>
          <li className="nav-item">
          <Link  className="nav-link" to="/reservas">Reservas</Link>
          </li>
          </Nav>
          <Nav>
          <li className="nav-item">
            <Link  className="nav-link" to="/">Login</Link>
          </li>
          <li className="nav-item">
          <Link  className="nav-link" to="/Salir">Salir</Link>
          </li>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}

export default Header;
