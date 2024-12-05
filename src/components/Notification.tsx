"use client"

import React, { useState, useEffect } from 'react';

interface NotificationProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div
            className={`fixed bottom-4 right-4 p-4 rounded shadow-lg text-white ${
                type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
        >
            {message}
        </div>
    );
};

export default Notification; 