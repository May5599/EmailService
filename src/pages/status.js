import Navbar from '../components/Navbar';
import EmailList from '../components/EmailList';
import '../../styles/global.css';

export default function EmailStatus() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div >
        <EmailList />
      </div>
    </div>
  );
}