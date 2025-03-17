import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../css/filter.css";
import { ascending, dispatch } from "d3";
import {sortAscending, sortDescending, Unorderd} from '../redux/dataSlice.js'

const FilterBar = ({stateCases, setStateCases}) => {
  const [state, setState] = useState("");
  const [positiveCases, setPositiveCases] = useState("");

  const {theme} = useSelector(state => state.covidData)

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

  const handleAdd = () => {
    if (!state || !positiveCases || isNaN(positiveCases)) return;
    setStateCases(prev => [...prev, {state:state, positive: +positiveCases}])
    console.log('added new data')
    setState("");
    setPositiveCases("");
  };

  return (
    <div className={`filter-container ${theme === "dark" ? "dark-theme" : "light-theme"}`}>
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
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="number"
          placeholder="Positive Cases"
          value={positiveCases}
          onChange={(e) => setPositiveCases(e.target.value)}
        />
        <button onClick={handleAdd} >+</button>
      </div>
    </div>
  );
};

export default FilterBar;
