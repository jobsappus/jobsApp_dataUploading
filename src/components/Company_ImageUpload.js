import React from 'react'
import { useDropzone } from 'react-dropzone'

function Company_ImageUpload(props) {
	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: 'image/*',
		multiple: false,
		onDrop: acceptedFiles => {
			props.setFile(acceptedFiles[0])
		}
	})

	return (
		<>
			<form className="px-4">
				<h2 className="text-center mb-4">Upload Form</h2>
				<div
					className={`dropzone ${isDragActive ? 'active' : ''}`}
					{...getRootProps()}
				>
					<input {...getInputProps()} />
					{props.file ? (
						<>
							<img
								src={URL.createObjectURL(props.file)}
								alt="Uploaded file"
								className="img-fluid"
							/>
							<p>{props.file.name}</p>
						</>
					) : (
						<>
							<p className="text-center mb-0">
								Drag and drop an image here or click to select one
							</p>
							<p className="text-center text-muted mb-0">
								Only .jpg or .png files accepted
							</p>
						</>
					)}
				</div>
				{props.file && (
					<div className="d-grid gap-2">
						<button
							type="button"
							className="btn btn-outline-secondary"
							onClick={() => props.setFile(null)}
						>
							Remove
						</button>
					</div>
				)}
			</form>
		</>
	)
}

export default Company_ImageUpload
