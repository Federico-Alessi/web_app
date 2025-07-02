import React, { useState } from "react";

const PlantFilters = ({setCategory, setName}) => {
    const [nameValue, setNameValue] = useState("");

    return(
        <div id="filters">
        <label>
            <select
                id="category-filter"
                onChange={e => {setCategory(e.target.value)}}
                >
                    <option value="">All categories</option>
                    <option value="greenplant">Green Plant</option>
                    <option value="succulent">Succulent</option>
                    <option value="flower">Flower</option>

            </select>
        </label>
        <label>
            <input id="name-filter" value={nameValue} onChange={e => {setNameValue(e.target.value)}} placeholder="Search plant"></input>
        </label>
        <button id="search-btn" onClick={() => setName(nameValue)}>🔎</button>
        </div>
    )
}

export default PlantFilters