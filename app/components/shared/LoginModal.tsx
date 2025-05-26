import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const { supabase } = await import('../../lib/supabase');
      await supabase.auth.signInWithOAuth({ provider: 'google' });
    } catch (err: any) {
      setError('Googleログインに失敗しました');
      setGoogleLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-sm relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="閉じる"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-amber-700 mb-6 text-center">ログイン</h2>
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 rounded transition-colors mb-4 shadow"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
        >
          <svg className="w-5 h-5" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.64 2.36 30.18 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.98 6.2C12.13 13.13 17.62 9.5 24 9.5z"/><path fill="#34A853" d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.66 7.01l7.19 5.6C43.93 37.36 46.1 31.41 46.1 24.55z"/><path fill="#FBBC05" d="M10.67 28.65c-1.13-3.36-1.13-6.99 0-10.35l-7.98-6.2C.9 16.36 0 20.05 0 24s.9 7.64 2.69 11.9l7.98-6.2z"/><path fill="#EA4335" d="M24 48c6.18 0 11.36-2.05 15.15-5.59l-7.19-5.6c-2.01 1.35-4.59 2.16-7.96 2.16-6.38 0-11.87-3.63-14.33-8.91l-7.98 6.2C6.73 42.52 14.82 48 24 48z"/><path fill="none" d="M0 0h48v48H0z"/></g></svg>
          {googleLoading ? 'リダイレクト中...' : 'Googleでログイン'}
        </button>
        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
      </div>
    </div>
  );
};

export default LoginModal; 