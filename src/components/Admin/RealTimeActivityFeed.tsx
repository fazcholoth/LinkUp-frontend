import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import apiCalls from '../../services/admin/apiCalls';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DataPoint {
  posts: number;
  users: number;
  comments: number;
  timestamp: string;
}

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Real-Time Activity Feed',
    },
  },
};

const RealTimeActivityFeed: React.FC = () => {
  const [data, setData] = useState<DataPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiCalls.GetCurrentActivites();
        const { comments, users, posts, timestamp }=data[0]
        console.log(comments,users,posts,timestamp);
        

        setData((prevData) => [
          ...prevData.slice(-5),
          { posts, users, comments, timestamp:new Date( timestamp).toLocaleTimeString() },
        ]);
      } catch (error) {
        console.error('Error fetching activity feed:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  const labels = data.map((dataPoint) => dataPoint.timestamp);

  const postsData = {
    label: 'Posts',
    data: data.map((dataPoint) => dataPoint.posts),
    borderColor: 'rgb(255, 99, 132)',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
  };

  const usersData = {
    label: 'Users',
    data: data.map((dataPoint) => dataPoint.users),
    borderColor: 'rgb(53, 162, 235)',
    backgroundColor: 'rgba(53, 162, 235, 0.5)',
  };

  const commentsData = {
    label: 'Comments',
    data: data.map((dataPoint) => dataPoint.comments),
    borderColor: 'rgb(75, 192, 192)',
    backgroundColor: 'rgba(75, 192, 192, 0.5)',
  };

  const chartData = {
    labels,
    datasets: [postsData, usersData, commentsData],
  };

return(
  <>
    
  <div className='flex justify-center items-center'>
  <div className="stats stats-vertical xl:stats-horizontal shadow">

    <div className="stat">
      <div className="stat-title">USERS</div>
      <div className="stat-value">{data[0]?.users}</div>
    </div>

    <div className="stat">
      <div className="stat-title">POSTS</div>
      <div className="stat-value">{data[0]?.posts}</div>
    </div>

    <div className="stat">
      <div className="stat-title">COMMENTS</div>
      <div className="stat-value">{data[0]?.comments}</div>
    </div>

  </div>
</div>
<Line options={options} data={chartData} />

    </>
    
  )
};

export default RealTimeActivityFeed;
