import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// Mock data
const revenueData = [
  { month: 'Jan', revenue: 4000 },
  { month: 'Feb', revenue: 3000 },
  { month: 'Mar', revenue: 5000 },
  { month: 'Apr', revenue: 4500 },
  { month: 'May', revenue: 6000 },
  { month: 'Jun', revenue: 5500 },
];

const pendingAssets = [
  {
    id: 1,
    title: 'Sunset Beach Photo',
    contributor: 'John Doe',
    uploadedAt: '2 hours ago',
  },
  {
    id: 2,
    title: 'City Skyline Video',
    contributor: 'Jane Smith',
    uploadedAt: '5 hours ago',
  },
  {
    id: 3,
    title: 'Mountain Landscape',
    contributor: 'Bob Wilson',
    uploadedAt: '1 day ago',
  },
];

function Dashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-display font-bold mb-8">Dashboard</h1>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="text-sm font-medium text-slate-600">
            Total Revenue
          </div>
          <div className="text-3xl font-bold text-primary-600 mt-2">
            $28,000
          </div>
          <div className="text-xs text-green-600 mt-1">
            +12% from last month
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="text-sm font-medium text-slate-600">
            Active Assets
          </div>
          <div className="text-3xl font-bold text-slate-900 mt-2">1,234</div>
          <div className="text-xs text-slate-400 mt-1">+45 this week</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="text-sm font-medium text-slate-600">Contributors</div>
          <div className="text-3xl font-bold text-slate-900 mt-2">567</div>
          <div className="text-xs text-green-600 mt-1">+23 new</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <div className="text-sm font-medium text-slate-600">
            Pending Review
          </div>
          <div className="text-3xl font-bold text-orange-500 mt-2">12</div>
          <div className="text-xs text-slate-400 mt-1">Needs attention</div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#0ea5e9" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function Moderation() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Content Moderation</h1>
        <div className="text-sm text-slate-600">
          <span className="font-medium">{pendingAssets.length}</span> items
          pending
        </div>
      </div>

      <div className="space-y-4">
        {pendingAssets.map((asset) => (
          <div
            key={asset.id}
            className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 bg-slate-100 rounded-lg"></div>
              <div>
                <h3 className="font-semibold text-slate-900">{asset.title}</h3>
                <p className="text-sm text-slate-600">by {asset.contributor}</p>
                <p className="text-xs text-slate-400 mt-1">
                  Uploaded {asset.uploadedAt}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Approve
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sidebar() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/moderation', label: 'Moderation', icon: '✓' },
    { path: '/users', label: 'Users', icon: '👥' },
    { path: '/orders', label: 'Orders', icon: '🛒' },
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-200 h-screen fixed left-0 top-0">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <span className="text-primary-600 text-2xl">❖</span>
          <h1 className="text-xl font-display font-bold">🦤 DoDoHub Admin</h1>
        </div>
      </div>
      <nav className="p-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-colors ${
              location.pathname === item.path
                ? 'bg-primary-50 text-primary-700 font-medium'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Sidebar />
        <div className="ml-64">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/moderation" element={<Moderation />} />
            <Route
              path="/users"
              element={
                <div className="p-8">
                  <h1 className="text-3xl font-bold">Users</h1>
                </div>
              }
            />
            <Route
              path="/orders"
              element={
                <div className="p-8">
                  <h1 className="text-3xl font-bold">Orders</h1>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
