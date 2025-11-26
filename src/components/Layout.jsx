import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children, sections }) => {
    return (
        <div className="min-h-screen bg-background text-white font-sans selection:bg-primary/30">
            <Navbar sections={sections} />
            <main className="pt-16 h-screen flex flex-col">
                {children}
            </main>
        </div>
    );
};

export default Layout;
