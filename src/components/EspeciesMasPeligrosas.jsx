import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';

const EspeciesMasPeligrosas = () => {
    const [especiesMasPeligrosas, setEspeciesMasPeligrosas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const especies = []
            const res = await fetch("http://localhost:8080/estadistica/especiesConPeligroDePandemia/3600")
            const data = await res.json()
            for (let index in data) {
                const res = await fetch("http://localhost:8080/especie/" + data[index].idEspecie)
                const especie = await res.json()
                especies.push(especie)
            }
            setEspeciesMasPeligrosas(especies)
        }
        fetchData()
    }, [])
    

  return (
    <div className='especies'>
        <h2>Especies mas peligrosas</h2>
        <ul className='especies-container'>
            {especiesMasPeligrosas.length > 0 ? especiesMasPeligrosas.map((especie) => (
                <li className='especie' key={especie.id}>
                    <p>{especie.id && console.log(especie)}</p>
                    <p>{especie.nombre}</p>
                </li>
            )):
            <p>No hay especies peligrosas en el ultimo tiempo</p>}
        </ul>
    </div>
  )
}

export default EspeciesMasPeligrosas