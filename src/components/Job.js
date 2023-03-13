import url from '../url';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Jobs() {
	const [jobs, setJobs] = useState([]);

	function parse(timestamp) {
		const date = new Date(timestamp);

		// Extract the day, month, and year components from the Date object
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();

		// Convert the components into a string in the format "dd/mm/yyyy"
		return `${day}/${month}/${year}`;
	}

	const deleteHandle = async e => {
		const response = window.confirm('Are you sure you want to do that?');

		if (response) {
			await axios.delete(`${url}/api/v1/jobs/${e.target.value}`);
		}
		return;
	};
	useEffect(() => {
		axios.get(`${url}/api/v1/jobs`).then(response => {
			setJobs(response.data.data);
		});
	}, []);

	return (
		<div>
			<div className="d-flex justify-content-between mb-3">
				<h1>Job Openings</h1>
				<Link to="/job" className="btn btn-primary">
					Add company/Job
				</Link>
			</div>
			<table className="table table-stripped">
				<thead>
					<tr>
						<th>Company Logo</th>
						<th>Company Name</th>
						<th>H1B Approved</th>
						<th>Job Title</th>
						<th>Posted Date</th>
						<th>Apply Link</th>
						<th>Edit</th>
						<th>Delete</th>
					</tr>
				</thead>
				<tbody>
					{jobs.map(job => (
						<tr key={job.jobId}>
							<td>
								<img
									src={job.company.logo}
									alt={job.company.name}
									width="50"
								/>
							</td>
							<td>{job.company.name}</td>
							<td>{job.company.h1b}</td>
							<td>{job.jobTitle}</td>
							<td>{parse(job.jobPostedDate)}</td>
							<td>
								<a
									href={job.jobLink}
									target="blank"
									className="btn btn-success"
								>
									Apply
								</a>
							</td>
							<td></td>
							<td>
								<button
									onClick={deleteHandle}
									className="btn btn-danger"
									value={job.jobId}
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Jobs;
