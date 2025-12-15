import { useEffect, useState } from 'react';
import API from '../api/api';

export default function Admin() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state for Add / Update
  const [form, setForm] = useState({
    name: '',
    party: '',
    age: '',
  });
  const [editId, setEditId] = useState(null); // track candidate being edited

  useEffect(() => {
    fetchCandidates();
  }, []);

  // Fetch all candidates
  const fetchCandidates = async () => {
    try {
      const res = await API.get('/candidate');
      setCandidates(res.data.candidates || []);
    } catch (err) {
      alert('Failed to load candidates');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update candidate
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await API.put(`/candidate/${editId}`, form);
        alert('Candidate updated successfully');
      } else {
        await API.post('/candidate', form);
        alert('Candidate added successfully');
      }
      setForm({ name: '', party: '', age: '' });
      setEditId(null);
      fetchCandidates();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

  // Edit candidate
  const handleEdit = (candidate) => {
    setForm({
      name: candidate.name,
      party: candidate.party,
      age: candidate.age,
    });
    setEditId(candidate._id);
  };

  // Delete candidate
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this candidate?')) return;

    try {
      await API.delete(`/candidate/${id}`);
      alert('Candidate deleted successfully');
      fetchCandidates();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    }
  };

  if (loading) return <p className="text-center mt-10 text-purple-700 font-semibold">Loading candidates...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Admin Panel - Candidate Management</h2>

      {/* Add / Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 mb-8"
      >
        <h3 className="text-xl font-semibold mb-4 text-pink-600">{editId ? 'Edit Candidate' : 'Add Candidate'}</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="text"
            name="party"
            placeholder="Party"
            value={form.party}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            required
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
          >
            {editId ? 'Update' : 'Add'}
          </button>
          {editId && (
            <button
              type="button"
              onClick={() => {
                setForm({ name: '', party: '', age: '' });
                setEditId(null);
              }}
              className="bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold hover:bg-gray-500 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Candidate List */}
      <h3 className="text-2xl font-semibold text-purple-700 mb-4">Candidate List</h3>
      {candidates.length === 0 ? (
        <p className="text-gray-600">No candidates found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <p><b>Name:</b> {candidate.name}</p>
              <p><b>Party:</b> {candidate.party}</p>
              <p><b>Age:</b> {candidate.age}</p>
              <div className="mt-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(candidate)}
                  className="bg-blue-500 text-white px-3 py-1 rounded-lg font-medium hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(candidate._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-lg font-medium hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
