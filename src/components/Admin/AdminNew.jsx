import React from "react";
import { useState } from "react";
import "../../pages/Admin/admin.css"

const AdminNew = ()=> { 
    const [file, setFile] = useState("");
    const [name,setName] = useState("")
    const [category,setCategory] = useState("")
    
    const handleName = event => {
        setName(event.target.value);
      };
    const handleCategory = event => {
        setCategory(event.target.value);
      };
    const handleContent = (e) => {
        const content = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(content);
        reader.onload = () => {
          setFile(reader.result);
        };
      };
    const products = JSON.parse(localStorage.getItem("newProducts")) || [];

    const Submit = (event) => {
        event.preventDefault();
        const categoryClear= document.getElementById('categoryNew');
        const nameClear = document.getElementById('loadname');
        // const productImage = document.getElementById('productImage');
        // const price= document.getElementById('price');

        const product = { 
            category:category, 
            name: name, 
            productImage: file, 
            // price: price.value 
        };
    
        products.push(product);
        localStorage.setItem("newProducts", JSON.stringify(products));

        categoryClear.value = "" 
        nameClear.value = "" 
        setCategory("")
        setName("") 
        setFile("")
           
    };
    return(
    <>
        <div className="new">
            <div className="newContainer">
            <div className="newpTitle">
                <h1>Add New Product</h1>
            </div>
            <form className="Aform">
                <div>
                    <label htmlFor="category">Category </label>
                    <select name="category" id="categoryNew" onChange={handleCategory}>
                        <option value="">Scegli...</option>
                        <option value="men">Men</option>
                        <option value="woman">Women</option>
                        <option value="kids">Kids</option>
                    </select>
                </div> 
                <div className="loadbtnDiv">
                    <label htmlFor="upload-file" className="loadbtn">Load tee image</label>
                    <input type="file" id="upload-file" accept="image/png,image/jpeg" onChange={handleContent} hidden/>
                    {/* <p>{file.valueOf()} </p> */}
                    <img src={file} alt="" />
                </div>
                <div>
                    <label htmlFor="name">Product name</label>
                    <input type="text" name="name" id="loadname" onChange={handleName}/>
                </div>
                <button  id="inputbtn" type="submit" onClick={Submit}>Submit</button>
            </form>
            </div>
        </div>
    </>
    );
};


export default AdminNew