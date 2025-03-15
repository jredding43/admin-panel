import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  category: string;
  name: string;
  display_name: string;
  price: number;
  description: string;
  stock_status: string;
  image_url?: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<Record<string, Product[]>>({});
  
  const [newProduct, setNewProduct] = useState({
    category: "soil",
    name: "",
    display_name: "",
    price: 0,
    description: "",
    stock_status: "in-stock",
    image_url: ""
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
  
        const data: Product[] = await res.json();
        console.log("Fetched Products:", data); // Debugging
  
        setProducts(data);
  
        // Group products by category
        const grouped: Record<string, Product[]> = data.reduce(
          (acc: Record<string, Product[]>, product) => {
            if (!acc[product.category]) acc[product.category] = [];
            acc[product.category].push(product);
            return acc;
          },
          {} as Record<string, Product[]> // Fix TypeScript error
        );
  
        setGroupedProducts(grouped);
      } catch (err) {
        console.error("Error fetching products:", err instanceof Error ? err.message : err);
      }
    };
  
    fetchProducts();
  }, []);
  
  
  

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
  
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data.message);
      
      setProducts((prev) => prev.filter((product) => product.id !== id));
      setGroupedProducts((prev) => {
        const updated = { ...prev };
        for (const category in updated) {
          updated[category] = updated[category].filter((product) => product.id !== id);
        }
        return updated;
      });
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    let value = e.target.value;

    if (e.target.name === "name") {
      value = value.replace(/\s+/g, "-"); // Convert spaces to hyphens
    }

    setNewProduct({
      ...newProduct, 
      [e.target.name]: e.target.name === "price" ? Number(e.target.value) : e.target.value,
    });
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newProduct.name.trim() || !newProduct.display_name.trim() || !newProduct.image_url.trim()) {
      alert("Name, Display Name, and Image URL cannot be empty!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await response.json();
      console.log("New Product Response:", data);

      if (response.ok && data.newProduct?.id) {
        setProducts((prev) => [...prev, data.newProduct]);
        setGroupedProducts((prev) => ({
          ...prev,
          [data.newProduct.category]: [...(prev[data.newProduct.category] || []), data.newProduct],
        }));

        setNewProduct({ category: "soil", name: "", display_name: "", price: 0, description: "", stock_status: "in-stock", image_url: "" });
      } else {
        console.error("Error from server:", data.error);
        alert(`Error: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {Object.keys(groupedProducts).map((category, index) => (
        <div key={category} className="mb-8">
            {index > 0 && <hr className="my-4 border-gray-400" />}
            
            <h3 className="text-xl font-semibold mb-2">{category.toUpperCase()}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {groupedProducts[category].map((product) => (
                <div key={product.id} className="bg-blue-500 p-4 rounded-lg shadow-md">
                  <img src={product.image_url || "/missing-image.jpg"} 
                       alt={product.display_name} 
                       className="w-full h-32 object-cover rounded" />
                
                <h3 className="font-semibold">{product.display_name}</h3>
                <p className="text-md text-gray-700">{product.description}</p>
                <p className="text-black-600 font-bold">${Number(product.price).toFixed(2)}</p>
                <p className={`text-sm ${product.stock_status === "in-stock" ? "text-green-500" : "text-red-500"}`}>
                    {product.stock_status}
                </p>

                <button 
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(product.id)}
                    >
                    delete
                </button>

                </div>
            ))}
        </div>
        </div>
      ))}

      <hr className="my-10 border-gray-400" />

      <div className="p-8 bg-green-500 rounded">
        <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <select
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          >
            <option value="">Select a Category</option>
            <option value="soil">Soil</option>
            <option value="gravel">Gravel</option>
            <option value="bark">Bark</option>
            <option value="decorative">Decorative</option>
          </select>
          
          <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="display_name" placeholder="Display Name" value={newProduct.display_name} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} required className="w-full p-2 border rounded" />
          <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} className="w-full p-2 border rounded" />
          <input type="text" name="image_url" placeholder="Image URL" value={newProduct.image_url} onChange={handleChange} required className="w-full p-2 border rounded" />

          <select name="stock_status" value={newProduct.stock_status} onChange={handleChange} required className="w-full p-2 border rounded">
            <option value="in-stock">In Stock</option>
            <option value="out-of-stock">Out of Stock</option>
            <option value="coming-soon">Coming Soon</option>
          </select>

          <button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-blue-600">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
