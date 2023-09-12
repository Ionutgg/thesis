import React, { Component } from 'react'
import AccountComponent from './components/accountComponent'
import {Navbar} from './components/navbar'
import { AccountSettings } from './components/AccountSettings'

export default class Account extends Component {
  
  render() {
    
    return (
      <div>
        <Navbar/>
        <AccountComponent/>
        <AccountSettings/></div>
    )
  }
}
