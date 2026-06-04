export interface Section {
  id: string;
  order: number;
  title: string;
  content: string;
}

// Every file under sections/ is an entry.
const modules = import.meta.glob<{ default: Section }>("./sections/*.json", {
  eager: true
});

export const sections: Section[] = Object.values(modules)
  .map((module) => module.default)
  .sort((a, b) => a.order - b.order);
