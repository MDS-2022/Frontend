import React from 'react'
import Chart from "./Chart";
import {subDays} from "date-fns";

const Charts = (props) => {
    const dataChart1 = [];
    const values = {0 : 3, 1 : 5, 2 : 4, 3 : 2, 4 : 3, 5 : 3, 6 : 4};
    for (let num = 7; num >= 1; num--) {
        dataChart1.push({
            date: subDays(new Date(), num).toISOString().substr(0, 10),
            value: values[num - 1],
        });
    }

    const dataChart2 = [];
    const values2 = {0 : 3, 1 : 4, 2 : 5, 3 : 7, 4 : 6, 5 : 0, 6 : 0};
    for (let num = 7; num >= 1; num--) {
        dataChart2.push({
            date: subDays(new Date(), num).toISOString().substr(0, 10),
            value: values2[num - 1],
        });
    }

    const dataChart3 = [];
    const values3 = {0 : 4, 1 : 5, 2 : 2, 3 : 0, 4 : 0, 5 : 0, 6 : 0};
    for (let num = 7; num >= 1; num--) {
        dataChart3.push({
            date: subDays(new Date(), num).toISOString().substr(0, 10),
            value: values3[num - 1],
        });
    }

    return (
        <div className='charts'>
            <Chart data={dataChart1} measure={parseInt(localStorage.getItem("language")) === 0 ? "user accounts" : "conturi de utilizator"}/>
            <Chart data={dataChart2} measure={parseInt(localStorage.getItem("language")) === 0 ? "products in stock" : "produse in stoc"}/>
            <Chart data={dataChart3} measure={parseInt(localStorage.getItem("language")) === 0 ? "ordered products" : "produse comandate"}/>
        </div>
    );
}

export default Charts
