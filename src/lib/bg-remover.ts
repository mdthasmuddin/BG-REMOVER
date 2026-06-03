import { pipeline, env } from "@huggingface/transformers";

env.allowLocalModels = false;
env.useBrowserCache = true;

let segmenter: any = null;

async function getSegmenter() {
  if (segmenter) return segmenter;
  segmenter = await pipeline("background-removal", "briaai/RMBG-1.4", {
    device: "webgpu" as any,
  }).catch(async () =>
    pipeline("background-removal", "briaai/RMBG-1.4")
  );
  return segmenter;
}

export async function removeBackground(imageUrl: string): Promise<string> {
  const seg = await getSegmenter();
  const output = await seg(imageUrl);
  const result = Array.isArray(output) ? output[0] : output;
  // result is a RawImage; convert to canvas → blob URL
  const canvas = document.createElement("canvas");
  canvas.width = result.width;
  canvas.height = result.height;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(result.width, result.height);
  const data = result.data as Uint8ClampedArray;
  // RMBG outputs RGBA already
  if (data.length === result.width * result.height * 4) {
    imageData.data.set(data);
  } else {
    // RGB + alpha channel separate fallback
    imageData.data.set(data);
  }
  ctx.putImageData(imageData, 0, 0);
  return canvas.toDataURL("image/png");
}
