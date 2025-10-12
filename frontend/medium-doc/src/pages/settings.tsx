import React, { useState } from "react"
import { LogOut, Store, Lock, Settings } from "lucide-react"
import toast, { Toaster } from "react-hot-toast"
import { BACK_END_URL } from "../../congif"

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("logout")

  const [shopName, setShopName] = useState("")
  const [shopDescription, setShopDescription] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")

  const handleLogout = () => {
    localStorage.removeItem("token")
    toast.success("You have been signed out.")
    window.location.href = "/signin"
  }

  const handleCreateShop = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${BACK_END_URL}/api/v1/blog//store/createShop`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ shopName, shopDescription }),
      })

      if (!res.ok) throw new Error("Failed to create shop")

      toast.success("Your shop has been created successfully.")
      setShopName("")
      setShopDescription("")
    } catch {
      toast.error("Could not create shop. Try again.")
    }
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${BACK_END_URL}/api/v1/user/updateUser/password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      if (!res.ok) throw new Error("Failed to update password")

      toast.success("Your password has been updated successfully.")
      setCurrentPassword("")
      setNewPassword("")
    } catch {
      toast.error("Could not update password. Try again.")
    }
  }

  const navigationItems = [
    { id: "logout", label: "Logout", icon: LogOut },
    { id: "shop", label: "Create Shop", icon: Store },
    { id: "password", label: "Update Password", icon: Lock },
  ]

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster />

      {/* Sidebar */}
      <div className="w-64 border-r bg-white p-6 hidden md:block">
        <div className="flex items-center gap-2 mb-8">
          <Settings className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>

        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Mobile Nav */}
      <div className="md:hidden w-full border-b bg-white p-4">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-6 w-6" />
          <h1 className="text-xl font-semibold">Settings</h1>
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 md:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Logout */}
          <div id="logout" className="bg-white border rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <LogOut className="h-5 w-5" /> Logout
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Sign out of your account and return to the login page.
            </p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Logout
            </button>
          </div>

          {/* Shop */}
          <div id="shop" className="bg-white border rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Store className="h-5 w-5" /> Create Shop
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Set up a new shop with a name and description.
            </p>
            <form onSubmit={handleCreateShop} className="space-y-4">
              <div>
                <label htmlFor="shopName" className="block text-sm font-medium">
                  Shop Name
                </label>
                <input
                  id="shopName"
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  required
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="shopDescription" className="block text-sm font-medium">
                  Shop Description
                </label>
                <textarea
                  id="shopDescription"
                  value={shopDescription}
                  onChange={(e) => setShopDescription(e.target.value)}
                  required
                  rows={3}
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Create Shop
              </button>
            </form>
          </div>

          {/* Password */}
          <div id="password" className="bg-white border rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-2">
              <Lock className="h-5 w-5" /> Update Password
            </h2>
            <p className="text-sm text-gray-500 mb-4">
              Change your account password for better security.
            </p>
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium">
                  Current Password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-500"
                />
              </div>

              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium">
                  New Password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full border rounded-md px-3 py-2 mt-1 focus:ring focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
