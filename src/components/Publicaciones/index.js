import React, { Component } from 'react'
import {connect}  from 'react-redux'

import * as usuariosAction from '../../actions/usuariosAction'
import * as publicacionesAction from '../../actions/publicacionesAction'

const { traerTodos: usuariosTraerTodos } = usuariosAction
const { traerPorUsuario: publicacionesTraerPorUsuario } = publicacionesAction

class Publicaciones extends Component {
  async componentDidMount() {
    if (!this.props.usuariosReducer.usuarios.length) {
      await this.props.usuariosTraerTodos()
    }
    this.props.publicacionesTraerPorUsuario(this.props.match.params.key);
  }
  render() {
    console.log(this.props)
    return (
      <div>
       <h1>
          Publicaciones de
        </h1>
        { this.props.match.params.key }
      </div>
    )
  }
}

const mapStateToProps = ({usuariosReducer, publicacionesReducer}) => {
  return {
    usuariosReducer,
    publicacionesReducer
  }
}

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones);