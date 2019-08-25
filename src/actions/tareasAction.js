import axios from 'axios'
import { 
  TRAER_TODAS, 
  CARGANDO, 
  ERROR,
  CAMBIO_USUARIO_ID,
  CAMBIO_TITULO,
  GUARDAR,
  ACTUALIZAR,
  LIMPIAR
} from '../types/tareasTypes'

export const traerTodas = () => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })
  try{
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos')

    const tareas = {}
    respuesta.data.map( (tar) => (
      tareas[tar.userId] = {
        ...tareas[tar.userId],
        [tar.id]: {
          ...tar
        }
      }
    ))

    dispatch({
      type: TRAER_TODAS,
      payload: tareas
    })
  } catch(e){
    dispatch({
      type: ERROR,
      payload: 'Información de tareas no disponible'
    })
  }
}

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
  dispatch({
    type: CAMBIO_USUARIO_ID,
    payload: usuario_id
  })
}

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CAMBIO_TITULO,
    payload: titulo
  })
}

export const agregar = (nueva_tarea) => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })

  try{
    const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', nueva_tarea)
    dispatch({
      type: GUARDAR
    })
  }catch(error){
    dispatch({
      type: ERROR,
      payload: "Intente mas tarde"
    })
  }
}

export const editar = (tarea_editada) => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })

  try{
    const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada)
    dispatch({
      type: GUARDAR
    })
  }catch(error){
    dispatch({
      type: ERROR,
      payload: "Intente mas tarde"
    })
  }
}

export const cambioCheck = (usu_id, tar_id) => (dispatch, getState) => {
  const {
    tareas
  } = getState().tareasReducer
  const seleccionada = tareas[usu_id][tar_id]

  const actualizada = {
    ...tareas
  }
  actualizada[usu_id] = {
    ...tareas[usu_id]
  }
  actualizada[usu_id][tar_id] = {
    ...tareas[usu_id][tar_id],
    completed: !seleccionada.completed
  }

  dispatch({
    type: ACTUALIZAR,
    payload: actualizada
  })
}

export const eliminar = (tar_id) => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })
  try{
    const respuesta = await axios.delete(`https://jsonplaceholder.typicode.com/todos/${tar_id}`)
    dispatch({
      type: TRAER_TODAS,
      payload: {}
    })
  }catch(error){
    dispatch({
      type: ERROR,
      payload: "El servicio no esta disponible"
    })
  }
}

export const limpiarFormulario = () => (dispatch) => {
  dispatch({
    type: LIMPIAR
  })
}