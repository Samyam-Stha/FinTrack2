"use client";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  BarChart3,
  Settings,
  CreditCard,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  Activity,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getCurrentUser } from "@/utils/useAuth";

export function Sidebar({ currentPage, setCurrentPage }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const routes = [
    { href: "dashboard", icon: LayoutDashboard, title: "Dashboard" },
    { href: "transactions", icon: Receipt, title: "Transactions" },
    { href: "budget", icon: PieChart, title: "Budget" },
    { href: "savings", icon: CreditCard, title: "Savings" },
    // { href: "reports", icon: BarChart3, title: "Reports" },
    { href: "analytics", icon: Activity, title: "Analytics" },
    { href: "settings", icon: Settings, title: "Settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

   const [darkMode, setDarkMode] = useState(() => {
    // Load from localStorage or default to false
    return localStorage.getItem("darkMode") === "true";
  });
  const user = getCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  return (
    <>
      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 z-50 md:hidden"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Sidebar Container */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r dark:border-gray-800 transition-all duration-300 ease-in-out shadow-sm",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Branding */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary dark:text-gray-100">FinTrack</h2>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
              Manage your finances
            </p>
          </div>

          {/* Navigation */}
          <div className="flex-1 px-2 py-2">
            <TooltipProvider delayDuration={0}>
              {routes.map((route) => (
                <Tooltip key={route.href}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={
                        currentPage === route.href ? "secondary" : "ghost"
                      }
                      className={cn(
                        "w-full justify-start text-sm font-medium mb-4 cursor-pointer transition-colors",
                        currentPage === route.href
                          ? "bg-orange-500 text-white shadow-md hover:bg-orange-600"
                          : "text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
                      )}
                      onClick={() => {
                        setCurrentPage(route.href);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <route.icon className="h-5 w-5 mr-2" />
                      {route.title}
                    </Button>
                  </TooltipTrigger>
                </Tooltip>
              ))}
            </TooltipProvider>
          </div>

          {/* Dark Mode Toggle */}
          <div className="px-4 py-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode((d) => !d)}
              className="w-full justify-start text-sm font-medium cursor-pointer transition-colors text-gray-700 hover:bg-gray-200 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              {darkMode ? (
                <>
                  <Moon className="h-5 w-5 mr-2" />
                  Dark Mode
                </>
              ) : (
                <>
                  <Sun className="h-5 w-5 mr-2" />
                  Light Mode
                </>
              )}
            </Button>
          </div>

          {/* Logout */}
          <div className="p-4 mt-auto border-t dark:border-gray-800">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="w-full text-red-500 hover:text-red-600 hover:bg-red-100/80 dark:hover:bg-red-900 justify-start cursor-pointer"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </Button>
                </TooltipTrigger>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
