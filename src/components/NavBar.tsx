import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { History, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";

function NavBar() {
  const [open, setOpen] = useState<boolean>(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white w-full shadow-lg px-4 z-50">
      <div className="flex justify-between items-center h-16">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-8 w-8 text-red-600"
          >
            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
          </svg>
          <span className="ml-2 text-xl font-bold text-gray-800">
            BloodLink
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
          {[
            { name: "Trang chủ", link: "/" },
            { name: "Hiến máu", link: "/blood-donation" },
            { name: "Câu hỏi thường gặp", link: "/faq" },
            { name: "Đăng nhập", link: "/login" },
          ].map((item) => {
            if (item.name === "Đăng nhập" && user) {
              return null;
            }
            return (
              <Link
                to={item.link}
                key={item.name}
                className="text-gray-600 hover:text-red-600 transition-colors"
              >
                {item.name}
              </Link>
            );
          })}
          {user && (
            <DropdownMenu open={open} onOpenChange={setOpen}>
              <DropdownMenuTrigger>
                <Button variant={"secondary"} onClick={() => setOpen(true)}>
                  {user.fullName}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setOpen(false)}>
                  <Link to="/profile" className="flex items-center gap-2">
                    <User />
                    Thông tin cá nhân
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(false)}>
                  <Link
                    to="/blood-donation-history"
                    className="flex items-center gap-2"
                  >
                    <History />
                    Lịch sử hiến máu
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setOpen(false)}>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut />
                    Đăng xuất
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
