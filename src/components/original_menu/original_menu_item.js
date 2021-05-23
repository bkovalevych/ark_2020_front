import React, {useRef} from 'react'
import './original_menu_item.css'
export default function(props) {
    let className = "item_out";
    const single = props.single;
    const handler = (e) => {
        if (single) {
            let last = 0;
            props.selectedItem.forEach(val => last = val)
            let elem = document.getElementById(last)
            let prev_val = last;
            props.setItem(props.specialLink);
            if (last !== prev_val || props.selectedItem.size === 0) {
                if (elem != null)
                elem.className = elem.className.replace(' checked', '');
                e.currentTarget.className += ' checked';
            }

        } else if (single === false) {
            if (props.selectedItem.has(props.specialLink)) {
                e.currentTarget.className = e.currentTarget.className.replace(' checked', '');
            } else {
                e.currentTarget.className += ' checked';
            }
            props.setItem(props.specialLink);
        }
    }
    if(props.selectedItem.has(props.specialLink))
        className += ' checked';
    return (
        <div className={className} onClick={handler} id={props.specialLink}>

            <div className='item'>
                <div className="item_inner">
                    {props.icon}
                    <div className='item_text'>{props.name}</div>
                </div>
            </div>
        </div>
    )
}