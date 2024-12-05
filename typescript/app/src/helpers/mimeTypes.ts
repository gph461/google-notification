export function getMimeType(extension) {
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.pdf': 'application/pdf',
    // Add more mappings as needed
  };

  return mimeTypes[extension.toLowerCase()] || '';
}
