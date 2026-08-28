import type { RouterConfig } from "@nuxt/schema";

export default {
  scrollBehavior: (to, from) => {
    if (to.hash) return { el: to.hash, top: 56 };
    else if (from.name) return { left: 0, top: 0 };
  }
} satisfies RouterConfig;
