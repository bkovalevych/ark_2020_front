import React from 'react'
import './original_menu_item.css'
export default function(props) {
    let className = "item_out";
    if(props.specialLink === props.selectedItem)
        className += ' checked';
    return (
        <div className={className} onClick={(e) => {


            let elem = e.currentTarget.parentNode.children[props.selectedItem]
            let prev_val = props.selectedItem;
            props.setItem(props.specialLink);
            if (props.selectedItem === prev_val) {
                return;
            }
            elem.className = elem.className.replace(' checked', '');
            e.target.className += ' checked'}}>
            <div className='item'>
                <div className="item_inner">
                    {props.icon}
                    <div className='item_text'>{props.name}</div>
                </div>
            </div>
        </div>
    )
}