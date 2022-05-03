import React, {useState} from 'react'
import axios from "axios";
import './updateProductForm.scss'

const UpdateProductForm = (props) => {
    const[state, setState] = useState({"price" : "", "quantity" : "", "name" : "", "description" : ""})

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        await axios({
            method: 'PUT',
            url: 'http://localhost/api/products',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            data: {
                "id": props.id,
                "price": state.price,
                "name": state.name,
                "quantity": state.quantity,
                "description": state.description
            }
        }).then((response) => {
            console.log("update form")
            window.location.reload();
        }, (error) => {
            console.log(error);
        });
    }

    return (
        <div className='updateProductForm'>
            <form className="form" onSubmit={handleFormSubmit}>
                <label>{parseInt(localStorage.getItem("language")) === 0 ? "Name" : "Nume"}:
                    <input required name="Name" placeholder={props.name} onChange={e => setState({...state, name: e.target.value})} value={state.name}/></label>
                <label>{parseInt(localStorage.getItem("language")) === 0 ? "Price" : "Pret"}:
                    <input required name="Price" placeholder={props.price} onChange={e => setState({...state, price: e.target.value})} value={state.price}/></label>
                <label>{parseInt(localStorage.getItem("language")) === 0 ? "Quantity" : "Cantitate"}:
                    <input required name="Quantity" placeholder={props.quantity} onChange={e => setState({...state, quantity: e.target.value})} value={state.quantity}/></label>
                <label>{parseInt(localStorage.getItem("language")) === 0 ? "Description" : "Descriere"}:
                    <input required name="Description" placeholder={props.description} onChange={e => setState({...state, description: e.target.value})} value={state.description}/></label>
                <button type="submit">{parseInt(localStorage.getItem("language")) === 0 ? "Update" : "Actualizeaza produs"}</button>
            </form>
        </div>
    );
}

export default UpdateProductForm
