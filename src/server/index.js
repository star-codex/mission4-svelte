import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(
	cors({
		origin: 'http://127.0.0.1:5173',
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	})
);

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mission4');

const carSchema = new mongoose.Schema({
	tag: String,
	image: String,
	url: String,
});

const Car = mongoose.model('Car', carSchema);

app.post('/api/upload', async (req, res) => {
	try {
		const { tag } = req.body;
		console.log('Received tag:', tag);

		// Convert the tag to lowercase before querying the database
		const lowercaseTag = tag.toLowerCase();

		// Query the database based on the received tag
		const databaseResult = await Car.find({ tag: lowercaseTag });
		console.log('Database result:', databaseResult);

		res.json(databaseResult);
	} catch (error) {
		console.error('Error:', error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

export default app;

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
