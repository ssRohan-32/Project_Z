import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function TestSupabase() {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    // Fetch data
    const fetchItems = async () => {
        // Replace 'test_table' with your actual table name
        let { data, error } = await supabase
            .from('test_table')
            .select('*');
        if (error) console.log('error', error);
        else setItems(data);
    };

    // Create data
    const addItem = async () => {
        if (!newItem) return;
        const { data, error } = await supabase
            .from('test_table')
            .insert([{ name: newItem }]);

        if (error) console.log('error', error);
        else {
            setNewItem('');
            fetchItems();
        }
    };

    useEffect(() => {
        // Uncomment to test immediately if you have the table setup
        // fetchItems(); 
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
            <h2>Supabase CRUD Test</h2>
            <p>Make sure to create a table named 'test_table' with a 'name' column in Supabase.</p>

            <div>
                <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="New Item Name"
                />
                <button onClick={addItem}>Add Item</button>
            </div>
            <button onClick={fetchItems}>Refresh List</button>

            <ul>
                {items?.map((item, idx) => (
                    <li key={idx}>{JSON.stringify(item)}</li>
                ))}
            </ul>
        </div>
    );
}

export default TestSupabase;
