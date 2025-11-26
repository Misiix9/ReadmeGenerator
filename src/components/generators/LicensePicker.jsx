import React, { useState } from 'react';
import { Scale, Plus } from 'lucide-react';

const LICENSES = [
    { id: 'mit', name: 'MIT License', badge: 'https://img.shields.io/badge/License-MIT-yellow.svg' },
    { id: 'apache-2.0', name: 'Apache 2.0', badge: 'https://img.shields.io/badge/License-Apache_2.0-blue.svg' },
    { id: 'gpl-3.0', name: 'GPL v3', badge: 'https://img.shields.io/badge/License-GPLv3-blue.svg' },
    { id: 'bsd-3-clause', name: 'BSD 3-Clause', badge: 'https://img.shields.io/badge/License-BSD_3--Clause-blue.svg' },
    { id: 'unlicense', name: 'Unlicense', badge: 'https://img.shields.io/badge/license-Unlicense-blue.svg' },
];

const LicensePicker = ({ onAdd }) => {
    const [selected, setSelected] = useState(LICENSES[0].id);

    const handleAdd = () => {
        const license = LICENSES.find(l => l.id === selected);
        if (!license) return;

        // Add Badge
        onAdd('badge', { url: license.badge, label: 'License' });

        // Add Text Section
        onAdd('header', { title: 'License', description: `This project is licensed under the ${license.name} - see the [LICENSE](LICENSE) file for details.` });
    };

    return (
        <div className="p-4 bg-surface border border-white/10 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                <Scale className="w-5 h-5 text-yellow-400" />
                License Picker
            </div>

            <div className="flex gap-2 mb-2">
                <select
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="w-full bg-background border border-white/10 rounded px-2 py-2 text-sm text-white focus:border-yellow-500 outline-none"
                >
                    {LICENSES.map(l => (
                        <option key={l.id} value={l.id}>{l.name}</option>
                    ))}
                </select>
            </div>

            <button
                onClick={handleAdd}
                className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg text-sm font-medium transition-colors"
            >
                Add License Section
            </button>
        </div>
    );
};

export default LicensePicker;
