import React, {Component} from 'react'
//import axios from 'axios'
import {connect} from 'react-redux'
import Spinner from '../General/Spinner'
import Fatal from '../General/Fatal'
import Tabla from './Tabla'

import * as usuariosAction from '../../actions/usuariosAction'

class Usuarios extends Component {
  
  componentDidMount(){
    if(!this.props.usuarios.length){
      this.props.traerTodos();
    }
  }
 
  ponerContenido = () => {
    if(this.props.cargando){
      return <Spinner />
    }
    if (this.props.error){
      return <Fatal mensaje={this.props.error}/>;
    }
    return (
      <Tabla />
    )
  }
  
  render() {
    return(
      <div>
        <h1>Usuarios</h1>
        { this.ponerContenido() }
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer
}

export default connect(mapStateToProps, usuariosAction)(Usuarios);