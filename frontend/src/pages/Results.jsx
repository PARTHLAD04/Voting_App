import { useEffect, useState } from 'react';
import API from '../api/api';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Trophy,
  Loader2,
  Award,
  Vote,
  Calendar,
  Users,
  ChevronUp,
  ChevronDown,
  Target,
  Shield
} from 'lucide-react';

export default function Results() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState('');
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    fetchResults();
    setLastUpdated(new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    }));
  }, []);

  const fetchResults = async () => {
    try {
      const res = await API.get('/candidate/vote/count');

      // Convert voteCount array to length
      const voteData = res.data.voteCounts.map((item) => ({
        party: item.party,
        votes: item.voteCount.length
      })).sort((a, b) => b.votes - a.votes); // Sort by votes descending

      setResults(voteData);
      setTotalVotes(voteData.reduce((sum, item) => sum + item.votes, 0));
    } catch (err) {
      alert('Failed to load results');
    } finally {
      setLoading(false);
    }
  };

  const getWinner = () => {
    if (results.length === 0) return null;
    const maxVotes = Math.max(...results.map(r => r.votes));
    const winners = results.filter(r => r.votes === maxVotes);
    return winners.length === 1 ? winners[0] : null;
  };

  const getPercentage = (votes) => {
    return totalVotes > 0 ? ((votes / totalVotes) * 100).toFixed(1) : 0;
  };

  const winner = getWinner();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <div className="w-20 h-20 border-4 border-purple-100 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="text-xl font-semibold text-purple-700 animate-pulse">
          Loading election results...
        </p>
        <p className="text-gray-500 mt-2">Crunching the numbers</p>
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
        <BarChart3 className="w-24 h-24 text-gray-300 mb-6" />
        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Votes Yet</h3>
        <p className="text-gray-500 max-w-md mb-6">
          Voting hasn't started yet or no votes have been cast.
          Results will appear here once voting begins.
        </p>
        <button
          onClick={fetchResults}
          className="bg-linear-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center gap-2"
        >
          <BarChart3 className="w-5 h-5" />
          Refresh Results
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="bg-linear-to-r from-purple-50 to-purple-100 p-3 rounded-xl">
            <Trophy className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-linear-to-r from-purple-600 to-purple-800">
            Live Election Results
          </h1>
        </div>
        <p className="text-gray-600 text-lg">Real-time voting data and analysis</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Target className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Parties</p>
              <p className="text-2xl font-bold text-purple-700">{results.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Vote className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Votes</p>
              <p className="text-2xl font-bold text-purple-700">{totalVotes}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Leading Party</p>
              <p className="text-xl font-bold text-purple-700 truncate">
                {winner?.party || 'Tie'}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-xl border border-purple-100 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-xl font-bold text-purple-700">{lastUpdated}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Winner Banner */}
      {winner && (
        <div className="mb-8 bg-linear-to-r from-yellow-50 to-yellow-100 border border-yellow-200 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-linear-to-r from-yellow-500 to-yellow-600 p-3 rounded-xl">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold text-yellow-700 uppercase tracking-wide">Current Leader</p>
                <h3 className="text-2xl font-bold text-gray-800">{winner.party}</h3>
                <p className="text-yellow-600 font-semibold">
                  {winner.votes} votes • {getPercentage(winner.votes)}% of total
                </p>
              </div>
            </div>
            <div className="bg-white/80 rounded-xl px-4 py-2">
              <span className="text-sm text-gray-600">Leading by </span>
                  <span className="font-bold text-yellow-700">
                {Math.max(0, ...results.filter(r => r.party !== winner.party).map(r => 
                  winner.votes - r.votes
                ))}
              </span>
              <span className="text-sm text-gray-600"> votes</span>
            </div>
          </div>
        </div>
      )}

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Results List */}
        <div className="bg-white rounded-2xl border border-purple-100 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-purple-600" />
              Party Results
            </h2>
            <button
              onClick={fetchResults}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
            >
              <Loader2 className="w-4 h-4" />
              Refresh
            </button>
          </div>

          <div className="space-y-4">
            {results.map((partyResult, idx) => {
              const percentage = getPercentage(partyResult.votes);
              const isLeading = partyResult.party === winner?.party;
              
              return (
                <div
                  key={idx}
                  className={`group p-4 rounded-xl border hover:shadow-md transition-all duration-300 ${
                    isLeading 
                      ? 'border-purple-300 bg-purple-50' 
                      : 'border-gray-200 hover:border-purple-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isLeading 
                          ? 'bg-linear-to-r from-purple-600 to-purple-700 text-white' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <span className="font-bold">{idx + 1}</span>
                      </div>
                      <div>
                        <h3 className={`font-bold text-lg ${
                          isLeading ? 'text-purple-700' : 'text-gray-800'
                        }`}>
                          {partyResult.party}
                        </h3>
                        {isLeading && (
                          <span className="text-xs bg-linear-to-r from-purple-600 to-purple-700 text-white px-2 py-0.5 rounded-full">
                            LEADING
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">{partyResult.votes}</p>
                      <p className="text-sm text-gray-500">votes</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{percentage}% of total votes</span>
                      <span>{partyResult.votes} votes</span>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          isLeading 
                            ? 'bg-linear-to-r from-purple-500 to-purple-600' 
                            : 'bg-linear-to-r from-purple-400 to-purple-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Visual Analytics */}
        <div className="bg-white rounded-2xl border border-purple-100 shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
            <PieChart className="w-5 h-5 text-purple-600" />
            Vote Distribution
          </h2>

          {/* Pie Chart Visualization */}
          <div className="relative h-64 mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-3xl font-bold text-purple-700">{totalVotes}</p>
                <p className="text-sm text-gray-500">Total Votes</p>
              </div>
            </div>
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {(() => {
                let cumulativePercentage = 0;
                const colors = [
                  '#8B5CF6', // purple-500
                  '#7C3AED', // purple-600
                  '#6D28D9', // purple-700
                  '#5B21B6', // purple-800
                  '#4C1D95', // purple-900
                  '#7E22CE', // purple-700 alternative
                ];
                
                return results.map((partyResult, idx) => {
                  const percentage = getPercentage(partyResult.votes);
                  const circumference = 2 * Math.PI * 40;
                  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                  const offset = cumulativePercentage * circumference / 100;
                  cumulativePercentage += parseFloat(percentage);
                  
                  return (
                    <circle
                      key={idx}
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={colors[idx % colors.length]}
                      strokeWidth="20"
                      strokeDasharray={strokeDasharray}
                      strokeDashoffset={-offset}
                      className="transition-all duration-1000"
                    />
                  );
                });
              })()}
            </svg>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-700">Breakdown by Party</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {results.map((partyResult, idx) => {
                const percentage = getPercentage(partyResult.votes);
                const colors = [
                  'bg-purple-500',
                  'bg-purple-600',
                  'bg-purple-700',
                  'bg-purple-800',
                  'bg-purple-900',
                  'bg-purple-700',
                ];
                
                return (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`}></div>
                      <span className="font-medium text-gray-700 truncate">{partyResult.party}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{percentage}%</span>
                      <span className="text-sm text-gray-500">({partyResult.votes})</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Shield className="w-4 h-4" />
            <p className="text-sm">Official election results • Updates every 30 seconds</p>
          </div>
          <div className="text-sm text-gray-500">
            <span className="font-medium">Data Source:</span> Secure Voting System
          </div>
        </div>
      </div>
    </div>
  );
}