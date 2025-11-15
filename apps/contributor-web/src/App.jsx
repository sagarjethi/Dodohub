import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from 'react-router-dom';
import Register from './pages/auth/Register';
import KYC from './pages/kyc/KYC';
import Upload from './pages/upload/Upload';
import { Button } from './components/ui/Button';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-xl font-display font-bold text-slate-900">
            🦤 DoDoHub
          </h1>
          <p className="text-slate-600 mt-1">
            Welcome back! Ready to upload some content?
          </p>
        </div>
        <Button onClick={() => navigate('/upload')}>+ Upload New Asset</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-700">Total Earnings</h3>
          <p className="text-3xl font-bold text-primary-600 mt-2">$0.00</p>
          <p className="text-xs text-slate-400 mt-1">+0% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-700">Active Assets</h3>
          <p className="text-3xl font-bold text-slate-900 mt-2">0</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-700">Pending Review</h3>
          <p className="text-3xl font-bold text-orange-500 mt-2">0</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <nav className="bg-white border-b border-slate-200 px-8 py-4 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="font-display font-bold text-xl flex items-center gap-2">
              <span className="text-2xl">🦤</span>
              DoDoHub
              <span className="text-xs bg-primary-50 text-primary-700 px-2 py-0.5 rounded-full font-medium border border-primary-100">
                Contributor
              </span>
            </div>
            <div className="flex gap-6">
              <Link
                to="/"
                className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/upload"
                className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
              >
                Upload
              </Link>
              <Link
                to="/register"
                className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
              >
                Register
              </Link>
              <Link
                to="/kyc"
                className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
              >
                KYC
              </Link>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/kyc" element={<KYC />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
