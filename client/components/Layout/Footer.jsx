"use client";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4 px-6 border-t border-gray-400">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Horizon Impact Fund Managers. All
          rights reserved.
        </p>
      </div>
    </footer>
  );
}
