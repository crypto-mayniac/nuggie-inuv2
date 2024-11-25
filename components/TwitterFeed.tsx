import { useState, useEffect } from "react";

const TwitterFeed = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load Twitter widgets script
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        script.onload = () => setIsLoaded(true); // Mark as loaded when the script finishes loading
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div style={{ position: "relative", maxWidth: "100%", margin: "0 auto" }}>
            {/* Loader */}
            {!isLoaded && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "white",
                        fontSize: "16px",
                        textAlign: "center",
                    }}
                >
                    Loading...
                </div>
            )}

            {/* Twitter Timeline */}
            <a
                className="twitter-timeline"
                href="https://twitter.com/NuggieInu"
                data-theme="dark" // Force dark mode
                data-height="800"
                data-width="100%" // Set width to 100% of the container
            >
            </a>
        </div>
    );
};

export default TwitterFeed;
