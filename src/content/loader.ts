import type { ComponentType } from "react";

export interface Section {
  id: string;
  order: number;
  title: string;
  Body: ComponentType;
}

interface SectionModule {
  default: ComponentType;
  frontmatter: { id: string; order: number; title: string };
}

// Every .mdx file under sections/ is an entry, validated at build time
const modules = import.meta.glob<SectionModule>("./sections/*.mdx", {
  eager: true
});

export const sections: Section[] = Object.values(modules)
  .map((module) => ({ ...module.frontmatter, Body: module.default }))
  .sort((a, b) => a.order - b.order);
