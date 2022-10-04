export const BASE_IMG_URL = 'https://image.tmdb.org/t/p/w1280/';

export interface IItemData {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const itemsData: IItemData[] = [
  {
    adult: false,
    backdrop_path: '/5GA3vV1aWWHTSDO5eno8V5zDo8r.jpg',
    genre_ids: [27, 53],
    id: 760161,
    original_language: 'en',
    original_title: 'Orphan: First Kill',
    overview:
      'After escaping from an Estonian psychiatric facility, Leena Klammer travels to America by impersonating Esther, the missing daughter of a wealthy family. But when her mask starts to slip, she is put against a mother who will protect her family from the murderous “child” at any cost.',
    popularity: 7115.298,
    poster_path: '/wSqAXL1EHVJ3MOnJzMhUngc8gFs.jpg',
    release_date: '2022-07-27',
    title: 'Orphan: First Kill',
    video: false,
    vote_average: 7,
    vote_count: 797,
  },
  {
    adult: false,
    backdrop_path: '/pRrq1t1rBEELElYUA3B2eM3AXnP.jpg',
    genre_ids: [28, 35, 53],
    id: 718930,
    original_language: 'en',
    original_title: 'Bullet Train',
    overview:
      "Unlucky assassin Ladybug is determined to do his job peacefully after one too many gigs gone off the rails. Fate, however, may have other plans, as Ladybug's latest mission puts him on a collision course with lethal adversaries from around the globe—all with connected, yet conflicting, objectives—on the world's fastest train.",
    popularity: 5678.208,
    poster_path: '/tVxDe01Zy3kZqaZRNiXFGDICdZk.jpg',
    release_date: '2022-07-03',
    title: 'Bullet Train',
    video: false,
    vote_average: 7.5,
    vote_count: 1154,
  },
  {
    adult: false,
    backdrop_path: '/2RSirqZG949GuRwN38MYCIGG4Od.jpg',
    genre_ids: [53],
    id: 985939,
    original_language: 'en',
    original_title: 'Fall',
    overview:
      'For best friends Becky and Hunter, life is all about conquering fears and pushing limits. But after they climb 2,000 feet to the top of a remote, abandoned radio tower, they find themselves stranded with no way down. Now Becky and Hunter’s expert climbing skills will be put to the ultimate test as they desperately fight to survive the elements, a lack of supplies, and vertigo-inducing heights',
    popularity: 5574.242,
    poster_path: '/spCAxD99U1A6jsiePFoqdEcY0dG.jpg',
    release_date: '2022-08-11',
    title: 'Fall',
    video: false,
    vote_average: 7.5,
    vote_count: 1118,
  },
  {
    adult: false,
    backdrop_path: '/rwgmDkIEv8VjAsWx25ottJrFvpO.jpg',
    genre_ids: [10749, 18],
    id: 744276,
    original_language: 'en',
    original_title: 'After Ever Happy',
    overview:
      "As a shocking truth about a couple's families emerges, the two lovers discover they are not so different from each other. Tessa is no longer the sweet, simple, good girl she was when she met Hardin — any more than he is the cruel, moody boy she fell so hard for.",
    popularity: 4204.082,
    poster_path: '/6b7swg6DLqXCO3XUsMnv6RwDMW2.jpg',
    release_date: '2022-08-24',
    title: 'After Ever Happy',
    video: false,
    vote_average: 6.8,
    vote_count: 178,
  },
  {
    adult: false,
    backdrop_path: '/nnUQqlVZeEGuCRx8SaoCU4XVHJN.jpg',
    genre_ids: [14, 12, 10751],
    id: 532639,
    original_language: 'en',
    original_title: 'Pinocchio',
    overview: 'A wooden puppet embarks on a thrilling adventure to become a real boy.',
    popularity: 2926.598,
    poster_path: '/g8sclIV4gj1TZqUpnL82hKOTK3B.jpg',
    release_date: '2022-09-07',
    title: 'Pinocchio',
    video: false,
    vote_average: 6.8,
    vote_count: 779,
  },
  {
    adult: false,
    backdrop_path: '/2k9tBql5GYH328Krj66tDT9LtFZ.jpg',
    genre_ids: [12, 18, 27],
    id: 760741,
    original_language: 'en',
    original_title: 'Beast',
    overview:
      'A recently widowed man and his two teenage daughters travel to a game reserve in South Africa. However, their journey of healing soon turns into a fight for survival when a bloodthirsty lion starts to stalk them.',
    popularity: 2806.464,
    poster_path: '/iRV0IB5xQeOymuGGUBarTecQVAl.jpg',
    release_date: '2022-08-11',
    title: 'Beast',
    video: false,
    vote_average: 7.1,
    vote_count: 524,
  },
  {
    adult: false,
    backdrop_path: '/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg',
    genre_ids: [14, 28, 35],
    id: 616037,
    original_language: 'en',
    original_title: 'Thor: Love and Thunder',
    overview:
      'After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor Odinson enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher’s vengeance and stop him before it’s too late.',
    popularity: 1977.589,
    poster_path: '/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
    release_date: '2022-07-06',
    title: 'Thor: Love and Thunder',
    video: false,
    vote_average: 6.8,
    vote_count: 3907,
  },
  {
    adult: false,
    backdrop_path: '/hYZ4a0JvPETdfgJJ9ZzyFufq8KQ.jpg',
    genre_ids: [28, 18, 878],
    id: 629176,
    original_language: 'en',
    original_title: 'Samaritan',
    overview:
      'Thirteen year old Sam Cleary suspects that his mysteriously reclusive neighbor Mr. Smith is actually the legendary vigilante Samaritan, who was reported dead 20 years ago. With crime on the rise and the city on the brink of chaos, Sam makes it his mission to coax his neighbor out of hiding to save the city from ruin.',
    popularity: 2010.95,
    poster_path: '/vwq5iboxYoaSpOmEQrhq9tHicq7.jpg',
    release_date: '2022-08-25',
    title: 'Samaritan',
    video: false,
    vote_average: 7,
    vote_count: 1188,
  },
  {
    adult: false,
    backdrop_path: '/qaTzVAW1u16WFNsepjCrilBuInc.jpg',
    genre_ids: [16, 28, 10751, 35, 878],
    id: 539681,
    original_language: 'en',
    original_title: 'DC League of Super-Pets',
    overview:
      'When Superman and the rest of the Justice League are kidnapped, Krypto the Super-Dog must convince a rag-tag shelter pack - Ace the hound, PB the potbellied pig, Merton the turtle and Chip the squirrel - to master their own newfound powers and help him rescue the superheroes.',
    popularity: 1836.157,
    poster_path: '/r7XifzvtezNt31ypvsmb6Oqxw49.jpg',
    release_date: '2022-07-27',
    title: 'DC League of Super-Pets',
    video: false,
    vote_average: 7.5,
    vote_count: 683,
  },
];

export default itemsData;
