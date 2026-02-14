import { auth } from "../config/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, ShoppingCart, User, Store } from "lucide-react";

const Navbar = () => {
    const navigate = useNavigate();
    const user = auth.currentUser;

    // Logic to get initials or first name
    const displayName = user?.email ? user.email.split("@")[0] : "Guest";

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-secondary/10 px-4 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">

                {/* Brand Logo */}
                <Link to="/home" className="flex items-center gap-2 group">
                    <div className="bg-primary p-2 rounded-lg group-hover:rotate-12 transition-transform">
                        <Store className="text-white" size={24} />
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
            GenKart
          </span>
                </Link>

                {/* Right Side Actions */}
                <div className="flex items-center gap-3 md:gap-6">

                    {/* Cart Icon - Just visual for now */}
                    <button className="relative p-2 text-secondary hover:text-primary transition-colors">
                        <ShoppingCart size={22} />
                        <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              0
            </span>
                    </button>

                    {/* User Profile & Logout */}
                    <div className="flex items-center gap-2 border-l pl-4 md:pl-6 border-secondary/20">
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-xs text-secondary font-medium">Welcome,</span>
                            <span className="text-sm font-bold text-slate-800 capitalize">{displayName}</span>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="p-2.5 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all duration-300 group"
                            title="Logout"
                        >
                            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;