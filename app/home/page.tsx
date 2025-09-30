"use client";

import { useAuthStore } from "../../stores/auth";
import AuthGuard from "../authGuard";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";

export default function DashboardPage() {
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleLogout();
    }
  };

  return (
    <AuthGuard>
      {/* Hero Section with Video Background */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Video Background */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            aria-hidden="true"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080' viewBox='0 0 1920 1080'%3E%3Crect width='1920' height='1080' fill='%231f2937'/%3E%3C/svg%3E"
          >
            {/* Fallback to multiple video sources for better browser support */}
            <source src="/videos/background.mp4" type="video/mp4" />
            {/* Fallback image if video doesn't load */}
            <img
              src="/images/fallbackVideo.jpg"
              alt="Abstract background pattern"
              className="w-full h-full object-cover"
            />
          </video>

          {/* Gradient Overlay for better text readability */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-blue-900/70 to-purple-900/50 mix-blend-multiply"
            aria-hidden="true"
          ></div>

          {/* Additional overlay for WCAG contrast */}
          <div
            className="absolute inset-0 bg-black/30"
            aria-hidden="true"
          ></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          {/* Welcome Message */}
          <div className="mb-8">
            <p className="text-lg md:text-xl font-medium text-blue-200 mb-2">
              Welcome back,
            </p>
            <h1
              id="hero-heading"
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
            >
              Hello, <span className="text-blue-300">{user?.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
              Your dashboard is ready with amazing features and insights to help
              you succeed.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                24/7
              </div>
              <div className="text-blue-100">Active Support</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                99.9%
              </div>
              <div className="text-blue-100">Uptime Guarantee</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                100%
              </div>
              <div className="text-blue-100">Secure & Protected</div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Explore Features
            </Button>
            <Button
              onClick={handleLogout}
              onKeyDown={handleKeyDown}
              className="bg-transparent hover:bg-white/20 text-white font-semibold py-3 px-8 rounded-lg border-2 border-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            >
              Sign Out
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="animate-bounce">
            <Button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-white/80 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white rounded-full"
              aria-label="Scroll to features section"
            >
              <svg
                className="w-8 h-8 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 bg-gray-50"
        aria-labelledby="features-heading"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              id="features-heading"
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Powerful Features
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover all the tools and capabilities designed to enhance your
              productivity and workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Profile Information Card */}
            <Card className="bg-white overflow-hidden shadow rounded-lg">
              <section aria-labelledby="profile-heading">
                <div className="px-6 py-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <h3
                    id="profile-heading"
                    className="text-xl font-semibold text-gray-900 mb-4"
                  >
                    Profile Information
                  </h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="font-medium text-gray-500">User ID</dt>
                      <dd className="text-gray-900">{user?.id}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">
                        Email Address
                      </dt>
                      <dd className="text-gray-900">{user?.email}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Full Name</dt>
                      <dd className="text-gray-900">{user?.name}</dd>
                    </div>
                  </dl>
                </div>
              </section>
            </Card>

            {/* Authentication Status Card */}
            <Card className="bg-white overflow-hidden shadow rounded-lg">
              <section aria-labelledby="auth-status-heading">
                <div className="px-6 py-8">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3
                    id="auth-status-heading"
                    className="text-xl font-semibold text-gray-900 mb-4"
                  >
                    Authentication Status
                  </h3>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-6 w-6 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-green-800">
                        Authenticated
                      </p>
                      <p className="text-sm text-gray-600">
                        You have successfully signed in
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </Card>

            {/* Quick Actions Card */}
            <Card className="bg-white overflow-hidden shadow rounded-lg">
              <section aria-labelledby="actions-heading">
                <div className="px-6 py-8">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3
                    id="actions-heading"
                    className="text-xl font-semibold text-gray-900 mb-4"
                  >
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button
                      onClick={handleLogout}
                      onKeyDown={handleKeyDown}
                      className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                      aria-label="Sign out of your account"
                    >
                      <svg
                        className="h-4 w-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      Sign Out
                    </Button>
                  </div>
                </div>
              </section>
            </Card>
          </div>
        </div>
      </section>
    </AuthGuard>
  );
}
