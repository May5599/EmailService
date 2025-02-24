import Navbar from '../components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Clock, BarChart2 } from 'lucide-react';
import '../../styles/global.css';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center h-[70vh] text-center px-6">
            <motion.span 
        className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.span 
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 blur-md opacity-30 -z-10"
          animate={{ opacity: [0.1, 0.3, 0.1] }} 
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} 
        />
        NotifyX
      </motion.span>

        <motion.p 
          className="text-lg md:text-xl text-gray-300 max-w-2xl mt-3"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Manage, track, and optimize your email notifications seamlessly.
        </motion.p>

        {/* Call-to-Action */}
        <motion.div 
          className="mt-6 flex gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Link
            href="/schedule"
            className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md transition-all hover:bg-blue-700 flex items-center gap-2"
          >
            Get Started <ArrowRight size={20} />
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 border border-gray-500 text-gray-300 text-lg font-medium rounded-lg shadow-md transition-all hover:border-blue-400 hover:text-blue-400 flex items-center gap-2"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Feature Cards */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 pb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {[
          { title: 'Schedule Emails', desc: 'Plan and automate email deliveries.', link: '/schedule', icon: <Mail className="text-blue-400" size={28} /> },
          { title: 'Email Status', desc: 'Track scheduled email updates.', link: '/status', icon: <Clock className="text-yellow-400" size={28} /> },
          { title: 'Analytics', desc: 'Gain insights into email performance.', link: '/analytics', icon: <BarChart2 className="text-green-400" size={28} /> }
        ].map((item, index) => (
          <Link
            key={index}
            href={item.link}
            className="group relative bg-white/5 border border-white/10 backdrop-blur-lg p-6 rounded-lg shadow-md transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20 flex items-center gap-4"
          >
            {item.icon}
            <div>
              <h2 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors">
                {item.title}
              </h2>
              <p className="text-gray-400 mt-2 group-hover:text-gray-300">{item.desc}</p>
            </div>
          </Link>
        ))}
      </motion.div>
    </div>
  );
}
