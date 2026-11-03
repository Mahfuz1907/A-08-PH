"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { 
  Aperture, 
  Menu, 
  X, 
  LayoutDashboard, 
  PlusCircle, 
  Building2, 
  CalendarDays, 
  LogOut 
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#about", label: "About Us" },
  { href: "/add-studio", label: "Add Studio" },
]

const accountLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/studios/new", label: "Add New Studio", icon: PlusCircle },
  { href: "/dashboard/studios", label: "My Studio Listings", icon: Building2 },
  { href: "/dashboard/bookings", label: "My Bookings", icon: CalendarDays },
]

export default function Navbar() {

  const pathname = usePathname()
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // Dummy login state (test korar jonno)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const dummyUser = {
    name: "Mahfuz Tamim",
    email: "mahfuz@studiospace.com",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb"
  }

  const getInitials = (name: string) => {
    return name
      ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
      : "U"
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="size-9 rounded-xl bg-sky-600 flex items-center justify-center text-white shadow-lg shadow-sky-600/30">
            <Aperture className="size-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">StudioSpace</span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? "text-sky-400 bg-sky-500/10" 
                    : "text-slate-300 hover:text-white hover:bg-slate-900"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Action / Auth Section */}
        <div className="hidden lg:flex items-center gap-4">
          
          {/* Test Auth Toggle Button */}
          <Button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
          >
            Toggle Auth: {isLoggedIn ? "LoggedIn" : "LoggedOut"}
          </Button>

          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-900 transition-colors"
              >
                <Avatar className="size-9 border border-slate-800">
                  <AvatarImage src={dummyUser.image} alt={dummyUser.name} />
                  <AvatarFallback className="bg-sky-600 text-white font-semibold">
                    {getInitials(dummyUser.name)}
                  </AvatarFallback>
                </Avatar>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-800 mb-1">
                    <p className="text-sm font-semibold text-white">{dummyUser.name}</p>
                    <p className="text-xs text-slate-400 truncate">{dummyUser.email}</p>
                  </div>
                  {accountLinks.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
                      >
                        <Icon className="size-4 text-sky-400" />
                        {item.label}
                      </Link>
                    )
                  })}
                  <div className="border-t border-slate-800 my-1" />
                  <button
                    onClick={() => {
                      setDropdownOpen(false)
                      setIsLoggedIn(false)
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
                  >
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center text-sm font-medium px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white rounded-xl transition-colors shadow-sm"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-slate-800 pt-4">
            {isLoggedIn ? (
              <div className="space-y-2">
                <div className="px-3 py-1">
                  <p className="text-sm font-semibold text-white">{dummyUser.name}</p>
                  <p className="text-xs text-slate-400">{dummyUser.email}</p>
                </div>
                {accountLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded-lg"
                    >
                      <Icon className="size-4 text-sky-400" />
                      {item.label}
                    </Link>
                  )
                })}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setIsLoggedIn(false)
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-400 hover:bg-rose-500/10 rounded-lg mt-2"
                >
                  <LogOut className="size-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <Link 
                  href="/login" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium border border-slate-700 text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}