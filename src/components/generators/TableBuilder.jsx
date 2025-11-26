import React from 'react';
import Input from '../editors/Input';
import { Plus, Trash2 } from 'lucide-react';

const TableBuilder = ({ content, onChange }) => {
    // content.rows is a 2D array: [['Header 1', 'Header 2'], ['Row 1 Col 1', 'Row 1 Col 2']]
    const rows = content.rows || [['Header 1', 'Header 2'], ['Data 1', 'Data 2']];

    const updateCell = (rowIndex, colIndex, value) => {
        const newRows = [...rows];
        newRows[rowIndex] = [...newRows[rowIndex]];
        newRows[rowIndex][colIndex] = value;
        onChange({ ...content, rows: newRows });
    };

    const addRow = () => {
        const colCount = rows[0].length;
        const newRow = Array(colCount).fill('');
        onChange({ ...content, rows: [...rows, newRow] });
    };

    const addColumn = () => {
        const newRows = rows.map((row) => [...row, '']);
        onChange({ ...content, rows: newRows });
    };

    const removeRow = (index) => {
        if (rows.length <= 1) return; // Prevent deleting the last row (header)
        const newRows = rows.filter((_, i) => i !== index);
        onChange({ ...content, rows: newRows });
    };

    const removeColumn = (index) => {
        if (rows[0].length <= 1) return;
        const newRows = rows.map((row) => row.filter((_, i) => i !== index));
        onChange({ ...content, rows: newRows });
    };

    return (
        <div className="space-y-4 overflow-x-auto">
            <div className="flex gap-2 mb-2">
                <button
                    onClick={addRow}
                    className="px-3 py-1.5 text-xs bg-surface hover:bg-surface/80 border border-white/10 rounded flex items-center gap-1 transition-colors"
                >
                    <Plus className="w-3 h-3" /> Add Row
                </button>
                <button
                    onClick={addColumn}
                    className="px-3 py-1.5 text-xs bg-surface hover:bg-surface/80 border border-white/10 rounded flex items-center gap-1 transition-colors"
                >
                    <Plus className="w-3 h-3" /> Add Column
                </button>
            </div>

            <div className="inline-block min-w-full border border-white/10 rounded-lg overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead>
                        <tr>
                            {rows[0].map((cell, colIndex) => (
                                <th key={colIndex} className="p-2 bg-surface/80 border-b border-white/10 relative group min-w-[120px]">
                                    <input
                                        type="text"
                                        value={cell}
                                        onChange={(e) => updateCell(0, colIndex, e.target.value)}
                                        className="w-full bg-transparent border-none focus:ring-0 font-bold placeholder-gray-500"
                                        placeholder="Header"
                                    />
                                    <button
                                        onClick={() => removeColumn(colIndex)}
                                        className="absolute -top-1 -right-1 p-1 bg-red-500/20 text-red-400 rounded-full opacity-0 group-hover:opacity-100 hover:bg-red-500/40 transition-all"
                                        title="Remove Column"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex} className="border-b border-white/5 last:border-none hover:bg-white/5">
                                {row.map((cell, colIndex) => (
                                    <td key={colIndex} className="p-2 border-r border-white/5 last:border-none">
                                        <input
                                            type="text"
                                            value={cell}
                                            onChange={(e) => updateCell(rowIndex + 1, colIndex, e.target.value)}
                                            className="w-full bg-transparent border-none focus:ring-0 text-gray-300"
                                            placeholder="..."
                                        />
                                    </td>
                                ))}
                                <td className="w-8 p-0 text-center">
                                    <button
                                        onClick={() => removeRow(rowIndex + 1)}
                                        className="p-1 text-gray-600 hover:text-red-400 transition-colors"
                                        title="Remove Row"
                                    >
                                        <Trash2 className="w-3 h-3" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TableBuilder;
