function Form(props) {
	return (
		<>
			<form onSubmit={props.handleSubmit} className="p-4">
				<h2 className="text-center mb-4">Company Details</h2>
				<div className="form-floating mb-3">
					<input
						type="text"
						className="form-control"
						id="loginIdInput"
						placeholder="Enter your login ID"
						value={props.first}
						onChange={e => props.setFirst(e.target.value)}
					/>
					<label htmlFor="loginIdInput" className="text-muted">
						Company Name
					</label>
				</div>
				<div className="form-floating mb-4">
					<input
						type="number"
						className="form-control"
						id="numberInput"
						placeholder="Enter here"
						value={props.second}
						onChange={e => props.setSecond(e.target.value)}
					/>
					<label htmlFor="numberInput" className="text-muted">
						H1B Approved
					</label>
				</div>
			</form>
		</>
	)
}

export default Form
