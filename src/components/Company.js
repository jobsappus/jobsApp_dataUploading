import url from '../url';
import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Page from './Page';

import ImageUpload from './Company_ImageUpload';
import Form from './Form';

import Axios from 'axios';
import StateContext from '../StateContext';
import DispatchContext from '../DispatchContext';

function Company() {
	const appState = useContext(StateContext);
	const appDispatch = useContext(DispatchContext);

	const navigate = useNavigate();

	const [uploading, setUploading] = useState(false);
	const [file, setFile] = useState(null);
	const [name, setName] = useState('');
	const [h1b, setH1b] = useState('');
	// console.log(file)

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
		}
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		setUploading(true);
		const formData = new FormData();
		formData.append('image', file);
		formData.append('name', name);
		formData.append('h1b', h1b);
		formData.append('token', appState.token);
		try {
			const response = await Axios.post(`${url}/api/v1/companies`, formData);
			setUploading(false);
			// console.log(response)
			setFile(null);
			setName('');
			setH1b('');
			if (response.data.ok) {
				appDispatch({
					type: 'flashMessage',
					value: {
						message: 'Uploaded successfully!',
						color: 'success',
					},
				});
			} else {
				appDispatch({
					type: 'flashMessage',
					value: {
						message: response.data.message,
						color: 'danger',
					},
				});
			}
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<Page title="Upload Company" fluid={true}>
			<div className="rounded shadow pb-2">
				<div className="m-5 row justify-content-center">
					<div className="col p-5">
						<ImageUpload file={file} setFile={setFile} />
					</div>
					<div className="col p-5">
						<Form
							first={name}
							second={h1b}
							setFirst={setName}
							setSecond={setH1b}
						/>
					</div>
				</div>
				<div className="d-flex justify-content-center">
					<button
						className="btn btn-primary btn-lg"
						disabled={!file && !name && !h1b}
						onClick={handleSubmit}
					>
						{uploading ? 'uploading...😁' : 'Upload'}
					</button>
				</div>
			</div>
		</Page>
	);
}

export default Company;
