export async function uploadDocToAzure(
  containerUrl: string,
  sasToken: string,
  fileName: string,
  file: File | Blob
): Promise<string> {
  const extension = fileName.includes(".")
    ? fileName.substring(fileName.lastIndexOf("."))
    : "";
  let contentType = "application/octet-stream";
  if (extension === ".pdf") contentType = "application/pdf";
  if (extension === ".doc" || extension === ".docx")
    contentType = "application/msword";

  const blobName = `user-doc/doc-${Date.now()}${extension}`;
  const blobUrl = `${containerUrl}/${blobName}?${sasToken}`;

  try {
    const res = await fetch(blobUrl, {
      method: "PUT",
      headers: {
        "x-ms-blob-type": "BlockBlob",
        "Content-Type": contentType,
      },
      body: file, // directly use raw file/blob
    });

    if (!res.ok) {
      throw new Error(`Upload failed: ${res.status} ${await res.text()}`);
    }
  } catch (error) {
    throw new Error("try again some err occured!");
  } finally {
    return blobUrl.split("?")[0];
  }
}
