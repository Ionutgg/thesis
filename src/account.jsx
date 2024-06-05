import React, { Component } from 'react'
import AccountComponent from './components/accountComponent'
import {Navbar} from './components/navbar'
import { AccountSettings } from './components/AccountSettings'

export default class Account extends Component {
  
  render() {
    
    return (
      <div>
        <Navbar />
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-6" style={{ width: '720px', marginTop: '20px' }}>
              <AccountSettings />
            </div>
            <div className="col-lg-6" style={{ width: '300px', marginLeft: 200 }}>
              <AccountComponent />
            </div>
          </div>
        </div>
      </div>
    )    
  }
}
