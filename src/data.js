import roadData from './responses/here'  // from HERE API
import weatherData from './responses/weather'  // from OpenWeather


const data = []
roadData['link'].forEach(link => {
    const dataPoint = {}
    const { shape } = link
    const { attributes } = link
    const speed = attributes['TRAFFIC_PATTERN_FCN'][0]
    const lat = shape[0]
    const lng = shape[1]

    let temprature = '-'
    let temp_min = '-'
    let temp_max = '-'
    let main_condition = '-'
    let condition = '-'
    let location_name = '-'
    let feels_like = '-'
    let pressure = '-'
    let humidity = '-'
    let wind_speed = '-'
    let icon = '';

    // find weather data by lat lng
    const weather = weatherData.find(w => parseFloat(w.coord.lat).toFixed(4) == parseFloat(lat).toFixed(4) && parseFloat(w.coord.lon).toFixed(4) == parseFloat(lng).toFixed(4))
    if (weather) {
        temprature = Math.round(((parseFloat(weather.main.temp)-273.15)*1.8)+32);
        temp_min = `${Math.round(((parseFloat(weather.main.temp_min)-273.15)*1.8)+32)}`
        temp_max = `${Math.round(((parseFloat(weather.main.temp_max)-273.15)*1.8)+32)}`
        main_condition = weather.weather[0].main
        condition = weather.weather[0].description
        icon = weather.weather[0].icon
        location_name = weather.name
        feels_like = Math.round(((parseFloat(weather.main.feels_like)-273.15)*1.8)+32)
        pressure = weather.main.pressure
        humidity = weather.main.humidity
        wind_speed = weather.wind.speed
    }

    // Vehicle
    dataPoint['lat'] = lat
    dataPoint['lng'] = lng
    dataPoint['dist'] = roadData['length'] - link.remainDistance
    
    // Road Info
    dataPoint['speed'] = speed['AVG_SPEED']
    dataPoint['road'] = attributes['ROAD_GEOM_FCN'][0]['NAME']
    dataPoint['country'] = attributes['ROAD_ADMIN_FCN'][0]['ISO_COUNTRY_CODE']
    // Weather
    dataPoint['icon'] = icon
    dataPoint['temprature'] = temprature
    dataPoint['temp_min'] = temp_min
    dataPoint['temp_max'] = temp_max
    dataPoint['main_condition'] = main_condition
    dataPoint['condition'] = condition
    dataPoint['location_name'] = location_name
    dataPoint['feels_like'] = feels_like
    dataPoint['pressure'] = pressure
    dataPoint['humidity'] = humidity
    dataPoint['wind_speed'] = wind_speed
    
    // only push data if weather data is present in the response
    if (weather)
        data.push(dataPoint)

})

const columns = [
    {
        Header: 'Vehicle',
        columns: [
            {
                Header: 'Latitude',
                accessor: 'lat',
            },
            {
                Header: 'Longitude',
                accessor: 'lng',
            },
            {
                Header: 'Distance Traveled',
                accessor: 'dist'
            }
        ]
    },
    {
        Header: 'Road Info',
        columns: [
            {
                Header: 'Name',
                accessor: 'road',
            },
            {
                Header: 'Country',
                accessor: 'country',
            },
            {
                Header: 'Speed(Kmph)',
                accessor: 'speed',
            },
        ]
    },
    {
        Header: 'Weather',
        columns: [
            {
                Header: 'Condition',
                accessor: 'condition',
            },
            {
                Header: 'Temprature(C)',
                accessor: 'temprature',
            },
            {
                Header: 'Temprature Range(C)',
                accessor: 'temp_range',
            },
            {
                Header: 'Feels Like(C)',
                accessor: 'feels_like',
            },
            {
                Header: 'Pressure(hPa)',
                accessor: 'pressure',
            },
            {
                Header: 'Humidity(%)',
                accessor: 'humidity',
            },
            {
                Header: 'Wind Speed(Kmph)',
                accessor: 'wind_speed',
            },
            {
                Header: 'Location',
                accessor: 'location_name',
            },
        ]
    }
]

export {
    columns,
    data
}
