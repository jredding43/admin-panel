const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json()); // Parse JSON body

//  Define allowed IPs (Only these IPs can access the admin panel)
const ALLOWED_IPS = [
  "47.25.183.241",
 
];

//  Middleware to check IP
const checkIP = (req, res, next) => {
  const clientIP =
    req.headers["x-forwarded-for"] || req.socket.remoteAddress; // Get IP

  console.log("Client IP:", clientIP); // Debugging

  if (ALLOWED_IPS.includes(clientIP)) {
    return next(); // Allowed
  } else {
    return res.status(403).json({ error: "Unauthorized Access" }); //  Blocked
  }
};

// Apply `checkIP` to protect admin routes
app.use("/api/admin", checkIP); // Only `/api/admin` routes require authentication

// Example Protected Route
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, category, name, display_name, price, description, stock_status, image_url FROM products"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ error: "Server error" });
  }
});


//  Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
