import React from 'react';
import classes from './DropDown.css';

const DropDown = (props) => {
	let generateOpt = Object.keys(props.options).map(optKey => {
		return <option value={optKey} key={optKey+'-'+props.options[optKey]}>{props.options[optKey]}</option>
	});
	return (
		<select name={props.name} id={props.id} className={classes.dropDown}>
			<option value='' key={props.name +'-'+ props.defaultOpt}>{props.defaultOpt}</option>
			{generateOpt}
		</select>
	);
}

export default DropDown;