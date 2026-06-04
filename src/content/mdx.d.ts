declare module "*.mdx" {
  export const frontmatter: {
    id: string;
    order: number;
    title: string;
  };
}
