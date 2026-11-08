import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // No R2/KV caching configured yet.
  // Add incrementalCache and tagCache options here when you are ready
  // to enable ISR / on-demand revalidation via KV or R2.
});

