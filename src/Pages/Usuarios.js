import React, { Component } from "react";
import { Link } from "react-router-dom";
import Load from "../Components/Load";
import  ApiKeys from '../Pages/ApiKeys';

 
const serverUrl = ApiKeys.urlApi;
class Usuarios extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usuarios: [],
      ci: "",
      loading: false
    };
    this.handleChangeCi = this.handleChangeCi.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitBuscar = this.handleSubmitBuscar.bind(this);
    this.handleLimpiar = this.handleLimpiar.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }
  handleLimpiar(event) {
    this.fetchData();
    this.setState({ ci: "" });
  }
  handleSubmit(event) {
    var that = this;

    that.props.history.push("/userform");
    event.preventDefault();
  }
  handleKeyDown(event) {
    if (event.key === "Enter") {
      this.fetchDataBuscar();
    }
  }
  handleSubmitBuscar(event) {
    this.fetchDataBuscar();
    event.preventDefault();
  }
  handleChangeCi(event) {
    this.setState({ ci: event.target.value });
  }

  fetchDataBuscar = () => {
    var that = this;
    that.setState({
      loading: true
    });
    fetch(serverUrl + "/usuarios/listarPorCI", {
      method: "post",
      body: JSON.stringify({ ci: that.state.ci }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json(); //response.json() is resolving its promise. It waits for the body to load
      })
      .then(function(responseData) {
        var result = JSON.parse(JSON.stringify(responseData));
        if (result.data != null && result.data.length > 0) {
          that.setState({
            usuarios: result.data
          });
        } else {
          that.setState({
            usuarios: []
          });
        }
      });
    setTimeout(function() {
      that.setState({
        loading: false
      });
    }, 2000);
  };

  //function to call SWAPI and get data.
  fetchData = () => {
    var that = this;
    that.setState({
      loading: true
    });
    fetch(serverUrl + "/usuarios/listar")
      .then(function(response) {
        return response.json(); //response.json() is resolving its promise. It waits for the body to load
      })
      .then(function(responseData) {
        var result = JSON.parse(JSON.stringify(responseData));

        if (result.data != null && result.data.length > 0) {
          that.setState({
            usuarios: result.data
          });
        } else {
          that.setState({
            usuarios: []
          });
        }
      });
    setTimeout(function() {
      that.setState({
        loading: false
      });
    }, 2500);
  };
  fetchDataCi = () => {
    var that = this;

    var jsonejemplo = JSON.stringify({ ci: that.state.ci });

    fetch(serverUrl + "/usuarios/listarPorCI", {
      method: "post",
      body: jsonejemplo,
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        return response.json(); //response.json() is resolving its promise. It waits for the body to load
      })
      .then(function(responseData) {
        var result = JSON.parse(JSON.stringify(responseData));

        that.setState({
          usuarios: result.data
        });
      });
  };

  render() {
    const isloading = this.state.loading;
    var lista = this.state.usuarios.map(usuario => {
      return (
        <li
          className="list-group-item list-group-item-action"
          key={usuario.id_user}
        >
          <span className="badge badge-primary badge-pill">
            CI:{usuario.ci}
          </span>
          <span>
            <Link className="nav-link" to={"/edit/" + usuario.id_user}>
              {usuario.nombres} {usuario.apellidos}
            </Link>
          </span>
        </li>
      );
    });
    return (
      <div className="p-4 row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Buscar Usuario</h3>

            <div className="form-group">
              <input
                className="form-control"
                value={this.state.ci}
                type="text"
                onChange={this.handleChangeCi}
                placeholder="Ingrese el CI a buscar"
                onKeyDown={this.handleKeyDown}
              />
            </div>
            <button
              onClick={this.handleSubmitBuscar}
              type="submit"
              value="Buscar"
              key="Buscar"
              className="btn btn-outline-info btn-rounded btn-block my-2"
            >
              Buscar
            </button>
            <button
              onClick={this.handleSubmit}
              type="button"
              value="Nuevo"
              key="Nuevo"
              className="btn btn-outline-info btn-rounded btn-block my-2"
            >
              Nuevo
            </button>
            <button
              onClick={this.handleLimpiar}
              type="button"
              value="Limpiar"
              key="limpiar"
              className="btn btn-outline-info btn-rounded btn-block my-2"
            >
              Limpiar
            </button>
          </div>
        </div>

        <div className="col md-col-8">
          <ul className="list-group">
            {isloading ? (
              <Load />
            ) : lista.length ? (
              lista
            ) : (
              <h3>No existen registros</h3>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default Usuarios;
