import React, { useState } from 'react';
import { FileText, LogIn, LogOut, User, Settings } from 'lucide-react';
import { useGitHub } from '../hooks/useGitHub';
import ExportMenu from './ExportMenu';
import SettingsModal from './SettingsModal';

const Navbar = ({ sections }) => {
    const { user, login, logout } = useGitHub();
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <>
            <nav className="h-16 border-b border-white/10 bg-surface/50 backdrop-blur-md fixed top-0 w-full z-50 flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-lg">
                        <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Readme Gen
                    </h1>
                </div>

                <div className="flex items-center gap-4">
                    <ExportMenu sections={sections} />

                    <button
                        onClick={() => setIsSettingsOpen(true)}
                        className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                        title="Settings"
                    >
                        <Settings className="w-5 h-5" />
                    </button>

                    <div className="h-6 w-px bg-white/10" />

                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                {user.photoURL ? (
                                    <img src={user.photoURL} alt={user.displayName} className="w-8 h-8 rounded-full border border-white/10" />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-surface border border-white/10 flex items-center justify-center">
                                        <User className="w-4 h-4 text-gray-400" />
                                    </div>
                                )}
                                <span className="text-sm font-medium text-gray-300 hidden md:block">{user.displayName}</span>
                            </div>
                            <button
                                onClick={logout}
                                className="p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={login}
                            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                        >
                            <LogIn className="w-4 h-4" />
                            <span>Login</span>
                        </button>
                    )}
                </div>
            </nav>
            <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
        </>
    );
};

export default Navbar;
