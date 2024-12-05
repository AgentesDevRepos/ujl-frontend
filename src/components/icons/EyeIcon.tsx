import React from 'react';

interface EyeIconProps {
    isVisible: boolean;
    onClick: () => void;
}

const EyeIcon: React.FC<EyeIconProps> = ({ isVisible, onClick }) => {
    return (
        <svg
            onClick={onClick}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
        >
            {isVisible ? (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            ) : (
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10S6.477 1 12 1c1.657 0 3.22.402 4.625 1.125M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
            )}
        </svg>
    );
};

export default EyeIcon; 