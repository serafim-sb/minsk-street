const base = import.meta.env.BASE_URL
export interface Feature {
  hasStairs: boolean;
  stairsCount: number[];
  hasLedge: boolean;
  hasRail: boolean;
  hasKiker?: boolean; 
}

export interface MediaItem {
  type: "photo" | "video";
  url: string;
}

export interface Spot {
  id: number;
  title: string;
  type: string;
  isCovered: boolean;
  image: string;
  media: MediaItem[];
  coordinates: [number, number];
  surface: string;
  hasLight: boolean;
  hasSecurity: string;
  description: string;
  feature: Feature;
  skatersNow: number;
}
export const spotsData: Spot[] = [
    {id: 1, title: "Цирк", type:"Стрит", isCovered:false, image: `${base}chirk.jpg`, media: [{type: "photo", url: `${base}chirk.jpg`},{type: "photo", url: `${base}chirk_2.jpeg`},{type: "video", url: `${base}chirk.mp4`},], coordinates: [53.905345, 27.570347], surface: "Плитка, много стыков", hasLight: true, hasSecurity: "Никогда", description: "Стрит-локация с разнообразными элементами. Покрытие: плитка (местами присутствуют стыки). Рядом есть 3 и 5 ступенек и одна невысокая грань для новичков. Отличный спот как для разминки, так и для съемки дорожек. Обычно много скейтеров", 
        feature: {hasStairs: true, stairsCount: [3,5], hasLedge: true, hasRail: false},skatersNow: 0},
    {id: 2, title: "Тракторный стадион", type:"Стрит", isCovered:true, image:`${base}stadik.jpg`,media: [{type: "photo", url: `${base}stadik.jpg`},{type: "photo", url: `${base}stadik_3.webp`},{type: "video", url: `${base}stadik.mp4`},], coordinates: [53.880167, 27.613233], surface: "Бетон/Плитка", hasLight: true, hasSecurity: "Никогда", description: "Локальный стрит-спот под крышей для катания в любую погоду. Покрытие — гладкий бетон и ровная плитка без стыков. Спот полностью флетовый, без ступеней и граней, но есть интересная пролетка для прыжков. Отличная локация для отработки трюков на флете. Мало скейторов.",
        feature: {hasStairs: false, stairsCount: [],  hasLedge: false, hasRail: false} ,skatersNow: 0}, 
    {id: 3, title: "Каменная горка", type:"Парк", isCovered:false, image:`${base}kamenka.jpg`, media:[{type: "photo", url: `${base}kamenka.jpg`},{type: "photo", url: `${base}kamenka_1.jpg`},{type: "photo", url: `${base}kamenka_3.jpg`}], coordinates: [53.92, 27.4363], surface: "Бетон", hasLight: true, hasSecurity: "Никогда", description:"Самый большой скейт-парк в Беларуси с большим разнообразием фигур. Конфигурация парка специфическая (много странных радиусов и переходов), но есть удобный бокс для скольжений и большой выбор перил разной высоты. На споте всегда высокая загруженность, основную массу трафика составляют самокатеры. Лучше приезжать на катку после 21.",
        feature: {hasStairs: true, stairsCount: [5], hasLedge: true, hasRail: true, hasKiker: true},skatersNow: 0 },
    {id:4, title: "Кристал", type: "Стрит", isCovered:false, image:`${base}cristal.webp`,media: [{type: "photo", url: `${base}cristal.webp`},{type: "photo", url: `${base}cristal_2.webp`},{type: "video", url: `${base}cristal.mp4`},], coordinates: [53.916742, 27.549012], surface: "Мрамор", hasLight: false, hasSecurity: "Никогда", description: "Не очень популярный стрит-спот под открытым небом, главная фишка которого — множество качественных мраморных граней, расположенных слегка по кругу. Покрытие здесь в отличном состоянии, стыков почти нет, а грани идеально скользят. Топовое место для практики слайдов, грайндов и раскатки как для новичков, так и для про-райдеров.",
        feature: {hasStairs: false,stairsCount: [],  hasLedge: true, hasRail: false},skatersNow: 0},
    {id:5, title: "Бел экспо", type: "Стрит", isCovered:false, image:`${base}bel.webp`,media: [{type: "photo", url: `${base}bel.webp`},{type: "photo", url: `${base}bel_2.jpg`},{type: "video", url: `${base}bel.mp4`},], coordinates: [53.927996, 27.520618], surface: "Мрамор", hasLight: false, hasSecurity: "Часто", description: "Интересная стрит-локация с большим количеством граней и аккуратных маленьких перил, которые отлично подойдут для изучения новых трюков. Непосредственно возле граней уложен гладкий мрамор, обеспечивающий приятный и стабильный подъезд. Однако остальное пространство спота покрыто мелкой, неприятной плиткой. Стоит быть внимательным: со спота часто просит уйти охрана или милиция.",
        feature: {hasStairs: false,stairsCount: [],  hasLedge: true, hasRail: true},skatersNow: 0}, 
    {id:6, title: "Стела", type: "Стрит", isCovered:false, image:`${base}stela_2.webp`,media: [{type: "photo", url: `${base}stela.webp`},{type: "photo", url: `${base}stela_2.webp`}], coordinates: [53.915771, 27.538055], surface: "Мрамор", hasLight: true, hasSecurity: "Часто", description: "Легендарный стрит-спот. Сейчас находится не в лучшем состоянии: покрытие избито, присутствует много жестких стыков. На большинстве топовых гранитных граней установлены скейт-стопы (антивандальные уголки), что сильно урезает возможности для слайдов. Главный плюс спота — обилие ступеней на любой уровень катания. Из-за статуса мемориала со спота очень часто и быстро прогоняет охрана или милиция.",
        feature: {hasStairs: true,stairsCount: [2,3,4,5],  hasLedge: true, hasRail: false},skatersNow: 0},
    {id:7, title: "Фонтан Победы", type: "Стрит", isCovered:false, image:`${base}fontan.webp`,media: [{type: "photo", url: `${base}fontan.webp`}], coordinates: [53.918239, 27.540856], surface: "Мрамор", hasLight: false, hasSecurity: "Никогда", description: "Просторный флэт-спот. Отличное место для раскатки, изучения базовых трюков и простого чилла. Покрытие — плитка, местами присутствуют ощутимые стыки. Есть камни через которые можно попрыгать. В теплые дни здесь много пешеходов.",
        feature: {hasStairs: false,stairsCount: [],  hasLedge: false, hasRail: false},skatersNow: 0},  
];