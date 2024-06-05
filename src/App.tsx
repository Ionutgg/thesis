import React from 'react';
import { Routes,Route} from 'react-router-dom';
import { Login } from './login';
import Account from './account';
import AddInv from './components/addInv';
import Inventory from './inventory';
import AddWorkCenter from './components/addWorkCenter';
import { ProductsDetails } from './components/productsDetails';
import { MaterialDetails } from './components/materialDetails';
import { Clients } from './components/clients';
import { Orders } from './orders';
import { AccountEdit } from './components/AccountEdit';
import { WorkerOrders } from './workerOrders';
import AuditLog from './AuditLog';
import ListInvoices from './listInvoices';
import Reports from './reports';
function App() {
  return (
    <Routes>
      <Route  path="/" element={<Login/>}/>
      <Route  path="/account" element={<Account/>}/>
      <Route  path="/inventory" element={<Inventory/>}/>
      <Route  path="/inventory/product/:product" element={<ProductsDetails/>}/>
      <Route  path="/inventory/materials/:product" element={<MaterialDetails/>}/>
      <Route  path="/addProduct" element={<AddInv/>}/>
      <Route path="/AddWorkcenter" element={<AddWorkCenter/>}/>
      <Route path="/Clients" element={<Clients/>}/>
      <Route path="/Orders" element={<Orders/>}/>
      <Route path="/Account/Edit/:name" element={<AccountEdit/>}/>
      <Route path="/WOrders" element={<WorkerOrders/>}/>
      <Route path="/AuditLog" element={<AuditLog/>}/>
      <Route path="/ListInvoices" element={<ListInvoices/>}/>
      <Route path='/Reports' element={<Reports/>}/>

    </Routes>
  );
}

export default App;
