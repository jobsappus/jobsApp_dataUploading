import url from '../url';
import { useState, useEffect, useContext } from 'react';
import Axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

import { Link, useNavigate } from 'react-router-dom';

import Page from './Page';

const JobCreate = () => {
	const navigate = useNavigate();

	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	const [selectedDate, setSelectedDate] = useState(new Date());
	const {
		register,
		formState: { errors },
	} = useForm();
	const [companies, setCompanies] = useState([]);

	// get the companies data
	useEffect(() => {
		if (!appState.loggedIn) {
			appDispatch({
				type: 'flashMessage',
				value: {
					message:
						'You must be logged in as an admin to proceed with this action.',
					color: 'danger',
				},
			});
			navigate('/');
			return;
		}

		const ourRequest = Axios.CancelToken.source();
		async function fetchResults() {
			try {
				const response = await Axios.get(`${url}/api/v1/companies`);
				console.log(response.data);
				setCompanies(response.data.data.sort((a, b) => a.name > b.name));
			} catch (e) {
				console.log('There was a problem or the request was cancelled.');
			}
		}
		fetchResults();
		return () => {
			ourRequest.cancel();
		};
	}, []);

	const onSubmit = async e => {
		e.preventDefault();
		const { company, jobTitle, jobLink, jobDate, jobType, jobDesc } =
			e.target;
		try {
			const response = await Axios.post(`${url}/api/v1/jobs`, {
				companyId: company.value,
				jobTitle: jobTitle.value,
				jobLink: jobLink.value,
				jobPostedDate: jobDate.value,
				jobType: jobType.value,
				jobDesc: jobDesc.value,
				token: appState.token,
			});

			if (response.data.ok) {
				appDispatch({
					type: 'flashMessage',
					value: {
						message: 'Job posted successfully!!',
						color: 'success',
					},
				});
				setTimeout(() => {
					window.location.reload();
				}, 2000);
			} else {
				appDispatch({
					type: 'flashMessage',
					value: response.data.message,
					color: 'danger',
				});
			}
		} catch (err) {
			console.log(err);
			appDispatch({
				type: 'flashMessage',
				value: 'error uploading',
				color: 'danger',
			});
		}
	};
	return (
		<Page title="Add Jobs" fluid={true}>
			<div className="login-form-container">
				<div className="row justify-content-center align-items-center">
					<div className="col-md-6 col-lg-4">
						<Form onSubmit={onSubmit}>
							<Form.Group controlId="formCompany">
								<Form.Label>Select a company:</Form.Label>
								<Form.Select
									{...register('company', { required: true })}
								>
									<option value="">--Select a company--</option>
									{companies.map((company, i) => (
										<option key={i} value={company.companyId}>
											{company.name}
										</option>
									))}
								</Form.Select>
								<Link to="/company" className="btn btn-primary">
									Add a new company
								</Link>
								{errors.company && (
									<Form.Text>Please select a company.</Form.Text>
								)}
							</Form.Group>

							<Form.Group controlId="formJobTitle">
								<Form.Label>Add job title:</Form.Label>
								<Form.Control
									type="text"
									placeholder="Job title"
									{...register('jobTitle', { required: true })}
								/>
								{errors.jobTitle && (
									<Form.Text>Please enter a job title.</Form.Text>
								)}
							</Form.Group>

							<Form.Group controlId="formJobLink">
								<Form.Label>Add job link:</Form.Label>
								<Form.Control
									type="text"
									placeholder="Job link"
									{...register('jobLink', { required: true })}
								/>
								{errors.jobLink && (
									<Form.Text>Please enter a job link.</Form.Text>
								)}
							</Form.Group>

							<Form.Group controlId="formJobDate">
								<Form.Label>Job posted date:</Form.Label>
								<br />
								<DatePicker
									selected={selectedDate}
									onChange={date => setSelectedDate(date)}
								/>
								<input
									type="hidden"
									{...register('jobDate', { required: true })}
									value={selectedDate.toISOString()}
								/>
								{errors.jobDate && (
									<Form.Text>
										Please select a job posted date.
									</Form.Text>
								)}
							</Form.Group>

							<Form.Group controlId="formJobType">
								<Form.Label>Job type:</Form.Label>
								<Form.Select
									{...register('jobType', { required: true })}
								>
									<option value="">--Select a job type--</option>
									<option value={false}>Internship</option>
									<option value={true}>Full Time</option>
								</Form.Select>
								{errors.jobType && (
									<Form.Text>Please select a job type.</Form.Text>
								)}
							</Form.Group>

							<Form.Group controlId="formJobDesc">
								<Form.Label>Job description:</Form.Label>
								<Form.Control
									as="textarea"
									rows={3}
									{...register('jobDesc', { required: true })}
								/>
								{errors.jobDesc && (
									<Form.Text>
										Please enter a job description.
									</Form.Text>
								)}
							</Form.Group>

							<Button type="submit m-3">Submit</Button>
							<Link to="/" className="btn btn-success my-3 mx-5">
								view jobs
							</Link>
						</Form>
					</div>
				</div>
			</div>
		</Page>
	);
};

export default JobCreate;
