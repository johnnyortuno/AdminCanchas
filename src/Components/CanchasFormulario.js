import React, { Component } from "react";
import Dialog from "react-bootstrap-dialog";
import Mapa from "../Components/Mapa";
import Load from "../Components/Load";

import  ApiKeys from '../Pages/ApiKeys';
const serverUrl = ApiKeys.urlApi;

export default class CanchasFormulario extends Component {
  constructor(props) {
    super();
    this.state = {
      id_cancha: "",
      nombre: "",
      categoria: "A",
      longitud: "",
      latitud: "",
      tipo_escenario_deportivo: "ESTADIO DE FUTBOL",
      tiene_perimetral: "NO",
      tiene_tinglado_techo: "NO",
      tipo_pavimento: "CEMENTO",
      se_encuentra: "CERRADO",
      administrado_por: "GAMEA",
      graderias: "NO",
      banos: "NO",
      camerinos: "NO",
      acceso_libre: "NO",
      quien_realizo: "GAMEA",
      estado: "BUENO",
      distrito: "1",
      direccion: "",
      telefono: "",
      fecha_Alta: "",
      usuario_alta: "",
      modificacion: false,
      cargando: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleChangeNombre = this.handleChangeNombre.bind(this);
    this.handleChangeCategoria = this.handleChangeCategoria.bind(this);
    this.handleChangeLongitud = this.handleChangeLongitud.bind(this);
    this.handleChangeLatitud = this.handleChangeLatitud.bind(this);
    this.handleChangetipoEscenarioDeportivo = this.handleChangetipoEscenarioDeportivo.bind(
      this
    );
    this.handleChangeTienePerimetral = this.handleChangeTienePerimetral.bind(
      this
    );
    this.handleChangeTieneTingladoTecho = this.handleChangeTieneTingladoTecho.bind(
      this
    );
    this.handleChangeTipoPavimento = this.handleChangeTipoPavimento.bind(this);
    this.handleChangeSeEncuentra = this.handleChangeSeEncuentra.bind(this);
    this.handleChangeAdministradoPor = this.handleChangeAdministradoPor.bind(
      this
    );
    this.handleChangeGraderias = this.handleChangeGraderias.bind(this);
    this.handleChangeBanos = this.handleChangeBanos.bind(this);
    this.handleChangeCamerinos = this.handleChangeCamerinos.bind(this);
    this.handleChangeAcesoLibre = this.handleChangeAcesoLibre.bind(this);
    this.handleChangeQuienRealizo = this.handleChangeQuienRealizo.bind(this);
    this.handleChangeEstado = this.handleChangeEstado.bind(this);
    this.handleChangeDistrito = this.handleChangeDistrito.bind(this);
    this.handleChangeDireccion = this.handleChangeDireccion.bind(this);
    this.handleChangeTelefono = this.handleChangeTelefono.bind(this);
    this.childHandler = this.childHandler.bind(this);
  }

  handleChangeNombre(event) {
    this.setState({ nombre: event.target.value });
  }
  handleChangeCategoria(event) {
    this.setState({ categoria: event.target.value });
  }
  handleChangeLongitud(event) {
    this.setState({ longitud: event.target.value });
  }
  handleChangeLatitud(event) {
    this.setState({ latitud: event.target.value });
  }
  handleChangetipoEscenarioDeportivo(event) {
    this.setState({ tipo_escenario_deportivo: event.target.value });
  }
  handleChangeTienePerimetral(event) {
    this.setState({ tiene_perimetral: event.target.value });
  }
  handleChangeTieneTingladoTecho(event) {
    this.setState({ tiene_tinglado_techo: event.target.value });
  }
  handleChangeTipoPavimento(event) {
    this.setState({ tipo_pavimento: event.target.value });
  }
  handleChangeSeEncuentra(event) {
    this.setState({ se_encuentra: event.target.value });
  }
  handleChangeAdministradoPor(event) {
    this.setState({ administrado_por: event.target.value });
  }
  handleChangeGraderias(event) {
    this.setState({ graderias: event.target.value });
  }
  handleChangeBanos(event) {
    this.setState({ banos: event.target.value });
  }
  handleChangeCamerinos(event) {
    this.setState({ camerinos: event.target.value });
  }
  handleChangeAcesoLibre(event) {
    this.setState({ acceso_libre: event.target.value });
  }
  handleChangeQuienRealizo(event) {
    this.setState({ quien_realizo: event.target.value });
  }
  handleChangeEstado(event) {
    this.setState({ estado: event.target.value });
  }
  handleChangeDistrito(event) {
    this.setState({ distrito: event.target.value });
  }
  handleChangeDireccion(event) {
    this.setState({ direccion: event.target.value });
  }
  handleChangeTelefono(event) {
    this.setState({ telefono: event.target.value });
  }
  handleSubmit(event) {
    var that = this;
    this.dialog.show({
      title: "Canchas",
      body: "Guardar Cambios?",
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          var that = this;
          if (!this.state.modificacion) {
            fetch(serverUrl + "/canchas/guardar", {
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
                alert("Cancha guardada correctamente!");
                that.props.history.push("/canchas");
              });
          } else {
            fetch(serverUrl + "/canchas/modificar", {
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
                alert("Cancha guardada correctamente!");

                that.props.history.push("/canchas");
              });
          }
        })
      ],
      bsSize: "small",
      onHide: dialog => {}
    });

    event.preventDefault();
  }

  componentDidMount() {
    var that = this;
    var id;
    if (this.props.match.params.id) {
      id = this.props.match.params.id;
      fetch(serverUrl + "/canchas/listarPorId", {
        method: "post",
        body: JSON.stringify({ id_cancha: id }),
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
            id_cancha: id,
            nombre: result.data[0].nombre,
            categoria: result.data[0].categoria,
            longitud: result.data[0].longitud,
            latitud: result.data[0].latitud,
            tipo_escenario_deportivo: result.data[0].tipo_escenario_deportivo,
            tiene_perimetral: result.data[0].tiene_perimetral,
            tiene_tinglado_techo: result.data[0].tiene_tinglado_techo,
            tipo_pavimento: result.data[0].tipo_pavimento,
            se_encuentra: result.data[0].se_encuentra,
            administrado_por: result.data[0].administrado_por,
            graderias: result.data[0].graderias,
            banos: result.data[0].banos,
            camerinos: result.data[0].camerinos,
            acceso_libre: result.data[0].acceso_libre,
            quien_realizo: result.data[0].quien_realizo,
            estado: result.data[0].estado,
            distrito: result.data[0].distrito,
            direccion: result.data[0].direccion,
            telefono: result.data[0].telefono,
            modificacion: true,
            cargando: false
          });
        });
    } else {
      this.setState({ cargando: false });
    }
  }

  childHandler(dataFromChild) {
    this.setState({ latitud: dataFromChild.pointLat });
    this.setState({ longitud: dataFromChild.pointLng });
  }

  render() {
    return (
      <div>
        <div className=" row container card card-body">
          <h3>Registro de Canchas</h3>
          <form onSubmit={this.handleSubmit} class="needs-validation">
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="idNombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="idNombre"
                  placeholder="Nombre"
                  value={this.state.nombre}
                  onChange={this.handleChangeNombre}
                  required
                />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="idDireccion">Direccion</label>
                <input
                  type="text"
                  className="form-control"
                  id="idDireccion"
                  placeholder="Direccion"
                  value={this.state.direccion}
                  onChange={this.handleChangeDireccion}
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="idTelefono">Telefono</label>
                <input
                  type="text"
                  className="form-control"
                  id="idTelefono"
                  placeholder="Telefono"
                  value={this.state.telefono}
                  onChange={this.handleChangeTelefono}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="idCategoria">Categoria</label>
                <select
                  id="idCategoria"
                  className="form-control"
                  value={this.state.categoria}
                  onChange={this.handleChangeCategoria}
                >
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </div>
              <div className="form-group col-md-4">
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
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="idBanos">BAÑOS</label>
                <select
                  id="idBanos"
                  className="form-control"
                  value={this.state.banos}
                  onChange={this.handleChangeBanos}
                >
                  <option>NO</option>
                  <option>SI</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="idTieneTingladoTecho">
                  TECHO/TINGLADO O NINGUNO
                </label>
                <select
                  id="idTieneTingladoTecho"
                  className="form-control"
                  value={this.state.tiene_tinglado_techo}
                  onChange={this.handleChangeTieneTingladoTecho}
                >
                  <option>NINGUNO</option>
                  <option>TINGLADO</option>
                  <option>TECHO</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="idTipoPavimento">
                  TIPO DE PAVIMENTO DEPORTIVO
                </label>
                <select
                  id="idTipoPavimento"
                  className="form-control"
                  value={this.state.tipo_pavimento}
                  onChange={this.handleChangeTipoPavimento}
                >
                  <option>CÉSPED SINTÉTICO</option>
                  <option>PARQUET</option>
                  <option>TARTAN</option>
                  <option>TIERRA BATIDA</option>
                  <option>MADERA PLASTICA</option>
                  <option>CEMENTO</option>
                  <option>CERAMICA</option>
                  <option>TIERRA</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="idSeEncuentra">SE ENCUENTRA</label>
                <select
                  id="idSeEncuentra"
                  className="form-control"
                  value={this.state.se_encuentra}
                  onChange={this.handleChangeSeEncuentra}
                >
                  <option>CERRADO</option>
                  <option>ABIERTO</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="idAdministradoPor">ADMINISTRADO POR</label>
                <select
                  id="idAdministradoPor"
                  className="form-control"
                  value={this.state.administrado_por}
                  onChange={this.handleChangeAdministradoPor}
                >
                  <option>ASOCIACION DEPORTIVA</option>
                  <option>DIRECCION DE DEPORTES</option>
                  <option>JUNTA DE VECINOS</option>
                  <option>LIGA DEPORTIVA</option>
                  <option>NADIE</option>
                  <option>NO TIENE</option>
                  <option>OTRO</option>
                  <option>RETEN POLICIAL</option>
                  <option>UPEA</option>
                  <option>GAMEA</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="idGraderias">GRADERIAS</label>
                <select
                  id="idGraderias"
                  className="form-control"
                  value={this.state.graderias}
                  onChange={this.handleChangeGraderias}
                >
                  <option>NO</option>
                  <option>SI</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="idCamerinos">CAMERINOS</label>
                <select
                  id="idCamerinos"
                  className="form-control"
                  value={this.state.camerinos}
                  onChange={this.handleChangeCamerinos}
                >
                  <option>NO</option>
                  <option>SI</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="idAccesoLibre">ACSESO LIBRE</label>
                <select
                  id="idAccesoLibre"
                  className="form-control"
                  value={this.state.acceso_libre}
                  onChange={this.handleChangeAcesoLibre}
                >
                  <option>NO</option>
                  <option>SI</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="idQuienLoRealizo">QUIEN LO REALIZO</label>
                <select
                  id="idQuienLoRealizo"
                  className="form-control"
                  value={this.state.quien_realizo}
                  onChange={this.handleChangeQuienRealizo}
                >
                  <option>ZONA</option>
                  <option>UPRE</option>
                  <option>CONVENIO</option>
                  <option>GAMEA</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="idEstadoSeEncuentra">
                  ESTADO EN EL QUE SE ENCUENTRA
                </label>
                <select
                  id="idEstadoSeEncuentra"
                  className="form-control"
                  value={this.state.estado}
                  onChange={this.handleChangeEstado}
                >
                  <option>BUENO</option>
                  <option>MALO</option>
                  <option>REGULAR</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="idTipoEscenario">Tipo Escenario</label>
                <select
                  id="idTipoEscenario"
                  className="form-control"
                  value={this.state.tipo_escenario_deportivo}
                  onChange={this.handleChangetipoEscenarioDeportivo}
                >
                  <option>ESTADIO DE FUTBOL</option>
                  <option>POLIDEPORTIVO</option>
                  <option>MULTIFUNSIONAL DEPORTIVO(PARQUET)</option>
                  <option>MULTIFUNSIONAL DEPORTIVO(CEMENTO)</option>
                  <option>PISCINA</option>
                  <option>MULTIDISCIPLINARIO CON CUBIERTA(PARQUET)</option>
                  <option>MULTIDISCIPLINARIO CON CUBIERTA(CEMENTO)</option>
                  <option>CANCHA DE WALLY</option>
                  <option>CANCHA DE FUTBOL</option>
                  <option>CANCHA DE FUTBOL 7</option>
                  <option>CANCHA DE FUTSAL</option>
                  <option>CANCHA DE VOLEIBOL</option>
                  <option>CANCHA DE BALONCESTO</option>
                  <option>CANCHA DE RAQUETBOL Raquetbol</option>
                  <option>CANCHA DE TENIS</option>
                  <option>CANCHA DE FRONTON</option>
                  <option>PISTA DE ATPLETISMO </option>
                  <option>MULTIDISCIPLINARIO SIN CUBIERTA(CEMENTO)</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="idTienePerimetral">Tiene Muro Perimetral</label>
                <select
                  id="idTienePerimetral"
                  className="form-control"
                  value={this.state.tiene_perimetral}
                  onChange={this.handleChangeTienePerimetral}
                >
                  <option>NO</option>
                  <option>SI</option>
                </select>
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="idLatitud">Latitud</label>
                <input
                  type="text"
                  className="form-control"
                  id="idLatitud"
                  placeholder="Latitud"
                  value={this.state.latitud}
                  onChange={this.handleChangeLatitud}
                  disabled
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="idNombre">Longitud</label>
                <input
                  type="text"
                  className="form-control"
                  id="idLongitud"
                  placeholder="Longitud"
                  value={this.state.longitud}
                  onChange={this.handleChangeLongitud}
                  disabled
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                {this.state.cargando ? (
                  <Load />
                ) : this.state.modificacion ? (
                  <Mapa
                    action={this.childHandler}
                    Longitud={this.state.longitud}
                    Latitud={this.state.latitud}
                  ></Mapa>
                ) : (
                  <Mapa
                    action={this.childHandler}
                    Longitud={-68.1502}
                    Latitud={-16.4955}
                  ></Mapa>
                )}
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
