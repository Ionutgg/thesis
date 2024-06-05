import React, { Component } from 'react'
import {Navbar} from './components/navbar'
import { ReportSet } from './components/reportSet'
import './styles/index.css'

export default class Reports extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <ReportSet/>
      </>
    )
  }
}
