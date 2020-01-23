import React, { Component } from "react";
import { Link } from "react-router-dom";
import Load from "../Components/Load";
import  ApiKeys from '../Pages/ApiKeys';
const serverUrl = ApiKeys.urlApi;

export default class Canchas extends Component {
  constructor(props) {
    super();
    this.state = {
      canchas: [],
      nombre: "",
      loading: false
    };
    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleSubmitBuscar = this.handleSubmitBuscar.bind(this);
    this.handleNuevo = this.handleNuevo.bind(this);
    this.handleLimpiar = this.handleLimpiar.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleLimpiar(event) {
    this.fetchData();
    this.setState({ nombre: "" });
    this.setState({ nombre: "" });
  }
  handleNuevo(event) {
    var that = this;

    that.props.history.push("/canchasform");
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

  handleChangeNombre(event) {
    this.setState({ nombre: event.target.value });
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchDataBuscar = () => {
    var that = this;
    that.setState({
      loading: true
    });
    fetch(serverUrl + "/canchas/listarPorNombre", {
      method: "post",
      body: JSON.stringify({ nombre: that.state.nombre }),
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
            canchas: result.data
          });
        } else {
          that.setState({
            canchas: []
          });
        }
      });
    setTimeout(function() {
      that.setState({
        loading: false
      });
    }, 2500);
  };
  fetchData = () => {
    var that = this;
    that.setState({
      loading: true
    });
    fetch(serverUrl + "/canchas/listarTodos")
      .then(function(response) {
        return response.json(); //response.json() is resolving its promise. It waits for the body to load
      })
      .then(function(responseData) {
        var result = JSON.parse(JSON.stringify(responseData));
        if (result.data != null && result.data.length > 0) {
          that.setState({
            canchas: result.data
          });
        } else {
          that.setState({
            canchas: []
          });
        }
      });
    setTimeout(function() {
      that.setState({
        loading: false
      });
    }, 2000);
  };

  render() {
    const isloading = this.state.loading;
    var lista = this.state.canchas.map(cancha => {
      return (
        <li
          className="list-group-item list-group-item-action"
          key={cancha.id_cancha}
        >
          {" "}
          <div className="form-row">
            <div className="form-group col-md-8">
              <span>
                <Link
                  className="nav-link"
                  to={"/editcancha/" + cancha.id_cancha}
                >
                  {" "}
                  {cancha.nombre}{" "}
                </Link>
              </span>
            </div>
            <div className="form-group col-md-4">
              <span>
                <Link
                  className="nav-link"
                  to={"/editcancha/" + cancha.id_cancha}
                >
                  {" "}
                  {cancha.direccion}{" "}
                </Link>
              </span>
            </div>
          </div>
        </li>
      );
    });
    return (
      <div className="p-4 row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Buscar Cancha</h3>

            <div className="form-group">
              <input
                className="form-control"
                value={this.state.nombre}
                type="text"
                onChange={this.handleChangeNombre}
                placeholder="Ingrese el Nombre a Buscar"
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
              onClick={this.handleNuevo}
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
