import React from 'react';

const Input = ({ label, value, onChange, placeholder, type = "text" }) => {
    return (
        <div className="flex flex-col gap-1.5">
            {label && (
                <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value || ''}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-background border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
            />
        </div>
    );
};

export default Input;
