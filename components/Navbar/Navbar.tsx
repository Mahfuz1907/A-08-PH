"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import type { LucideIcon } from "lucide-react"
import {
  ApertureIcon,
  Building2Icon,
  CalendarDaysIcon,
  ChevronDownIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  MenuIcon,
  PlusIcon,
} from "lucide-react"
import { cn } from "cn"

import { useAuth, type SessionUser } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks: { href: string; label: string }[] = [
  { href: "/", label: "Home" },
  { href: "/studios", label: "Explore Studios" },
  // Section links scroll to anchors on the home page — they need matching
  // `id="how-it-works"` and `id="about"` elements in app/page.tsx.
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#about", label: "About Us" },
]

const accountLinks: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboardIcon },
  { href: "/dashboard/studios/new", label: "Add New Studio", icon: PlusIcon },
  { href: "/dashboard/studios", label: "My Studio Listings", icon: Building2Icon },
  { href: "/dashboard/bookings", label: "My Bookings", icon: CalendarDaysIcon },
]

function isLinkActive(href: string, pathname: string) {
  if (href.startsWith("/#")) return false
  return pathname === href
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
}

function Brand() {
  return (
    <Link href="/" className="flex shrink-0 items-center gap-2">
      <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <ApertureIcon aria-hidden="true" className="size-5" />
      </span>
      <span className="text-lg font-semibold tracking-tight">StudioSpace</span>
    </Link>
  )
}

function UserMenu({ user, onLogout }: { user: SessionUser; onLogout: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        openOnHover
        aria-label={`Open account menu for ${user.name}`}
        className={cn(buttonVariants({ variant: "ghost" }), "h-auto gap-2 px-2 py-1.5")}
      >
        <Avatar>
          {user.image ? <AvatarImage src={user.image} alt="" /> : null}
          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
        </Avatar>
        <ChevronDownIcon
          aria-hidden="true"
          className="size-3.5 text-muted-foreground"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="px-2 py-1.5">
            <span className="block text-sm font-medium text-foreground">
              {user.name}
            </span>
            {user.email ? (
              <span className="block truncate text-xs font-normal text-muted-foreground">
                {user.email}
              </span>
            ) : null}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {accountLinks.map(({ href, label, icon: Icon }) => (
            <DropdownMenuItem
              key={href}
              render={<Link href={href} />}
              className="cursor-pointer gap-2"
            >
              <Icon aria-hidden="true" className="size-4" />
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          onClick={onLogout}
          className="cursor-pointer gap-2"
        >
          <LogOutIcon aria-hidden="true" className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const Navbar = () => {
  const pathname = usePathname()
  // const { user, logout } = useAuth()
  const { logout } = useAuth()
  const user = {
    name: 'Mahfuz'
  }
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 md:px-6">
        <Brand />

        {/* Desktop navigation */}
        <NavigationMenu aria-label="Main" className="hidden lg:flex">
          <NavigationMenuList>
            {navLinks.map(({ href, label }) => {
              const active = isLinkActive(href, pathname)
              return (
                <NavigationMenuItem key={href}>
                  <NavigationMenuLink
                    active={active}
                    render={<Link href={href} />}
                    className={cn(
                      "px-3 py-2 font-medium",
                      active
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          {user ? (
            <UserMenu user={user} onLogout={logout} />
          ) : (
            <div className="hidden items-center gap-2 lg:flex">
              <Link
                href="/login"
                className={buttonVariants({ variant: "ghost", size: "lg" })}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={buttonVariants({ size: "lg" })}
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile navigation */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger
              aria-label="Open navigation menu"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon-lg" }),
                "lg:hidden"
              )}
            >
              <MenuIcon aria-hidden="true" />
            </SheetTrigger>
            <SheetContent side="right" className="gap-0">
              <SheetHeader className="flex-row items-center gap-2 border-b">
                <SheetTitle>
                  <Brand />
                </SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Main"
                className="flex flex-1 flex-col gap-1 px-3 py-4"
              >
                {navLinks.map(({ href, label }) => {
                  const active = isLinkActive(href, pathname)
                  return (
                    <Link
                      key={href}
                      href={href}
                      aria-current={active ? "page" : undefined}
                      onClick={closeMobileMenu}
                      className={cn(
                        "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-muted text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {label}
                    </Link>
                  )
                })}
              </nav>

              <SheetFooter className="border-t">
                {user ? (
                  <>
                    <nav aria-label="Account" className="flex flex-col gap-1">
                      {accountLinks.map(({ href, label, icon: Icon }) => {
                        const active = isLinkActive(href, pathname)
                        return (
                          <Link
                            key={href}
                            href={href}
                            aria-current={active ? "page" : undefined}
                            onClick={closeMobileMenu}
                            className={cn(
                              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                              active
                                ? "bg-muted text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                          >
                            <Icon aria-hidden="true" className="size-4" />
                            {label}
                          </Link>
                        )
                      })}
                    </nav>
                    <Button
                      variant="destructive"
                      size="lg"
                      className="justify-start"
                      onClick={() => {
                        closeMobileMenu()
                        logout()
                      }}
                    >
                      <LogOutIcon aria-hidden="true" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      onClick={closeMobileMenu}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "lg" }),
                        "w-full"
                      )}
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={closeMobileMenu}
                      className={cn(buttonVariants({ size: "lg" }), "w-full")}
                    >
                      Register
                    </Link>
                  </>
                )}
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Navbar
