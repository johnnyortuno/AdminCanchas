import React, { Component } from "react";
import Select from "react-select";
import Calendario from "../Components/Calendario";
import ApiKeys from "../Pages/ApiKeys";

const serverUrl = ApiKeys.urlApi;

export default class Reservas extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedOption: null,
      canchas: [],
      distrito: "",
      fecha: new Date(),
      id_cancha: "0",
      fecha_reserva: ""
    };
  }
  handleChangeDistrito = event => {
    this.setState({ distrito: event.target.value });
    this.setState({ selectedOption: null });
    this.setState({ id_cancha: 0 });
    if (event.target.value != "") this.fetchData(event.target.value);
    else this.setState({ canchas: [] });
  };

  handleReservaFrm = event => {
    this.props.history.push({
      pathname: "/reservasform",
      id_cancha: this.state.id_cancha,
      fecha: this.state.fecha_reserva,
      modificacion: false
    });
  };

  handleChange = selectedOption => {
    this.setState({ id_cancha: selectedOption.value });
    this.setState({ selectedOption: selectedOption });
  };

  componentDidMount() {}

  fetchData = pdistrito => {
    var that = this;

    fetch(serverUrl + "/canchas/listarPorDistrito", {
      method: "post",
      body: JSON.stringify({ distrito: pdistrito }),
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
          var orderInfo = result.data.map(function(order) {
            var info = { value: order.id_cancha, label: order.nombre };
            return info;
          });
          that.setState({
            canchas: orderInfo
          });
        } else {
          that.setState({
            canchas: []
          });
        }
      });
  };
  callbackFunction = childData => {
    this.setState({ fecha_reserva: childData });
  };

  render() {
    const { selectedOption, fecha } = this.state;

    return (
      <div>
        <div className=" row container card card-body">
          <h3>Horarios de canchas</h3>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="idDistrito">Distrito</label>
              <select
                id="idDistrito"
                className="form-control"
                onChange={this.handleChangeDistrito}
                value={this.state.distrito}
              >
                <option></option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label>Nombre Cancha</label>
              <Select
                value={selectedOption}
                onChange={this.handleChange}
                options={this.state.canchas}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              <button
                onClick={this.handleReservaFrm}
                type="button"
                className="btn btn-warning"
              >
                Reservar
              </button>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-12">
              {this.state.id_cancha > 0 ? (
                <div>
                  <Calendario
                    parentCallback={this.callbackFunction}
                    fecha={this.state.fecha}
                    cancha={this.state.id_cancha}
                    match={this.props.match}
                    location={this.props.location}
                    history={this.props.history}
                  ></Calendario>
                </div>
              ) : (
                <h3> </h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
