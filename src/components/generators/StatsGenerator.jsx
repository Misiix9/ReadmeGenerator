import React, { useState } from 'react';
import { BarChart3, Plus } from 'lucide-react';

const StatsGenerator = ({ onAdd }) => {
    const [pkg, setPkg] = useState('');
    const [registry, setRegistry] = useState('npm');

    const handleAdd = () => {
        if (!pkg) return;

        let url = '';
        let alt = '';

        if (registry === 'npm') {
            url = `https://img.shields.io/npm/dt/${pkg}?style=for-the-badge`;
            alt = `NPM Downloads`;
        } else {
            url = `https://img.shields.io/pypi/dm/${pkg}?style=for-the-badge`;
            alt = `PyPI Downloads`;
        }

        onAdd('badge', { url, label: alt });
        setPkg('');
    };

    return (
        <div className="p-4 bg-surface border border-white/10 rounded-lg mb-4">
            <div className="flex items-center gap-2 mb-4 text-white font-semibold">
                <BarChart3 className="w-5 h-5 text-orange-400" />
                Download Stats
            </div>

            <div className="flex gap-2 mb-2">
                <select
                    value={registry}
                    onChange={(e) => setRegistry(e.target.value)}
                    className="bg-background border border-white/10 rounded px-2 py-1 text-sm text-white focus:border-orange-500 outline-none"
                >
                    <option value="npm">NPM</option>
                    <option value="pypi">PyPI</option>
                </select>
                <input
                    type="text"
                    value={pkg}
                    onChange={(e) => setPkg(e.target.value)}
                    placeholder="Package name (e.g. react)"
                    className="flex-1 bg-background border border-white/10 rounded px-2 py-1 text-sm text-white focus:border-orange-500 outline-none"
                />
            </div>

            <button
                onClick={handleAdd}
                disabled={!pkg}
                className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
                Add Stats Badge
            </button>
        </div>
    );
};

export default StatsGenerator;
