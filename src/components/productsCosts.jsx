import { useEffect, useState } from "react"
import { GetMaterialPrice } from "./serverCmds/materialPrice";
import { SetProductPrice } from "./serverCmds/productPrice";
import { SetProductQuantity } from "./serverCmds/productQuantity";
import { GetMaterialsNeeded } from "./serverCmds/materialsNeeded";
import React from 'react'

export const ProductsMaterialsCosts = ({ product, price, ammount }) => {
    const [data, setData] = useState([]);
    const [newPrice, setNewPrice] = useState([]);
    const [cost, setCost] = useState([]);
    const [quantity, setQuantity] = useState([]);

    useEffect(() => {
        const fetchData = async (product) => {
          try {
            const response = await GetMaterialsNeeded(product);

            setData(response);
            handleCosts(response[0].materials_name);
              
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
      
        fetchData(product);
      }, [product]);
    
    
    const handlePrice = (e) =>{
        setNewPrice(e.target.value)
    }

    const handleQuantity = (e) => {
        setQuantity(e.target.value)
    }

    const handleSubmit = () => {
        SetProductPrice(product,newPrice);
    }

    const handleSubmit1 = () => {
        SetProductQuantity(product,quantity)
    }

    const handleCosts = async  (name) => {
        const price1 = await GetMaterialPrice(name);
        setCost(price1);
    }

    return (
        <div style={{ marginLeft: 10 }}>
            {data.length > 0 && cost.length > 0 && (
                <>
                    <div>
                        <label style={{ marginLeft: 25 }}>Costs to produce: {data[0].quantity * cost[0].price}</label>
                    </div>
                    <div>
                        <label style={{ marginLeft: 25 }}>Price : </label>
                        <input style={{ marginLeft: 10, marginBottom: 30 }} placeholder={price} type='number' onChange={handlePrice}></input>
                        <button className='btnAdd btn btn-primary' onClick={handleSubmit}>Set new price</button>
                    </div>
                    <div>
                        <label>Quantity : </label>
                        <input style={{ marginLeft: 10 }} placeholder={ammount} type='number' onChange={handleQuantity}></input>
                        <button className='btnAdd btn btn-primary' onClick={handleSubmit1}>Set new quantity</button>
                    </div>
                </>
            )}
        </div>
    );
    
    
}