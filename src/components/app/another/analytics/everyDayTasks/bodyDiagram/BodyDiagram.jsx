import styles from "./../EveryDayTask.module.css"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';


export default function BodyDiagram() {
    const weeklyDate = [
        { day: 'Понедельник', time: 12, category: 'hygien' },
        { day: 'Вторник', time: 19, category: 'hygien' },
        { day: 'Среда', time: 13, category: 'hygien' },
        { day: 'Четверг', time: 15, category: 'hygien' },
        { day: 'Пятница', time: 22, category: 'hygien' },
        { day: 'Суббота', time: 8, category: 'hygien' },
        { day: 'Воскресенье', time: 10, category: 'hygien' }
    ]

    const getBarColor = (value) => {
        if (value >= 20) return '#28a745'; // Отлично - зеленый
        if (value >= 15) return '#ffc107'; // Хорошо - желтый
        if (value >= 10) return '#fd7e14'; // Нормально - оранжевый
        return '#dc3545'; // Нужно улучшить - красный
    }

    const CustomTooltip = ({active, payload, label}) => {
        if (active && payload && payload.length) {
            return (
                 <div className="custom-tooltip">
                    <p className="tooltip-label">{`${label}`}</p>
                    <p className="tooltip-value" style={{ color: payload[0].color }}>
                        {`Затраченное время: ${payload[0].value} часов`}
                    </p>
                    <p className="tooltip-category">
                        {`Оценка: ${
                        payload[0].value >= 20 ? 'Отлично' :
                        payload[0].value >= 15 ? 'Хорошо' :
                        payload[0].value >= 10 ? 'Нормально' : 'Нужно улучшить'
                        }`}
                    </p>
                    </div>
            )
        }

        return null
    }
    return (
        <div className="chart-container">
            <h2 className="chart-title">Еженедельная статистика времени</h2>
            <p className="chart-subtitle">Затраченное время по дням недели</p>

            <ResponsiveContainer width="100%" height={400}>
                <BarChart 
                    data={weeklyDate}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 60, // Увеличили для длинных названий дней
                    }}  
                >

                    {/* Сетка помогает читать значения */}
                    <CartesianGrid
                        strokeDasharray="3 3" // Что это такое?
                        vertical={false}
                        stroke="#f0f0f0"
                    />

                    {/* Ось X */}
                    <XAxis 
                        dataKey="day" // Берем значение из поля day в данных
                        angle={-45} // Для улучшеия читаемость наклон подписей
                        textAnchor="end" // Что это
                        height={80} // Мето для подписей
                        tick={{ fontSize: 10, fill: '#666' }} // Что это?
                        interval={0} // Что это?

                    />

                    <YAxis 
                        tick={{ fontSize: 12, fill: '#666' }}
                        label={{
                            value: "Время (часы)",
                            angle: -90,
                            position: "insideLeft",
                            offset: -10,
                            style: { textAnchor: 'middle', fill: '#666' }
                        }}
                        domain={[0, 'dataMax + 5']} // Автоматически расширяет диапазон
                        
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}