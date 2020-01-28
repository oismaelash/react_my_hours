import React, { useState, Fragment, useEffect } from 'react';
import * as moment from 'moment';
import axios from 'axios';
import Block from 'styled-loaders-react/lib/components/Block';
import AddDatetimeForm from '.././AddDatetimeForm';
import EditHourForm from '../EditDatetimeForm';
import DatetimeListTable from '../DatetimeListTable';
import Navbar from '../Navbar';
import ConfigurationModal from '../ConfigurationModal';
import ReportStatusModal from '../ReportStatusModal';

const Home = () => {
	
	let dateToday = moment().format('YYYY-MM-DD');
	let hourNow = moment().format('HH:mm');

	const initialDatetimeForm = { 
		id: null, 
		date: dateToday,
		arrivalTime: hourNow,
		lunchTime: hourNow,
		exitTime: hourNow
	};
	
	const datetimesDatainitial = [];
	const amountHourPerMonthInitial = 0;
	// Setting state general
	const [ datetimesData, setDatetimesData ] = useState(datetimesDatainitial);
	const [ currentDatetimeData, setCurrentDatetime ] = useState(initialDatetimeForm);
	const [ editing, setEditing ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);
	// Setting state user
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ amountHourPerMonth, setAmountHourPerMonth ] = useState(amountHourPerMonthInitial);
	const [ timeLunchBreak, setTimeLunchBreak ] = useState(0);
	// Setting state report
	const [ amountHourWorkedMonth, setAmountHourWorkedMonth ] = useState(0);
	// Setting state modal
	const [ showConfigModal, setShowConfigModal] = useState(false);
	const [ showReportStatusModal, setShowReportStatusModal] = useState(false);

	// CRUD operations

	useEffect(() => {
		getUserAPI();
	}, []);

	useEffect(() => {
		updateUserAPI(datetimesData, amountHourPerMonth, timeLunchBreak);
	}, [datetimesData, amountHourPerMonth, timeLunchBreak]);

	const getUserAPI = () => {
		setIsLoading(true);
		
		let payload = {
			email: localStorage.getItem('email')
		};
		
		axios.post('https://hp1v22z4ec.execute-api.us-east-1.amazonaws.com/dev/get-user', payload)
		.then((res) => {
			let myData = res.data.data;

			if(myData != null){
				setEmail(myData.email);
				setPassword(myData.password);

				if(myData.datetimes != null){
					setDatetimesData(myData.datetimes);
				} else{
					setDatetimesData([]);
				}

				if(myData.amountHourPerMonth != null){
					setAmountHourPerMonth(myData.amountHourPerMonth);
				} else{
					setAmountHourPerMonth(0);
				}

				if(myData.timeLunchBreak != null){
					setTimeLunchBreak(myData.timeLunchBreak);
				} else{
					setTimeLunchBreak(0);
				}
			}

			setIsLoading(false);
		})
		.catch((err) => {
			console.log(err);
		});
	};

	const updateUserAPI = (datetimesData, amountHourPerMonth, timeLunchBreak) => {
		setIsLoading(true);
		
		let payload = {
			email: localStorage.getItem('email'),
			password: localStorage.getItem('password'),
			amountHourPerMonth: amountHourPerMonth,
			timeLunchBreak: timeLunchBreak,
			datetimes: datetimesData
		};
		
		axios.put('https://hp1v22z4ec.execute-api.us-east-1.amazonaws.com/dev/update-user', payload)
		.then((res) => {
			setIsLoading(false);
		})
		.catch((err) => {
			console.log(err);
		});
	}

	const addDatetimeData = datetimeData => {
		datetimeData.id = datetimesData.length + 1;
		setDatetimesData([ ...datetimesData, datetimeData ]);
	}

	const deleteDatetimeData = id => {
		setEditing(false)
		setDatetimesData(datetimesData.filter(datetimeData => datetimeData.id !== id))
	}

	const updateDatetimeData = (id, updatedUser) => {
		setEditing(false)
		setDatetimesData(datetimesData.map(user => (user.id === id ? updatedUser : user)))
	}

	const editDatetimeData = datetimeData => {
		setEditing(true)
		setCurrentDatetime(datetimeData);
	}

	// Navbar operations
	const onReportStatusClicked = (e) =>{
		calculateReportMonth();
		setShowReportStatusModal(true);
	}

	const onConfigClicked = (e) =>{
		setShowConfigModal(true);
	}

	// Modal operations
	const cancelModal = (e) =>{
		setShowConfigModal(false);
		setShowReportStatusModal(false);
	}

	const confirmConfigModal = (email, password, amountHourMonth, timeLunchBreak) =>{
		setEmail(email);
		setPassword(password);
		setAmountHourPerMonth(amountHourMonth);
		setTimeLunchBreak(timeLunchBreak);
		setShowConfigModal(false);
	};

	// Aux operations
	const calculateReportMonth = () => {
		let monthCurrent = moment().format('YYYY-MM');
		let datetimesDataMonthCurrent = datetimesData.filter(datetimeData => datetimeData.date.includes(monthCurrent));
		let amountHourWorkedMonth = 0;

		datetimesDataMonthCurrent.forEach(datetime => {
			let begin = datetime.arrivalTime.toString().split(':')[0];
			let end = datetime.exitTime.toString().split(':')[0];
			let amountHourDay = (end-begin)-timeLunchBreak;
			amountHourWorkedMonth += amountHourDay;
		});
		
		setAmountHourWorkedMonth(amountHourWorkedMonth);
	}

	const getMessageReport = () => {
		return (
			<Fragment>
				<p>You need work {amountHourPerMonth}/h per month</p>
				<p>You work {amountHourWorkedMonth}/h per month</p>
				{
					amountHourWorkedMonth >= amountHourPerMonth ? 
					<p>Your status great for this month</p> 
					:
					<p>Your status is bad for this month</p>
				}
			</Fragment>
		);
	};

	return (
		<div>
			{
				isLoading ? 
				<Block/> :
				(
					<Fragment>
						<Navbar 
							onReportClicked={onReportStatusClicked} 
							onConfigClicked={onConfigClicked} >
						</Navbar>
						<ConfigurationModal 
							amountHourPerMonth={amountHourPerMonth}
							timeLunchBreak={timeLunchBreak}
							showModal={showConfigModal} 
							cancelModal={cancelModal}
							confirmModal={confirmConfigModal}>
						</ConfigurationModal>
						<ReportStatusModal
							message={getMessageReport()}
							showModal={showReportStatusModal} 
							cancelModal={cancelModal}>
						</ReportStatusModal>

						<div className="flex-row container">
							<div className="flex-large">
							{
								editing ? 
								(
									<EditHourForm
										editing={editing}
										setEditing={setEditing}
										currentDatetime={currentDatetimeData}
										updateDatetime={updateDatetimeData}
									/>
								) 
								: 
								(
									<AddDatetimeForm addDatetime={addDatetimeData} />
								)
							}
							</div>
							<div className="flex-large">
								<DatetimeListTable datetimesData={datetimesData} editDatetime={editDatetimeData} deleteDatetime={deleteDatetimeData} />
							</div>
						</div>
					</Fragment>
				)
			}
		</div>
	);
}

export default Home;