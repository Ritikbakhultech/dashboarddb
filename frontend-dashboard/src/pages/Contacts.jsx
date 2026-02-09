import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/layout/DashboardLayout";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", image: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

 
  const fetchContacts = () => {
    axios
      .get("http://localhost:5000/api/contacts")
      .then((res) => {
        setContacts(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching contacts:", err);
      });
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // 🔹 Handle Image Upload (Base64)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    if (editingId) {
      // UPDATE
      axios
        .put("http://localhost:5000/api/contacts", { id: editingId, ...formData })
        .then((res) => {
          alert("Contact updated successfully!");
          resetForm();
          fetchContacts();
        })
        .catch((err) => {
          console.error("Error updating contact:", err);
          alert("Failed to update contact");
        })
        .finally(() => setLoading(false));
    } else {
      // CREATE
      axios
        .post("http://localhost:5000/api/contacts", formData)
        .then((res) => {
          alert("Contact added successfully!");
          resetForm();
          fetchContacts();
        })
        .catch((err) => {
          console.error("Error adding contact:", err);
          alert("Failed to add contact");
        })
        .finally(() => setLoading(false));
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure?")) return;
    axios
      .delete("http://localhost:5000/api/contacts", { data: { id } })
      .then(() => {
        alert("Contact deleted successfully!");
        fetchContacts();
      })
      .catch((err) => {
        console.error("Error deleting contact:", err);
        alert("Failed to delete contact");
      });
  };

  const startEdit = (contact) => {
    setEditingId(contact._id);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      message: contact.message || "",
      image: contact.image || "",
    });
  };

  const resetForm = () => {
    setFormData({ name: "", email: "", phone: "", message: "", image: "" });
    setEditingId(null);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Contacts Management</h1>

      {/* 🔹 Contact Form */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">{editingId ? "Edit Contact" : "Add New Contact"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 rounded outline-none focus:border-blue-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded outline-none focus:border-blue-500"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Phone"
              className="border p-2 rounded outline-none focus:border-blue-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <textarea
              placeholder="Message (Optional)"
              className="border p-2 rounded outline-none focus:border-blue-500 h-20"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
            
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-700">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {formData.image && (
                <img src={formData.image} alt="Preview" className="h-20 w-20 object-cover rounded mt-2 border" />
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <button 
              type="submit" 
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? "Processing..." : editingId ? "Update Contact" : "Add Contact"}
            </button>
            {editingId && (
              <button 
                type="button" 
                onClick={resetForm}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 🔹 Contact List */}
      <h2 className="text-xl font-semibold mb-4">Contact List</h2>
      {contacts.length === 0 ? (
        <p className="text-gray-500">No contacts found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div key={contact._id} className="bg-white p-5 rounded shadow hover:shadow-md transition-shadow flex flex-col">
              <div className="flex items-center space-x-4 mb-4">
                {contact.image ? (
                  <img src={contact.image} alt={contact.name} className="h-16 w-16 object-cover rounded-full border" />
                ) : (
                  <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-400 font-bold text-xl uppercase">
                    {contact.name.charAt(0)}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-lg">{contact.name}</h3>
                  <p className="text-gray-500 text-sm">{contact.email}</p>
                </div>
              </div>
              
              <div className="flex-1 space-y-1 text-sm">
                <p><span className="font-semibold">Phone:</span> {contact.phone}</p>
                {contact.message && (
                  <p><span className="font-semibold">Message:</span> {contact.message}</p>
                )}
              </div>
              
              <div className="mt-4 pt-4 border-t flex justify-end space-x-3">
                <button
                  onClick={() => startEdit(contact)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contact._id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Contacts;
