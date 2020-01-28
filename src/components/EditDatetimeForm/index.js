import React, { useState, useEffect, Fragment } from 'react'
import {Button} from 'reactstrap';

import InputTime from '../InputTime';

const EditUserForm = props => {
  
  const [ datetimeData, setDatetimeData ] = useState(props.currentDatetime)

  const handleInputChangeDate = event => {
		const { value } = event.target;
		setDatetimeData({ ...datetimeData, date: value });
	};

	const handleInputChangeTime = event => {
		const { name, value } = event.target;
		setDatetimeData({ ...datetimeData, [name]: value });
	};

	const onConfirmUpdate = (event) => {
    	event.preventDefault();
    
		if (!datetimeData.arrivalTime || !datetimeData.lunchTime || !datetimeData.exitTime) 
			return;
		
		props.updateDatetime(datetimeData.id, datetimeData);
		props.setEditing(false);
	};

  return (
    <Fragment>
      <br></br>
      <h2>Update Date and Time</h2>
		<form onSubmit={onConfirmUpdate} >
			<label>Date</label>
			<input type='date' value={datetimeData.date}  onChange={e => {handleInputChangeDate(e)}} ></input>
			<InputTime 
				titleTime='Arrival Time'
				name='arrivalTime'
				time={datetimeData.arrivalTime}
				onChangeTime={handleInputChangeTime} 
			/>
			<InputTime 
				titleTime='Lunch Time'
				name='lunchTime'
				time={datetimeData.lunchTime}
				onChangeTime={handleInputChangeTime} 
			/>
			<InputTime 
				titleTime='Exit Time'
				name='exitTime'
				time={datetimeData.exitTime}
				onChangeTime={handleInputChangeTime} 
			/>
			<Button color='primary' >Update Hours</Button>
			<Button color='danger' onClick={() => props.setEditing(false)} >Cancel</Button>
		</form>
    </Fragment>
  )
}

export default EditUserForm