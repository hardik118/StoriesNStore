
export async function uploadWithBlobSasUrl(blobltoken: string, base64Img: string) {
  const blobExtMatch = base64Img.match(/^data:image\/(\w+);base64,/);
  if (!blobExtMatch) throw new Error("Invalid image format");
  const ext = blobExtMatch[1]; // jpg, png, gif, webp etc.
  const contentType = `image/${ext}`;

  const blobName = `img-${Date.now()}.${ext}`;
  const baseUrl= "https://storiesnstore.blob.core.windows.net/uploads";


  const blobSasUrl = `${baseUrl}/${blobName}?${blobltoken}`;

  const binary = atob(base64Img.replace(/^data:image\/\w+;base64,/, ""));
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) buffer[i] = binary.charCodeAt(i);

  const res = await fetch(blobSasUrl, {
    method: "PUT",
    headers: {
      "x-ms-blob-type": "BlockBlob",
      "Content-Type": contentType,
    },
    body: buffer,
  });

  if (!res.ok) {
    throw new Error(`Upload failed: ${res.status} ${await res.text()}`);
  }

  return blobSasUrl.split("?")[0]; // public blob URL


}

