import React, {useEffect, useState} from 'react';

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

  return <>
    {vectoresConEnfermedades.length > 0 ? vectoresConEnfermedades.map(vector => {
      return <div key={vector.id}>
        <h3 style={{fontSize: "1.25rem"}}>{vector.tipo}</h3>
        <h3 style={{marginTop: "0"}}><i>enfermedades</i>:</h3>
        <ul style={{listStyleType: "none", marginTop: "0.25rem"}}>
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
  </>
}

export default UbicacionVectores;
