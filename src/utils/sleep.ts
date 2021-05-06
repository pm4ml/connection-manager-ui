export default async (ms: number) =>
  new Promise<boolean>((resolve) => setTimeout(() => resolve(true), ms));
