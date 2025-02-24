import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Clock, Settings, Mail, Send, BarChart2, Activity, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-8">
        <motion.h1 
          className="text-5xl font-bold text-center text-blue-400 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Dashboard Overview
        </motion.h1>
        
        {/* Statistics Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <Card className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center gap-4">
            <Mail className="text-blue-400 text-4xl" />
            <div>
              <h3 className="text-2xl font-semibold">120</h3>
              <p className="text-gray-300">Scheduled Emails</p>
            </div>
          </Card>
          <Card className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center gap-4">
            <Send className="text-green-400 text-4xl" />
            <div>
              <h3 className="text-2xl font-semibold">85</h3>
              <p className="text-gray-300">Sent Emails</p>
            </div>
          </Card>
          <Card className="bg-gray-800 p-6 rounded-xl shadow-lg flex items-center gap-4">
            <Clock className="text-yellow-400 text-4xl" />
            <div>
              <h3 className="text-2xl font-semibold">35</h3>
              <p className="text-gray-300">Pending Emails</p>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Welcome Section */}
          <motion.div 
            className="bg-gray-800 shadow-2xl rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Welcome to the Dashboard!</h2>
            <p className="text-gray-300 text-lg mb-4">
              Manage your scheduled emails, view status updates, and configure settings. 
              Stay organized and automate your email tasks efficiently.
            </p>
            <div className="text-gray-300 space-y-2">
              <span className="block font-medium">Currently, you can:</span>
              <ul className="list-disc pl-6">
                <li className="flex items-center gap-2"><CheckCircle className="text-green-400" /> View all scheduled emails.</li>
                <li className="flex items-center gap-2"><Settings className="text-yellow-400" /> Update email settings.</li>
                <li className="flex items-center gap-2"><Clock className="text-blue-400" /> Monitor sent and pending emails.</li>
              </ul>
            </div>
          </motion.div>

          {/* Upcoming Features */}
          <motion.div 
            className="bg-gray-800 shadow-2xl rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Upcoming Features</h2>
            <p className="text-gray-300 text-lg mb-4">
              Stay tuned for exciting new features to enhance your experience:
            </p>
            <ul className="list-disc pl-6 text-gray-300 space-y-2">
              <li>Advanced filtering and sorting for emails.</li>
              <li>Pre-built email templates for quick message creation.</li>
              <li>Detailed email analytics and performance reports.</li>
            </ul>
          </motion.div>
        </div>

        {/* Live Activity Feed and Performance Overview */}
        <div className="grid md:grid-cols-2 gap-8">
          <motion.div 
            className="bg-gray-800 shadow-2xl rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Live Activity Feed</h2>
            <ul className="text-gray-300 space-y-4">
              <li className="flex items-center gap-2"><Activity className="text-blue-400" /> New email scheduled for tomorrow.</li>
              <li className="flex items-center gap-2"><Send className="text-green-400" /> Email campaign sent successfully.</li>
              <li className="flex items-center gap-2"><Clock className="text-yellow-400" /> 5 emails pending approval.</li>
            </ul>
          </motion.div>

          <motion.div 
            className="bg-gray-800 shadow-2xl rounded-2xl p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl font-semibold mb-4">Performance Overview</h2>
            <p className="text-gray-300 mb-4">Your email performance metrics over the last month:</p>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-center gap-2"><TrendingUp className="text-green-400" /> Open Rate: 78%</li>
              <li className="flex items-center gap-2"><TrendingUp className="text-green-400" /> Click Rate: 52%</li>
              <li className="flex items-center gap-2"><BarChart2 className="text-blue-400" /> Conversion Rate: 23%</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
