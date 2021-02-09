import { lazy as reactLazy } from 'react';

type ImportFn = () => Promise<any>;

export function lazy(importFn: ImportFn, namedExport = 'default') {
  return reactLazy(async () => {
    const module = await importFn();
    return { default: module[namedExport] };
  });
}
