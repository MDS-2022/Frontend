import React, {useState} from 'react'
import './product.scss'
import axios from "axios";
import UpdateProductForm from "./UpdateProductForm";

const Product = (props) => {
    const [state, setState] = useState(false)
    const deleteProduct = async () => {
        const url = 'http://localhost/api/products/' + props.id;
        await axios({
            method: 'DELETE',
            url: url,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            }
        }).then((response) => {
            console.log("delete");
            window.location.reload();
        }, (error) => {
            console.log(error);
        })
    }

    const updateProduct = () => {
        setState(true);
        console.log("update product");
    }

    const addToCart = () => {
        if (localStorage.getItem("shoppingCart") === "") {
            localStorage.setItem("shoppingCart", props.id.toString())
        } else {
            localStorage.setItem("shoppingCart", localStorage.getItem("shoppingCart") + " " + props.id.toString())
        }
        console.log("add to cart");
    }

    if (localStorage.getItem("role") === 'ADMIN' ||
        localStorage.getItem("role") === 'MANAGER') {
        if (state) {
            return (
                <div key={props.id} className='product'>
                    <div className='productHelper'>
                        <p>{props.name}</p>
                        <p>{parseInt(localStorage.getItem("language")) === 0 ? "Price" : "Pret"}: {props.price}</p>
                        <p>{parseInt(localStorage.getItem("language")) === 0 ? "Quantity" : "Cantitate"}: {props.quantity}</p>
                        <p>{props.description}</p>
                        <div className='buttons'>
                            <button className='button' type="button" onClick={deleteProduct}>
                                {parseInt(localStorage.getItem("language")) === 0 ? "Delete Product" : "Elimina produs"}
                            </button>
                        </div>
                    </div>
                    <UpdateProductForm name={props.name} price={props.price} quantity={props.quantity} description={props.description} id={props.id}/>
                </div>
            );
        }

        return (
            <div key={props.id} className='product'>
                <div className='productHelper'>
                    <p>{props.name}</p>
                    <p>{parseInt(localStorage.getItem("language")) === 0 ? "Price" : "Pret"}: {props.price}</p>
                    <p>{parseInt(localStorage.getItem("language")) === 0 ? "Quantity" : "Cantitate"}: {props.quantity}</p>
                    <p>{props.description}</p>
                    <div className='buttons'>
                        <button className='button' type="button" onClick={deleteProduct}>
                            {parseInt(localStorage.getItem("language")) === 0 ? "Delete Product" : "Elimina produs"}
                        </button>
                        <button className='button' type="button" onClick={updateProduct}>
                            {parseInt(localStorage.getItem("language")) === 0 ? "Update Product" : "Actualizare produs"}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div key={props.id} className='product'>
            <div className='productHelper'>
                <p>{props.name}</p>
                <p>{parseInt(localStorage.getItem("language")) === 0 ? "Price" : "Pret"}: {props.price}</p>
                <p>{props.description}</p>
                <div className='buttons'>
                    <button className='button' type="button" onClick={addToCart}>
                        {parseInt(localStorage.getItem("language")) === 0 ? "Add to Cart" : "Adauga in cos"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product
