import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts';

function convertirFecha(fecha, fechaInicial) {
    const segundosPorAnio = 40;
    const fechaEnSegundos = (new Date(fecha) - new Date(fechaInicial)) / 1000;
    const aniosDif = Math.floor(fechaEnSegundos / segundosPorAnio);
    return 2023 + aniosDif;
  }
  
  function parseData(input) {
    let dataObj = {};
    let ids = new Set();
    let fechaInicial = Object.keys(input[0].cantInfectados)[0];
  
    input.forEach(item => {
      let id = item.id.toString();
      ids.add(id);
      let cantInfectados = item.cantInfectados;
  
      for (let fecha in cantInfectados) {
        let fechaConvertida = convertirFecha(fecha, fechaInicial);
        if (!dataObj[fechaConvertida]) {
          dataObj[fechaConvertida] = {};
        }
  
        dataObj[fechaConvertida][id] = cantInfectados[fecha];
      }
    });
  
    let finalData = [["Cantidad", ...ids]];
  
    for (let fecha in dataObj) {
      let row = [fecha];
  
      ids.forEach(id => {
        row.push(dataObj[fecha][id] || null);
      });
  
      finalData.push(row);
    }
  
    return finalData;
  }

const InfectadosPorUbicacionChart = () => {
    const [infectadosPorUbicacion, setInfectadosPorUbicacion] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch("http://localhost:8080/estadistica/enfermosPorUbicacion")
      .then((response) => response.json())
      .then((data) => {
        const infectadosParsed = parseData(data);
        setInfectadosPorUbicacion(infectadosParsed);
        setLoading(false);
      })
      .catch((e) => console.log(e));
    }, []);
    
    const options = {
      title: "Infectados por ubicacion",
      hAxis: { title: "Fecha", titleTextStyle: { color: "#333" } },
      vAxis: { minValue: 0 },
      chartArea: { width: "50%", height: "70%" },
    };

  return (
    <>
        {infectadosPorUbicacion.length > 0 && !loading && <Chart
            chartType="AreaChart"
            width="100%"
            height="100vh"
            data={infectadosPorUbicacion}
            options={options}
        />}
    </>
  )
}

export default InfectadosPorUbicacionChart