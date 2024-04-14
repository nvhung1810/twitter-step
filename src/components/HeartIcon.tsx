type Props = {
    xCoordinates: number;
    yCoordinates: number;
};

export default function HeartIcon({ xCoordinates, yCoordinates }: Props) {
    return (
        <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={xCoordinates.toString()}
            y={yCoordinates.toString()}
        >
            <circle cx="15" cy="15" r="14.5" fill="white" stroke="#CCCCCC" />
            <path
                d="M18.5156 8.25C17.7017 8.25 16.9554 8.50793 16.2976 9.01664C15.667 9.50435 15.2472 10.1255 15 10.5772C14.7528 10.1255 14.333 9.50435 13.7024 9.01664C13.0446 8.50793 12.2983 8.25 11.4844 8.25C9.21293 8.25 7.5 10.1079 7.5 12.5717C7.5 15.2334 9.637 17.0546 12.8721 19.8115C13.4215 20.2797 14.0442 20.8104 14.6914 21.3763C14.7768 21.4511 14.8863 21.4922 15 21.4922C15.1137 21.4922 15.2232 21.4511 15.3086 21.3764C15.9558 20.8103 16.5785 20.2796 17.1282 19.8112C20.363 17.0546 22.5 15.2334 22.5 12.5717C22.5 10.1079 20.7871 8.25 18.5156 8.25Z"
                fill="#CCCCCC"
            />
        </svg>
    );
}
