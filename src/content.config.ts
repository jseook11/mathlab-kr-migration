import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		// Math blog specific fields
		correctRate: z.number().optional(),  // 정답률 %
		source: z.string().optional(),       // 출처 코드 (예: "202611")
		sourceDetail: z.string().optional(), // 추가 정보 (예: "30번")
		tags: z.array(z.string()).optional(), // 태그 배열
		difficulty: z.enum(['easy', 'medium', 'hard']).optional()
	}),
});

export const collections = { blog };
