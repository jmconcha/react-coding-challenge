import { useState } from 'react';
import DataTable from './DataTable';
import { usersCount } from './data/users';

export default function App() {
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(3);

  const handleSelect = (evt) => {
    setPerPage(evt.target.value);
    setPage(1);
  };

  const lastPage = Math.ceil(usersCount / perPage);

  return (
    <div>
      <DataTable perPage={perPage} page={page} />
      <hr />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
        <select name="page" defaultValue="5" onChange={handleSelect}>
          <option value="5">Show 5</option>
          <option value="10">Show 10</option>
          <option value="20">Show 20</option>
        </select>
        <button 
          disabled={page <= 1} 
          onClick={() => setPage(page - 1)}
          style={{ margin: '0 10px', }}>Prev</button>
        <span>Page {page} of {lastPage}</span>
        <button 
          disabled={page >= lastPage}
          onClick={() => setPage(page + 1)}
          style={{ margin: '0 10px', }}>Next</button>
      </div>
    </div>
  );
}
