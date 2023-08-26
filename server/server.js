const express = require("express");
const cors = require("cors");
const db = require("./db.js");
const bcrypt = require("bcrypt");

const app = express();
const port = 3308;

// Parse JSON-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//GET
app.get("/api/users", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM users");
    res.json(results);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const results = await db.query(`
      SELECT p.*, pt.type AS type_name, s.size AS size_name, c.color AS color_name, i.image_url AS image_url, g.size AS genre_name
      FROM products p
      JOIN product_types pt ON p.id_type = pt.id_type
      JOIN sizes s ON p.size = s.id_size
      JOIN colors c ON p.color = c.id_color
      JOIN images i ON p.id_image = i.id_image
      JOIN genres g ON p.genre = g.id_genre
    `);
    const formattedResults = results.map((row) => ({
      id_product: row.id_product,
      type: row.type_name,
      name: row.name,
      size: row.size_name,
      color: row.color_name,
      genre: row.genre_name,
      quantity: row.quantity,
      price: row.price,
      image: row.image_url,
    }));
    res.json(formattedResults);
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/sizes", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM sizes");
    res.json(results);
  } catch (error) {
    console.error("Error fetching sizes:", error);
    res.status(500).json({ error: "Error fetching sizes" });
  }
});

app.get("/api/colors", async (req, res) => {
  try {
    const results = await db.query("SELECT * FROM colors");
    res.json(results);
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({ error: "Error fetching colors" });
  }
});

app.get("/api/deliveries", async (req, res) => {
  try {
    const results = await db.query(`
      SELECT d.*, c.city
      FROM deliveries AS d
      JOIN cities AS c ON d.city = c.id_city
    `);

    res.json(results);
  } catch (error) {
    console.error("Error fetching deliveries:", error);
    res.status(500).json({ error: "Error fetching deliveries" });
  }
});

app.get("/api/carts", async (req, res) => {
  const userId = req.query.userId;
  try {
    const results = await db.query(
      "SELECT c.id_cart,c.id_product, p.name,p.price,c.quantity, col.color, siz.size, img.image_url FROM carts c JOIN products p ON c.id_product = p.id_product JOIN colors col ON p.color = col.id_color JOIN sizes siz ON p.size = siz.id_size JOIN images img ON p.id_image = img.id_image WHERE c.id_user = ?",
      [userId]
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ error: "Error fetching carts" });
  }
});
app.get("/api/orders", async (req, res) => {
  const userId = req.query.userId;
  try {
    const results = await db.query(
      " SELECT op.id_order, p.name, s.size, c.color, op.quantity FROM orders o JOIN orders_products op ON o.id_order = op.id_order JOIN products p ON op.id_product = p.id_product JOIN sizes s ON p.size = s.id_size JOIN colors c ON p.color = c.id_color WHERE o.id_user = ?",
      [userId]
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Error fetching carts" });
  }
});



app.get("/api/access-logs/user", async (req, res) => {
  const userId = req.query.userId;
  try {
    const results = await db.query(
      "SELECT data_log FROM lista_log lg WHERE lg.FK_id_user = ?",
      [userId]
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ error: "Error fetching carts" });
  }
});


// GET per i contenuti più visitati (ARES)
app.get('/api/most-visited', (req, res) => {
  // Query SQL per selezionare i contenuti più visualizzati
  const sqlQuery = 'SELECT * FROM users ORDER BY visit_count DESC LIMIT 10';

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante il recupero dei contenuti più visitati.' });
    } else {
      res.json(results);
    }
  });
});

// GET per Gli Accessi (ARES)

app.get('/api/access-logs/total', (req, res) => {
  // Query SQL per selezionare tutti gli accessi alla WebApp
  const sqlQuery = 'SELECT COUNT(*) AS total FROM lista_log WHERE FK_id_tipo_log = 1;';

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante il recupero del numero delle visite.' });
    } else {
      console.log(results);
      res.json(results);
    }
  });
});

// // GET per Gli Accessi 2 (ARES)
// app.get("/api/access-logs/total", async (req, res) => {
//   try {
//     const results = await db.query(
//       "SELECT COUNT(*) AS total FROM lista_log WHERE FK_id_tipo_log = 1;",
//     );
//     res.json(results);
//   } catch (error) {
//     console.error("Error fetching LOGS:", error);
//     res.status(500).json({ error: "Error fetching LOGS" });
//   }
// });





