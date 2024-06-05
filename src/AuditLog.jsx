import React, { Component } from 'react'
import {Navbar} from './components/navbar'
import { AuditLogShow } from './components/AuditLogShow'

export default class AuditLog extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <AuditLogShow/>
      </>
    )
  }
}
