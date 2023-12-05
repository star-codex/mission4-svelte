<script>
    let displayResult = '';
  
    async function handleUpload(event) {
      const fileInput = event.target.files;
  
      if (fileInput.length > 0) {
        const selectedFile = fileInput[0];
        const reader = new FileReader();
  
        reader.onload = async function (event) {
          const imageBuffer = event.target.result;
  
          // API Request directly within the component
          const endpoint =
            'https://mission2-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/d8f7a9c4-56bb-47a8-a5c0-e54aacf609b4/classify/iterations/Iteration1/image';
          const predictionKey = '50ab9f0209fd4103a5162ba944759145';
  
          try {
            const formData = new FormData();
            formData.append('file.buffer', new Blob([imageBuffer]));
  
            const response = await fetch(endpoint, {
              method: 'POST',
              body: formData,
              headers: {
                'Prediction-Key': predictionKey,
              },
            });
  
            const result = await response.json();
  
            console.log(result);
  
            if (result.predictions && result.predictions.length > 0) {
              // Display only the first tag and its probability
              const firstPrediction = result.predictions[0];
              displayResult = `${firstPrediction.tagName}: ${firstPrediction.probability.toFixed(2)}`;
            } else {
              displayResult = 'No predictions available.';
            }
          } catch (error) {
            console.error('Error making API request:', error);
            displayResult = 'Error making API request';
          }
        };
  
        // Start reading the file
        reader.readAsArrayBuffer(selectedFile);
      }
    }
  </script>
  
  <style>

    #displayResult {
    /* Component-specific styles for result display */
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  </style>
  
  <label for="image">Select an image:</label>
  <input type="file" id="image" on:change={handleUpload}>
  <div id="displayResult">
    {#if displayResult}
      <strong>Results:</strong> {displayResult}
    {/if}
  </div>
  