# TypeScript + i18n done properly

**All source in [`i18n/`](./i18n)**

- Absolute type safety, no more "`translation.common.app.name`"
- Works with TypeScript 4.9+
- Requires no interaction with `fs` or `fetch`. All done by your bundler/runtime
- Caches loaded locales.
- No codegen


## Example (Next.JS)

```typescript
// @/i18n/locales/en/index.ts

export const en = {
  hello: "Hello world!"
}

```

```tsx
// pages/index.tsx
import { loadLocale, checkLocale } from "@/i18n";
import type { GetStaticProps, InferGetStaticPropsType } from "next"

export function getStaticProps({ locale }) {
  return {
    props: {
      translation: await loadLocale(checkLocale(locale))
    }
  }
} satisfies GetStaticProps;

export function Home({ translation }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <h1>{translation.hello}</h1>;
  //                      ^? (property) hello: string 
}

```