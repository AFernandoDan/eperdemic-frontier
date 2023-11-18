import React from 'react';
import InfectadosPorUbicacionChart from '../components/InfectadosPorUbicacionChart';
import InfectadosPorEspecieChart from '../components/InfectadosPorEspecieChart';
import InfectadosPorEspecieYUbicacionChart from '../components/InfectadosPorEspecieYUbicacionChart';

const Graficos = () => {

  return (<div className='graficos-container'>
    <h1>Graficos</h1>
      <InfectadosPorEspecieYUbicacionChart />
      <InfectadosPorUbicacionChart/>
      <InfectadosPorEspecieChart />
  </div>)
}

export default Graficos;
