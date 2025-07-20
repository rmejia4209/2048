

declare module '@/ai/bin/wasm_api.js' {
  declare function createModule(): Promise<any>;
  export default createModule;
}