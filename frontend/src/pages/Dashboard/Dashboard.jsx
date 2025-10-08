import { useSelector } from "react-redux";

function Dashboard() {
  const { userData } = useSelector((state) => state.auth);

  return <>{userData && <p>Welcome, {userData.name}</p>}</>;
}

export default Dashboard;
