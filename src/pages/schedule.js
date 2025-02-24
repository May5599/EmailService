import Navbar from '../components/Navbar';
import EmailForm from '../components/EmailForm';
import '../../styles/global.css';

export default function ScheduleEmail() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div >
        <EmailForm />
      </div>
    </div>
  );
}