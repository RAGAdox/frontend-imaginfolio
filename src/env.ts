declare global {
  interface Window {
    env: any;
  }
}

// change with your own variables
type EnvType = {
  [key: string]: string;
};
export const env: EnvType = { ...process.env, ...window.env };
