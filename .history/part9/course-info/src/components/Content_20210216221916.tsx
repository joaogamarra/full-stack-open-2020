import React from 'react'
import { CoursePart } from '../types'

const Content: React.FC<{ courseParts: CoursePart[] }> = (props) => {
	return (
		<div>
			<p>
				{props.courseParts[0].name} {props.courseParts[0].exerciseCount}
			</p>
			<p>
				{props.courseParts[1].name} {props.courseParts[1].exerciseCount}
			</p>
			<p>
				{props.courseParts[2].name} {props.courseParts[2].exerciseCount}
			</p>
			<p>
				{props.courseParts[3].name} {props.courseParts[3].exerciseCount}
			</p>
		</div>
	)
}

export default Content
