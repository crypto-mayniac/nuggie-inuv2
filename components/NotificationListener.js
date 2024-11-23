import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DogGif1 from '../public/popchan-popcat.gif';
import DogGif2 from '../public/shiba-inu.gif';
import DogGif3 from '../public/swim-doge.gif';

const NotificationListener = () => {
    const soundFiles = [
        '/sounds/vine-boom.mp3',
        '/sounds/yes.mp3',
        '/sounds/wow.mp3',
    ];

    const gifFiles = [
        DogGif1,
        DogGif2,
        DogGif3,
    ];

    const [notificationQueue, setNotificationQueue] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentNotification, setCurrentNotification] = useState(null); // Track the current notification

    const processQueue = useCallback(() => {
        if (notificationQueue.length > 0 && !isProcessing) {
            setIsProcessing(true);

            // Get the next notification in the queue
            const nextNotification = notificationQueue[0];
            setCurrentNotification(nextNotification); // Update current notification
            displayNotification(nextNotification);

            // Wait for the toast duration (plus a buffer) before processing the next one
            setTimeout(() => {
                setNotificationQueue((prev) => prev.slice(1)); // Remove processed notification
                setIsProcessing(false); // Allow processing the next one
            }, 5000 + 500); // Adjust for autoClose duration + buffer
        }
    }, [notificationQueue, isProcessing]);

    useEffect(() => {
        processQueue(); // Process queue whenever it changes
    }, [notificationQueue, processQueue]);

    useEffect(() => {
        // Update the browser tab title dynamically with the current notification
        if (currentNotification) {
            const { solSpent, usdValue } = currentNotification;
            document.title = `Nuggie Inu - NEW BUY $${usdValue} ${solSpent} SOL `;
        } else {
            document.title = 'My Site'; // Default title when no active notification
        }
    }, [currentNotification]);

    const enqueueNotification = (data) => {
        setNotificationQueue((prev) => [...prev, data]);
    };

    // Set up WebSocket listener
    useEffect(() => {
        const socket = io('https://xawgeeapi-production.up.railway.app', {
            transports: ['websocket'],
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('new_buy', (data) => {
            console.log('New buy detected:', data);
            enqueueNotification(data);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const displayNotification = (data) => {
        const randomGif = gifFiles[Math.floor(Math.random() * gifFiles.length)];
        const CustomToast = () => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    src={randomGif}
                    alt="Random GIF"
                    className="rounded-xl"
                    width={50}
                    height={50}
                    style={{ marginRight: '10px' }}
                />
                <span>
                    <strong className="" style={{ color: 'orange' }}>NEW BUY</strong> {data.solSpent} SOL (~${data.usdValue} USD)
                </span>
            </div>
        );
        toast.info(<CustomToast />, { autoClose: 5000 });
    };

    // Spam Notifications for Testing
    // useEffect(() => {
    //     let count = 0;
    //     const maxSpam = 10;
    //     const interval = setInterval(() => {
    //         if (count < maxSpam) {
    //             const fakeData = {
    //                 solSpent: (Math.random() * 10).toFixed(2),
    //                 usdValue: (Math.random() * 100).toFixed(2),
    //                 id: Math.random().toString(36).substr(2, 9),
    //             };
    //             enqueueNotification(fakeData);
    //             count++;
    //         } else {
    //             clearInterval(interval);
    //         }
    //     }, 1000);

    //     return () => clearInterval(interval);
    // }, []);

    return (
        <div className="px-4">
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                limit={2} // Show 2 at a time, others queue
            />
            <style jsx global>{`
                @media (max-width: 768px) {
                    .Toastify__toast-container {
                        top: 85px !important; /* Add margin-top on mobile */
                        right: 0 !important; /* Position top-right */
                        bottom: unset !important;
                        padding: 0rem 1rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default NotificationListener;
