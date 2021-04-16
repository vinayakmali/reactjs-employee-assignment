import React from 'react';
import DataTable from 'react-data-table-component';


const TableContainer = (props) => {
	return (
		<div>

			<div style={{float: 'right', clear: 'both', top: '45px', position: 'relative', zIndex: '9'}}>
				<label>
					<input type='checkbox' name='canDelete' id='canDelete' onClick={props.chkBoxHandler}/> Allow Delete
				</label>
			</div>

			<DataTable
		        title="Employee List"
		        columns={props.columns(props.handleRowDelete, props.hideAction)}
		        data={props.employeeData}
		        striped={true}
		        pagination={true}
		        paginationRowsPerPageOptions = {[5, 10, 15, 20, 25, 30]}
		        noDataComponent="No Records To Display"
		        customStyles={props.customStyles}
		    />
		</div>
	);
}

export default TableContainer;
