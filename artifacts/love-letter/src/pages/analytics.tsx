import { useEffect, useState } from "react";
import { useSearch } from "wouter";

interface AnalyticsEvent {
  type: string;
  timestamp: string;
  userAgent: string;
  referrer: string;
  deviceType: string;
  operatingSystem: string;
  browser: string;
  screenResolution: string;
  ipAddress: string;
  receivedAt: string;
}

interface AnalyticsSummary {
  totalPageViews: number;
  totalEvents: number;
  referrerBreakdown: Record<string, number>;
  deviceBreakdown: Record<string, number>;
  osBreakdown: Record<string, number>;
  browserBreakdown: Record<string, number>;
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
    if (password === "priyalovesme") {
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
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-8">
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
              {error && <p className="text-red-400 text-sm">{error}</p>}
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

  const BreakdownCard = ({
    title,
    data,
    total,
  }: {
    title: string;
    data: Record<string, number>;
    total: number;
  }) => (
    <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="space-y-3">
        {Object.entries(data)
          .sort(([, a], [, b]) => b - a)
          .map(([key, count]) => (
            <div key={key} className="flex items-center justify-between">
              <span className="text-white/80 text-sm truncate max-w-[150px]">
                {key || "Unknown"}
              </span>
              <div className="flex items-center gap-3">
                <div className="w-24 bg-white/10 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-rose-500 to-pink-500 h-full"
                    style={{
                      width: `${total > 0 ? (count / total) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-white font-semibold w-8 text-right text-sm">
                  {count}
                </span>
              </div>
            </div>
          ))}
        {Object.keys(data).length === 0 && (
          <p className="text-white/40 text-sm">No data yet</p>
        )}
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "linear-gradient(180deg, #0d0308 0%, #130510 15%, #1a0614 30%, #120408 50%, #150610 70%, #0d0308 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
            <p className="text-white/60">Visitor tracking and engagement metrics</p>
          </div>
          <button
            onClick={fetchAnalyticsData}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Refresh
          </button>
        </div>

        {loading && (
          <div className="text-center text-white/60 py-8">Loading analytics...</div>
        )}

        {summary && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-white/60 text-sm mb-2">Total Page Views</p>
                <p className="text-4xl font-bold text-white">{summary.totalPageViews}</p>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-white/60 text-sm mb-2">Total Events</p>
                <p className="text-4xl font-bold text-white">{summary.totalEvents}</p>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-white/60 text-sm mb-2">Unique Devices</p>
                <p className="text-4xl font-bold text-white">
                  {Object.keys(summary.deviceBreakdown || {}).length}
                </p>
              </div>
              <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-white/60 text-sm mb-2">Unique OS</p>
                <p className="text-4xl font-bold text-white">
                  {Object.keys(summary.osBreakdown || {}).length}
                </p>
              </div>
            </div>

            {/* Breakdown Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <BreakdownCard
                title="Device Types"
                data={summary.deviceBreakdown || {}}
                total={summary.totalPageViews}
              />
              <BreakdownCard
                title="Operating Systems"
                data={summary.osBreakdown || {}}
                total={summary.totalPageViews}
              />
              <BreakdownCard
                title="Browsers"
                data={summary.browserBreakdown || {}}
                total={summary.totalPageViews}
              />
              <BreakdownCard
                title="Referrers"
                data={summary.referrerBreakdown || {}}
                total={summary.totalPageViews}
              />
            </div>
          </>
        )}

        {/* Events Table */}
        {events.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Recent Visits</h2>
            <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="px-4 py-3 text-left text-white/60 font-semibold">
                        Time
                      </th>
                      <th className="px-4 py-3 text-left text-white/60 font-semibold">
                        IP Address
                      </th>
                      <th className="px-4 py-3 text-left text-white/60 font-semibold">
                        Device
                      </th>
                      <th className="px-4 py-3 text-left text-white/60 font-semibold">
                        OS
                      </th>
                      <th className="px-4 py-3 text-left text-white/60 font-semibold">
                        Browser
                      </th>
                      <th className="px-4 py-3 text-left text-white/60 font-semibold">
                        Screen
                      </th>
                      <th className="px-4 py-3 text-left text-white/60 font-semibold">
                        Referrer
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {events
                      .slice()
                      .reverse()
                      .slice(0, 100)
                      .map((event, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="px-4 py-3 text-white/80 text-xs whitespace-nowrap">
                            {new Date(event.timestamp).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 text-white font-mono text-xs">
                            {event.ipAddress || "Unknown"}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 rounded text-xs font-semibold ${
                                event.deviceType === "Mobile"
                                  ? "bg-blue-500/20 text-blue-300"
                                  : event.deviceType === "Tablet"
                                  ? "bg-purple-500/20 text-purple-300"
                                  : "bg-green-500/20 text-green-300"
                              }`}
                            >
                              {event.deviceType || "Unknown"}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-white/60 text-xs">
                            {event.operatingSystem || "Unknown"}
                          </td>
                          <td className="px-4 py-3 text-white/60 text-xs">
                            {event.browser || "Unknown"}
                          </td>
                          <td className="px-4 py-3 text-white/40 text-xs font-mono">
                            {event.screenResolution || "Unknown"}
                          </td>
                          <td className="px-4 py-3 text-white/40 text-xs truncate max-w-[150px]">
                            {event.referrer || "direct"}
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
            No visits recorded yet. Visit the homepage to generate analytics data.
          </div>
        )}
      </div>
    </div>
  );
}
