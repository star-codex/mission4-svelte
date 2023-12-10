  <!-- routes/+page.svelte -->
<script context="module" lang="ts">
  import ImageUploadForm from '../components/ImageUploadForm.svelte';
</script>
<script>
  export let tagDetails;
</script>
<ImageUploadForm />

{#if tagDetails}
  <h1>{tagDetails.tag}</h1>
{/if}