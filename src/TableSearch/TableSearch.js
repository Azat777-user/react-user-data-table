import React, { useState } from "react";


export default props => {
    const [value, setValue] = useState('');
    const valueOnChangeHandler = (event) => {
        setValue(event.target.value);
    }

    return (
        <div className="input-group mb-3 mt-3">
            <div className="input-group-prepend">
                <button className="btn btn-outline-secondary" onClick={()=>props.onSearch(value)}>Button</button>
            </div>
            <input type="text" className="form-control" value={value} onChange={valueOnChangeHandler} />
        </div>
    )
}