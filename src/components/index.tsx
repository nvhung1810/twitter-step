import { useEffect, useState } from 'react';
import { handleFindYCoordinate } from '../utils';
import HeartIcon from './HeartIcon';

const STEP_WIDTH = 1074;
const HEART_RADIUS = 15;
const STEP = 6;
const TOTAL_TIME = 48000;

export default function TwitterStep() {
    const heartCoordinates = Array.from({ length: 7 }, (_, index) => ({
        x: (STEP_WIDTH / STEP) * index - 1,
        y: handleFindYCoordinate((STEP_WIDTH / STEP) * index, STEP_WIDTH),
    }));

    const [strokeDashArray, setStrokeDashArray] = useState(0);
    const [twitterYCoordinate, setTwitterYCoordinate] = useState(
        handleFindYCoordinate(1, STEP_WIDTH)
    );

    const getTotalDuration = (count: number, total: number) => {
        const averageDuration = total / count / 2;
        const animations = [];
        let currentStart = 0;
        for (let i = 0; i < count; i++) {
            let currentEnd = currentStart + averageDuration;
            if (i === count - 1) {
                currentEnd = total;
            }
            animations.push({
                start: currentStart,
                end: Math.round(currentEnd),
            });
            currentStart = Math.round(currentEnd) + averageDuration;
        }
        return animations;
    };

    useEffect(() => {
        const animations = getTotalDuration(STEP, TOTAL_TIME);
        let startTime: number | null = null;
        let animationFrameId: number | null = null;
        let animationRunning = true;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsedTime = timestamp - startTime;

            animations.forEach(({ start, end }, index) => {
                if (elapsedTime >= start && elapsedTime < end) {
                    const progress = Math.min(
                        (elapsedTime - index * TOTAL_TIME / STEP / 2) / (TOTAL_TIME / 2),
                        1
                    );
                    const nextValue = Math.ceil(progress * (STEP_WIDTH - HEART_RADIUS));
                    setStrokeDashArray(nextValue);
                    setTwitterYCoordinate(
                        handleFindYCoordinate(nextValue, STEP_WIDTH) - STEP)

                }
            });

            if (elapsedTime < TOTAL_TIME && animationRunning) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            animationRunning = false;
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div>
            <svg
                width={`${STEP_WIDTH}`}
                height="35"
                viewBox={`0 0 ${STEP_WIDTH} 35`}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: 'relative', overflow: 'inherit' }}
            >
                <path
                    d="M1 22.6915C45.7508 16.7814 256 -14 505 11C730.213 33.6117 871 47 1073 17"
                    stroke="#4B4B4B"
                    stroke-linecap="round"
                    stroke-dasharray="1 3"
                />
                {/* Line active */}
                <svg
                    width={`${STEP_WIDTH}`}
                    height="35"
                    viewBox={`0 0 ${STEP_WIDTH} 35`}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ zIndex: 1 }}
                >
                    <path
                        d={`M1 22.6915C45.7508 16.7814 256 -14 505 11C730.213 33.6117 871 47 ${STEP_WIDTH} 17`}
                        stroke="none"
                        stroke-width="4"
                        stroke-linecap="round"
                    />
                    <path
                        d={`M1 22.6915C45.7508 16.7814 256 -14 505 11C730.213 33.6117 871 47 ${STEP_WIDTH} 17`}
                        stroke="#FF7F26"
                        stroke-width="4"
                        stroke-linecap="round"
                        stroke-dasharray={`${strokeDashArray} ${STEP_WIDTH}`}
                    />
                </svg>
                {/* Icon heart */}
                {heartCoordinates.map((coordinates, index) => (
                    <HeartIcon
                        key={index}
                        xCoordinates={coordinates.x}
                        yCoordinates={coordinates.y}
                    />
                ))}
                {/* Twitter icon */}
                <svg
                    width="49"
                    height="39"
                    viewBox="0 0 49 39"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    x={`${strokeDashArray}`}
                    y={`${twitterYCoordinate}`}
                >
                    <path
                        d="M43.9633 10.0957C43.9944 10.5058 43.9944 10.916 43.9944 11.3262C43.9944 23.8359 33.8898 38.25 15.4214 38.25C9.73161 38.25 4.4461 36.6972 0 34.002C0.808407 34.0898 1.58562 34.1191 2.42513 34.1191C7.11986 34.1191 11.4416 32.625 14.8928 30.0762C10.4778 29.9883 6.77791 27.2637 5.50314 23.5137C6.12502 23.6015 6.74681 23.6601 7.3998 23.6601C8.30142 23.6601 9.20314 23.5429 10.0426 23.3379C5.44103 22.4589 1.98977 18.6504 1.98977 14.0508V13.9336C3.32665 14.6368 4.88136 15.0762 6.52908 15.1347C3.82412 13.4355 2.05198 10.5351 2.05198 7.25384C2.05198 5.49606 2.54935 3.88473 3.41996 2.47847C8.36353 8.22066 15.7944 11.9706 24.1269 12.3808C23.9714 11.6777 23.8781 10.9453 23.8781 10.2129C23.8781 4.998 28.3553 0.75 33.9207 0.75C36.8122 0.75 39.4238 1.89258 41.2583 3.73828C43.5279 3.32814 45.7043 2.53709 47.632 1.45313C46.8857 3.65045 45.3001 5.49615 43.217 6.66794C45.238 6.46297 47.1968 5.93551 49 5.20316C47.6322 7.07808 45.9221 8.74794 43.9633 10.0957Z"
                        fill="#D3A657"
                    />
                </svg>
            </svg>
        </div>
    );
}
