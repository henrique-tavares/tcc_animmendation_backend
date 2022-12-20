import {
  getAllAnimeTitles,
  getAnimeGenres,
  getAnimeSources,
  getAnimeStudios,
} from "../../services/animeService";
import { redisClient } from "./client";

export async function seedAnimeGenres() {
  const genres = await getAnimeGenres();

  await redisClient.json.set(
    "anime:genres",
    "$",
    [...genres.entries()].map(([genre, count]) => ({ genre, count }))
  );
}

export async function seedAnimeTitles() {
  const animeTitles = await getAllAnimeTitles();

  await redisClient.json.set(
    "anime:titles",
    "$",
    [...animeTitles.entries()].map(([animeId, title]) => ({
      animeId,
      title,
    }))
  );
}

export async function seedAnimeSources() {
  const animeSources = await getAnimeSources();

  await redisClient.json.set(
    "anime:sources",
    "$",
    [...animeSources.entries()].map(([source, count]) => ({
      source,
      count,
    }))
  );
}

export async function seedAnimeStudios() {
  const animeStudios = await getAnimeStudios();

  await redisClient.json.set(
    "anime:studios",
    "$",
    [...animeStudios.entries()].map(([studio, count]) => ({
      studio,
      count,
    }))
  );
}

// async function seed() {
//   await redisClient.connect();
//   await Promise.all([
//     seedAnimeGenres(),
//     seedAnimeTitles(),
//     seedAnimeSources(),
//     seedAnimeStudios(),
//   ]);
//   await redisClient.disconnect();
// }

// seed()
//   .then(() => console.log("success"))
//   .catch((err) => console.error(err));
