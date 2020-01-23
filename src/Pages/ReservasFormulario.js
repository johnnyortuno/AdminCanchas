import React, { Component } from "react";
import Dialog from "react-bootstrap-dialog";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "../Components/Imprimir";
import  ApiKeys from '../Pages/ApiKeys';
import moment from "moment";
require("moment/locale/es.js");
moment.locale("es");


const serverUrl = ApiKeys.urlApi;

export default class ReservasFormulario extends Component {
  constructor(props) {
    super();
    this.state = {
      id_cancha: "0",
      ci_quien_reserva: "",
      nombre_reserva: "",
      observaciones: "",
      hora_inicio: "07:00",
      hora_fin: "08:00",
      fecha_reserva: "",
      fecha_tmp: "",
      eventos: [],
      estado: 2,
      modificacion: true,
      aprobado: false,
      id_reserva: 0,
      nombre:""
    };
    this.handleChangeCi = this.handleChangeCi.bind(this);
  }
  handleChangeCi(event) {
    this.setState({ ci_quien_reserva: event.target.value });
  }
  handleChangeHoraInicio = event => {
    this.setState({ hora_inicio: event.target.value });
  };
  handleChangeHoraFin = event => {
    this.setState({ hora_fin: event.target.value });
  };
  handleChangeObservaciones = event => {
    this.setState({ observaciones: event.target.value });
  };
  handleChangeFechaReserva = event => {
    this.setState({ fecha_reserva: event.target.value });
  };
  handleChangeNombre = event => {
    this.setState({ nombre_reserva: event.target.value });
  };

