import Link from 'next/link';
import React from 'react';

interface Props {
    onClick: () => void;
    className?: String;
}

function LearnMoreButton({ onClick, className }: Props) {
    return (
        <button
            onClick={onClick}
            className={`border-blue-500 hover:bg-primary text-blue-500 focus-visible:ring-blue-300 my-4 w-fit rounded-full border-2 px-6 py-1 transition duration-200 ease-in-out hover:text-white hover:bg-blue-400 hover:border-blue-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
        >
            <span className={`text-sm ${className}`}>Learn More</span>
        </button>
    );
}

export default LearnMoreButton;
