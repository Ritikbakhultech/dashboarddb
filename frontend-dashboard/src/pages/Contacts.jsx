import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../components/layout/DashboardLayout";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });

  // 🔹 Fetch Contacts Function
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

  // 🔹 Handle Form Submit (POST)
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/api/contacts", formData)
      .then((res) => {
        alert("Contact added successfully!");
        setFormData({ name: "", email: "", phone: "" }); // Form clear
        fetchContacts(); // List update
      })
      .catch((err) => {
        console.error("Error adding contact:", err);
        alert("Failed to add contact");
      });
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Contacts Management</h1>

      {/* 🔹 Add Contact Form */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-lg font-semibold mb-4">Add New Contact</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Add Contact
          </button>
        </form>
      </div>

      {/* 🔹 Contact List */}
      <h2 className="text-xl font-semibold mb-4">Contact List</h2>
      {contacts.length === 0 ? (
        <p className="text-gray-500">No contacts found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contacts.map((contact) => (
            <div key={contact.id} className="bg-white p-5 rounded shadow hover:shadow-md transition-shadow">
              <p className="mb-1"><span className="font-bold text-gray-600">Name:</span> {contact.name}</p>
              <p className="mb-1"><span className="font-bold text-gray-600">Email:</span> {contact.email}</p>
              <p className="mb-1"><span className="font-bold text-gray-600">Phone:</span> {contact.phone}</p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default Contacts;
