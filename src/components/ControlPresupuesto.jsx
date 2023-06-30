
// Este effect va a estar escuchando por los cambios que sucedan en gastos
import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({
  gastos, 
  setGastos, 
  presupuesto, 
  setPresupuesto,
  setEsValidoPresupuesto
}) => {

  const [ porcentaje, setPorcentaje ] = useState(0)
  const [ disponible, setDisponible ] = useState(0)
  const [ gastado, setGastado ] = useState(0)

  useEffect(() => {
    
    // Primero: tengo que saber lo que gaste
    // Al tener un arreglo con objetos, lo mejor es usar .reduce() ya que va a acumular una gran cantidad de datos en una sola variable
    const gastosAcumulados = gastos.reduce((acumulado, gasto) => acumulado + gasto.cantidad, 0)
    setGastado(gastosAcumulados)

    // Segundo: tengo que saber lo que tengo disponible
    const totalDisponible = presupuesto - gastosAcumulados

    const nuevoPresupuesto = (( (presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

    setDisponible(totalDisponible) 
    setGastado(gastosAcumulados)

    setTimeout(() => {
      setPorcentaje(nuevoPresupuesto)
    }, 500);

  }, [gastos]) // Cada vez gastos CAMBIE va a estar corriendo el effect {...}
  

  const formatearCantidad = (cantidad) => {
    return cantidad.toLocaleString('en-AR', {
      style: 'currency',
      currency: 'USD'
    })
  }

  const handleResetApp = () => {
    const resultado = confirm("¿Deseas reiniciar la aplicación?")

    if(resultado) {
      setGastos([])
      setPresupuesto(0)
      setEsValidoPresupuesto(false)
    } 
  }

  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
        <div>
            <CircularProgressbar 
              styles={buildStyles({
                pathColor: porcentaje > 100 ? "#fd335a" : "#3b82f6",
                trailColor: "#f5f5f5",
                textColor: porcentaje > 100 ? "#fd335a" : "#3b82f6"
              })}
              value={porcentaje}
              text={`${porcentaje}% Gastado`}
            />
        </div>

        <div className='contenido-presupuesto'>

            <button 
              className="reset-app"
              type="button"
              onClick={handleResetApp}
            >Resetear App</button>

            <p>
                <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? "negativo" : ""}`}>
                <span>Disponible: </span> {formatearCantidad(disponible)}
            </p>

            <p>
                <span>Gastado: </span> {formatearCantidad(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto
