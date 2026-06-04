import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { z } from "zod";

// Build/dev-time validation of the content collection. Mirrors Astro's
// defineCollection schema, but runs in Node so no Zod ships to the client.
const sectionSchema = z.object({
  id: z.string().min(1),
  order: z.number().int(),
  title: z.string().min(1),
  content: z.string().min(1)
});

const sectionsDir = fileURLToPath(
  new URL("../src/content/sections", import.meta.url)
);

const fail = (message) => {
  console.error(`\n✖ content validation failed\n${message}\n`);
  process.exit(1);
};

const files = readdirSync(sectionsDir).filter((file) => file.endsWith(".json"));

if (files.length === 0) {
  fail(`No section files found in ${sectionsDir}`);
}

const seenIds = new Map();
const seenOrders = new Map();

for (const file of files) {
  const raw = readFileSync(new URL(`../src/content/sections/${file}`, import.meta.url), "utf8");

  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    fail(`${file}: invalid JSON — ${error.message}`);
  }

  const result = sectionSchema.safeParse(data);
  if (!result.success) {
    fail(`${file}:\n${z.prettifyError(result.error)}`);
  }

  const { id, order } = result.data;
  if (seenIds.has(id)) {
    fail(`Duplicate id "${id}" in ${file} and ${seenIds.get(id)}.`);
  }
  if (seenOrders.has(order)) {
    fail(`Duplicate order ${order} in ${file} and ${seenOrders.get(order)}.`);
  }
  seenIds.set(id, file);
  seenOrders.set(order, file);
}

console.log(`✓ content: ${files.length} sections valid`);
