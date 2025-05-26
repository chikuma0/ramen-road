"use client";
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginModal from './LoginModal';
import Link from 'next/link';

const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    window.location.href = '/';
  };

  return (
    <header className="w-full bg-white shadow-md py-3 px-6 flex items-center justify-between z-50">
      <Link href="/" className="text-2xl font-bold tracking-tight text-amber-700 select-none">
        ラーメンロード
      </Link>
      <nav className="flex items-center gap-4 relative">
        {!user ? (
          <button
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-2 rounded transition-colors shadow"
            onClick={() => setShowLogin(true)}
          >
            ログイン
          </button>
        ) : (
          <div className="relative">
            <button
              className="text-amber-800 font-medium px-4 py-2 rounded hover:bg-amber-100 transition-colors"
              onClick={() => setMenuOpen((open) => !open)}
              onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
            >
              {user.user_metadata?.name || user.email}
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-50">
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-800 hover:bg-amber-100 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  トップページ
                </Link>
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-amber-100 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  プロフィール
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-amber-100 transition-colors"
                >
                  ログアウト
                </button>
              </div>
            )}
          </div>
        )}
      </nav>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
    </header>
  );
};

export default Header; 