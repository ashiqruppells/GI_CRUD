import { useState } from 'react'
import React, { useEffect, useRef } from 'react'
import { Navigate, Route, Routes, useParams, useSearchParams } from 'react-router-dom'
import { styled } from 'styled-components'
import Notes from '../../screens/Notes.jsx'


const DashboardRouter = () => {

	const screenRef = useRef()
	const [isActive, setActive] = useState(false)


	return (
		<Wrapper>
			<Container>
				<Screen>
					<Routes>
						<Route path="/" element={<Notes />} />
					</Routes>
				</Screen>
			</Container>
		</Wrapper>
	)
}

export default DashboardRouter

const Wrapper = styled.section`
	
`
const Container = styled.div`
	display: flex;
`
const Screen = styled.div`
	padding: 20px;
	width: calc(100vw - 250px);
	height: calc(100vh - 98px);
	/* overflow-y: scroll; */
	overflow-x: hidden;
`