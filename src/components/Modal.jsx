
import { useState, useEffect } from 'react'
import CerrarBtn from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [mensaje, setMensaje] = useState("")

    const [ nombre, setNombre ] = useState("")
    const [ cantidad, setCantidad ] = useState("")
    const [ fecha, setFecha ] = useState("")
    const [ categoria, setCategoria ] = useState("")

    const [ id, setId ] = useState("")

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0) {
            // Si estamos editando llenamos los campos con los hooks
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
          } 
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 500);
    }

    const handleSubmit = e => {
        e.preventDefault()
        
        if([nombre, cantidad, categoria].includes('')) {
            setMensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setMensaje("")
            }, 3000);

            return
        }

        // Si pasa la validación, genero el objeto. Paso este objeto desde aca hacia App.jsx
        guardarGasto({
            nombre,
            cantidad,
            categoria,
            fecha,
            id
        })
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img 
                src={CerrarBtn}
                alt="cerrar"
                onClick={ocultarModal}

            />
        </div>

        <form 
            className={`formulario ${animarModal ? "animar" : "cerrar"}`}
            onSubmit={handleSubmit}
        >
            <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className='campo'>
                <label htmlFor='nombre'>Nombre del Gasto</label>
                <input 
                    id='nombre'
                    type="text"
                    placeholder='Añade el nombre del gasto'
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            
            <div className='campo'>
                <label htmlFor='nombre'>Cantidad</label>
                <input 
                    id='cantidad'
                    type="number"
                    placeholder='Añade la cantidad del gasto: Ej: 300'
                    value={cantidad}
                    onChange={e => setCantidad(Number(e.target.value))}
                />
            </div>

            <div className='campo'>
                <label htmlFor='categoria'>Categorias</label>

                <select
                    id='categoria'
                    value={categoria}
                    onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">-- Selecciona una categoria --</option>
                    <option value="comida">Comida</option>
                    <option value="super">Supermercado</option>
                    <option value="casa">Casa</option>
                    <option value="hijos">Hijos</option>
                    <option value="cumples">Cumpleaños</option>
                    <option value="colegio">Colegio</option>
                    <option value="baradero">Baradero</option>
                    <option value="campo">Campo</option>
                    <option value="cuotas">Gastos con Cuotas</option>
                    <option value="mercadolibre">Mercado Libre</option>
                    <option value="debitos">Débitos automáticos</option> 
                    <option value="free_time">Tiempo libre</option>                       
                </select>
            </div>

            <input 
                type="submit"
                value={gastoEditar.nombre ? "Guardar Cambios" : "Añadir Gasto"}
            />
            
        </form>
    </div>
  )
}

export default Modal
