import React from 'react'
import './inputbox.css'
function InputBox(props) {
    return (
        <div>
            <input
                className='inputbox'
                type={props.type}
                value={props.value}
                name={props.name}
                onChange={props.onchange}
                placeholder={props.placeholder}
                onKeyDown={props.onKeyDown}
            />
        </div>
    )
}

export default InputBox
