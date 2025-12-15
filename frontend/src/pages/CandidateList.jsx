import { useEffect, useState } from 'react';
import API from '../api/api';

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // store user info

  useEffect(() => {
    fetchUserProfile();
    fetchCandidates();
  }, []);

  // Fetch user profile to check voting status
  const fetchUserProfile = async () => {
    try {
      const res = await API.get('/user/profile');
      setUser(res.data.user);
    } catch (err) {
      console.error('Failed to load user profile', err);
    }
  };

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

  // Vote handler
  const handleVote = async (candidateId) => {
    if (!window.confirm('Are you sure you want to vote for this candidate?')) return;

    try {
      await API.post(`/candidate/vote/${candidateId}`);
      alert('Vote successful!');

      // Refresh candidates and user profile
      fetchCandidates();
      fetchUserProfile();
    } catch (err) {
      alert(err.response?.data?.message || 'Voting failed');
    }
  };

  if (loading)
    return (
      <p className="text-center text-purple-700 font-semibold mt-10">
        Loading candidates...
      </p>
    );

  if (!candidates.length)
    return (
      <p className="text-center text-gray-600 mt-10">
        No candidates found
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        Candidate List
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {candidates.map((candidate) => (
          <div
            key={candidate._id}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <p className="text-lg font-semibold"><b>Name:</b> {candidate.name}</p>
            <p className="text-purple-600 font-medium"><b>Party:</b> {candidate.party}</p>
            <p className="text-gray-700"><b>Age:</b> {candidate.age}</p>
            <p className="text-gray-700"><b>Votes:</b> {candidate.votes?.length || 0}</p>

            <button
              onClick={() => handleVote(candidate._id)}
              disabled={user?.isVoted}
              className={`mt-4 w-full py-2 rounded-lg font-semibold text-white transition
                ${user?.isVoted ? 'bg-gray-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}
              `}
            >
              {user?.isVoted ? 'Already Voted' : 'Vote'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
