import prisma from "../../prisma/client";

export async function getAnimeGenres() {
  const animesGenres = await prisma.anime.findMany({
    select: {
      genres: true,
    },
  });

  const genresMap = new Map<string, number>();

  animesGenres.forEach((animeGenres) => {
    animeGenres.genres.forEach((genre) => {
      genresMap.set(genre, (genresMap.get(genre) ?? 0) + 1);
    });
  });

  const sortedMap = new Map(
    [...genresMap.entries()].sort((a, b) => b[1] - a[1])
  );

  return sortedMap;
}

export async function getAnimeSources() {
  const animesSources = await prisma.anime.findMany({
    select: {
      source: true,
    },
  });

  const sourceMap = new Map<string, number>();

  animesSources.forEach(({ source }) => {
    if (!source) {
      return;
    }

    sourceMap.set(source, (sourceMap.get(source) ?? 0) + 1);
  });

  const sortedMap = new Map(
    [...sourceMap.entries()].sort((a, b) => b[1] - a[1])
  );

  return sortedMap;
}

export async function getAnimeStudios() {
  const animesStudios = await prisma.anime.findMany({
    select: {
      studios: true,
    },
  });

  const studiosMap = new Map<string, number>();

  animesStudios.forEach((animeStudios) => {
    animeStudios.studios.forEach((studio) => {
      studiosMap.set(studio, (studiosMap.get(studio) ?? 0) + 1);
    });
  });

  const sortedMap = new Map(
    [...studiosMap.entries()].sort((a, b) => b[1] - a[1])
  );

  return sortedMap;
}

export async function getAllAnimeTitles() {
  const animeTitles = await prisma.anime.findMany({
    select: {
      id: true,
      title: true,
    },
  });

  const animeTitlesMap = new Map(
    animeTitles.map(({ id, title }) => [id, title])
  );

  return animeTitlesMap;
}

// export async function getAllAnimeTitles() {
//   const animeTitles = await prisma.anime.findMany({
//     select: {
//       id: true,
//       title: true,
//       alternativeTitles: true,
//     },
//   });

//   const animeTitlesMap = new Map(
//     animeTitles.map(({ id, title, alternativeTitles }) => [
//       id,
//       [title, ...alternativeTitles],
//     ])
//   );

//   return animeTitlesMap;
// }
