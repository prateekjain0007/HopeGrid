import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function ResourcePage() {
  const [resources, setResources] = useState([]);
  const [filteredResources, setFilteredResources] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');
  const [editingResourceId, setEditingResourceId] = useState(null);
  const [editingData, setEditingData] = useState({});

  const [formData, setFormData] = useState({
    type: '',
    location: '',
    description: '',
    details: {
      contact: '',
      quantity: ''
    }
  });

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    handleFilter();
  }, [resources, searchTerm, sortOrder]);

  const fetchResources = async () => {
    try {
      const res = await fetch(`${API_URL}/resources`);
      const data = await res.json();
      setResources(data);
    } catch (error) {
      console.error('Error fetching resources:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity' || name === 'contact') {
      setFormData((prev) => ({
        ...prev,
        details: { ...prev.details, [name]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { type, location, description, details } = formData;
    const { contact, quantity } = details;

    if (!type || !location || !contact || !quantity) {
      toast.error('Please fill in all required fields');
      return;
    }

    const payload = {
      type,
      quantity: parseInt(quantity),
      contact,
      description,
      location
    };

    try {
      const res = await fetch(`${API_URL}/resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Failed to submit resource');

      await fetchResources();
      setFormData({
        type: '',
        location: '',
        description: '',
        details: { contact: '', quantity: '' }
      });

      toast.success('✅ Resource submitted successfully!');
    } catch (error) {
      console.error('❌ Failed to submit resource:', error.message);
      toast.error('❌ Submission failed. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${API_URL}/resources/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) throw new Error('Failed to delete');

      const updated = resources.filter((r) => r._id !== id);
      setResources(updated);
      setFilteredResources(updated);
      toast.success('🗑️ Resource deleted');
    } catch (err) {
      console.error('❌ Delete failed:', err.message);
      toast.error('❌ Failed to delete resource');
    }
  };

  const handleEdit = (res) => {
    setEditingResourceId(res._id);
    setEditingData({
      type: res.type,
      location: res.location,
      quantity: res.quantity,
      contact: res.contact,
      description: res.description || ''
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    try {
      const payload = {
        type: editingData.type,
        location: editingData.location,
        quantity: parseInt(editingData.quantity),
        contact: editingData.contact,
        description: editingData.description
      };

      const res = await fetch(`${API_URL}/resources/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Update failed');

      toast.success('✅ Resource updated');
      setEditingResourceId(null);
      fetchResources();
    } catch (err) {
      toast.error('❌ Failed to update resource');
    }
  };

  const handleFilter = () => {
    let filtered = resources.filter((resource) =>
      resource.location.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === 'latest') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === 'quantity') {
      filtered.sort((a, b) => b.quantity - a.quantity);
    }

    setFilteredResources(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Submit a Resource</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 shadow-lg rounded-xl">
        <input type="text" name="type" placeholder="Resource Type" value={formData.type} onChange={handleInputChange} className="w-full p-2 border rounded" />
        <input type="text" name="quantity" placeholder="Quantity" value={formData.details.quantity} onChange={handleInputChange} className="w-full p-2 border rounded" />
        <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} className="w-full p-2 border rounded" />
        <input type="text" name="contact" placeholder="Contact Info" value={formData.details.contact} onChange={handleInputChange} className="w-full p-2 border rounded" />
        <textarea name="description" placeholder="Description (optional)" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Submit Resource</button>
      </form>

      <div className="mt-10">
        <div className="flex justify-between mb-4">
          <input type="text" placeholder="Search by location" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="p-2 border rounded w-1/2" />
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="p-2 border rounded">
            <option value="latest">Latest</option>
            <option value="quantity">Sort by Quantity</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => (
            <div key={res._id} className="p-5 bg-white shadow-md border-l-4 border-blue-400 rounded-lg">
              {editingResourceId === res._id ? (
                <>
                  <input name="type" value={editingData.type} onChange={handleEditChange} className="w-full mb-2 p-2 border rounded" />
                  <input name="quantity" value={editingData.quantity} onChange={handleEditChange} className="w-full mb-2 p-2 border rounded" />
                  <input name="location" value={editingData.location} onChange={handleEditChange} className="w-full mb-2 p-2 border rounded" />
                  <input name="contact" value={editingData.contact} onChange={handleEditChange} className="w-full mb-2 p-2 border rounded" />
                  <textarea name="description" value={editingData.description} onChange={handleEditChange} className="w-full mb-2 p-2 border rounded" />
                  <button onClick={() => handleUpdate(res._id)} className="bg-green-500 text-white px-3 py-1 rounded mr-2">Save</button>
                  <button onClick={() => setEditingResourceId(null)} className="bg-gray-400 text-white px-3 py-1 rounded">Cancel</button>
                </>
              ) : (
                <>
                  <h2 className="text-lg font-semibold text-blue-700">{res.type}</h2>
                  <p><strong>Quantity:</strong> {res.quantity}</p>
                  <p><strong>Location:</strong> {res.location}</p>
                  <p><strong>Contact:</strong> {res.contact}</p>
                  {res.description && <p><strong>Description:</strong> {res.description}</p>}
                  <p className="text-sm text-gray-500">Posted on: {res.createdAt ? new Date(res.createdAt).toLocaleString() : 'N/A'}</p>
                  <div className="flex gap-2 mt-2">
                    <button onClick={() => handleEdit(res)} className="text-blue-600 hover:underline text-sm">✏️ Edit</button>
                    <button onClick={() => handleDelete(res._id)} className="text-red-600 hover:underline text-sm">🗑️ Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



