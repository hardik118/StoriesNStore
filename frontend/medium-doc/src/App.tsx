import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./lib/protectRoutes";

import { Singin } from "./pages/Singin";
import { Singup } from "./pages/Singup";
import { Blog } from "./pages/Blog";
import { BlogFeed } from "./pages/BlogFeed";
import { WriteBlog } from "./pages/Writeblog/Writeblog";
import Document from "./pages/Document";
import { Store } from "./pages/Store/Store";
import { UserIntrest } from "./pages/userIntrestForm/UserIntrestForm";
import { UserShop } from "./pages/userShop/UserShop";
import { DocViewerPage } from "./pages/DocViewer";
import { UploadDoc } from "./pages/UploadDoc";
import SettingsPage from "./pages/settings";
import { Homepage } from "./pages/HomePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/signup" element={<Singup />} />
        <Route path="/signin" element={<Singin />} />

        {/* Protected routes */}
        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/BlogsFeed"
          element={
            <ProtectedRoute>
              <BlogFeed />
            </ProtectedRoute>
          }
        />
        <Route
          path="/WriteBlog"
          element={
            <ProtectedRoute>
              <WriteBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/buy-coffe"
          element={
            <ProtectedRoute>
              <Document />
            </ProtectedRoute>
          }
        />
        <Route
          path="/store"
          element={
            <ProtectedRoute>
              <Store />
            </ProtectedRoute>
          }
        />
        <Route
          path="/userintrest-form"
          element={
            <ProtectedRoute>
              <UserIntrest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/UserShop/:id"
          element={
            <ProtectedRoute>
              <UserShop />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-doc"
          element={
            <ProtectedRoute>
              <DocViewerPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload-doc"
          element={
            <ProtectedRoute>
              <UploadDoc />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />

        {/* 404 fallback */}
<Route
  path="*"
  element={
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-9xl font-extrabold text-red-500 mb-4 animate-pulse">404</h1>
      <h2 className="text-3xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6">Oops! The page you are looking for does not exist.</p>
      <a
        href="/"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Go Back Home
      </a>
    </div>
  }
/>
      </Routes>
    </BrowserRouter>
  );
}
