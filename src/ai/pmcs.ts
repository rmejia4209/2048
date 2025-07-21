
import createModule from "@/ai/bin/wasm_api.js";

export default async function pmcsNextMove(hexString: string): Promise<string> {

  let Module;

  try {
    Module = await createModule();
  } catch {
    throw new Error("Failed to load WASM module. Ensure it has been built");
  }

  const byteLen = Module.lengthBytesUTF8(hexString) + 1;
  let strPtr = 0;

  try {
    strPtr = Module._malloc(byteLen);
    if (strPtr === 0) {
      throw new Error("WASM malloc failed");
    }
    Module.stringToUTF8(hexString, strPtr, byteLen);
    //const start = performance.now();
    const bestMove = Module._pmcs_get_next_move(strPtr);
    //console.log(`Time: ${performance.now() - start}ms`)
    return String.fromCharCode(bestMove);
  } finally {
    Module._free(strPtr);  
  }
}