import React, {useEffect, useState} from 'react'
import Product from "./Product";
import axios from "axios";
import './products.scss'

const Products = (props) => {
    const[state, setState] = useState({"products" : []})

    const getProducts = async () => {
        //console.log(localStorage.getItem("token"))
        await axios({
            method: 'GET',
            url: 'http://localhost/api/products',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem("token")
            }
        }).then((response) => {
            const lst = response.data.map(obj => ({id: obj.id, name: obj.name, price: obj.price,
                description: obj.description, quantity: obj.quantity}));
            setState({"products" : lst})
        }, (error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div className='products'>
            {state.products.map(prod => {
                return <Product id={prod.id.toString()} quantity={prod.quantity.toString()} name={prod.name.toString()} price={prod.price.toString()} description={prod.description.toString()}/>
            })}
        </div>
    );
}

export default Products
