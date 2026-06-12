import { pipeline, env } from "@huggingface/transformers";

env.allowLocalModels = false;
env.useBrowserCache = true;

let segmenter: any = null;

async function getSegmenter() {
  if (segmenter) return segmenter;
  console.log("Loading background removal model...");
  // Use Xenova/BRIA-RMBG-2.0 which gives excellent results
  segmenter = await pipeline("background-removal", "Xenova/BRIA-RMBG-2.0", {
    device: "webgpu" as any,
  }).catch(async () => {
    console.log("WebGPU failed, trying CPU...");
    return pipeline("background-removal", "Xenova/BRIA-RMBG-2.0");
  });
  console.log("Model loaded successfully!");
  return segmenter;
}

export async function removeBackground(imageUrl: string): Promise<string> {
  const seg = await getSegmenter();
  console.log("Starting background removal for:", imageUrl);
  const output = await seg(imageUrl);
  console.log("Background removal output:", output);
  const result = Array.isArray(output) ? output[0] : output;
  
  // result is a RawImage; convert to canvas → blob URL
  const canvas = document.createElement("canvas");
  canvas.width = result.width;
  canvas.height = result.height;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(result.width, result.height);
  const data = result.data as Uint8ClampedArray;
  
  imageData.data.set(data);
  ctx.putImageData(imageData, 0, 0);
  const finalUrl = canvas.toDataURL("image/png");
  console.log("Generated final URL:", finalUrl);
  return finalUrl;
}
