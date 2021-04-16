import React, {PureComponent,Fragment} from 'react';
import EmployeeDetails from '../../components/EmployeeDetails/EmployeeDetails';
import TableContainer from '../DataTable/DataTable';
import memoize from 'memoize-one';

let validationMsgs = [];
const columns = memoize((handleAction, hideAction) => [
	{
		name: 'Employee No',
		selector: 'empNumber',
		sortable: true,
	},
	{
		name: 'Employee Name',
		selector: 'empName',
		sortable: true,
	},
	{
		name: 'Salary',
		selector: 'empSalary',
		sortable: true,
	},
	{
		name: 'Department',
		selector: 'deptName',
	},
	{
		name: 'Designation',
		selector: 'designation',
	},
	{
		name: 'Delete',
		cell: (row) => <button id={"row-"+row.id} class="DeleteClass" onClick={handleAction}>Delete</button>,
		ignoreRowClick: true,
		allowOverflow: true,
		button: true,
		omit: hideAction
	},
]);

const data = [
    {empNumber: '1', empName: 'Rohan', empSalary:"1239",designation:"HR", deptName: 'Managment'},
    {empNumber: '2', empName: 'Barry', empSalary:"1263",designation:"Developer", deptName: 'Tech'},
    {empNumber: '3', empName: 'James', empSalary:"23",designation:"QA", deptName: 'Tech'},
    {empNumber: '4', empName: 'Oliver',empSalary:"13",designation:"Admin", deptName: 'Managment'},
    {empNumber: '5', empName: 'Dipika',empSalary:"1223",designation:"QA", deptName: 'Tech'},
    {empNumber: '6', empName: 'Oliver',empSalary:"1213",designation:"Deveopler", deptName: 'Tech'},
    {empNumber: '7', empName: 'Dipika',empSalary:"1232",designation:"HR", deptName: 'Managment'},
];
class FormWrapper extends PureComponent {

	constructor (props) {
		super(props);
		this.state = {
			validationErr: false,
			employeeData: data,
			hideAction: true,
			sortOrderTitle: "ASC",
			sortOrderYear: "ASC",
		}
	}

	validateFormHandler = (event) => {
		event.preventDefault();
		validationMsgs = [];
		const regUserName = /^[a-zA-Z ]+$/;

		var Err = false;
		if (event.target.empNumber.value === "") {
			validationMsgs['empNumberError'] = "Employee number field is required";
			Err = true;	
		}

		if (event.target.empNumber.value < 1 ) {
			validationMsgs['empNumberError'] = "Employee number should be greater than 0";
			Err = true;
		}

		if ( event.target.empName.value === "" || !regUserName.test(event.target.empName.value) ) {
			validationMsgs['empNameError'] ="Employee name field is required";
			Err = true;
		}

		if ( event.target.empSalary.value === "" || event.target.empSalary.value < 1 ) {
			validationMsgs['empSalaryError'] ="Employee salary field is required";
			Err = true;
		}
		if (event.target.empSalary.value < 1) {
			validationMsgs['empSalaryError'] ="Employee salary field must be a positive number";
			Err = true;
		}

		if ( event.target.deptName.value === "" ) {
			validationMsgs['deptNameError'] ="Department field is required";
			Err = true;
		}

		if ( event.target.designation.value === "" ) {
			validationMsgs['designationError'] ="Designation field is required";
			Err = true;
		}

		if (Err) {
			this.setState({
				employeeData: [...this.state.employeeData],
				validationErr: true
			});
			
		} else {
			let oldState = [...this.state.employeeData];
			let stateIndex = 0;
			let empId;
			if ( oldState.length > 0 ) {
				empId = oldState.length + 1;
				stateIndex = oldState.length;
			} else {
				empId = 1;
				stateIndex = 0;
			}
			oldState[stateIndex] = {"id": empId, "empNumber": event.target.empNumber.value, "empName": event.target.empName.value, "empSalary": event.target.empSalary.value, "deptName": event.target.deptName[event.target.deptName.selectedIndex].text, "designation": event.target.designation[event.target.designation.selectedIndex].text};
			event.target.reset();
			this.updateEmployeeData(oldState);
		}
	}

	updateEmployeeData = (data) => {
		this.setState({
			employeeData: data,
			validationErr: false
		});

	};

	handleRowDelete = (state) => {
		let rowId = (state.target.id).split("-")[1];
		let oldState = [...this.state.employeeData];
		let ind = null;
		let x = window.confirm("Are you sure you want to delete this?");
		if ( x ) {
			let arrayIndex = Object.keys(oldState).map(stKey => {
				if ( parseInt(oldState[stKey].id, 10) === parseInt(rowId, 10) ) {
					ind = stKey;
				}
				return (ind);
			});

			let uniqueInd = this.filter_array_values(arrayIndex)[0];
			oldState.splice(uniqueInd, 1);
			this.setState({
				employeeData: [...oldState]
			});
		}
	};

	filter_array_values = (arr) => {
	  	arr = arr.filter(this.isEligible);
	  	return arr;
	}


	isEligible = (value) => {
	  	if(value !== false || value !== null || value !== 0 || value !== "") {
	    	return value;
	  	}
	}

	chkBoxHandler = (event) => {
		if (event.target.checked) {
			this.setState({
				hideAction: false
			});
		} else {
			this.setState({
				hideAction: true
			});
		}
	}
	
	render () {
		return (
			<Fragment>
				<EmployeeDetails errMsgs={validationMsgs} frmSubmit={this.validateFormHandler} />
				<TableContainer 
					columns={columns} 
					handleRowDelete={this.handleRowDelete} 
					hideAction={this.state.hideAction} 
					employeeData={this.state.employeeData}
					chkBoxHandler={this.chkBoxHandler}
				/>
			</Fragment>
		);
	}
}

export default FormWrapper;