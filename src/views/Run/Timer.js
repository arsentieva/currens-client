import React, { useState, useEffect } from "react";
import { colors } from '@material-ui/core';

const Timer = ({start}) => {

    const [time, setTime] = useState({ ms: 0, s: 0, m: 0, h: 0 });
    const [interv, setInterv] = useState();
    const [status, setStatus] = useState(0);

    const startTimer = () => {
        runTimer();
        setInterv(setInterval(runTimer, 10));
    };

    useEffect(() => {
        startTimer();
    }, start);

    let updateMs = time.ms;
    let updateS = time.s;
    let updateM = time.m;
    let updateH = time.h;

    const runTimer = () => {
        if (updateM === 60) {
            updateH++;
            updateM = 0;
        }
        if (updateS === 60){
            updateM++;
            updateS = 0;
        }
        if (updateMs === 100){
            updateS++;
            updateMs = 0;
        }
        updateMs++;
        return setTime({
            ms: updateMs,
            s: updateS,
            m: updateM,
            h: updateH
            });
    };

    const stop = () => {
        clearInterval(interv);
        setStatus(2);
    };

    const hours = () => {
        if (time.h === 0) {
            return "";
        }

         return <span>{(time.h >= 10) ? time.h : "0" + time.h }</span>;
    };

    return (
        <div style={{ color: colors.orange["A700"], fontSize: 18 }}>
            {hours()}&nbsp;&nbsp;
            <span>{(time.m >= 10)? time.m : "0"+ time.m}</span>&nbsp;:&nbsp;
            <span>{(time.s >= 10)? time.s : "0"+ time.s}</span>&nbsp;:&nbsp;
            <span>{(time.ms >= 10)? time.ms : "0"+ time.ms}</span>
        </div>
    );
};

export default Timer;
