import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "../css/filter.css";
import { ascending, dispatch } from "d3";
import {sortAscending, sortDescending, Unorderd} from '../redux/dataSlice.js'

const FilterBar = () => {
  const [state, setState] = useState("");
  const [positiveCases, setPositiveCases] = useState("");

  const dispatch = useDispatch();

  const handleSort = (order) => {
    console.log('order', order)
    if(order=='ascending'){
        console.log('I am in ascending!')
        dispatch(sortAscending())
    }
    else if(order=='descending'){
        console.log('I am in descending!')
        dispatch(sortDescending());
    }
    else{
        console.log('I am in unordered!')
        dispatch(Unorderd())
    }
  };

//   const handleAdd = () => {
//     if (!state || !positiveCases || isNaN(positiveCases)) return;
//     dispatch(addData({ state, positive: parseInt(positiveCases, 10) }));
//     setState("");
//     setPositiveCases("");
//   };

  return (
    <div className="filter-container">
      <div className="sort-section">
        <label>Sort By:</label>
        <select onChange={(e) => handleSort(e.target.value)} >
        <option value="random">Unordered</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>

      <div className="add-section">
        <input
          type="text"
          placeholder="State Name"
          value={state}
        //   onChange={(e) => setState(e.target.value)}
        />
        <input
          type="number"
          placeholder="Positive Cases"
          value={positiveCases}
        //   onChange={(e) => setPositiveCases(e.target.value)}
        />
        <button >+</button>
      </div>
    </div>
  );
};

export default FilterBar;
