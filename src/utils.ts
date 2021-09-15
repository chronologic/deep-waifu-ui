export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isTruthy(value: string): boolean {
  // eslint-disable-next-line eqeqeq
  return value === 'true' || value == '1';
}

export function shortAddress(address?: string | null | undefined, chars = 4): string {
  const addr = (address || '').toUpperCase();
  return `0x${addr.substr(2, chars)}...${addr.substr(-chars)}`;
}

export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      function () {
        resolve(reader.result as any);
      },
      false
    );

    reader.readAsDataURL(file);
  });
}

export async function srcToFile(src: string, fileName: string, mimeType: string) {
  const res = await fetch(src);
  const ab = await res.arrayBuffer();

  return new File([ab], fileName, { type: mimeType });
}
