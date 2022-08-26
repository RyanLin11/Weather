import React, { useState, useEffect } from 'react';

function Time(props) {
    const [time, setTime] = useState('');
    const [offset, setOffset] = useState(0);
    const [timer, setTimer] = useState(null);

    useEffect(() => {
        async function updateOffset() {
            const secondsSinceEpoch = Math.round(Date.now()/1000);
            const rawTimezoneData = await fetch(`https://maps.googleapis.com/maps/api/timezone/json?location=${props.latitude},${props.longitude}&timestamp=${secondsSinceEpoch}&key=${process.env.REACT_APP_TIME_API_KEY}`);
            const timezoneData = await rawTimezoneData.json()
            const offset = 1000 * (timezoneData.dstOffset + timezoneData.rawOffset);
            setOffset(offset);
        }
        if (props.latitude && props.longitude) {
            updateOffset();
        }
    }, [props.latitude, props.longitude]);

    useEffect(() => {
        if (timer !== null) {
            clearInterval(timer);
        }
        setTimer(setInterval(() => {
            let tz_time = new Date(new Date().getTime() + offset);
            let utc_time = new Date(tz_time.getUTCFullYear(), tz_time.getUTCMonth(), tz_time.getUTCDay(), tz_time.getUTCHours(), tz_time.getUTCMinutes(), tz_time.getUTCSeconds());
            setTime(utc_time.toLocaleTimeString());
        }, 1000));
    }, [offset]);

    return (
        <p>Local Time: {time}</p>
    );
}

export default Time;