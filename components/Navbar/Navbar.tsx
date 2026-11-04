"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
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
import { signOut, useSession } from "@/app/lib/auth-client"
import { Spinner } from "../ui/spinner"
import { toast } from "sonner"
import { ModeToggle } from "./ModeToggle"


const navLinks = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#about", label: "About Us" },
]

const accountLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/add-studio", label: "Add New Studio", icon: PlusCircle },
  { href: "/my-listings", label: "My Studio Listings", icon: Building2 },
  { href: "/my-bookings", label: "My Bookings", icon: CalendarDays },
]

export default function Navbar() {
  const {data:session, isPending} = useSession()
  const user = session?.user
  const router = useRouter()

  const pathname = usePathname()
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const getInitials = (name: string) => {
    return name
      ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
      : "U"
  }

  if(isPending){
    return(
      <div className="flex items-center gap-4">
        <Spinner className="mx-auto my-5" />
      </div>
    )
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md text-foreground">
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
                    ? "text-sky-600 dark:text-sky-400 bg-sky-500/10" 
                    : "text-foreground/80 hover:text-foreground hover:bg-muted"
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Action / Auth Section */}
        <div className="hidden lg:flex items-center gap-4">
          <ModeToggle />
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-muted transition-colors"
              >
                <Avatar className="size-9 border border-border">
                  <AvatarImage src={user?.image || 'https://image.png'} alt={user?.name} />
                  <AvatarFallback className="bg-sky-600 text-white font-semibold">
                    {getInitials(user?.name)}
                  </AvatarFallback>
                </Avatar>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-card border border-border shadow-2xl p-2 z-50">
                  <div className="px-3 py-2 border-b border-border mb-1">
                    <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  {accountLinks.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-foreground/80 hover:text-foreground hover:bg-muted rounded-xl transition-colors"
                      >
                        <Icon className="size-4 text-sky-600 dark:text-sky-400" />
                        {item.label}
                      </Link>
                    )
                  })}
                  <div className="border-t border-border my-1" />
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            toast.success('Logged out successfully', {position: 'top-center'})
                            router.push('/login')
                          }
                        }
                      })
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors"
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
                className="text-sm font-medium text-foreground/80 hover:text-foreground px-4 py-2 transition-colors"
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

        {/* Theme Toggle + Mobile Menu Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <ModeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="p-2 text-foreground/80 hover:text-foreground"
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-b border-border px-4 pt-2 pb-6 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-muted"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border pt-4">
            {user ? (
              <div className="space-y-2">
                <div className="px-3 py-1">
                  <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                {accountLinks.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-sm text-foreground/80 hover:bg-muted rounded-lg"
                    >
                      <Icon className="size-4 text-sky-600 dark:text-sky-400" />
                      {item.label}
                    </Link>
                  )
                })}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    signOut({
                      fetchOptions: {
                        onSuccess: () => {
                          toast.success('Logged out successfully', {position: 'top-center'})
                          router.push('login')
                        }
                      }
                    })
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 rounded-lg mt-2"
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
                  className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium border border-border text-foreground rounded-lg hover:bg-muted transition-colors"
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