const url = `https://mainnet.helius-rpc.com/?api-key=d155c6a0-fce0-4974-9ba7-6c56dfec7749`;

const findHolders = async () => {
    const mintAddress = "5XArbXrNWuCAadsucZ1oQmBAwoF2UJitg11zDmgppump"; // Replace with your token mint address
    const allOwners = new Set();

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: "helius-test",
                method: "getProgramAccounts",
                params: [
                    "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA", // Token Program ID
                    {
                        filters: [
                            {
                                dataSize: 165, // Size of SPL Token account
                            },
                            {
                                memcmp: {
                                    offset: 0, // Mint address starts at offset 0
                                    bytes: mintAddress,
                                },
                            },
                        ],
                        encoding: "jsonParsed",
                    },
                ],
            }),
        });

        const data = await response.json();

        if (!data.result) {
            console.error("Failed to fetch accounts:", data.error || "Unknown error");
            return;
        }

        data.result.forEach((account) => {
            const parsedData = account.account.data.parsed;
            if (parsedData.info.tokenAmount.uiAmount > 0) {
                allOwners.add(parsedData.info.owner);
            }
        });

        console.log(`Total unique holders: ${allOwners.size}`);
    } catch (error) {
        console.error("Error fetching token holders:", error);
    }

    return allOwners.size;
};

export default findHolders;
