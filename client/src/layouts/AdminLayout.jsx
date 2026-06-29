import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-dark text-white p-6 flex-shrink-0">
        <h2 className="text-xl font-bold mb-8">PaulsMart Admin</h2>
        <nav className="space-y-4">
          <p className="text-gray-400 text-sm font-medium cursor-pointer hover:text-white transition-colors">Dashboard</p>
          <p className="text-gray-400 text-sm font-medium cursor-pointer hover:text-white transition-colors">Products</p>
          <p className="text-gray-400 text-sm font-medium cursor-pointer hover:text-white transition-colors">Categories</p>
          <p className="text-gray-400 text-sm font-medium cursor-pointer hover:text-white transition-colors">Orders</p>
          <p className="text-gray-400 text-sm font-medium cursor-pointer hover:text-white transition-colors">Users</p>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
