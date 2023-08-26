import React from "react";
import "../../pages/Admin/admin.css"


const AdminReportRow  = (props)=>{
    return(
        <tr>
            <td>{props.row}</td>
            <td>{props.cart}</td>
            <td>{props.productId} {props.color} {props.size}</td>
            <td>{props.quantity}</td>
            <td>{props.price}</td>
            {/* <td>{props.shipping}</td> */}
        </tr>
 
    );
};

export default AdminReportRow