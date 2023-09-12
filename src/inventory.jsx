import React, { Component } from 'react'
import {Navbar} from './components/navbar'
import {ShowInv} from './components/showInv'
import { Link } from 'react-router-dom'
import './styles/index.css'

export default class Inventory extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <Link to="/addProduct" className="btnAdd btn btn-primary">Add</Link>
      <ShowInv/>
      </>
    )
  }
}
