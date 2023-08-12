
import { 
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions
} from 'react-swipeable-list'
import "react-swipeable-list/dist/styles.css"

import { formatearFecha } from '../helpers/index'

import IconoComida from '../img/icono_comida.svg'
import IconoServicios from '../img/icono_casa.svg'
import IconoHijos from '../img/icono_hijos.svg'
import IconoBaradero from '../img/icono_baradero.svg'
import IconoCampo from '../img/campo.svg'
import IconoCuotas from '../img/icono_cuotas.svg'
import IconoMercadolibre from '../img/icono_mercado.svg'
import IconoDebitos from '../img/icono_debito.svg'
import IconoFree from '../img/icono_free.svg'
import IconSuper from '../img/supermercado.svg'
import IconColegio from '../img/colegio.svg'
import IconCumples from '../img/cumples.svg'

const diccionarioIconos = {
  comida: IconoComida,
  super: IconSuper,
  casa: IconoServicios,
  hijos: IconoHijos,
  cumples: IconCumples,
  colegio: IconColegio,
  baradero: IconoBaradero,
  campo: IconoCampo,
  cuotas: IconoCuotas,
  mercadolibre: IconoMercadolibre,
  debitos: IconoDebitos,
  free_time: IconoFree
}

const Gasto = ({gasto, setGastoEditar, eliminarGasto}) => {

    const { categoria, nombre, cantidad, id, fecha } = gasto

    const leadingActions = () => (
      <LeadingActions>
        <SwipeAction
          onClick={() => setGastoEditar(gasto)}      
        >
          Editar
        </SwipeAction>
      </LeadingActions>
    )

    const trailingActions = () => (
      <TrailingActions>
        <SwipeAction
          onClick={() => eliminarGasto(id)}      
          destructive={true}
        >
          Eliminar
        </SwipeAction>
      </TrailingActions>
    )

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className='gasto sombra cursor-pointer'>
            <div className='contenido-gasto'>

              <img 
                src={diccionarioIconos[categoria]}
                alt="Iconos"
              />

                <div className='descripcion-gasto'>
                    <p className='categoria'>{categoria}</p>
                    <p className='nombre-gasto'>{nombre}</p>
                    <p className='fecha-gasto'>
                      Agregado el: {""}
                      <span>{formatearFecha(fecha)}</span>
                    </p>
                </div>
            </div>
            <p className='cantidad-gasto'>${cantidad}</p>
        </div>
      </SwipeableListItem>
    </SwipeableList>
  )
}

export default Gasto
