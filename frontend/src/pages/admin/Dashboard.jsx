const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Total Sales</div>
            <div className="stat-value">$89,400</div>
            <div className="stat-desc">21% more than last month</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">New Users</div>
            <div className="stat-value">1,200</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Active Orders</div>
            <div className="stat-value">150</div>
            <div className="stat-desc">↘︎ 90 (14%)</div>
          </div>
        </div>

        <div className="stats shadow">
          <div className="stat">
            <div className="stat-title">Products</div>
            <div className="stat-value">2,500</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
