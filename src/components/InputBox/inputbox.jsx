import React from 'react'
import './inputbox.css'
function InputBox(props) {
    return (
        <div>
            <input
                className='inputbox'
                
                type={props.type}
                name={props.name}
                onChange={props.onchange}
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default InputBox
