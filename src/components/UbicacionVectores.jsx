import React, {useEffect, useState} from 'react';

const UbicacionVectores = ({vectores}) => {
  const [vectoresConEnfermedades, setVectoresConEnfermedades] = useState([]);

  useEffect(() => {
    vectores.map(vector => {
      fetch(`http://localhost:8080/vector/enfermedades/${vector.id}`)
        .then(response => response.json())
        .then(enfermedades => {
          setVectoresConEnfermedades(prevState => [...prevState, {...vector, enfermedades}])
        })
        .catch((e) => console.log(e))
    })
  }, [vectores])

  return <>
    {vectoresConEnfermedades && vectoresConEnfermedades.map(vector => {
      return <div key={vector.id}>
        <h3>{vector.tipo}</h3>
        <ul>
          {vector.enfermedades && vector.enfermedades.map(({id, nombre, patogeno}) => {
            return <li key={id}>{nombre} ({patogeno.tipo})</li>
          })}
        </ul>
      </div>
    })}
  </>
}

export default UbicacionVectores;