// POST
app.post("/api/register", async (req, res) => {
  const { f_name, l_name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (f_name, l_name, email, password, role_id) VALUES (?, ?, ?, ?, 2)",
      [f_name, l_name, email, hash]
    );
    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.post('/api/newproduct', async (req, res) => {
//   const { type, name, sizes, colors, genre, quantity, price, image } = req.body;

//   try {
//     // Insert the image URL into the images table
//     await db.query('INSERT INTO images (image_url) VALUES (?)', [image]);

//     // Retrieve the inserted image's id_image
//     const imageQueryResult = await db.query('SELECT LAST_INSERT_ID() AS id_image');
//     const idImage = imageQueryResult[0].id_image;
//     console.log(sizes)
//     console.log(typeof(sizes))
//     console.log(colors)
//     console.log(typeof(colors))
//     // Insert the products into the products table
//     for (const size of sizes) {
//       for (const color of colors) {
//         await db.query(
//           'INSERT INTO products (id_type, name, size, color, genre, quantity, price, id_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
//           [type, name, size, color, genre, quantity, price, idImage]
//         );
//       }
//     }

//     res.json({ message: 'Product(s) inserted successfully' });
//   } catch (error) {
//     console.error('Error executing MySQL query:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// POST per l'aggiornamento dei log di accesso
app.post('/api/access-logs', (req, res) => {
  const { user_id } = req.body;
  const timestamp = new Date();

  const log = {
    FK_id_user: user_id,
    data_log: timestamp,
    FK_id_tipo_log:1,
  };

  db.query('INSERT INTO lista_log SET ?', log, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore nell\'aggiornamento dei log di accesso.' });
    } else {
      res.sendStatus(200);
    }
  });
});

app.post("/api/newproduct", async (req, res) => {
  const { type, name, size, color, genre, quantity, price, image } = req.body;
  try {
    let idImage;
    const existingImageQuery = await db.query(
      "SELECT id_image FROM images WHERE image_url = ?",
      [image]
    );

    if (existingImageQuery.length > 0) {
      idImage = existingImageQuery[0].id_image;
    } else {
      await db.query("INSERT INTO images (image_url) VALUES (?)", [image]);

      const imageQueryResult = await db.query(
        "SELECT LAST_INSERT_ID() AS id_image"
      );
      idImage = imageQueryResult[0].id_image;
    }

    await db.query(
      "INSERT INTO products (id_type, name, size, color, genre, quantity, price, id_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [type, name, size, color, genre, quantity, price, idImage]
    );

    res.json({ message: "Product inserted successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/addtocart", async (req, res) => {
  const { id_user, id_product, quantity } = req.body;
  try {
    await db.query(
      "INSERT INTO carts (id_user, id_product, quantity) VALUES (?, ?, ?)",
      [id_user, id_product, quantity]
    );
    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Conteggio delle visualizzazioni (ARES)
app.post('/api/content/:id/visit', (req, res) => {
  const contentId = req.params.id;

  // Questo incrementa il conteggio delle visualizzazioni
  const sqlQuery = `UPDATE users SET visit_count = visit_count + 1 WHERE id_user = ${contentId}`;

  db.query(sqlQuery, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Si è verificato un errore durante in aggiornamento delle visite.' });
    } else {
      res.sendStatus(200);
    }
  });
});

app.post("/api/orders", async (req, res) => {
  const { id_user, order_date, id_delivery, total_price } = req.body;

  try {
    const result = await db.query(
      "INSERT INTO orders (id_user, order_date, id_delivery, total_price) VALUES (?, ?, ?, ?)",
      [id_user, order_date, id_delivery, total_price]
    );

    res.json({ insertId: result.insertId });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/order_products", async (req, res) => {
  const { id_order, id_product, quantity } = req.body;

  try {
    await db.query(
      "INSERT INTO orders_products (id_order, id_product, quantity) VALUES (?, ?, ?)",
      [id_order, id_product, quantity]
    );

    res.json({ message: "Order product inserted successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST for adding a new delivery address
app.post("/api/deliveries", async (req, res) => {
  const { id_user, first_name, last_name, address, city, cap } = req.body;

  try {
    await db.query(
      "INSERT INTO deliveries (id_user, first_name, last_name, adress, city, cap) VALUES (?, ?, ?, ?, ?, ?)",
      [id_user, first_name, last_name, address, city, cap]
    );

    res.json({ message: "Delivery address added successfully" });
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// PUT
app.put("/api/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    const hash = await bcrypt.hash(newPassword, 10);
    const results = await db.query(
      "UPDATE users SET password = ? WHERE email = ?",
      [hash, email]
    );
    if (results.affectedRows === 0) {
      res.status(404).json({ error: "User not found" });
    } else {
      res.json({ message: "Password updated successfully" });
    }
  } catch (error) {
    console.error("Error executing MySQL query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//DELETE
app.delete("/api/carts", (req, res) => {
  const { id_user } = req.body;

  db.query("DELETE FROM carts WHERE id_user = ?", [id_user], (err, result) => {
    if (err) {
      console.error("Error deleting carts:", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
