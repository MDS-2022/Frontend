import React, {useEffect, useState} from 'react'
import IconButton from "@material-ui/core/IconButton";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios";
import './ShoppingCartProduct.scss'

const ShoppingCartProduct = (props) => {
    const[state, setState] = useState({})
    const getProduct = async () => {
        const url = 'http://localhost/api/products/' + props.id;
        await axios({
            method: 'GET',
            url: url,
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem("token")
            }
        }).then((response) => {
            const obj = response.data;
            setState({id: obj.id, name: obj.name, price: obj.price,
                description: obj.description, quantity: obj.quantity})
        }, (error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getProduct();
    }, [])

    const deleteProductFromCart = () => {
        let lst = localStorage.getItem("shoppingCart").split(" ").map(id_prod => {return parseInt(id_prod)})
        lst = lst.filter(i => i !== parseInt(props.id));
        const str = lst.map(String).join(" ")
        localStorage.setItem("shoppingCart", str)
        console.log("remove product from cart");
        window.location.reload();
    }

    const addProduct = () => {
        if (parseInt(props.quant) + 1 <= parseInt(state.quantity)) {
            localStorage.setItem("shoppingCart", localStorage.getItem("shoppingCart") + " " + props.id.toString())
            window.location.reload();
        }
        console.log("add");
    }

    const deleteProduct = () => {
        if (parseInt(props.quant) > 1) {
            let lst = localStorage.getItem("shoppingCart").split(" ").map(id_prod => {return parseInt(id_prod)})
            const index = lst.indexOf(parseInt(props.id))
            lst = [...lst.slice(0, index), ...lst.slice(index + 1)]
            const str = lst.map(String).join(" ")
            localStorage.setItem("shoppingCart", str)
            window.location.reload();
        }
        console.log("remove");
    }
    return (
        <div key={props.id} className='shoppingCartProduct'>
            <div className="item">
                <IconButton className='icon_delete' aria-label="delete" onClick={deleteProductFromCart}>
                    <CloseIcon/>
                </IconButton>

                <div className="name">
                    {state.name}
                </div>

                <div className="description">
                    {state.description}
                </div>

                <div className="quantity">
                    <IconButton className='icon_remove' aria-label="remove" onClick={deleteProduct}>
                        <RemoveIcon/>
                    </IconButton>
                    <input type="text" name="name" value={props.quant}/>
                    <IconButton className='icon_add' aria-label="add" onClick={addProduct}>
                        <AddIcon/>
                    </IconButton>
                </div>

                <div className="total-price">{parseInt(state.price) * parseInt(props.quant)} $</div>
            </div>
        </div>
    );
}

export default ShoppingCartProduct
