import axios from "axios";
export async function fetchDataFromApi(url) {
  const res = await axios(url);

  if (!res.errors)
    return res.data.data.map(({ attributes, id }) => ({
      id,
      head: {
        en: attributes.titles.en || "N/A",
        en_jp: attributes.titles.en_jp || "N/A",
        ja_jp: attributes.titles.ja_jp || "N/A",
      },
      episode: attributes.episodeCount,
      seaFin: 3,
      status: attributes.status,
      endDate: attributes.endDate,
      favoritesCount: attributes.favoritesCount,
      type: attributes.showType,
      posterImage: attributes.posterImage,
      description: attributes.description,
      popularityRank: attributes.popularityRank,
      ageRating: attributes.ageRating,
    }));
}
export async function fetchSingle(url) {
  const res = await axios(url);
  if (res && !res.errors) {
    const spec_anime = res.data.data;
    return {
      animeID: spec_anime.id
        .concat(spec_anime.head?.en || spec_anime.head?.ja_jp || "sideeffects")
        .replaceAll(/\s/g, ""),
      id: spec_anime.id,
      head: {
        en: spec_anime.attributes.titles.en || "N/A",
        en_jp: spec_anime.attributes.titles.en_jp || "N/A",
        ja_jp: spec_anime.attributes.titles.ja_jp || "N/A",
      },
      episode: spec_anime.attributes.episodeCount,
      seaFin: 3,
      status: spec_anime.attributes.status,
      endDate: spec_anime.attributes.endDate,
      favoritesCount: spec_anime.attributes.favoritesCount,
      type: spec_anime.attributes.showType,
      posterImage: spec_anime.attributes.posterImage,
      description: spec_anime.attributes.description,
      popularityRank: spec_anime.attributes.popularityRank,
      ageRating: spec_anime.attributes.ageRating,
    };
  }
}
