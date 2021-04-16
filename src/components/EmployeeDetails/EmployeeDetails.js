import React from 'react';
import classes from './EmployeeDetails.css';
import DropDown from '../DropDown/DropDown';


const EmployeeDetails = (props) => {
	const deptOptions = ["Strategy", "Marketing", "Operations", "Finance", "Human Resources (HR)"];
	const desgOptions = ["Trainee Engineer", "Software Engineer", "Programmer Analyst", "Senior Software Engineer", "System Analyst", "Project Lead", "Project Manager", "Program Manager"];
	return (
		<div className={classes.empDetailsWrap}>
			<h1>Employee Form</h1>
			<form onSubmit={props.frmSubmit} method='POST'>
				<div className={classes.fieldWrap}>
					<label className={classes.fieldLbl}>Employee Number</label>
					<input type="number" name="empNumber" id="empNumber" placeholder="Enter Employee ID" min='1' className = {classes.textInput}/>
					<span className={classes.erroMsg}>{props.errMsgs.empNumberError}</span>
				</div>
				
				<div className={classes.fieldWrap}>
					<label className={classes.fieldLbl}>Employee Name</label>
					<input type='text' name='empName' id='empName' placeholder='Enter Employee Name' min='1' className = {classes.textInput}/>
					<span className={classes.erroMsg}>{props.errMsgs.empNameError}</span>
				</div>
				
				<div className={classes.fieldWrap}>
					<label className={classes.fieldLbl}>Salary</label>
					<input type='number' name='empSalary' id='empSalary' placeholder='Enter Employee Salary' className = {classes.textInput}/>
						<span className={classes.erroMsg}>{(props.errMsgs.empSalaryError)?props.errMsgs.empSalaryError:null}</span>
				</div>

				<div className={classes.fieldWrap}>
					<label className={classes.fieldLbl}>Department Name</label>
					<DropDown name='deptName' id='deptName' defaultOpt='Select Department' options={deptOptions}/>
					<span className={classes.erroMsg}>{props.errMsgs.deptNameError}</span>
				</div>

				<div className={classes.fieldWrap}>
					<label className={classes.fieldLbl}>Designation</label>
					<DropDown name='designation' id='designation' defaultOpt='Select Designation' options={desgOptions}/>
					<span className={classes.erroMsg}>{props.errMsgs.designationError}</span>
				</div>

				<div className={classes.fieldWrap}>
					<label className={classes.fieldLbl}>&nbsp;</label>
					<button className={classes.sbmtButton} >Add Details</button>
				</div>
			</form>
		</div>
	);
} 

export default EmployeeDetails;