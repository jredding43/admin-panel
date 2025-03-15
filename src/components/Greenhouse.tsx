import React, { useEffect, useState, useCallback } from "react";

interface Greenhouse {
  id: number;
  description: string;
}

const Greenhouse: React.FC = () => {
  const [greenhouse, setGreenhouse] = useState<Greenhouse[]>([]);
  const [newGreenhouse, setNewGreenhouse] = useState({ description: "" });

  /** Fetch greenhouse data on component mount */
  const fetchGreenhouseData = useCallback(() => {
    fetch("http://localhost:5000/api/greenhouse")
      .then((res) => res.json())
      .then((data) => setGreenhouse(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error fetching greenhouse:", err));
  }, []);

  useEffect(() => {
    fetchGreenhouseData();
  }, [fetchGreenhouseData]);

  /** Handle deleting a greenhouse entry */
  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this Greenhouse?")) return;

    fetch(`http://localhost:5000/api/greenhouse/${id}`, { method: "DELETE" })
      .then(() => setGreenhouse((prev) => prev.filter((item) => item.id !== id)))
      .catch((err) => console.error("Error deleting Greenhouse:", err));
  };

  /** Handle input change */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewGreenhouse({ description: e.target.value });
  };

  /** Handle adding a new greenhouse entry */
  const handleAddGreenhouse = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!newGreenhouse.description.trim()) {
      alert("Description cannot be empty!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/greenhouse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newGreenhouse.description }), // Ensure correct payload
      });
  
      const data = await response.json();
      console.log("New Greenhouse Response:", data); // Debugging
  
      if (response.ok && data.newGreenhouse && data.newGreenhouse.id) { 
        setGreenhouse((prev) => [...prev, data.newGreenhouse]); // Correctly update state with new entry
        setNewGreenhouse({ description: "" }); // Clear input field
      } else {
        console.error("Error from server:", data.error);
        alert(`Error: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error adding Greenhouse:", err);
    }
  };
  


  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Greenhouse List</h2>

      {/* Greenhouse List */}
      {greenhouse.length > 0 ? (
        <ul className="space-y-4">
        {greenhouse.map((item) =>
          item && item.id ? ( // ✅ Ensure item exists before rendering
            <li key={item.id} className="bg-gray-200 p-4 rounded-md flex justify-between">
              <span>{item.description}</span>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>
            </li>
          ) : null
        )}
      </ul>
      ) : (
        <p className="text-gray-600">No greenhouse available.</p>
      )}

      {/* Add New Greenhouse */}
      <hr className="my-10 border-gray-400" />
      <div className="p-8 bg-green-500 rounded">
        <h2 className="text-2xl font-bold mb-4">Add New Greenhouse</h2>
        <form onSubmit={handleAddGreenhouse} className="space-y-4">
          <input
            type="text"
            name="description"
            placeholder="Enter Greenhouse Description"
            value={newGreenhouse.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-blue-600">
            Add Greenhouse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Greenhouse;
