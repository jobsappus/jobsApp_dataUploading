function Container(props) {
	return (
		<>
			<div className={`container${props.fluid ? '-fluid' : ' '} my-5 px-5`}>
				{props.children}
			</div>
		</>
	)
}

export default Container
