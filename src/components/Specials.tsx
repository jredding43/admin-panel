import React, { useEffect, useState } from "react";

interface Special {
  id: number;
  description: string;
}

const Specials: React.FC = () => {
  const [specials, setSpecials] = useState<Special[]>([]);
  const [newSpecial, setNewSpecial] = useState({ description: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/specials")
      .then((res) => res.json())
      .then((data) => setSpecials(data))
      .catch((err) => console.error("Error fetching specials:", err));
  }, []);

  const handleDelete = (id: number) => {
    if (!window.confirm("Are you sure you want to delete this special?")) return;

    fetch(`http://localhost:5000/api/specials/${id}`, { method: "DELETE" })
      .then(() => setSpecials((prev) => prev.filter((special) => special.id !== id)))
      .catch((err) => console.error("Error deleting special:", err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSpecial({ description: e.target.value });
  };

  const handleAddSpecial = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!newSpecial.description.trim()) {
      alert("Description cannot be empty!");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/specials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: newSpecial.description }), // Ensure correct payload
      });
  
      const data = await response.json();
      console.log("New Special Response:", data); // Debugging
  
      if (response.ok && data.newSpecial && data.newSpecial.id) { 
        setSpecials((prev) => [...prev, data.newSpecial]); // Correctly update state with new entry
        setNewSpecial({ description: "" }); //  Clear input field
      } else {
        console.error("Error from server:", data.error);
        alert(`Error: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error adding Special:", err);
    }
  };
  

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Specials List</h2>

      {/* Specials List */}
      {specials.length > 0 ? (
        <ul className="space-y-4">
        {specials.map((special) => (
          <li key={special.id} className="bg-gray-200 p-4 rounded-md flex justify-between">
            <span>{special.description}</span>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => handleDelete(special.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>      
      ) : (
        <p className="text-gray-600">No specials available.</p>
      )}

      {/* Add New Special */}
      <hr className="my-10 border-gray-400" />
      <div className="p-8 bg-green-500 rounded">
        <h2 className="text-2xl font-bold mb-4">Add New Special</h2>
        <form onSubmit={handleAddSpecial} className="space-y-4">
          <input
            type="text"
            name="description"
            placeholder="Enter Special Description"
            value={newSpecial.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-black text-white rounded hover:bg-blue-600">
            Add Special
          </button>
        </form>
      </div>
    </div>
  );
};

export default Specials;
