import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const Dashboard = () => {
  const [inquiryStats, setInquiryStats] = useState({
    total: 0,
    answered: 0,
    notAnswered: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiryStats = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "inquiries"));
        const inquiries = querySnapshot.docs.map(doc => doc.data());
        
        const total = inquiries.length;
        const answered = inquiries.filter(inq => inq.status === "completed").length;
        const notAnswered = total - answered;

        setInquiryStats({ total, answered, notAnswered });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching inquiry stats:", error);
        setLoading(false);
      }
    };

    fetchInquiryStats();
  }, []);

  const pieData = [
    { name: "Not Answered", value: inquiryStats.notAnswered },
    { name: "Answered", value: inquiryStats.answered },
  ];

  const COLORS = ["#ef4444", "#22c55e"];

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Inquiries */}
        <div className="stats shadow">
          <div className="stat bg-blue-500 text-white">
            <div className="stat-title text-white/80">Total Inquiries</div>
            <div className="stat-value text-5xl">{inquiryStats.total}</div>
          </div>
        </div>

        {/* Answered Inquiries */}
        <div className="stats shadow">
          <div className="stat bg-green-500 text-white">
            <div className="stat-title text-white/80">Answered</div>
            <div className="stat-value text-5xl">{inquiryStats.answered}</div>
          </div>
        </div>

        {/* Not Answered Inquiries */}
        <div className="stats shadow">
          <div className="stat bg-red-500 text-white">
            <div className="stat-title text-white/80">Not Answered</div>
            <div className="stat-value text-5xl">{inquiryStats.notAnswered}</div>
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h3 className="card-title">Inquiries Overview</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => 
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
