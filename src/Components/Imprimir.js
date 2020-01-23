import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import  moment from 'moment';

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#f0f0f0",
    border: "10px solid #000"
  },
   
  centerImage: {
    alignItems: "center",
    flexGrow: 1
  },
  text: {
    width: "100%",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 0,
    color: "#212121",
    fontSize: "7",
    border: "20px"
  },
  encabezado: {
    textAlign: "center",
    fontSize: "6",
    width: "100%",
    color: "#f5f3f1",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 0,
    paddingVertical: 0,
    color: "#212121"
  },
  vote: {
    display: "flex",
    flexDirection: "row"
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
    marginBottom: 12
  },
  rating: {
    height: 10,
    width: 10
  },
  vote_text: {
    fontSize: 10
  },
  subtitulo: {
    textAlign: "center",
    fontSize: "14",
    width: "100%",
    color: "#f5f3f1",
    paddingHorizontal: 0,
    paddingVertical: 0,
    color: "#212121"
  },

  textoDetalle: {
    fontSize: 8,
    paddingHorizontal: 10, //de izquierda a derecha
    paddingVertical: 3
  }
});

export function PdfDocument(props) {
  console.log("pdf props", props.data);
  return (
    <Document>
      <Page style={styles.page} size="A6">
        <View>
          <Text style={{ fontSize: "6", textAlign: "right" ,paddingHorizontal:2, paddingVertical: 3 }}>
            Reserva :{props.data.id_reserva}
          </Text>
          <Text style={{ fontSize: "6", textAlign: "right"  ,paddingHorizontal:2, paddingVertical: 3 }}>Fecha Imp:{moment(new Date()).format("DD/MM/YYYY")}</Text>
          <Text style={{ paddingVertical: 10 }}></Text>
          <View style={styles.vote}>
            <Text style={styles.subtitulo}>Datos de reserva</Text>
          </View>
          <Text style={styles.encabezado}>Reserva de complejo deportivo</Text>
          <Text style={styles.encabezado}>Gobierno Autonomo de El Alto</Text>
          <Text style={{ paddingVertical: 10 }}></Text>
          <View>
            <View style={styles.vote}>
              <Text style={styles.textoDetalle}>
                Cancha: {props.data.nombre} 
              </Text>
            </View>
            <View style={styles.vote}>
              <Text style={styles.textoDetalle}>Fecha Reserva:{props.data.fecha_reserva}</Text>
              <Text style={styles.textoDetalle}>Hora inicio:{props.data.hora_inicio}</Text>
              <Text style={styles.textoDetalle}>Hora inicio:{props.data.hora_fin}</Text>
            </View>
            <View style={styles.vote}>
              <Text style={styles.textoDetalle}>Nombre:{props.data.nombre_reserva}</Text>
              <Text style={styles.textoDetalle}>CI:{props.data.ci_quien_reserva}</Text>
            </View>
            <View style={styles.vote}>
              <Text style={styles.textoDetalle}>Observaciones: {props.data.observaciones} </Text>
               
            </View>
          </View>
          <Text style={{ paddingVertical: 30 }}></Text>
          <View style={styles.vote}>
              <Text style={{ fontSize: 8,paddingHorizontal: 30,paddingVertical: 3}}>RECIBI CONFORME</Text>
              <Text style={styles.textoDetalle}>ENTREGUE CONFORME</Text>
            
            </View>
            <View style={styles.vote}>

                  </View>
        </View>
      </Page>
    </Document>
  );
}
