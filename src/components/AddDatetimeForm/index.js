import React, { useState, Fragment } from 'react'
import {Button} from 'reactstrap';
import * as moment from 'moment';

import InputTime from '../InputTime';

const AddDatetimeForm = props => {
	
	let dateToday = moment().format('YYYY-MM-DD');
	let hourNow = moment().format('HH:mm');

	const initialDatetimeForm = { 
		id: null, 
		date: dateToday,
		arrivalTime: hourNow,
		lunchTime: hourNow,
		exitTime: hourNow
	};

	const [ datetime, setDatetime ] = useState(initialDatetimeForm);
	
	const onChangeInputDate = event => {
		const { value } = event.target;
		setDatetime({...datetime, date: value});
	};
	
	const onChangeInputTime = event => {
		const { name, value } = event.target;
		setDatetime({ ...datetime, [name]: value });
	};

	const onConfirmAddClicked = (event) => {
		event.preventDefault();
		
		if (!datetime.date || !datetime.arrivalTime || !datetime.lunchTime || !datetime.exitTime) 
			return;
		
		props.addDatetime(datetime)
		setDatetime(initialDatetimeForm)
	};
	
	return (
		<Fragment>
		    <br></br>
			<h2>Add Date and Time</h2>
			<form onSubmit={onConfirmAddClicked} >
				<label>Date</label>
				<input type='date' value={datetime.date}  onChange={e => {onChangeInputDate(e)}} ></input>
				<InputTime 
					titleTime='Arrival Time'
					name='arrivalTime'
					time={datetime.arrivalTime}
					onChangeTime={onChangeInputTime} 
				/>
				<InputTime 
					titleTime='Lunch Time'
					name='lunchTime'
					time={datetime.lunchTime}
					onChangeTime={onChangeInputTime} 
				/>
				<InputTime 
					titleTime='Exit Time'
					name='exitTime'
					time={datetime.exitTime}
					onChangeTime={onChangeInputTime} 
				/>
				<Button color='primary'>Add Datetime</Button>
			</form>
		</Fragment>
	)
}

export default AddDatetimeForm;