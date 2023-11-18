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
    let fechaInicial = Object.keys(input[0].cantInfectadosMap)[0];

    input.forEach(item => {
        let id = "U" + item.idUbicacion.toString() + '-' + "E" + item.idEspecie.toString(); // "U1-E1
        ids.add(id);
        let cantInfectadosMap = item.cantInfectadosMap;

        for (let fecha in cantInfectadosMap) {
            let fechaConvertida = convertirFecha(fecha, fechaInicial);
            if (!dataObj[fechaConvertida]) {
                dataObj[fechaConvertida] = {};
            }

            dataObj[fechaConvertida][id] = cantInfectadosMap[fecha];
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

const InfectadosPorEspecieYUbicacionChart = () => {
    const [infectadosPorEspecieYUbicacion, setInfectadosPorEspecieYUbicacion] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetch("http://localhost:8080/estadistica/enfermosPorEspecieYUbicacion")
      .then((response) => response.json())
      .then((data) => {
        const infectadosParsed = parseData(data);
        setInfectadosPorEspecieYUbicacion(infectadosParsed);
        setLoading(false);
      })
      .catch((e) => console.log(e));
    }, []);
    
    const options = {
      title: "Infectados por Especie Y Ubicación",
      hAxis: { title: "Fecha", titleTextStyle: { color: "#333" } },
      vAxis: { minValue: 0 },
      chartArea: { width: "50%", height: "70%" },
    };

  return (
    <>
        {infectadosPorEspecieYUbicacion.length > 0 && !loading && <Chart
            chartType="AreaChart"
            width="100%"
            height="100vh"
            data={infectadosPorEspecieYUbicacion}
            options={options}
        />}
    </>
  )
}

export default InfectadosPorEspecieYUbicacionChart