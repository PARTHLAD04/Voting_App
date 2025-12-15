import { useEffect, useState } from 'react';
import API from '../api/api';
import { 
  Users, 
  Vote, 
  CheckCircle2, 
  UserCircle2, 
  Loader2,
  Award,
  TrendingUp,
  Shield,
  AlertCircle
} from 'lucide-react';

export default function CandidateList() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [votingInProgress, setVotingInProgress] = useState(null);

  useEffect(() => {
    fetchUserProfile();
    fetchCandidates();
  }, []);

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

  const handleVote = async (candidateId, candidateName) => {
    if (!window.confirm(`Are you sure you want to vote for ${candidateName}?\nThis action cannot be undone.`)) return;

    setVotingInProgress(candidateId);
    try {
      await API.post(`/candidate/vote/${candidateId}`);
      
      // Show success message
      alert(`✅ Vote for ${candidateName} submitted successfully!`);
      
      // Refresh data
      fetchCandidates();
      fetchUserProfile();
    } catch (err) {
      alert(err.response?.data?.message || 'Voting failed. Please try again.');
    } finally {
      setVotingInProgress(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-purple-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="mt-6 text-lg font-semibold text-purple-700 animate-pulse">
          Loading candidates...
        </p>
        <p className="mt-2 text-sm text-gray-500">Please wait while we fetch the latest data</p>
      </div>
    );
  }

  if (!candidates.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <Users className="w-24 h-24 text-gray-300 mb-6" />
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Candidates Available</h3>
        <p className="text-gray-500 max-w-md">
          There are currently no candidates registered for the election.
          Please check back later or contact the administrator.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header Section */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="bg-linear-to-r from-purple-50 to-purple-100 p-3 rounded-xl">
            <Award className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-purple-800">
            Election Candidates
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Cast your vote for the future leadership</p>
      </div>

      {/* User Voting Status Banner */}
      {user && (
        <div className={`mb-8 p-4 rounded-xl border ${
          user?.isVoted 
            ? 'bg-green-50 border-green-200' 
            : 'bg-blue-50 border-blue-200'
        }`}>
          <div className="flex items-center gap-3">
            {user?.isVoted ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-semibold text-green-700">Thank you for voting!</p>
                  <p className="text-sm text-green-600">Your vote has been recorded successfully.</p>
                </div>
              </>
            ) : (
              <>
                <AlertCircle className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-semibold text-blue-700">Your vote is important!</p>
                  <p className="text-sm text-blue-600">Please review the candidates and cast your vote below.</p>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Candidates</p>
              <p className="text-2xl font-bold text-purple-700">{candidates.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Votes Cast</p>
              <p className="text-2xl font-bold text-purple-700">
                {candidates.reduce((total, candidate) => total + (candidate.votes?.length || 0), 0)}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Voting Status</p>
              <p className="text-xl font-bold text-purple-700">
                {user?.isVoted ? 'Voted' : 'Pending'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Candidates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((candidate) => {
          const voteCount = candidate.votes?.length || 0;
          const isLeading = voteCount === Math.max(...candidates.map(c => c.votes?.length || 0)) && voteCount > 0;
          
          return (
            <div
              key={candidate._id}
              className="group bg-white rounded-2xl border border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Candidate Header */}
              <div className="relative p-6 pb-4">
                {isLeading && (
                  <div className="absolute top-4 right-4 bg-linear-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Leading
                  </div>
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-16 h-16 bg-linear-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                      <UserCircle2 className="w-8 h-8 text-purple-600" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-purple-600 text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center">
                      {candidate.age}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-800 truncate">{candidate.name}</h3>
                    <p className="text-purple-600 font-semibold truncate">{candidate.party}</p>
                  </div>
                </div>

                {/* Vote Count */}
                <div className="bg-purple-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Vote className="w-5 h-5 text-purple-600" />
                      <span className="font-semibold text-gray-700">Votes</span>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-700">{voteCount}</p>
                      <p className="text-xs text-gray-500">Total Votes</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  {candidates.length > 0 && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{Math.round((voteCount / Math.max(1, candidates.reduce((t, c) => t + (c.votes?.length || 0), 0))) * 100)}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-linear-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-700"
                          style={{ 
                            width: `${(voteCount / Math.max(1, candidates.reduce((t, c) => t + (c.votes?.length || 0), 0))) * 100}%` 
                          }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  onClick={() => handleVote(candidate._id, candidate.name)}
                  disabled={user?.isVoted || votingInProgress === candidate._id}
                  className={`w-full py-3.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2
                    ${user?.isVoted 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-linear-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                    }
                  `}
                >
                  {votingInProgress === candidate._id ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : user?.isVoted ? (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Already Voted
                    </>
                  ) : (
                    <>
                      <Vote className="w-5 h-5" />
                      Vote for {candidate.name.split(' ')[0]}
                    </>
                  )}
                </button>
                
                {!user?.isVoted && (
                  <p className="text-xs text-gray-500 text-center mt-3">
                    Your vote is confidential and secure
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="mt-10 pt-6 border-t border-gray-200 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-500">
          <Shield className="w-4 h-4" />
          <p className="text-sm">
            Secure voting system • All votes are encrypted and anonymous
          </p>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          {user?.isVoted 
            ? 'Thank you for participating in the democratic process!'
            : 'Remember: You can only vote once. Choose wisely.'
          }
        </p>
      </div>
    </div>
  );
}