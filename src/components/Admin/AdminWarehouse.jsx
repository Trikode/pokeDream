import React from "react";
import { useEffect, useState } from "react";
import "../../pages/Admin/admin.css";
import AdminWarehouseRow from "./AdminWarehouseRow";

const AdminWarehouse = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3308/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error:", error));
  }, []);
  return (
    <>
      {/* <span className={show ? "toolTipImgActive" :"toolTipImg"}> <img src={miniImg} alt="no" /> </span> */}
      <div className="warehouse">
        <table>
          <thead className="wTableHead">
            <tr>
              <th>ID</th>
              <th>Nome </th>
              <th>
                <select name="Genere" id="Genere">
                  <option value="">Genere..</option>
                  <option value="men">Uomo</option>
                  <option value="woman">Donna</option>
                  <option value="kids">Bambino</option>
                </select>
              </th>
              <th>
                <select name="Modello" id="Modello">
                  <option value="">Modello..</option>
                  <option value="t-shirt">t-shirt</option>
                  <option value="polo">polo</option>
                  <option value="shirt">shirt</option>
                  <option value="hoodie">hoodie</option>
                  <option value="tank-top">tank-top</option>
                </select>
              </th>
              <th>
                <select name="Colore" id="Colore">
                  <option value="">Colore..</option>
                  <option value="white">Bianco</option>
                  <option value="black">Nero</option>
                  <option value="gray">Grigio</option>
                  <option value="blue">Blu</option>
                  <option value="red">Rosso</option>
                </select>
              </th>
              <th>
                <select name="Taglia" id="Taglia">
                  <option value="">Taglia..</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                </select>
              </th>
              <th>Quantità</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, pidx) => {
              return (
                <AdminWarehouseRow
                  key={pidx}
                  id={product.id_product}
                  name={product.name}
                  type={product.type}
                  gender={product.genre}
                  img={product.image}
                  color={product.color}
                  size={product.size}
                  quantity={product.quantity}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminWarehouse;
