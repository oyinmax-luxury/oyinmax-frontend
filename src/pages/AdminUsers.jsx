import { useEffect, useState } from "react";
import { HiOutlineUsers, HiArrowLeft, HiBadgeCheck, HiShieldCheck } from "react-icons/hi";
import { Link } from "react-router-dom";
import api from "../services/api";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data } = await api.get("/admin/users");
      setUsers(data);
    } catch (err) {
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await api.put(`/admin/users/${userId}/role`, { role: newRole });
      toast.success("User role updated successfully");
      fetchUsers();
    } catch (err) {
      toast.error("Failed to update role");
    }
  };

  if (loading) return <div className="text-center py-20 font-body">Refining Client List...</div>;

  return (
    <div className="min-h-screen bg-brand-ivory py-24 px-4 text-brand-dark font-body">
      <div className="max-w-7xl mx-auto">
        
        {/* Navigation Back */}
        <Link to="/admin/dashboard" className="flex items-center gap-2 text-brand-muted hover:text-brand-gold mb-8 transition">
          <HiArrowLeft /> Back to Dashboard
        </Link>

        <div className="flex justify-between items-end mb-10 border-b border-brand-muted/20 pb-6">
            <div>
                <h1 className="text-4xl font-light font-luxury">Client Management</h1>
                <p className="text-brand-muted mt-2">Manage your luxury community and administrative roles.</p>
            </div>
            <div className="text-right">
                <span className="text-3xl font-luxury text-brand-gold">{users.length}</span>
                <p className="text-xs uppercase tracking-widest text-brand-muted">Registered Clients</p>
            </div>
        </div>

        <div className="bg-white shadow-luxury rounded-xl overflow-auto border border-brand-muted/10">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-brand-muted uppercase bg-brand-ivory/50">
              <tr>
                <th className="px-6 py-5">Client Information</th>
                <th className="px-6 py-5">Role</th>
                <th className="px-6 py-5">Joined Date</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-muted/10">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-brand-ivory/20 transition-colors">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold">
                            {user.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-semibold text-brand-dark">{user.name}</p>
                            <p className="text-xs text-brand-muted">{user.email}</p>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className={`flex items-center gap-1 w-fit px-3 py-1 rounded-full text-[10px] uppercase tracking-tighter font-bold ${
                        user.role === 'admin' ? 'bg-brand-dark text-white' : 'bg-brand-muted/10 text-brand-muted'
                    }`}>
                        {user.role === 'admin' ? <HiShieldCheck /> : <HiBadgeCheck />}
                        {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-brand-muted italic">
                    {new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-6 text-right">
                    <select 
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="bg-transparent border border-brand-muted/20 text-xs rounded-md p-1 focus:outline-none focus:border-brand-gold"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}