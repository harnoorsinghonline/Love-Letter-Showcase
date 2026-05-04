import { useEffect, useState } from "react";
import { useSearch } from "wouter";

interface AnalyticsEvent {
  type: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
  receivedAt: string;
}

interface AnalyticsSummary {
  totalPageViews: number;
  totalEvents: number;
  referrerBreakdown: Record<string, number>;
  pageViewTimes: string[];
}

export default function Analytics() {
  const search = useSearch();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(false);

  // Check if already authenticated via URL param
  useEffect(() => {
    const params = new URLSearchParams(search);
    if (params.get("auth") === "verified") {
      setIsAuthenticated(true);
      fetchAnalyticsData();
    }
  }, [search]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "helloworld") {
      setIsAuthenticated(true);
      setError("");
      window.history.replaceState({}, "", "?auth=verified");
      fetchAnalyticsData();
    } else {
      setError("Invalid password");
      setPassword("");
    }
  };

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const [eventsRes, summaryRes] = await Promise.all([
        fetch("/api/analytics"),
        fetch("/api/analytics/summary"),
      ]);

      if (eventsRes.ok) {
        const data = await eventsRes.json();
        setEvents(data.events || []);
      }

      if (summaryRes.ok) {
        const data = await summaryRes.json();
        setSummary(data);
      }
    } catch (err) {
      console.error("Failed to fetch analytics:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "linear-gradient(180deg, #0d0308 0%, #130510 15%, #1a0614 30%, #120408 50%, #150610 70%, #0d0308 100%)",
        }}
      >
        <div className="w-full max-w-md mx-auto px-6">
          <div
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-8"
          >
            <h1 className="text-2xl font-bold text-white mb-2 text-center">
              Analytics
            </h1>
            <p className="text-white/60 text-center mb-6">Enter password to access</p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-rose-500/50"
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold rounded-lg transition-all"
              >
                Access Analytics
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #0d0308 0%, #130510 15%, #1a0614 30%, #120408 50%, #150610 70%, #0d0308 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-white/60 mb-8">Visitor tracking and engagement metrics</p>

        {loading && (
          <div className="text-center text-white/60">Loading analytics...</div>
        )}

        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <div
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <p className="text-white/60 text-sm mb-2">Total Page Views</p>
              <p className="text-4xl font-bold text-white">
                {summary.totalPageViews}
              </p>
            </div>
            <div
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <p className="text-white/60 text-sm mb-2">Total Events</p>
              <p className="text-4xl font-bold text-white">
                {summary.totalEvents}
              </p>
            </div>
            <div
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <p className="text-white/60 text-sm mb-2">Unique Referrers</p>
              <p className="text-4xl font-bold text-white">
                {Object.keys(summary.referrerBreakdown).length}
              </p>
            </div>
          </div>
        )}

        {summary && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Referrer Breakdown</h2>
            <div
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6"
            >
              <div className="space-y-3">
                {Object.entries(summary.referrerBreakdown).map(([referrer, count]) => (
                  <div key={referrer} className="flex items-center justify-between">
                    <span className="text-white/80">{referrer || "Direct"}</span>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-white/10 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-rose-500 to-pink-500 h-full"
                          style={{
                            width: `${
                              summary.totalPageViews > 0
                                ? (count / summary.totalPageViews) * 100
                                : 0
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-white font-semibold w-8 text-right">
                        {count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {events.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Recent Events</h2>
            <div
              className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-6 py-3 text-left text-white/60 font-semibold">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-white/60 font-semibold">
                        Timestamp
                      </th>
                      <th className="px-6 py-3 text-left text-white/60 font-semibold">
                        Referrer
                      </th>
                      <th className="px-6 py-3 text-left text-white/60 font-semibold">
                        User Agent
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.slice(-50).reverse().map((event, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="px-6 py-3 text-white">
                          <span className="px-2 py-1 bg-rose-500/20 text-rose-300 rounded text-xs font-semibold">
                            {event.type}
                          </span>
                        </td>
                        <td className="px-6 py-3 text-white/80 text-xs">
                          {new Date(event.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-3 text-white/60 text-xs truncate max-w-xs">
                          {event.referrer || "direct"}
                        </td>
                        <td className="px-6 py-3 text-white/60 text-xs truncate max-w-sm">
                          {event.userAgent.substring(0, 40)}...
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {events.length === 0 && !loading && (
          <div className="text-center text-white/60 py-12">
            No events recorded yet
          </div>
        )}
      </div>
    </div>
  );
}
