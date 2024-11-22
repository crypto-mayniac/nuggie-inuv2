// components/NotificationListener.js
import React, { useEffect } from 'react';
import Image from 'next/image';
import io from 'socket.io-client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DogGif1 from '../public/popchan-popcat.gif'; // Adjust the path as needed
import DogGif2 from '../public/shiba-inu.gif'; // Add your second GIF
import DogGif3 from '../public/swim-doge.gif'; // Add your third GIF

const NotificationListener = () => {
    const soundFiles = [
        '/sounds/vine-boom.mp3', // Ensure these paths are correct
        '/sounds/yes.mp3',
        '/sounds/wow.mp3',
    ];

    const gifFiles = [
        DogGif1, // Ensure these paths are correct
        DogGif2,
        DogGif3,
    ];

    useEffect(() => {
        // Set up a socket connection
        const socket = io('https://xawgeeapi-production.up.railway.app', {
            transports: ['websocket'], // Ensure compatibility
        });

        socket.on('connect', () => {
            console.log('Connected to server');
        });

        socket.on('new_buy', (data) => {
            // Display notification and play sound
            console.log('New buy detected:', data);
            displayNotification(data);
            playRandomSound();
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Cleanup on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    // Function to display the notification
    const displayNotification = (data) => {
        const randomGif = gifFiles[Math.floor(Math.random() * gifFiles.length)];
        const CustomToast = () => (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image
                    src={randomGif}
                    alt="Random GIF"
                    width={50}
                    height={50}
                    style={{ marginRight: '10px' }}
                />
                <span>
                    NEW BUY {data.solSpent} SOL (~${data.usdValue} USD)
                </span>
            </div>
        );
        toast.info(<CustomToast />);
    };

    // Function to play a random sound
    const playRandomSound = () => {
        const randomIndex = Math.floor(Math.random() * soundFiles.length);
        const sound = new Audio(soundFiles[randomIndex]);

        // Check for user interaction before playing
        const playSound = () => {
            sound.play().catch((error) => console.error('Error playing sound:', error));
            document.removeEventListener('click', playSound); // Remove the event listener after first interaction
        };

        // Add event listener to ensure user interaction
        if (!document.userHasInteracted) {
            document.addEventListener('click', playSound);
            document.userHasInteracted = true; // Custom property to track interaction
        } else {
            sound.play().catch((error) => console.error('Error playing sound:', error));
        }
    };

    return (
        <>
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
                theme="dark" // Can be "light", "dark", or "colored"
            />
        </>
    );
};

export default NotificationListener;
