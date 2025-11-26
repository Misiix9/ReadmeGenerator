import React from 'react';
import { Shield, Plus } from 'lucide-react';

const BADGES = [
    { label: 'License: MIT', url: 'https://img.shields.io/badge/License-MIT-yellow.svg', alt: 'License: MIT' },
    { label: 'Build: Passing', url: 'https://img.shields.io/badge/build-passing-brightgreen.svg', alt: 'Build Status' },
    { label: 'Version: 1.0.0', url: 'https://img.shields.io/badge/version-1.0.0-blue.svg', alt: 'Version' },
    { label: 'Style: Prettier', url: 'https://img.shields.io/badge/code_style-prettier-ff69b4.svg', alt: 'Code Style: Prettier' },
    { label: 'React', url: 'https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB', alt: 'React' },
    { label: 'Vue', url: 'https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D', alt: 'Vue' },
    { label: 'Twitter', url: 'https://img.shields.io/twitter/follow/twitter?style=social', alt: 'Twitter Follow' },
];

const BadgePicker = ({ onAdd }) => {
    return (
        <div className="p-4 bg-surface border border-white/10 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                <Shield className="w-5 h-5 text-green-400" />
                Badge Picker
            </div>

            <div className="flex flex-wrap gap-2">
                {BADGES.map((badge, index) => (
                    <button
                        key={index}
                        onClick={() => onAdd('badge', { url: badge.url, label: badge.alt })}
                        className="group relative flex items-center justify-center p-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded transition-all"
                        title={badge.label}
                    >
                        <img src={badge.url} alt={badge.alt} className="h-5" />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded">
                            <Plus className="w-4 h-4 text-white" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BadgePicker;
