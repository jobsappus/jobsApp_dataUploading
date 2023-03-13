import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useImmerReducer } from 'use-immer'

import StateContext from './StateContext'
import DispatchContext from './DispatchContext'

// login Page
import Login from './components/Login'
import Company from './components/Company'
import Job from './components/Job'
import JobCreate from './components/JobCreate'
import FlashMessages from './components/FlashMessages'

function App() {
	const initialState = {
		token: localStorage.getItem('token'),
		loggedIn: Boolean(localStorage.getItem('token')),
		flashMessages: []
	}

	function ourReducer(draft, action) {
		switch (action.type) {
			case 'login':
				draft.loggedIn = true
				draft.token = action.value
				return
			case 'logout':
				draft.loggedIn = false
				return
			case 'flashMessage':
				draft.flashMessages.push(action.value)
				return
			default:
				return
		}
	}
	const [state, dispatch] = useImmerReducer(ourReducer, initialState)

	useEffect(() => {
		if (state.loggedIn) {
			localStorage.setItem('token', state.token)
		} else {
			localStorage.removeItem('token')
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.loggedIn])

	return (
		<StateContext.Provider value={state}>
			<DispatchContext.Provider value={dispatch}>
				<BrowserRouter>
					<FlashMessages messages={state.flashMessages} />
					<Routes>
						<Route
							path="/"
							element={state.loggedIn ? <Job /> : <Login />}
						/>
						<Route path="/job" element={<JobCreate />} />
						<Route path="/company" element={<Company />} />
					</Routes>
				</BrowserRouter>
			</DispatchContext.Provider>
		</StateContext.Provider>
	)
}

export default App
