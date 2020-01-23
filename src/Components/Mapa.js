import React from "react";
import * as mapboxgl from 'mapbox-gl';

 
export default class Mapa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: this.props.Longitud,
      lat: this.props.Latitud,
      pointLng: 0,
      pointLat: 0,
      zoom: 13
    };
  }

  componentDidMount() { 
 
    mapboxgl.accessToken =
    "pk.eyJ1Ijoiam9ydHVubyIsImEiOiJjazNrdHI1bngweG9iM2xzN3lld2hpZXdoIn0.pvK7vSF_HCi7hbz3iXYfhw";
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v9",
      center: [this.props.Longitud, this.props.Latitud],
      zoom: this.state.zoom
    });

    this.setState({
      pointLng: this.props.Longitud,
      pointLat: this.props.Latitud
    });
    map.on("move", () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    var marker = new mapboxgl.Marker({ draggable: true })
      .setLngLat([this.props.Longitud, this.props.Latitud])
      .addTo(map);

    marker.on("dragend", () => {
      var lngLat = marker.getLngLat();
      this.setState({
        pointLng: lngLat.lng.toFixed(4),
        pointLat: lngLat.lat.toFixed(4)
      });
    });

    map.addControl(new mapboxgl.NavigationControl());
  }

  render() {
    const style = {
      width: "100%",
      height: "300px"
    };

    return (
      <div>
        <div className="inline-block top left mt12 ml12   z1 py6 px12 round-full txt-s txt-bold">
          <div>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => this.props.action(this.state)}
            >
              Confirmar Ubicacion
            </button>
          </div>
        </div>
        <div>
          <div style={style} ref={el => (this.mapContainer = el)} />
        </div>
      </div>
    );
  }
}
