'use client'
import React, { useState } from 'react';
import styles from './page.module.css';


export default function Home() {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({ name: '', address: '', image: '', type: '' })
  const [filter, setFilter] = useState('student');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilter = (e) => {
    if (e.target.value != '') {
      setFilter(e.target.value);
    }
  }

  const handleChange = (e) => {
    if (e.target.value != '') {
      setNewEntry({ ...newEntry, [e.target.name]: e.target.value });
    }
  }

  const handleImageSelect = (e) => {
    if (e.target.files.length > 0) {
      let file = e.target.files[0];
      let type = file.type;
      if (!type.startsWith('image/')) {
        alert('please upload image only');
        return;
      }
      let imaegUrl = URL.createObjectURL(file);
      setNewEntry({ ...newEntry, 'image': imaegUrl })
    }
  }

  const handleAddNewEntry = (e) => {
    // check if any of the values are not entered i.e any of the value is empty in newEntry
    let isEmpty = false;
    for (let key in newEntry) {
      if (newEntry[key] == '') {
        alert(key + ' not entered please enter all values');
        isEmpty = true;
        break;
      }
    }
    if (isEmpty)
      return;

    setEntries([...entries, newEntry]);
    setFilter(newEntry.type);
    setNewEntry({ name: '', address: '', image: '', type: '' });
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  }

  return (
    <div className={styles.container}>
      <div>
        <h2>Add New Entry</h2>
        <div>
          <label htmlFor="name">Name: </label>
          <input type="text" id="name" value={newEntry.name} name="name" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="address">Address: </label>
          <input
            type="text"
            id="address"
            name="address"
            value={newEntry.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="type">Type</label>
          <select id='type' name='type' value={newEntry.type} onChange={handleChange}>
            <option value=''>---Select Type---</option>
            <option value='teacher'>Teacher</option>
            <option value='student'>Student</option>
          </select>
        </div>
        <div>
          <label htmlFor="image">Image Upload </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageSelect}
          />
        </div>
        <button className={styles.addButton} onClick={handleAddNewEntry}>
          Add
        </button>
      </div>
      <div style={{width:'70%'}}>
        <h1>Address Book</h1>
        <div>
          <label htmlFor="type">User Type: </label>
          <select id="type" name="type" value={filter} onChange={handleFilter}>
            <option value="">--Select Type--</option>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
          </select>
          <label htmlFor='search' style={{ marginLeft: '20px' }}>Search</label>
          <input type='text' id='search' value={searchQuery} onChange={handleSearch} />
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry, index) => {
              let searchFound = false;
              let search = searchQuery.toLowerCase();
              for (let key in entry) {
                if (key == 'image' || key == 'type') {
                  // don't search in image names or type names
                  continue;
                }
                if (entry[key].toLowerCase().includes(search)) {
                  searchFound = true;
                  break;
                }
              }
              if (entry.type == filter && searchFound)
                return (
                  <tr key={index}>
                    <td>{entry.name}</td>
                    <td>{entry.address}</td>
                    <td>
                      <img src={entry.image} alt="Profile" className={styles.image} />
                    </td>
                  </tr>
                )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
