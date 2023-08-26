import React, { useState, useEffect } from "react";
import "../../pages/Admin/admin.css";

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    type: "",
    name: "",
    sizes: [],
    selectedSizes: {},
    colors: [],
    selectedColors: [],
    genre: "",
    quantities: {},
    price: "",
    images: {},
  });

  useEffect(() => {
    fetch("http://localhost:3308/api/sizes")
      .then((response) => response.json())
      .then((data) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          sizes: data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching sizes:", error);
      });

    fetch("http://localhost:3308/api/colors")
      .then((response) => response.json())
      .then((data) => {
        setFormData((prevFormData) => ({
          ...prevFormData,
          colors: data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching colors:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSizeChange = (e, colorId) => {
    // Pass colorId as an argument
    const sizeId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    setFormData((prevFormData) => {
      const updatedSelectedSizes = {
        ...prevFormData.selectedSizes,
        [colorId]: isChecked
          ? [...(prevFormData.selectedSizes[colorId] || []), sizeId]
          : prevFormData.selectedSizes[colorId].filter((id) => id !== sizeId),
      };

      return {
        ...prevFormData,
        selectedSizes: updatedSelectedSizes,
      };
    });
  };

  const handleQuantityChange = (e, colorId, sizeId) => {
    const quantityValue = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      quantities: {
        ...prevFormData.quantities,
        [colorId]: {
          ...prevFormData.quantities[colorId],
          [sizeId]: quantityValue,
        },
      },
    }));
  };

  const handleColorChange = (e) => {
    const colorId = parseInt(e.target.value);
    const isChecked = e.target.checked;

    setFormData((prevFormData) => {
      if (isChecked) {
        return {
          ...prevFormData,
          selectedColors: [...prevFormData.selectedColors, colorId],
          images: {
            ...prevFormData.images,
            [colorId]: "", // Initialize the image URL for the new color
          },
        };
      } else {
        const { [colorId]: _, ...updatedImages } = prevFormData.images; // Remove the image URL for the deselected color

        return {
          ...prevFormData,
          selectedColors: prevFormData.selectedColors.filter(
            (id) => id !== colorId
          ),
          images: updatedImages,
        };
      }
    });
  };

  const handleImageChange = (e, colorId) => {
    const imageURL = e.target.value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      images: {
        ...prevFormData.images,
        [colorId]: imageURL,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { type, name, genre, price, images } = formData;

    const products = formData.selectedColors.flatMap((colorId) =>
      formData.selectedSizes[colorId].map((sizeId) => ({
        type,
        name,
        size: sizeId,
        color: colorId,
        genre,
        quantity: formData.quantities[colorId][sizeId],
        price,
        image: images[colorId],
      }))
    );

    Promise.all(
      products.map((product) =>
        fetch("http://localhost:3308/api/newproduct", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        })
      )
    )
      .then((responses) =>
        Promise.all(responses.map((response) => response.json()))
      )
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    alert("products added succesfuly");
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="type">Type:</label>
        <input
          type="text"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        />
        <br />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <br />

        {/* <label htmlFor="sizes">Sizes:</label> */}
        <div className="Aselection-container">
          <div className="Acolor-container">
            <label htmlFor="colors">Colors:</label>
            {formData.colors.map((color) => (
              <div key={color.id_color}>
                <input
                  type="checkbox"
                  id={`color-${color.id_color}`}
                  name="colors"
                  value={color.id_color}
                  checked={formData.selectedColors.includes(color.id_color)}
                  onChange={handleColorChange}
                />
                <label htmlFor={`color-${color.id_color}`}>{color.color}</label>
                {formData.selectedColors.includes(color.id_color) && (
                  <input
                    type="text"
                    id={`image-${color.id_color}`}
                    name={`image-${color.id_color}`}
                    value={formData.images[color.id_color]}
                    onChange={(e) => handleImageChange(e, color.id_color)}
                    required
                    placeholder="Image URL"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="Asize-container">
            {formData.selectedColors.map((colorId) => (
              <div key={colorId} className="Asize-container-child">
                {formData.sizes.map((size) => (
                  <div key={size.id_size}>
                    <input
                      type="checkbox"
                      id={`size-${size.id_size}-${colorId}`}
                      name={`sizes-${colorId}`}
                      value={size.id_size}
                      checked={formData.selectedSizes[colorId]?.includes(
                        size.id_size
                      )}
                      onChange={(e) => handleSizeChange(e, colorId)} // Pass colorId as an argument
                    />
                    <label htmlFor={`size-${size.id_size}-${colorId}`}>
                      {size.size}
                    </label>
                    {formData.selectedSizes[colorId]?.includes(
                      size.id_size
                    ) && (
                      <input
                        type="number"
                        id={`quantity-${size.id_size}-${colorId}`}
                        name={`quantity-${size.id_size}-${colorId}`}
                        value={
                          formData.quantities[colorId]?.[size.id_size] || ""
                        }
                        className="AquantityInput"
                        onChange={(e) =>
                          handleQuantityChange(e, colorId, size.id_size)
                        }
                        required
                        placeholder="n."
                      />
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleInputChange}
          required
        />
        <br />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
        <br />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddProductForm;
