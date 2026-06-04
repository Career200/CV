import { readdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { z } from "zod";

const frontmatterSchema = z.object({
  id: z.string().min(1),
  order: z.number().int(),
  title: z.string().min(1)
});

const sectionsDir = fileURLToPath(
  new URL("../src/content/sections", import.meta.url)
);

const fail = (message) => {
  console.error(`\n✖ content validation failed\n${message}\n`);
  process.exit(1);
};

const files = readdirSync(sectionsDir).filter((file) => file.endsWith(".mdx"));

if (files.length === 0) {
  fail(`No section files found in ${sectionsDir}`);
}

const seenIds = new Map();
const seenOrders = new Map();

for (const file of files) {
  const raw = readFileSync(
    new URL(`../src/content/sections/${file}`, import.meta.url),
    "utf8"
  );

  const { data, content } = matter(raw);

  const result = frontmatterSchema.safeParse(data);
  if (!result.success) {
    fail(`${file}:\n${z.prettifyError(result.error)}`);
  }

  if (content.trim().length === 0) {
    fail(`${file}: body is empty.`);
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
