<script>
	import ImageUploader from './ImageUploader.svelte';
</script>

<form id="imageForm" enctype="multipart/form-data">
	<ImageUploader />
</form>

<style>
	form {
		width: 300px;
		padding: 20px;
		background-color: #fff;
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
</style>
