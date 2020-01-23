import React, { Component } from "react";

import events from "../Components/events";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import  ApiKeys from '../Pages/ApiKeys';
import "react-big-calendar/lib/css/react-big-calendar.css";
require("moment/locale/es.js");
moment.locale("es");
const localizer = momentLocalizer(moment);

 
 
const DEFAULT_VIEW = "day";

const serverUrl = ApiKeys.urlApi;
export default class Calendario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: "day",
      date: this.props.fecha, //new Date(2016,2,13),
      inicio: this.props.fechaInicio,
      fin: this.props.fechafin,
      id_cancha: this.props.cancha,
      eventos: events
    };
  }

  handleDateClick = arg => {
    this.sendData(arg);
  };

  eventStyleGetter = event => {
    if (event.estado == "1") {
      var backgroundColor = "#" + "e5be01";
      var style = {
        backgroundColor: backgroundColor
      };
      return {
        style: style
      };
    }
  };
  onSelectEvent = event => {
    this.props.history.push({
      pathname: "/reservasform",
      id_reserva: event.id,
      fecha: event.fecha,
      estado: event.estado,
      modificacion: true,
      ci_quien_reserva: event.ci_quien_reserva
    });
  };

  sendData = data => {
    this.props.parentCallback(this.convertidorFecha(data));
  };

  componentDidMount() {
   window.addEventListener("resize", () => {
       this.setState({
         width: window.innerWidth,
         height: window.innerHeight
       });
    });

    this.sendData(this.state.date);
  }

  fetchDataCanchas = cancha => {
    var that = this;
    var jsonejemplo = JSON.stringify({
      id_cancha: cancha,
      fecha: this.state.date
    });

    fetch(serverUrl + "/reservas/listarReservasPorcancha", {
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

        if (result.data != null && result.data.length > 0) {
          var orderInfo = result.data.map(function(order) {
            var fechamomento = moment(order.fecha)
              .utc()
              .format("YYYY/MM/DD");

            var finicio = fechamomento + " " + order.hora_inicio;
            var ffin = fechamomento + " " + order.hora_fin;
            var info = {
              title:
                order.nombre_reserva +
                " CI: " +
                order.ci_quien_reserva,
              start: moment(finicio).toDate(),
              end: moment(ffin).toDate(),
              desc: order.nombre_reserva,
              id: order.id_reserva,
              estado: order.estado,
              fecha: fechamomento,
              hora_inicio: order.hora_inicio,
              hora_fin: order.hora_fin
            };
            return info;
          });
          that.setState({
            eventos: orderInfo
          });
        } else {
          that.setState({
            eventos: []
          });
        }
      });
  };
  componentWillReceiveProps({ cancha }) {
    this.setState({ id_cancha: cancha });
    this.fetchDataCanchas(cancha);
  }
  convertidorFecha(date) {
    var fecha = date;
    var dd = fecha.getDate();
    var mm = fecha.getMonth() + 1;
    var yyyy = fecha.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    var today = dd + "/" + mm + "/" + yyyy;
    return today;
  }

  render() {
    const Calendario = props => (
      <div >
        <Calendar
          step={30}
          localizer={localizer}
          events={this.state.eventos}
          startAccessor="start"
          endAccessor="end"
          businessHours="true"
          messages={{
            next: "sig",
            previous: "ant",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Día"
          }}
          defaultView={DEFAULT_VIEW}
          min={moment("2018-02-23 07:00:00").toDate()}
          max={this.props.fechafin}
          style={{ height: 700   }}
          views={["day", "month", "agenda"]}
          date={this.state.date}
          onNavigate={fecha => {
            this.setState({ date: fecha });
            this.handleDateClick(fecha);
          }}
          onSelectEvent={this.onSelectEvent}
          eventPropGetter={this.eventStyleGetter}
        />
      </div>
    );

    return (
      <div>
        <Calendario dateClick={this.handleDateClick}></Calendario>
      </div>
    );
  }
}
