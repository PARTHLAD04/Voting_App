import { useEffect, useState } from 'react';
import API from '../api/api';
import { Plus, Edit2, Trash2, X, Loader2, UserPlus, Users, Shield } from 'lucide-react';

export default function Admin() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', party: '', age: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchCandidates();
  }, []);

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openModal = (candidate = null) => {
    if (candidate) {
      setForm({ name: candidate.name, party: candidate.party, age: candidate.age });
      setEditId(candidate._id);
    } else {
      setForm({ name: '', party: '', age: '' });
      setEditId(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setForm({ name: '', party: '', age: '' });
      setEditId(null);
    }, 300);
  };

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
      closeModal();
      fetchCandidates();
    } catch (err) {
      alert(err.response?.data?.message || 'Operation failed');
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-50 to-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-xl font-semibold text-purple-700 animate-pulse">
            Loading candidates...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 to-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-purple-800">
              Candidate Management
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Manage election candidates in the system</p>
        </div>

        {/* Stats and Action Bar */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-4 rounded-xl">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <p className="text-3xl font-bold text-purple-700">{candidates.length}</p>
                <p className="text-gray-600">Total Candidates</p>
              </div>
            </div>
            
            <button
              onClick={() => openModal()}
              className="group bg-linear-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Candidate</span>
            </button>
          </div>
        </div>

        {/* Candidate Grid */}
        {candidates.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <UserPlus className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No Candidates Yet</h3>
            <p className="text-gray-500 mb-6">Start by adding your first candidate to the system</p>
            <button
              onClick={() => openModal()}
              className="bg-linear-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300 inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add First Candidate
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {candidates.map((candidate) => (
              <div
                key={candidate._id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-purple-100"
              >
                {/* Candidate Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-linear-to-br from-purple-100 to-purple-200 p-4 rounded-xl">
                    <span className="text-2xl font-bold text-purple-700">
                      {candidate.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
                    <p className="text-purple-600 font-medium">{candidate.party}</p>
                  </div>
                </div>

                {/* Candidate Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-gray-600">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="font-medium">Age: </span>
                    <span className="text-gray-800 font-semibold">{candidate.age}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => openModal(candidate)}
                    className="flex-1 bg-linear-to-r from-blue-500 to-blue-600 text-white px-4 py-2.5 rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <Edit2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(candidate._id)}
                    className="flex-1 bg-linear-to-r from-red-500 to-red-600 text-white px-4 py-2.5 rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300 flex items-center justify-center gap-2 group"
                  >
                    <Trash2 className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {modalOpen && (
          <>
            {/* Animated Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-in fade-in duration-300"
              onClick={closeModal}
            ></div>

            {/* Animated Modal */}
            <div className="fixed inset-0 flex justify-center items-center z-50 p-4 animate-in slide-in-from-bottom-10 duration-300">
              <div 
                className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300 scale-100"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      {editId ? (
                        <Edit2 className="w-6 h-6 text-purple-600" />
                      ) : (
                        <UserPlus className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {editId ? 'Edit Candidate' : 'Add Candidate'}
                    </h3>
                  </div>
                  <button
                    onClick={closeModal}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter candidate name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Political Party
                    </label>
                    <input
                      type="text"
                      name="party"
                      placeholder="Enter party name"
                      value={form.party}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      placeholder="Enter age"
                      value={form.age}
                      onChange={handleChange}
                      required
                      min="18"
                      max="120"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-linear-to-r from-purple-600 to-purple-700 text-white px-4 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                    >
                      {editId ? 'Update Candidate' : 'Add Candidate'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}

        {/* Footer Note */}
        <div className="mt-10 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            Manage all election candidates securely. Changes take effect immediately.
          </p>
        </div>
      </div>
    </div>
  );
}