import React from 'react'

export interface CoursePart {
	name: string
	exerciseCount: number
}

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
		</div>
	)
}

export default Content
