import Header from "./Header";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4 bg-gray-100 min-h-screen">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
