import { useEffect } from 'react'
import Container from './Container'

function Page(props) {
	useEffect(() => {
		document.title = `${props.title}`
		window.scrollTo(0, 0)
	}, [props.title])
	return <Container fluid={props.fluid}>{props.children}</Container>
}

export default Page
