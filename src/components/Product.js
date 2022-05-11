import React, {useState} from 'react'
import './product.scss'
import axios from "axios";
import UpdateProductForm from "./UpdateProductForm";



const Product = (props) => {
    const [state, setState] = useState(false)
    const deleteProduct = async () => {
        const url = 'http://34.125.21.171:5000/book' + props.remote_id;
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

    function visitPage(){
        let drive;
        drive = "https://drive.google.com/file/d/" + props.remote_id + "/view";
        window.location = drive;
    }
    console.log(props);
    if (localStorage.getItem("role") === "1") {
        if (state) {
            return (
                <div key={props.name} className='product'>
                    <div className='productHelper'>
                        <p>{props.name}</p>
                        <p>{props.author}</p>
                        <div className='buttons'>
                            <button className='button' type="button" onClick={deleteProduct}>
                                {parseInt(localStorage.getItem("language")) === 0 ? "Delete Product" : "Elimina produs"}
                            </button>
                        </div>
                    </div>
                    <UpdateProductForm name={props.name} author={props.author}/>
                </div>
            );
        }

        return (
            <div key={props.name} className='product'>
                <div className='productHelper'>
                    <p>{props.name}</p>
                    <p>{props.author}</p>
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
        <div key={props.name} className='product'>
            <div className='productHelper'>
                <p>{props.name}</p>
                <p>{props.author}</p>
                <div className='buttons'>
                    <button className='button' type="button"
                            onClick={visitPage}>as
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product
