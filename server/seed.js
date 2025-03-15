const { Pool } = require("pg");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// PostgreSQL Connection
const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  port: process.env.PG_PORT,
});

// Sample Products Data
const items = {
  soil: [
      { name: "Soil-Conditioner", displayName: "Soil Conditioner", price: 65.00, description: "Aged bark fines + Manure", stockStatus: "in-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FSoil-Conditioner.jpg?alt=media&token=6be4f84b-ab78-4d94-932e-8cac1f25fa41" },
      { name: "Topsoil-3way-Mix", displayName: "Topsoil 3way Mix", price: 40.00, description: "60% Topsoil - 20% Soil Conditioner - 20% Sand", stockStatus: "in-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FTopsoil-3way-Mix.jpg?alt=media&token=54330b75-da14-4fd6-89d4-3d4e569fd8b2" },
      { name: "Garden-3way-Mix", displayName: "Garden 3way Mix", price: 30.00, description: "70% Topsoil - 10% Soil Conditioner - 20% Sand", stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FGarden-3way-Mix.jpg?alt=media&token=ffbe0731-5511-4434-89bf-8e6dbb34c936" }
  ],
  gravel: [
      { name: "Fill-Dirt", displayName: "Fill Dirt", price: 15.00, stockStatus: "in-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FFill-Dirt.jpg?alt=media&token=67870745-fb67-4ae0-96c0-dd96cc40671a"  },
      { name: "5-8-Minus-Crushed", displayName: "5/8 Minus Crushed", price: 32.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2F5-8-Minus-Crushed.jpg?alt=media&token=22b6945d-f1d5-404d-b89a-3f992b1fdc97" },
      { name: "1-1-4-Minus-Crushed", displayName: "1-1/4 Minus Crushed", price: 32.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2F1-1-4-Minus-Crushed.jpg?alt=media&token=1f734c12-b5b9-47ef-8f0a-cddf97efd472" },
      { name: "Pea-gravel-updated", displayName: "Pea Gravel 3/8", price: 35.00, stockStatus: "in-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2F1-1-4-Minus-Crushed.jpg?alt=media&token=1f734c12-b5b9-47ef-8f0a-cddf97efd472"  },
      { name: "CV-Screened-Rock-1-2-1", displayName: "CV Screened Rock 1/2 - 1", price: 35.00, stockStatus: "in-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FCV-Screened-Rock-1-2-1.jpg?alt=media&token=e98a856b-665c-473d-af2f-b473a624eb81"  },
      { name: "CV-Drain-Rock-2", displayName: "CV Drain Rock 2", price: 35.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FCV-Drain-Rock-2.jpg?alt=media&token=ea9e2b8c-8e16-4e2c-bf81-20b1005f4191" },
      { name: "DW-Screened-Rock-1-2-1", displayName: "DW Screened Rock 1/2 -1", price: 30.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FDW%20Screened%20Rock%201-2%20-%201.jpg?alt=media&token=bf0751f3-5d28-448a-9303-494f1c331838" },
      { name: "DW-Screened-Rock-1-1-2-3", displayName: "DW Screened Rock 1 - 1-1/2", price: 30.00, stockStatus: "in-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FDW-Screened-Rock-1-1-2-3.jpg?alt=media&token=b3eeda0a-46b4-4a56-980e-250f561fcf62"  },
      { name: "Sand", displayName: "Sand", price: 20.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FSand.jpg?alt=media&token=cec97682-484b-424e-b438-145cf9f6bcb9"},
      { name: "missing-image", displayName: "C33 Sand", price: 30.00, stockStatus: "coming-soon" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2Fmissing-image.jpg?alt=media&token=a6eadc68-8b6c-4ab2-83f4-0bd9c97a46aa" }
  ],
  bark: [
      { name: "Wood-Chips", displayName: "Wood Chips", price: 25.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FWood-Chips.jpg?alt=media&token=d81a8d1b-178f-4539-86b3-7d429476a405" },
      { name: "Small-Bark", displayName: "Small Bark", price: 35.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FSmall-Bark.jpg?alt=media&token=f1eb565c-0946-412f-8741-055059c3b8bb" },
      { name: "Medium-Bark", displayName: "Medium Bark", price: 25.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FMedium-Bark.jpg?alt=media&token=7681d0d3-7d0d-4103-aec8-1e5af27a87b9" },
      { name: "Large-Bark", displayName: "Large Bark", price: 35.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FLarge-Bark.jpg?alt=media&token=77dafef5-4cea-4465-8f4b-7b7c832ec478" }
  ],
  decorative: [
      { name: "Gray-Chip", displayName: "Gray Chip 3/4 - 1/2", price: 40.00, stockStatus: "in-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FGray-Chip.jpg?alt=media&token=b2c8b5d1-dbdc-41cf-86af-bdc7206b434a"  },
      { name: "Huckleberry-Greenstone-1-1-1-2", displayName: "Huckleberry Greenstone 1 - 1-1/2 ", price: 55.00, stockStatus: "out-of-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FHuckleberry-Greenstone-1-1-1-2.jpg?alt=media&token=11d91148-7ea3-41c6-8c56-70f6492ec39b"  },
      { name: "Huckleberry-Greenstone-1-2-1", displayName: "Huckleberry Greenstone 1/2 - 1 ", price: 60.00, stockStatus: "out-of-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FHuckleberry-Greenstone-1-2-1.jpg?alt=media&token=41739146-c913-40f5-b6b9-751ffb090d7a"  },
      { name: "Grey-Dolomite", displayName: "Gray Dolomite 2 Minus", price: 60.00, stockStatus: "in-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FGrey-Dolomite.jpg?alt=media&token=853119f3-8f97-4ba2-8759-1b28619f8e09"  },
      { name: "White-Large", displayName: "White Large 1 - 1-1/2 ", price: 75.00, stockStatus: "out-of-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FWhite-Large.jpg?alt=media&token=9b5dd388-238a-4da7-8673-39154553059e"  },
      { name: "White-Medium", displayName: "White Medium 1/2 - 1", price: 80.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FWhite-Medium.jpg?alt=media&token=154ad342-fab6-41cd-82b3-b23c900bb0d8" },
      { name: "White-Small", displayName: "White Small", price: 80.00, stockStatus: "in-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FWhite-Small.jpg?alt=media&token=70c14708-f912-4610-8892-14c98ad26ade"  },
      { name: "Basalt-1-1-2", displayName: "Basalt 1-1/2", price: 60.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FBasalt-1-1-2.jpg?alt=media&token=ada1853e-def0-450a-8382-2b63bf78afed" },
      { name: "Lava-Rock", displayName: "Lava Rock", price: 90.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FLava-Rock.jpg?alt=media&token=975420fd-a86b-441f-873e-32c38563be9f" },
      { name: "Eagle-Gray-Large", displayName: "Eagle Grey Large 1", price: 96.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FEagle-Gray-Large.jpg?alt=media&token=16c35153-30ee-4c34-ba31-c30a78097b48" },
      { name: "Montana-Rainbow-Chip", displayName: "Montana Rainbow Chip", price: 95.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FMontana-Rainbow-Chip.jpg?alt=media&token=5f9f12d5-95f6-44b0-a579-0eca45a7f210" },
      { name: "Montana-Rainbow-Pebble-3-4", displayName: "Montana Rainbow Pebble 3/4", price: 96.00, stockStatus: "low-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FMontana-Rainbow-Pebble-1-1-2.jpg?alt=media&token=ed802834-987e-452f-837f-ab2e34cb4bf5" },
      { name: "Montana-Rainbow-Pebble-1-1-2", displayName: "Montana Rainbow Pebble 1-1/2", price: 120.00, stockStatus: "in-stock" , image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2FMontana-Rainbow-Pebble-1-1-2.jpg?alt=media&token=ed802834-987e-452f-837f-ab2e34cb4bf5" },
      { name: "missing-image", displayName: "Montana Rainbow Pea Gravel - Sold by 5 gal Bucket Only", price: 4.00, stockStatus: "out-of-stock", image_url:"https://firebasestorage.googleapis.com/v0/b/admin-panel-f40ce.appspot.com/o/products%2Fmissing-image.jpg?alt=media&token=a6eadc68-8b6c-4ab2-83f4-0bd9c97a46aa"  }
  ]
};

// Specials Data
const specialsList = [
  "OPENING APRIL 2nd",
  "Check back for our latest specials!",
  "Greenhouse coming soon!",
  "Custom soil blends for your garden!",
  "Need storage? Check out our Affiliates page!",
  "Need excavation or machine work? Check out our Affiliates page!",
  "New inventory, come see!"
];

// Insert Products into PostgreSQL
const seedProducts = async () => {
  try {
    console.log(" Seeding Products...");
    
    for (const category in items) {  // Loop through categories
      for (const product of items[category]) {  // Loop through products in each category
        await pool.query(
          `INSERT INTO products (category, name, display_name, price, description, stock_status, image_url)
           VALUES ($1, $2, $3, $4, $5, $6, $7)
           ON CONFLICT (id) DO NOTHING`,
           [
             category, 
             product.name,
             product.displayName, 
             product.price,
             product.description || "",  
             product.stockStatus || "in-stock", 
             product.image_url || "/missing-image.jpg"
           ]
        );
      }
    }
    
    console.log("  Products seeded successfully!");
  } catch (err) {
    console.error("  Error seeding products:", err);
  }
};


// Insert Specials into PostgreSQL
const seedSpecials = async () => {
  try {
    console.log(" Seeding Specials...");
    for (const description of specialsList) {
      await pool.query(
        `INSERT INTO specials (description) VALUES ($1) ON CONFLICT DO NOTHING`,
        [description]
      );
    }
    console.log(" Specials seeded successfully!");
  } catch (err) {
    console.error(" Error seeding specials:", err);
  }
};

// Run Both Seeding Functions
const seedDatabase = async () => {
  await seedProducts();
  await seedSpecials();
  pool.end();
};

seedDatabase();