  componentDidMount() {
    var that = this;

    if (!this.props.location.modificacion) {
      if (this.props.location.fecha && this.props.location.id_cancha) {
        var fechatmp = this.props.location.fecha;
        fechatmp = fechatmp
          .split("/")
          .reverse()
          .join("/");
        this.setState({ id_cancha: this.props.location.id_cancha });
        this.setState({ modificacion: this.props.location.modificacion });
        this.setState({ fecha_reserva: this.props.location.fecha });
        this.setState({ fecha_tmp: fechatmp });
        this.fetchDataCanchas(this.props.location.id_cancha, fechatmp);
      } else {
        this.handleSalir();
      }
    } else {
      if (this.props.location.id_reserva) {
        var json = JSON.stringify({
          id_reserva: this.props.location.id_reserva
        });
        fetch(serverUrl + "/reservas/listarReservasPorIdReserva", {
          method: "post",
          body: json,
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(function(response) {
            return response.json(); //response.json() is resolving its promise. It waits for the body to load
          })
          .then(function(responseData) {
            console.log(responseData);
            var result = JSON.parse(JSON.stringify(responseData));

            var fecha = moment(result.data[0].fecha)
              .utc()
              .format("DD/MM/YYYY");
            that.setState({
              ci_quien_reserva: result.data[0].ci_quien_reserva,
              nombre_reserva: result.data[0].nombre_reserva,
              id_cancha: result.data[0].id_cancha,
              observaciones: result.data[0].observaciones,
              fecha_reserva: fecha,
              estado: result.data[0].estado,
              hora_inicio: result.data[0].hora_inicio.substring(0, 5),
              hora_fin: result.data[0].hora_fin.substring(0, 5),
              id_reserva: result.data[0].id_reserva,
              nombre: result.data[0].nombre
            });

            if (result.data[0].estado == "2") {
              that.setState({ aprobado: true });
            } else {
              that.setState({ aprobado: false });
            }
          });
      } else {
        this.handleSalir();
      }
    }
  }

  imprimir = event => {
    var that = this;
    alert("imprimir" + this.state.id_reserva);
  };

  fetchDataCanchas = (pid_cancha, pfecha) => {
    var that = this;
    var json = JSON.stringify({
      id_cancha: pid_cancha,
      fecha: pfecha
    });

    fetch(serverUrl + "/reservas/listarReservasPorfecha", {
      method: "post",
      body: json,
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
            eventos: result
          });
        } else {
          that.setState({
            eventos: []
          });
        }
      });
  };

  handleSalir = event => {
    this.props.history.push({
      pathname: "/reservas"
    });
  };
  handleAprobar = event => {
    this.dialog.show({
      title: "Reservas de Cancha",
      body:
        "Confirma la reserva de la cancha el " +
        this.state.fecha_reserva +
        " de " +
        this.state.hora_inicio +
        " hasta " +
        this.state.hora_fin,
      actions: [
        Dialog.CancelAction(),
        Dialog.OKAction(() => {
          var that = this;
          fetch(serverUrl + "/reservas/aprobar", {
            method: "put",
            body: JSON.stringify({
              estado: 2,
              fecha_update: this.state.fecha_reserva
                .split("/")
                .reverse()
                .join("/"),
              id_reserva: this.state.id_reserva
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(function(response) {
              return response.json(); //response.json() is resolving its promise. It waits for the body to load
            })
            .then(function(responseData) {
              var result = JSON.parse(JSON.stringify(responseData));

              if (result.resultado) {
                that.setState({ aprobado: true });
              }
            });
        })
      ],
      bsSize: "small",
      onHide: dialog => {
        console.log("closed by clicking background.");
      }
    });
  };
  handleSubmit = event => {
    var result = this.state.eventos;
    var hri = parseInt(this.state.hora_inicio.substring(0, 2));
    var hrf = parseInt(this.state.hora_fin.substring(0, 2));
    var fechaHoy = new Date();
    var horaActual = fechaHoy.getHours();
    var resultado = false; 
    if (true) {//Verifico que la hora ingresada sea mayor a la actual 
      // if (Array.isArray(result)&&result.length>0) { // Hago el proceso siempre y cuando exista reservas en ese dia 
        var ev = result.data.map(function(order) {
          var horas = {
            hora_inicio: order.hora_inicio.substring(0, 2),
            hora_fin: order.hora_fin.substring(0, 2)
          };
          return horas;
        });
       
        for (var i = hri; i < hrf; i++) {
          resultado = false; 
          ev.forEach(element => {
            var horaInicio = parseInt(element.hora_inicio);
            var horaFin = parseInt(element.hora_fin);
            if (
              (i < horaInicio || i >= horaFin) &&
              !(i + 1 > horaInicio && i + 1 < horaFin)
            ) {
              resultado=true;
            } else {
              resultado = false;
            }
          });
          if (!resultado) {
            break;
          }
        }
      // }else{
      //    resultado =true;
      // }

      if (resultado) {
        this.dialog.show({
          title: "Reservas de Cancha",
          body:
            "Confirma la reserva de la cancha el " +
            this.state.fecha_reserva +
            " de " +
            this.state.hora_inicio +
            " hasta " +
            this.state.hora_fin,
          actions: [
            Dialog.CancelAction(),
            Dialog.OKAction(() => {
              var that = this;
              fetch(serverUrl + "/reservas/reservar", {
                method: "post",
                body: JSON.stringify({
                  id_cancha: this.state.id_cancha,
                  id_usuario: "1",
                  fecha_reserva: this.state.fecha_reserva
                    .split("/")
                    .reverse()
                    .join("/"),
                  hora_inicio: this.state.hora_inicio,
                  hora_fin: this.state.hora_fin,
                  ci_quien_reserva: this.state.ci_quien_reserva,
                  nombre_reserva: this.state.nombre_reserva,
                  observaciones: this.state.observaciones,
                  modo_registro: "1",
                  estado: this.state.estado
                }),
                headers: {
                  "Content-Type": "application/json"
                }
              })
                .then(function(response) {
                  return response.json(); //response.json() is resolving its promise. It waits for the body to load
                })
                .then(function(responseData) {
                  var result = JSON.parse(JSON.stringify(responseData));
                  alert("Reserva registrada correctamente");
                  that.props.history.push({
                    pathname: "/reservas"
                  });
                });
            })
          ],
          bsSize: "small",
          onHide: dialog => {
            console.log("closed by clicking background.");
          }
        });
      } else {
        alert("El Rango de horario no esta disponible");
      }
    } else {
      alert("Verifique las horas");
    }

    event.preventDefault();
  };

  render() {
    return (
      <div>
        <div className=" row container card card-body">
          <h3></h3>
          <div className="form-row"></div>
          <hr></hr>
          <hr></hr>
          <div className="form-row">
            <div className="form-group col-md-12">
              <h4 style={{ textAlign: "center" }}>Reservar Cancha</h4>
            </div>
          </div>
          <hr></hr>
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="form-group col-md-2">
                <label htmlFor="idfecha">Fecha Reserva</label>
                <input
                  type="text"
                  className="form-control"
                  id="idfecha"
                  placeholder="Fecha"
                  value={this.state.fecha_reserva}
                  onChange={this.handleChangeFechaReserva}
                  disabled
                />
              </div>

              <div className="form-group col-md-2">
                <label htmlFor="horaDesde">Hora Desde</label>
                <select
                  id="horaDesde"
                  value={this.state.hora_inicio}
                  onChange={this.handleChangeHoraInicio}
                  className="form-control"
                  required
                  disabled={this.state.modificacion ? "disabled" : ""}
                >
                  <option hora="07:00">07:00</option>
                  <option hora="08:00">08:00</option>
                  <option hora="09:00">09:00</option>
                  <option hora="10:00">10:00</option>
                  <option hora="11:00">11:00</option>
                  <option hora="12:00">12:00</option>
                  <option hora="13:00">13:00</option>
                  <option hora="14:00">14:00</option>
                  <option hora="15:00">15:00</option>
                  <option hora="16:00">16:00</option>
                  <option hora="17:00">17:00</option>
                  <option hora="18:00">18:00</option>
                  <option hora="19:00">19:00</option>
                  <option hora="20:00">20:00</option>
                  <option hora="21:00">21:00</option>
                  <option hora="22:00">22:00</option>
                  <option hora="23:00">23:00</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="horaDesde">Hora Hasta</label>
                <select
                  id="horaDesde"
                  className="form-control"
                  value={this.state.hora_fin}
                  onChange={this.handleChangeHoraFin}
                  required
                  disabled={this.state.modificacion ? "disabled" : ""}
                >
                  <option hora="08:00">08:00</option>
                  <option hora="09:00">09:00</option>
                  <option hora="10:00">10:00</option>
                  <option hora="11:00">11:00</option>
                  <option hora="12:00">12:00</option>
                  <option hora="13:00">13:00</option>
                  <option hora="14:00">14:00</option>
                  <option hora="15:00">15:00</option>
                  <option hora="16:00">16:00</option>
                  <option hora="17:00">17:00</option>
                  <option hora="18:00">18:00</option>
                  <option hora="19:00">19:00</option>
                  <option hora="20:00">20:00</option>
                  <option hora="21:00">21:00</option>
                  <option hora="22:00">22:00</option>
                  <option hora="23:00">23:00</option>
                </select>
              </div>
              <div className="form-group col-md-2">
                <label htmlFor="idCi">CI Reserva</label>
                <input
                  type="text"
                  className="form-control"
                  id="idCi"
                  placeholder="Carnet de Identidad"
                  value={this.state.ci_quien_reserva}
                  onChange={this.handleChangeCi}
                  disabled={this.state.modificacion ? "disabled" : ""}
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="idNombre">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  id="idNombre"
                  placeholder="Nombre"
                  value={this.state.nombre_reserva}
                  onChange={this.handleChangeNombre}
                  required
                  disabled={this.state.modificacion ? "disabled" : ""}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label htmlFor="idObservaciones">Observaciones</label>
                <input
                  type="text"
                  className="form-control"
                  id="idObservaciones"
                  placeholder="Observaciones"
                  value={this.state.observaciones}
                  onChange={this.handleChangeObservaciones}
                  required
                  disabled={this.state.modificacion ? "disabled" : ""}
                />
              </div>
            </div>
          </form>
          <div className="form-row">
            <div className="form-group col-md-4">
              {!this.state.modificacion ? (
                <button
                  onClick={this.handleSubmit}
                  className="btn btn-primary"
                  value="Submit"
                  disabled={this.state.modificacion ? "disabled" : ""}
                >
                  Reservar
                </button>
              ) : (
                <button
                  onClick={this.handleAprobar}
                  className="btn btn-primary"
                  value="Submit"
                  disabled={this.state.aprobado ? "disabled" : ""}
                >
                  Aprobar
                </button>
              )}
            </div>
            <div className="form-group col-md-4">
              {this.state.aprobado ? (
                <PDFDownloadLink
                  document={<PdfDocument data={this.state} />}
                  fileName="Reserva.pdf"
                  disabled={!this.state.aprobado ? "disabled" : ""}
                  className="btn btn-primary"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? "Loading document..." : "Imprimir"
                  }
                </PDFDownloadLink>
              ) : (
                <div></div>
              )}
            </div>

            <div className="form-group col-md-4" style={{ textAlign: "end" }}>
              <button
                onClick={this.handleSalir}
                className="btn btn-danger"
                value="Submit"
              >
                Salir
              </button>
            </div>
          </div>
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
