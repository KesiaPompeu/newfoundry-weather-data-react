import React from 'react'
import './TripWidget.css'

function Widget(props) {
    const { data } = props
    return (
        data.map((dataPoint, i) => {
            let src = '';
            if (dataPoint.icon) {
                src = `http://openweathermap.org/img/w/${dataPoint.icon}.png`;
            } else {
                src = '';
            }
            return (
                <div className="widget">
                    <div className='city flex space-between'>
                        <div>
                            <h1>
                                {dataPoint.road}
                                {(src) ? <img src={src} alt="weather icon" /> : ''}
                            </h1>
                            <p>{(dataPoint.location_name != '-') ? dataPoint.location_name+', ' : ''} {dataPoint.country}</p>
                        </div>
                        <div className='coord'>
                            <p>
                                <strong>Latitude</strong>
                                <br />
                                {dataPoint.lat}
                            </p>
                            <p>
                                <strong>Longitude</strong>
                                <br />
                                {dataPoint.lng}
                            </p>
                        </div>
                    </div>
                    <div className='weather'>
                        
                        <h2>Weather</h2>
                        <div className='flex'>
                            <div className='item'>
                                <h3>Condition</h3>
                                <p className='value'>{dataPoint.main_condition}</p>
                                <p className='text-sm'>{dataPoint.condition}</p>
                            </div>
                            <div className='item'>
                                <h3>Temprature</h3>
                                <p className='value'>{dataPoint.temprature}&deg;C</p>
                                <p className='text-sm'>{dataPoint.temp_min}&deg;C - {dataPoint.temp_max}&deg;C (Feels Like: {dataPoint.feels_like}&deg;C)</p>
                                <p className='text-sm'></p>
                            </div>
                            <div className='item'>
                                <h3>Pressure</h3>
                                <p className='value'>{dataPoint.pressure}</p>
                                <p className='text-sm'>hPa</p>
                            </div>
                            <div className='item'>
                                <h3>Humidity</h3>
                                <p className='value'>{dataPoint.humidity}</p>
                                <p className='text-sm'>%</p>
                            </div>
                            <div className='item'>
                                <h3>Wind Speed</h3>
                                <p className='value'>{dataPoint.wind_speed}</p>
                                <p className='text-sm'>Kmph</p>
                            </div>
                        </div>
                        <div className='road'>
                            <h2>Road Info</h2>
                            <div className='flex'>
                                <div className='item'>
                                    <h3>Distance</h3>
                                    <p className='text-sm'>Traveled (m)</p>
                                    <p className='value'>{dataPoint.dist}</p>
                                </div>
                                <div className='item'>
                                    <h3>Speed</h3>
                                    <p className='text-sm'>Average (Kmph)</p>
                                    <p className='value'>{dataPoint.speed}</p>
                                    <p className='text-sm'></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    )
}

export default Widget
