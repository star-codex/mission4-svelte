// routes/+page.server.js
import fetch from 'node-fetch';

// Local API for MongoDB
export async function getTagDetails(tag) {
	// Make a request to your local API
	// Modify the endpoint as needed
	const response = await fetch(`http://localhost:3001/api/upload`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ tagName: tag }),
	});
	return response.json();
}

export async function load({ params }) {
	// Extract tag from the URL params
	const { tag } = params;
	console.log('Tag:', tag);

	// Call the local API to get details from MongoDB
	const details = await getTagDetails(tag);

	return {
		props: {
			tagDetails: details,
		},
	};
}
