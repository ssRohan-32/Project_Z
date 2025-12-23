import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function TestSupabase() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
    const [loading, setLoading] = useState(false);

    // Fetch data
    const fetchItems = async () => {
        setLoading(true);
        let { data, error } = await supabase
            .from('test_table')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) console.log('error', error);
        else setItems(data || []);
        setLoading(false);
    };

    // Create data
    const addItem = async () => {
        if (!newItem) return;
        const { error } = await supabase
            .from('test_table')
            .insert([{ name: newItem }]);

        if (error) console.log('error', error);
        else {
            setNewItem('');
            fetchItems();
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div className="container animate-fade-in" style={{ padding: '20px' }}>
            <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ marginBottom: '1rem' }}>Data Management</h2>
                <p style={{ marginBottom: '2rem' }}>Test your connection to the database.</p>

                <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
                    <input
                        type="text"
                        className="input-field"
                        style={{ marginBottom: 0 }}
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="Enter new item name..."
                        onKeyDown={(e) => e.key === 'Enter' && addItem()}
                    />
                    <button className="btn btn-primary" onClick={addItem}>Add</button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ margin: 0 }}>Records</h3>
                    <button className="btn btn-outline" onClick={fetchItems} style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </button>
                </div>

                <div style={{ background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                    {items.map((item, idx) => (
                        <div
                            key={idx}
                            style={{
                                padding: '12px 16px',
                                borderBottom: '1px solid var(--glass-border)',
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <span>{item.name}</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                {new Date(item.created_at).toLocaleDateString()}
                            </span>
                        </div>
                    ))}
                    {items.length === 0 && (
                        <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            No records found. Add one above!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TestSupabase;
