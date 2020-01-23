import React, { Component } from "react";
import Dialog from "react-bootstrap-dialog";
import  ApiKeys from '../Pages/ApiKeys';
const serverUrl = ApiKeys.urlApi;

export default class UsuariosFormulario extends Component {
  constructor(props) {
    super();
    this.state = {
      id_usuario: "",
      nombres: "",
      apellidos: "",
      ci: "",
      direccion: "",
      email: "",
      telefono: "",
      distrito: "1",
      tipoUsuario: "1",
      contrasena: "",
      contrasena2: "",
      activo: false,
      modificacion: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeNombres = this.handleChangeNombres.bind(this);
    this.handleChangeApellidos = this.handleChangeApellidos.bind(this);
    this.handleChangeCi = this.handleChangeCi.bind(this);
    this.handleChangeDireccion = this.handleChangeDireccion.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangeTelefono = this.handleChangeTelefono.bind(this);
    this.handleChangeDistrito = this.handleChangeDistrito.bind(this);
    this.handleChangeTipoUsuario = this.handleChangeTipoUsuario.bind(this);
    this.handleChangeContrasena = this.handleChangeContrasena.bind(this);
    this.handleChangeContrasena2 = this.handleChangeContrasena2.bind(this);
  }
  componentDidMount() {
    var that = this;
    var id;
    if (this.props.match.params.id) {
      id = this.props.match.params.id;
      fetch(serverUrl + "/usuarios/listarPorId", {
        method: "post",
        body: JSON.stringify({ id_usuario: id }),
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
            id_usuario: id,
            nombres: result.data[0].nombres,
            apellidos: result.data[0].apellidos,
            ci: result.data[0].ci,
            direccion: result.data[0].direccion,
            email: result.data[0].email,
            telefono: result.data[0].celular,
            distrito: result.data[0].distrito,
            tipoUsuario: result.data[0].id_tipo_usuario,
            contrasena: result.data[0].password,
            contrasena2: result.data[0].password,
            activo: result.data[0].estado,
            modificacion: true
          });
        });
    }
  }

  handleSubmit(event) {
    this.dialog.show({
      title: "Usuarios",
      body: "Guardar Cambios?",
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          var that = this;
          if (!this.state.modificacion) {
            fetch(serverUrl + "/usuarios/guardar", {
              method: "post",
              body: JSON.stringify(this.state),
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(function(response) {
                return response.json(); //response.json() is resolving its promise. It waits for the body to load
              })
              .then(function(responseData) {
                var result = JSON.parse(JSON.stringify(responseData));
                alert("Usuario guardado correctamente", result);
                that.props.history.push("/usuarios");
              });
          } else {
            fetch(serverUrl + "/usuarios/modificar", {
              method: "PUT",
              body: JSON.stringify(this.state),
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(function(response) {
                return response.json(); //response.json() is resolving its promise. It waits for the body to load
              })
              .then(function(responseData) {
                var result = JSON.parse(JSON.stringify(responseData));
                alert("Usuario guardado correctamente", result);

                that.props.history.push("/usuarios");
              });
          }
        })
      ],
      bsSize: "small",
      onHide: dialog => {
        console.log("closed by clicking background.");
      }
    });

    event.preventDefault();
  }
  handleChangeNombres(event) {
    this.setState({ nombres: event.target.value });
  }
  handleChangeApellidos(event) {
    this.setState({ apellidos: event.target.value });
  }
  handleChangeCi(event) {
    this.setState({ ci: event.target.value });
  }
  handleChangeDireccion(event) {
    this.setState({ direccion: event.target.value });
  }
  handleChangeEmail(event) {
    this.setState({ email: event.target.value });
  }
  handleChangeTelefono(event) {
    this.setState({ telefono: event.target.value });
  }
  handleChangeDistrito(event) {
    this.setState({ distrito: event.target.value });
  }
  handleChangeTipoUsuario(event) {
    this.setState({ tipoUsuario: event.target.value });
  }
  handleChangeContrasena(event) {
    this.setState({ contrasena: event.target.value });
  }
  handleChangeContrasena2(event) {
    this.setState({ contrasena2: event.target.value });
  }

  toggleChange = () => {
    this.setState({
      activo: !this.state.activo
    });
  };
  render() {
    return (
      <div>
        <div className=" row container card card-body">
          <h3>Registro de Administradores</h3>
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="idNombre">Nombres</label>
                <input
                  type="text"
                  className="form-control"
                  id="idNombre"
                  placeholder="Nombres"
                  value={this.state.nombres}
                  onChange={this.handleChangeNombres}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="idApellido">Apellidos</label>
                <input
                  type="text"
                  className="form-control"
                  id="idApellido"
                  placeholder="Apellidos"
                  value={this.state.apellidos}
                  onChange={this.handleChangeApellidos}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="idCI">Carnet de Identidad</label>
                <input
                  type="text"
                  className="form-control"
                  id="idCI"
                  placeholder="Carnet de identidad"
                  value={this.state.ci}
                  onChange={this.handleChangeCi}
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="idDireccion">Direccion</label>
                <input
                  type="text"
                  className="form-control"
                  id="idDireccion"
                  placeholder="Direccion"
                  value={this.state.direccion}
                  onChange={this.handleChangeDireccion}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="idEmail">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="idEmail"
                  aria-describedby="emailHelp"
                  placeholder="ingrese su  email"
                  value={this.state.email}
                  onChange={this.handleChangeEmail}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="idTelefono">Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  id="idTelefono"
                  aria-describedby="emailHelp"
                  placeholder="ingrese su telefono"
                  value={this.state.telefono}
                  onChange={this.handleChangeTelefono}
                />
              </div>
              <div className="form-group col-md-3">
                <label htmlFor="idDistrito">Distrito</label>
                <select
                  id="idDistrito"
                  className="form-control"
                  value={this.state.distrito}
                  onChange={this.handleChangeDistrito}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="idTipoUsuario">Tipo Usuario</label>
                <select
                  id="idTipoUsuario"
                  className="form-control"
                  value={this.state.tipoUsuario}
                  onChange={this.handleChangeTipoUsuario}
                >
                  <option value="1">Administrador</option>
                  <option value="2">Usuario</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Contrasena</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                  value={this.state.contrasena}
                  onChange={this.handleChangeContrasena}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Confirme su Contrasena</label>
                <input
                  type="password"
                  className="form-control"
                  id="inputPassword4"
                  placeholder="Password"
                  value={this.state.contrasena2}
                  onChange={this.handleChangeContrasena2}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                  checked={this.state.activo}
                  onChange={this.toggleChange}
                />
                <label className="form-check-label" htmlFor="gridCheck">
                  Activo
                </label>
              </div>
            </div>

            <div className="form-row">
              <button type="submit" className="btn btn-primary" value="Submit">
                Guardar
              </button>
            </div>
          </form>
        </div>
        <Dialog
          ref={component => {
            this.dialog = component;
          }}
        />
      </div>
    );
  }
}
