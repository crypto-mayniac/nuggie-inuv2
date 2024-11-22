export default function handler(req, res) {
    if (req.method === 'POST') {
        // Parse incoming webhook payload
        const data = req.body;

        // Process transactions
        console.log(data);

        res.status(200).json({ message: 'Webhook received' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
