import Navbar from '../components/Navbar';
import AnalyticsChart from '../components/AnalyticsChart';
import '../../styles/global.css';

export default function Analytics() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div>
       
        <AnalyticsChart />
      </div>
    </div>
  );
}