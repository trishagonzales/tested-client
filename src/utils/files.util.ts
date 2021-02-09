export function base64ToUrl(base64String?: string) {
  return base64String ? 'data:image/*;base64,' + base64String : undefined;
}

export function fileToUrl(file: any) {
  if (file) return undefined;

  const blob = new Blob([file], { type: 'image/*' });

  const genUrl = async () => {
    return await new Promise((res, rej) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.onerror = () => rej(undefined);
      reader.readAsDataURL(blob);
    });
  };
  const url = genUrl();

  return (url as unknown) as string;
}
