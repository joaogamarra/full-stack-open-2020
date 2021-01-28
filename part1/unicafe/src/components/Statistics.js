import Statistic from "./Statistic";

const Statistics = ({ statistics }) => {
    const {title, good, neutral, bad, all, average, positive } = statistics

    if (all > 0) {
        return (
            <>
                <h2>{title}</h2>
                <table>
                    <tbody>
                        <Statistic text="good" value={good} />
                        <Statistic text="neutral" value={neutral} />
                        <Statistic text="bad" value={bad} />
                        <Statistic text="all" value={all} />
                        <Statistic text="average" value={average} />
                        <Statistic text="positive" value={`${positive} %` } />
                    </tbody>
                </table>
            </>
        )
    }
    
    return (
        <>
            <h2>{title}</h2>
            <p>No feedback given</p>
        </>
    )
}

export default Statistics