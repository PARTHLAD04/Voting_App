import { useEffect, useState } from 'react';
import API from '../api/api';

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const res = await API.get('/candidate/vote/count');

      // Convert voteCount array to length
      const voteData = res.data.voteCounts.map((item) => ({
        party: item.party,
        votes: item.voteCount.length
      }));

      setResults(voteData);
    } catch (err) {
      alert('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <p className="text-center text-purple-700 font-semibold mt-10">
        Loading results...
      </p>
    );

  if (!results.length)
    return (
      <p className="text-center text-gray-600 mt-10">
        No votes yet
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6 text-center">
        Voting Results
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {results.map((partyResult, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
          >
            <p className="text-xl font-semibold text-purple-600">
              Party: {partyResult.party}
            </p>
            <p className="text-gray-700 text-lg mt-2">
              Total Votes: {partyResult.votes}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
