import { Bar, BarChart, ResponsiveContainer, XAxis } from "recharts"
import styles from "./../EveryDayTask.module.css"


export default function BodyDiagram(
    {
        renderEveryDayTaskResult, 
        data7Days,
        selectCategory,
        selectTimesInterval,
    }) {
   
    return (
        <div className={styles.everyDayTaskBodyContentWrapper}>
            <div className={styles.everyDayTaskBodyContent}>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={[
                            {
                                data: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).one.data,
                                date: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).one.date
                            },
                            {
                                data: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).two.data,
                                date: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).two.date
                            },
                            {
                                data: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).three.data,
                                date: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).three.date
                            },
                            {
                                data: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).four.data,
                                date: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).four.date
                            },
                            {
                                data: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).five.data,
                                date: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).five.date
                            },
                            {
                                data: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).six.data,
                                date: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).six.date
                            },
                            {
                                data: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).seven.data,
                                date: renderEveryDayTaskResult(data7Days, selectCategory, selectTimesInterval).seven.date
                            }
                        ]}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 20
                        }}

                    >
                        <XAxis 
                            dataKey={"date"}
                            tick={{fontSize: 18, fill: "#CDCDCD", fontWeight: 600}}
                            interval={0}
                            axisLine={false}
                            tickLine={false}
                        />

                        <Bar 
                            dataKey={"data"}
                            radius={[20, 20, 20, 20]}
                            animationBegin={0}
                            animationDuration={800}
                            animationEasing="ease-in-out"
                            fill="#A3BAF5"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}