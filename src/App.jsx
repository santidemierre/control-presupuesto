
import { useState, useRef, useEffect } from "react"

import Header from "./components/Header"
import ListadoGastos from "./components/ListadoGastos"
import Modal from "./components/Modal"
import Filtros from "./components/Filtros"

import { generarId } from './helpers' 
import IconoNuevoGasto from './img/nuevo-gasto.svg'


function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : [] // Primero comprobamos si existe un gasto en memoria, si no existe, arranca en como un [] y si existe inicialo con lo que haya en localStorage
  )

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [esValidoPresupuesto, setEsValidoPresupuesto] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [modal, setModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({}) // Cada gasto es un objeto

  // State para los filtros
  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([]) // Este state es mostrar los gastos filtrados. Es un [] xq puede que haya más de 1 elemento

  const docRef = useRef(null);

  useEffect(() => {
    
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true)
  
      setTimeout(() => {
        setAnimarModal(true)
      }, 500);
    } 

  }, [gastoEditar]) // Va a estar escuchando por lo que suceda en gastoEditar, cuando cambie


  // Local Storage

  // Este effect se ejecuta cuando cambia presupuesto
  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto]) // Ponemos como dependencia el presupuesto. El effect Va a correr cuando pres cambie, que solo es cuando lo definimos al ppio

  // Este effect se ejecuta cuando cambie gastos
  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? []) 
  }, [gastos])

  // Este effect se ejecuta 1 sola vez cuando cambie la aplicacion
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if(presupuestoLS > 0) {
      setEsValidoPresupuesto(true) // Cuando el presupuesto es válido, ya pasa a la otra página y se mantiene ahi
    }

  }, []) 

  // Effect que va a estar escuchando por los cambios que sucedan en filtro
  useEffect(() => {
    if(filtro) {
      // Filtrar gastos por categoria
      const gastosFiltrados = gastos.filter( gasto => gasto.categoria === filtro)   
      setGastosFiltrados(gastosFiltrados)   
    }
  }, [filtro])
  
  

  useEffect(() => {
    docRef.current = document;
 
    docRef.current.addEventListener('keyup', (e) => {
      if (modal && e.key === 'Escape') {
        setAnimarModal(false);
 
        setTimeout(() => {
          setModal(false);
        }, 500);
      }
    }, true);
  }, [modal]);


  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({}) // Lo pongo como un objeto vacio para que no me genere problemas cuando quiero EDITAR

    setTimeout(() => {
      setAnimarModal(true)
    }, 500);
  }


  // Esta función toma un objeto de gasto
  const guardarGasto = gasto => {

    if(gasto.id) {

      // Actualizado
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState )

      setGastos(gastosActualizados)
      setGastoEditar({})

    } else {

      // Nuevo Gasto
      gasto.id = generarId()
      gasto.fecha = new Date()
      
      // Vamos a colocar una COPIA de gastos y le agregamos el nuevo gasto
      setGastos([ ...gastos, gasto ])

    }    

    // Cierro el modal luego de haberse agregado el gasto
    setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 500);
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( gasto => gasto.id !== id )
    setGastos(gastosActualizados)
  }
 
  return (
    <div className={modal ? 'fijar' : ""}>
      <Header 
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        esValidoPresupuesto={esValidoPresupuesto}
        setEsValidoPresupuesto={setEsValidoPresupuesto}
      />

      {esValidoPresupuesto && (
        
        // Todo este contenido se mostrará recien cuando sea válido el presupuesto 
        <>
          <main>

            <Filtros 
              filtro={filtro}
              setFiltro={setFiltro}
            />

            {/* Tenemos que pasarle el arreglo de gastos */}
            <ListadoGastos 
              gastos={gastos}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
              filtro={filtro}
              gastosFiltrados={gastosFiltrados}
            />
          </main>

          <div className="nuevo-gasto">
            <img 
              src={IconoNuevoGasto}
              alt="Icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
        </div>
      </>
      )}

      {modal && <Modal 
                  setModal={setModal} 
                  animarModal={animarModal} 
                  setAnimarModal={setAnimarModal} 
                  guardarGasto={guardarGasto}
                  gastoEditar={gastoEditar} // Asi sabe que gasto tiene que editar, que info tiene ese gasto
                  setGastoEditar={setGastoEditar}
                />}
      
    </div>
  )
}

export default App
