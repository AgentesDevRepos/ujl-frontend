import React from 'react';

const EyeClosedIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => (
    <svg
        onClick={onClick}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-6 h-6 cursor-pointer"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3l18 18M9.9 9.9a3 3 0 014.2 4.2M7.5 7.5a9.97 9.97 0 00-4.5 4.5m1.5 1.5a9.97 9.97 0 004.5 4.5m1.5 1.5a9.97 9.97 0 004.5-4.5m1.5-1.5a9.97 9.97 0 00-4.5-4.5"
        />
    </svg>
);

export default EyeClosedIcon; 