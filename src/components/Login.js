import url from '../url';
import { useState, useContext } from 'react';
import Axios from 'axios';
import Page from './Page';

const DispatchContext = require('../DispatchContext');

function Login() {
	const appDispatch = useContext(DispatchContext);

	const [loginId, setLoginId] = useState('');
	const [password, setPassword] = useState('');

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const response = await Axios.post(`${url}/api/v1/users/login`, {
				loginId,
				password,
			});

			if (response.data.ok) {
				appDispatch({
					type: 'flashMessage',
					value: {
						message: 'Logged in successfully! Welcome man',
						color: 'success',
					},
				});
				appDispatch({ type: 'login', value: response.data.token });
			} else {
				setPassword('');
				appDispatch({
					type: 'flashMessage',
					value: {
						message: 'Invalid login ID or password',
						color: 'danger',
					},
				});
			}
		} catch (err) {
			console.log(err);
			appDispatch({
				type: 'flashMessage',
				value: {
					message: 'Please try again later',
					color: 'danger',
				},
			});
		}
	}

	return (
		<Page title="Login" fluid={true}>
			<div>
				<div className="login-form-container">
					<div className="row justify-content-center align-items-center">
						<div className="col-md-6 col-lg-4">
							<form
								onSubmit={handleSubmit}
								className="p-4 rounded shadow"
							>
								<h2 className="text-center mb-4">Login</h2>
								<div className="form-floating mb-3">
									<input
										type="text"
										className="form-control"
										id="loginIdInput"
										placeholder="Enter your login ID"
										value={loginId}
										onChange={e => setLoginId(e.target.value)}
									/>
									<label htmlFor="loginIdInput">Login ID</label>
								</div>
								<div className="form-floating mb-4">
									<input
										type="password"
										className="form-control"
										id="passwordInput"
										placeholder="Enter your password"
										value={password}
										onChange={e => setPassword(e.target.value)}
									/>
									<label htmlFor="passwordInput">Password</label>
								</div>
								<div className="d-grid">
									<button
										type="submit"
										className="btn btn-primary btn-lg"
									>
										Submit
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Page>
	);
}

export default Login;
