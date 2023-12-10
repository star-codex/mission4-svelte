<script>
	let displayResult = '';
	let imagePath = '';
  
	async function fetchAzureAPI(imageBuffer) {
	  const azureEndpoint = 'https://mission2-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/d8f7a9c4-56bb-47a8-a5c0-e54aacf609b4/classify/iterations/Iteration1/image';
	  const predictionKey = '50ab9f0209fd4103a5162ba944759145';
  
	  const formData = new FormData();
	  formData.append('file.buffer', new Blob([imageBuffer]));
  
	  return fetch(azureEndpoint, {
		method: 'POST',
		body: formData,
		headers: {
		  'Prediction-Key': predictionKey,
		},
	  });
	}
  
	async function callServerAPI(azureTag) {
	  try {
		const lowerCaseAzureTag = azureTag.toLowerCase();

		const serverResponse = await fetch('http://localhost:3001/api/upload', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({ tag: lowerCaseAzureTag }),
		});
  
		const serverResult = await serverResponse.json();
		console.log('Server Response:', serverResult);
  
		if (serverResult && serverResult.length > 0) {
		  const firstServerResult = serverResult[0];
		  displayResult = `${firstServerResult.tag}: ${firstServerResult.image}`;
		  // Set the image path to be displayed
		//   imagePath = `${firstServerResult.image}`;
		} else {
		  displayResult = 'No matching entries in the database.';
		}
	  } catch (error) {
		console.error('Error handling server API request:', error);
		displayResult = 'Error handling server API request';
	  }
	}
  
	async function handleUpload(event) {
	  const fileInput = event.target.files;
  
	  if (fileInput.length > 0) {
		const selectedFile = fileInput[0];
		const reader = new FileReader();
  
		reader.onload = async function (event) {
		  const imageBuffer = event.target.result;
  
		  try {
			// Call the Azure API with the image data
			const azureApiResponse = await fetchAzureAPI(imageBuffer);
			const azureResult = await azureApiResponse.json();
			console.log('Azure API Response:', azureResult);
  
			if (azureResult.predictions && azureResult.predictions.length > 0) {
			  const firstPrediction = azureResult.predictions[0];
			  const azureTag = firstPrediction.tagName;
  
			  // Use the extracted tag to call the local server API
			  await callServerAPI(azureTag);
			} else {
			  displayResult = 'No predictions available from Azure API.';
			}
		  } catch (error) {
			console.error('Error handling Azure API request or database operation:', error);
			displayResult = 'Error handling Azure API request or database operation';
		  }
		};
  
		// Start reading the file
		reader.readAsArrayBuffer(selectedFile);
	  }
	}
  </script>
  
  <label for="image">Select an image:</label>
  <input type="file" id="image" on:change={handleUpload} />
  <div id="displayResult">
	{#if displayResult}
	  <strong>Results:</strong> {displayResult}
	{/if}
	<!-- {#if imagePath}
    <img src={imagePath} alt="Car from database" style="max-width: 100%; height: auto;" />
  {/if} -->
  </div>
  
  <style>
	#displayResult {
	  margin-top: 20px;
	  padding: 10px;
	  border: 1px solid #ccc;
	  border-radius: 8px;
	  background-color: #f9f9f9;
	}
  </style>
  