/**
 * Pure client-side Windows ICO generator
 * Packages multiple PNG images (e.g., 16x16, 32x32, 48x48) into a single multi-resolution .ico binary file.
 * Modern browsers and operating systems fully support embedded PNG data in ICO containers.
 */

export interface IcoImageSource {
  pngBlob: Blob;
  size: number; // width = height (e.g. 16, 32, 48, 64)
}

export async function createIcoFromPngs(sources: IcoImageSource[]): Promise<Blob> {
  const imagesData: { size: number; bytes: Uint8Array }[] = [];

  for (const src of sources) {
    const arrayBuffer = await src.pngBlob.arrayBuffer();
    imagesData.push({
      size: src.size,
      bytes: new Uint8Array(arrayBuffer),
    });
  }

  const numImages = imagesData.length;
  // ICO Header: 6 bytes
  // Directory entries: 16 bytes per image
  const headerAndDirSize = 6 + 16 * numImages;

  let totalSize = headerAndDirSize;
  for (const img of imagesData) {
    totalSize += img.bytes.byteLength;
  }

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);

  // 1. Header (6 bytes)
  view.setUint16(0, 0, true); // Reserved, must be 0
  view.setUint16(2, 1, true); // 1 = ICO format
  view.setUint16(4, numImages, true); // Number of images

  // 2. Directory Entries (16 bytes each)
  let currentOffset = headerAndDirSize;

  for (let i = 0; i < numImages; i++) {
    const img = imagesData[i];
    const entryOffset = 6 + i * 16;
    const width = img.size >= 256 ? 0 : img.size;
    const height = img.size >= 256 ? 0 : img.size;

    view.setUint8(entryOffset + 0, width); // Width
    view.setUint8(entryOffset + 1, height); // Height
    view.setUint8(entryOffset + 2, 0); // Palette colors (0 = no palette)
    view.setUint8(entryOffset + 3, 0); // Reserved
    view.setUint16(entryOffset + 4, 1, true); // Color planes (1)
    view.setUint16(entryOffset + 6, 32, true); // Bits per pixel (32 for PNG)
    view.setUint32(entryOffset + 8, img.bytes.byteLength, true); // Size of image data
    view.setUint32(entryOffset + 12, currentOffset, true); // Offset of image data

    currentOffset += img.bytes.byteLength;
  }

  // 3. Image Data
  const fullBytes = new Uint8Array(buffer);
  let writeOffset = headerAndDirSize;
  for (const img of imagesData) {
    fullBytes.set(img.bytes, writeOffset);
    writeOffset += img.bytes.byteLength;
  }

  return new Blob([fullBytes], { type: 'image/x-icon' });
}
