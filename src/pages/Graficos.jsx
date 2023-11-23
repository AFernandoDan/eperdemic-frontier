import React from 'react';
import InfectadosPorUbicacionChart from '../components/InfectadosPorUbicacionChart';
import InfectadosPorEspecieChart from '../components/InfectadosPorEspecieChart';
import InfectadosPorEspecieYUbicacionChart from '../components/InfectadosPorEspecieYUbicacionChart';

const Graficos = () => {

  return (<div className='graficos'>
    <h1>Graficos</h1>
    <div className='graficos-container'>
      <InfectadosPorEspecieYUbicacionChart />
      <InfectadosPorUbicacionChart/>
      <InfectadosPorEspecieChart />
    </div>
  </div>)
}

export default Graficos;
