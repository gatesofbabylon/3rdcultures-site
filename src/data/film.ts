import { type CollectionEntry, getCollection } from "astro:content";

/** filter out draft films based on the environment */
export async function getAllFilms(): Promise<CollectionEntry<"film">[]> {
	return await getCollection("film", ({ data }) => {
		return import.meta.env.PROD ? !data.draft : true;
	});
}

/** groups films by year, using the year as the key */
export function groupFilmsByYear(films: CollectionEntry<"film">[]) {
	return Object.groupBy(films, (film) => film.data.publishDate.getFullYear().toString());
}
