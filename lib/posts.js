import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
	// Instead of the file system,
	// fetch post data from an external API endpoint
	// const res = await fetch('..');
	// return res.json();

	// Get file names under /posts.
	const fileNames = fs.readdirSync(postsDirectory);
	const allPostsData = fileNames.map((fileName) => {
		// Remove '.md' from file to get ID.
		const id = fileName.replace(/\.md$/, '');

		// Read markdown file as a string.
		const fullPath = path.join(postsDirectory, fileName);
		const fileContents = fs.readFileSync(fullPath, 'utf8');

		// User gray-matter to process the post metadata at the top of the files.
		const matterResult = matter(fileContents);

		// Combine the data with the ID.
		return {
			id,
			...matterResult.data,
		};
	});

	// Sort the posts by date order
	return allPostsData.sort(({ date: a }, { date: b }) => {
		if (a < b) {
			return 1;
		} else if (a > b) {
			return -1;
		} else {
			return 0;
		}
	});
}
