import React, { useEffect, useState } from 'react';

const TokenHolders = () => {
    const [count, setCount] = useState<number | null>(null);

    useEffect(() => {
        const fetchHoldersCount = async () => {
            try {
                const response = await fetch('/api/holders');
                const data = await response.json();
                if (data.holdersCount !== undefined) {
                    setCount(data.holdersCount);
                } else {
                    console.error('Failed to fetch holders count');
                }
            } catch (error) {
                console.error('Error fetching holders count:', error);
            }
        };

        fetchHoldersCount();

        // Optionally, refresh the count every 10 minutes
        const intervalId = setInterval(fetchHoldersCount, 10 * 60 * 1000);

        // Cleanup on component unmount
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            {count !== null ? (
                <p>Total unique holders: {count}</p>
            ) : (
                <p>Loading holders count...</p>
            )}
        </div>
    );
};

export default TokenHolders;
