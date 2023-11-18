import React, {useEffect, useState} from 'react';
import "./UbicacionVectores.css"

const UbicacionVectores = ({vectores}) => {
  const [vectoresConEnfermedades, setVectoresConEnfermedades] = useState([]);

  useEffect(() => {
    if (vectores && vectores.length === 0) setVectoresConEnfermedades([]);
    vectores.map(vector => {
      fetch(`http://localhost:8080/vector/enfermedades/${vector.id}`)
        .then(response => response.json())
        .then(enfermedades => {
          setVectoresConEnfermedades(prevState => [...prevState, {...vector, enfermedades}])
        })
        .catch((e) => console.log(e))
    })
  }, [vectores])

  return <div className='vectores-container'>
    {vectoresConEnfermedades.length > 0 ? vectoresConEnfermedades.map(vector => {
      return <div key={vector.id}>
        <h3 className='vector-type'>{vector.tipo} | <i>enfermedades</i>:</h3>
        <ul>
          {vector.enfermedades.length > 0 ? vector.enfermedades.map((enfermedad, idx, arr) => {
            const {id, nombre, patogeno} = enfermedad;
            return <li key={id}>{nombre} ({patogeno.tipo})</li>
          }):
            <li>No tiene enfermedades</li>
          }
        </ul>
      </div>
    }) :
      <p>No hay vectores en la ubicación</p>
    }
  </div>
}

export default UbicacionVectores;
