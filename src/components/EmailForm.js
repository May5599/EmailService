import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@headlessui/react';
import { Send } from 'lucide-react';

export default function EmailForm() {
  const [form, setForm] = useState({
    to: '',
    subject: '',
    html: '',
    dayOfWeek: 'Monday',
    timeOfDay: '14:00',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/schedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const result = await response.json();
    alert(result.message);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
      <Card className="w-full max-w-lg border-none backdrop-blur-lg bg-white/10 shadow-2xl rounded-3xl p-8 transition-all hover:shadow-blue-500/30">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">📩 Schedule an Email</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 font-medium mb-2">Recipient</label>
            <Input
              type="email"
              placeholder="Recipient Email"
              value={form.to}
              onChange={(e) => setForm({ ...form, to: e.target.value })}
              required
              className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-3 px-4 w-full transition duration-200 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Subject</label>
            <Input
              type="text"
              placeholder="Email Subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
              className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-3 px-4 w-full transition duration-200 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Content</label>
            <Textarea
              placeholder="HTML Content"
              value={form.html}
              onChange={(e) => setForm({ ...form, html: e.target.value })}
              required
              className="h-36 bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-3 px-4 w-full transition duration-200 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Day of the Week</label>
            <Select
              value={form.dayOfWeek}
              onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })}
              className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-3 px-4 w-full transition duration-200 ease-in-out"
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </Select>
          </div>
          <div>
            <label className="block text-gray-300 font-medium mb-2">Time of the Day (HH:mm)</label>
            <Input
              type="time"
              value={form.timeOfDay}
              onChange={(e) => setForm({ ...form, timeOfDay: e.target.value })}
              required
              className="bg-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-lg py-3 px-4 w-full transition duration-200 ease-in-out"
            />
          </div>
          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium shadow-md transition-all duration-300 ease-in-out hover:scale-105"
          >
            <Send size={20} /> Schedule Email
          </Button>
        </form>
      </Card>
    </div>
  );
}
