import React from "react";
import "../../pages/Admin/admin.css"
import AdminReportRow from "./AdminReportRow";
import { useState } from "react"

const AdminReport = ()=>{

    const [selectedId, setSelectedId] = useState("");

  const handleIdChange = event => {
    // event.target.value?
    setSelectedId(event.target.value)
    // :setSelectedId(null)
  };

    let reportcarts = JSON.parse(localStorage.getItem("ItemsPurchased")) || [];
    let netIncome = 0
    let netSales = 0
    for (let i = 0; i < reportcarts.length; i++) {
        const array = reportcarts[i][0];
        for (let j = 0; j < array.length; j++) {
          const item = array[j];
          netSales += parseFloat(item.itemTotal);
          netIncome += parseFloat(item.itemTotal);
          netIncome -= 10.88
        }
      }
  
    return(
        <>
        <div className="report">
            <div className="reportTable1">
            {reportcarts.filter((cart) => cart[0].some((item) => item.id.includes(selectedId) )).map((cart,cidx) => {   
                // console.log(cart[0].some(item=>item.id))
                return(
                  <div className="reportTable2" key={cidx}>
                    <table>
                        <thead>
                        <tr>
                            <th>ID Riga</th>
                            <th>ID Carrello</th>
                            <th>ID Prodotto</th>
                            <th>Quantità</th>
                            <th>Costo</th>
                            {/* <th>Info Spedizione</th> */}
                        </tr>
                        </thead>
                        <tbody>
                            {cart[0].filter((item) => item.id.includes(selectedId) ).map((item,iidx)=>{
                              
                              return <AdminReportRow key={iidx} row={cart[0].indexOf(item)+1} cart={reportcarts.indexOf(cart)+1} productId={item.id} color={item.color} size={item.size}quantity={item.quantity} price={item.itemTotal}/>   
                            })}
                        </tbody>
                    </table>
                      <div className="shipping">
                         <h4>Info Spedizione</h4>
                         {cart[1].map((info)=>{
                           return <><p><b>Name: </b> {info.name} {info.surname} </p> <s><b>Phone:</b> {info.phone}</s>
                           <p><b>Address: </b>  {info.street},{info.city}</p></>
                         })}
                      </div>
                  </div>
                    )})}
            </div>
            <div className="report-right">
                <div className="report-top-left">
                    <h4>N.Carts: <s>{reportcarts.length}</s> </h4>
                    <h4>Net Sales: <s>{netSales.toFixed(2)}$ </s></h4>
                    <h4>Net Income:  <s>{netIncome.toFixed(2)}$ </s></h4>
                </div>
                <div className="report-top-right">
                  <h4>Filter</h4>
                  <label htmlFor="cartId"><h4>ID number</h4></label>
                  <input type="text" name="cartId" id="cartId" onChange={handleIdChange}/>
                </div>
            </div>
        </div>
    </>
  );
 }

export default AdminReport