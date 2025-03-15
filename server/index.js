const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// PostgreSQL Connection
const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

// Middleware
app.use(cors());
app.use(express.json());

// Test Database Connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error connecting to the database:", err.stack);
  }
  console.log(" Connected to PostgreSQL");
  release();
});

/**
 * 🛒 GET /api/products - Fetch all products from the database
 */
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        id, category, name, display_name, 
        price::FLOAT AS price,  -- Convert price to number
        description, stock_status 
      FROM products`
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 🗑 DELETE /api/products/:id - Delete a product by ID
 */
app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product deleted successfully", deletedProduct: result.rows[0] });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//================================= PRODUCTS ================================= 
//================================= PRODUCTS ================================= 

/**
 * ➕ POST /api/products - Add a new product
 */
app.post("/api/products", async (req, res) => {
  const { category, name, display_name, price, description, stock_status } = req.body;

  if (!category || !name || !display_name || price === undefined || !stock_status) {
    return res.status(400).json({ error: "All required fields must be filled" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO products (category, name, display_name, price, description, stock_status) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [category, name, display_name, price, description || "", stock_status]
    );

    res.json({
      message: "Product added successfully",
      newProduct: result.rows[0], // Returns full object with auto-generated ID
    });
  } catch (err) {
    console.error("Error inserting product:", err);
    res.status(500).json({ error: "Database error" });
  }
});


//================================= SPECIALS ================================= 
//================================= SPECIALS ================================= 

/**
 * 🏷 POST /api/specials - Add a new special
 */
app.post("/api/specials", async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO specials (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.json({
      message: "Special added successfully",
      newSpecial: result.rows[0], // Returns full object with auto-generated ID
    });
  } catch (err) {
    console.error("Error inserting special:", err);
    res.status(500).json({ error: "Database error" });
  }
});


/**
 * 🎟 GET /api/specials - Fetch all specials
 */
app.get("/api/specials", async (req, res) => {
  try {
    const result = await pool.query(`SELECT id, description FROM specials`);
    res.json(result.rows);
  } catch (err) {
    console.error(" Error fetching specials:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 🗑 DELETE /api/specials/:id - Delete a special by ID
 */
app.delete("/api/specials/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM specials WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Special not found" });
    }

    res.json({ message: " Special deleted successfully", deletedSpecial: result.rows[0] });
  } catch (err) {
    console.error(" Error deleting special:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//================================= greenhouse================================= 
//================================= greenhouse================================= 

/**
 * 🏷 POST /api/greenhouse - Add a new greenhouse */
 app.post("/api/greenhouse", async (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: "Description is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO greenhouse (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.json({
      message: "Greenhouse added successfully",
      newGreenhouse: result.rows[0], //Returns full object with auto-generated ID
    });
  } catch (err) {
    console.error("Error inserting greenhouse:", err);
    res.status(500).json({ error: "Database error" });
  }
});


/**
 * 🎟 GET /api/greenhouse - Fetch all greenhouse
 */
app.get("/api/greenhouse", async (req, res) => {
  try {
    const result = await pool.query(`SELECT id, description FROM greenhouse`);
    res.json(result.rows);
  } catch (err) {
    console.error(" Error fetching greenhouse:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

/**
 * 🗑 DELETE /api/greenhouse/:id - Delete a greenhouse by ID
 */
app.delete("/api/greenhouse/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM greenhouse WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "greenhouse not found" });
    }

    res.json({ message: " greenhousedeleted successfully", deletedSpecial: result.rows[0] });
  } catch (err) {
    console.error(" Error deleting greenhouse", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


/**
 * 🚀 Start the Server
 */
app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
