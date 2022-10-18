export interface IItemData {
  _id: string;
  name: string;
  height: string;
  race: string;
  gender: string;
  birth: string;
  spouse: string;
  death: string;
  realm: string;
  hair: string;
  wikiUrl: string;
}

const itemsData: IItemData[] = [
  {
    _id: '5cd99d4bde30eff6ebccfbbe',
    height: '',
    race: 'Human',
    gender: 'Female',
    birth: '',
    spouse: 'Belemir',
    death: '',
    realm: '',
    hair: '',
    name: 'Adanel',
    wikiUrl: 'http://lotr.wikia.com//wiki/Adanel',
  },
  {
    _id: '5cd99d4bde30eff6ebccfbbf',
    height: '',
    race: 'Human',
    gender: 'Male',
    birth: 'Before ,TA 1944',
    spouse: '',
    death: 'Late ,Third Age',
    realm: '',
    hair: '',
    name: 'Adrahil I',
    wikiUrl: 'http://lotr.wikia.com//wiki/Adrahil_I',
  },
  {
    _id: '5cd99d4bde30eff6ebccfbc0',
    height: '',
    race: 'Human',
    gender: 'Male',
    birth: 'TA 2917',
    spouse: 'Unnamed wife',
    death: 'TA 3010',
    realm: '',
    hair: '',
    name: 'Adrahil II',
    wikiUrl: 'http://lotr.wikia.com//wiki/Adrahil_II',
  },
  {
    _id: '5cd99d4bde30eff6ebccfbc1',
    height: '',
    race: 'Elf',
    gender: 'Male',
    birth: 'YT during the ,Noontide of Valinor',
    spouse: 'Loved ,Andreth but remained unmarried',
    death: 'FA 455',
    realm: '',
    hair: 'Golden',
    name: 'Aegnor',
    wikiUrl: 'http://lotr.wikia.com//wiki/Aegnor',
  },
  {
    _id: '5cd99d4bde30eff6ebccfbc2',
    height: '',
    race: 'Human',
    gender: 'Female',
    birth: 'Mid ,First Age',
    spouse: 'Brodda',
    death: 'FA 495',
    realm: '',
    hair: '',
    name: 'Aerin',
    wikiUrl: 'http://lotr.wikia.com//wiki/Aerin',
  },
  {
    _id: '5cd99d4bde30eff6ebccfbc3',
    height: '',
    race: 'Human',
    gender: 'Female',
    birth: 'Between ,SA 700, and ,SA 750',
    spouse: 'Orchaldor',
    death: 'Early ,Second Age',
    realm: '',
    hair: '',
    name: 'Ailinel',
    wikiUrl: 'http://lotr.wikia.com//wiki/Ailinel',
  },
  {
    _id: '5cd99d4bde30eff6ebccfbc4',
    height: '',
    race: 'Human',
    gender: 'Male',
    birth: 'TA 2827',
    spouse: 'Unnamed wife',
    death: 'TA 2932',
    realm: '',
    hair: '',
    name: 'Aglahad',
    wikiUrl: 'http://lotr.wikia.com//wiki/Aglahad',
  },
  {
    _id: '5cd99d4bde30eff6ebccfbc5',
    height: '',
    race: 'Human',
    gender: 'Male',
    birth: 'Late ,First Age',
    spouse: 'None known',
    death: 'FA 489',
    realm: '',
    hair: '',
    name: 'Algund',
    wikiUrl: 'http://lotr.wikia.com//wiki/Algund',
  },
  {
    _id: '5cd99d4bde30eff6ebccfbc6',
    height: '',
    race: 'Human',
    gender: 'Female',
    birth: 'Between ,SA 700, and ,SA 750',
    spouse: '',
    death: 'Early ,Second Age',
    realm: '',
    hair: '',
    name: 'Almiel',
    wikiUrl: 'http://lotr.wikia.com//wiki/Almiel',
  },
];

export const testItem: IItemData = {
  _id: 'idValue',
  height: 'heightValue',
  race: 'raceValue',
  gender: 'genderValue',
  birth: 'birtValue',
  spouse: 'spouseValue',
  death: 'deathValue',
  realm: 'realmValue',
  hair: 'hairValue',
  name: 'nameValue',
  wikiUrl: 'wikiUrlValue',
};

export default itemsData;
