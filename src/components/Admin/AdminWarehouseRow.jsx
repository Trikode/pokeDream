import React, { useState } from "react";
import "../../pages/Admin/admin.css";
// import { useLiveItems } from "../../App";

const AdminWarehouseRow = (props) => {
  const [show, setShow] = useState(false);
  // const {setShow}= useLiveItems();
  return (
    <>
      <tr>
        <td>{props.id}</td>
        <td>
          <span
            className="toolTip"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
          >
            {props.name}
          </span>
          <span className={show ? "toolTipImgActive" : "toolTipImg"}>
            <img src={props.img} alt="" />
          </span>
        </td>
        <td>{props.gender}</td>
        <td>{props.type}</td>
        <td>{props.color}</td>
        <td>{props.size}</td>
        <td>{props.quantity}</td>
      </tr>
    </>
  );
};

export default AdminWarehouseRow;
