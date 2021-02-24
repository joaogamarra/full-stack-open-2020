interface CoursePartBase {
	name: string
	exerciseCount: number
}

interface CoursePartBaseWithOptionalDescription extends CoursePartBase {
	description?: string
}

interface CoursePartOne extends CoursePartBaseWithOptionalDescription {
	name: 'Fundamentals'
}

interface CoursePartOne extends CoursePartBase {
	name: 'Fundamentals'
}

interface CoursePartTwo extends CoursePartBaseWithOptionalDescription {
	name: 'Using props to pass data'
	groupProjectCount: number
}

interface CoursePartThree extends CoursePartBase {
	name: 'Deeper type usage'
	exerciseSubmissionLink: string
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree