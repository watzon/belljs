export const LAYER = 152;

import { Api } from "./mod.ts";

const tlobjects: any = {};

for (const tl of Object.values(Api)) {
  if ("CONSTRUCTOR_ID" in tl) {
    tlobjects[tl.CONSTRUCTOR_ID] = tl;
  } else {
    for (const sub of Object.values(tl)) {
      tlobjects[(sub as any).CONSTRUCTOR_ID] = sub;
    }
  }
}
export { tlobjects };
