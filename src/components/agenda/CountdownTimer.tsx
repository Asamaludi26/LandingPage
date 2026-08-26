import React, { useState, useEffect } from 'react';

export const CountdownTimer: React.FC<{ targetDate: string }> = ({ targetDate }) => {
    const calculateTimeLeft = () => {
        const difference = +new Date(targetDate) - +new Date();
        let timeLeft: { [key: string]: number } = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return null;
        }
        return (
            <div key={interval} className="text-center">
                <span className="text-3xl sm:text-4xl font-bold">{String(timeLeft[interval]).padStart(2, '0')}</span>
                <span className="block text-xs uppercase text-gray-400">{interval}</span>
            </div>
        );
    });

    return (
        <div className="flex justify-center space-x-4 sm:space-x-8">
            {timerComponents.length ? timerComponents : <span className="text-2xl font-bold">Event has started!</span>}
        </div>
    );
};

export default CountdownTimer;
