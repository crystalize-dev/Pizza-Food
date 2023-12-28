import React, { useEffect, useRef, useState } from 'react';
import Button from '@/components/UI/Button';

const TimerButton = ({
    cancelAction,
    confirmAction,
    children,
    loadingClass,
    ...props
}) => {
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [text, setText] = useState(children);
    const [countdown, setCountdown] = useState(10);
    const timerRef = useRef(null);

    const { className, ...otherProps } = props;

    useEffect(() => {
        if (isTimerActive) {
            timerRef.current = setInterval(() => {
                setCountdown((prevCountdown) => {
                    setText(`Are you sure ? (${prevCountdown - 1})`);

                    if (prevCountdown === 1) {
                        setIsTimerActive(false);
                        clearInterval(timerRef.current);
                        setText(children);
                        setCountdown(10);
                        cancelAction();
                    }

                    return prevCountdown - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(timerRef.current);
        };
    }, [isTimerActive, children]);

    const startTimer = () => {
        setIsTimerActive(true);
        setCountdown(10);
        setText(`Are you sure ? (${countdown})`);
    };

    const handleClick = () => {
        if (isTimerActive) {
            clearTimeout(timerRef.current);
            setIsTimerActive(false);
            confirmAction();
            setCountdown(10);
            setText(children);
        } else {
            startTimer();
        }
    };

    return (
        <Button
            onClick={handleClick}
            className={
                isTimerActive ? className + ' ' + loadingClass : className
            }
            {...otherProps}
        >
            {text}
        </Button>
    );
};

export default TimerButton;
