import React from 'react'
import ShoppingCartProduct from "./ShoppingCartProduct";
import './shoppingCart.scss'

const ShoppingCart = () => {

    let lst = []
    let listProducts = []
    lst = localStorage.getItem("shoppingCart").split(" ").map(id_prod => {return parseInt(id_prod)})

    const n = lst.length

    if (localStorage.getItem("shoppingCart") !== "") {
        lst.sort()
        let nr = 0;
        let prev = lst[0];

        for (let i = 0; i < n; i++) {
            if (lst[i] !== prev) {
                listProducts.push(<ShoppingCartProduct id={prev} quant={nr}/>);
                nr = 1;
            } else {
                nr++;
            }
            prev = lst[i];
        }
        listProducts.push(<ShoppingCartProduct id={prev} quant={nr}/>);


        const handleFormSubmit = async (e) => {
            localStorage.setItem("shoppingCart", "")
        }

        return (
            <div className='shoppingCart'>
                {listProducts}

                {localStorage.getItem("shoppingCart") !== "" ?
                    <form className="form" onSubmit={handleFormSubmit}>
                        <label> {parseInt(localStorage.getItem("language")) === 0 ? "Address" : "Adresa de livrare"}</label>
                        <input required name="Address"/>
                        <button type="submit">{parseInt(localStorage.getItem("language")) === 0 ? "Place Order" : "Plaseaza comanda"}</button>
                    </form> : <div/>}

            </div>
        );
    }
    return <div/>

}

export default ShoppingCart;
