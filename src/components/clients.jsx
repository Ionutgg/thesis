import React, { useState } from 'react'
import {Navbar} from './navbar' 
import { ClientsPop } from './clientsPop'
import { ClientList } from './clientList'

export const Clients = () => {
    const [insertModalIsOpen, setInsertModalIsOpen] = useState(false);
  
    const openInsertModal = () => {
      setInsertModalIsOpen(true);
    };
  
    const closeInsertModal = () => {
      setInsertModalIsOpen(false);
    };
  
    return (
      <>
        <Navbar/>
        <button onClick={openInsertModal} className="btnAdd btn btn-primary">Add</button>
        <ClientsPop
          isOpen={insertModalIsOpen}
          onClose={closeInsertModal}
        />
        <ClientList/>
      </>
    );
  }
