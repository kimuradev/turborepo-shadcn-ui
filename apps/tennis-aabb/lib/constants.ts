import AABB from '@/public/static/quadra_aabb.png';
import AABBCircle from '@/public/static/AABB-circle.png';

import AOCircle from '@/public/static/ao-circle.png';
import AB from '@/public/static/AB-rotate.png';
import ABDoubles from '@/public/static/AB-DOUBLES.jpg';
import ABCircle from '@/public/static/ab-circle.png';
import AO from '@/public/static/ao-rotate.jpg';
import RG from '@/public/static/rg-rotate.jpg';
import RGCircle from '@/public/static/rg-circle.png';
import Wimbledon from '@/public/static/wimbledon-rotate.jpg';
import WimbledonWTA from '@/public/static/wta-wimbledon.jpg';
import WimbledonCircle from '@/public/static/wimb-circle.png';
import WimbledonCircleWTA from '@/public/static/wimb-circle-WTA.png';
import US from '@/public/static/us-open-rotate.jpg';
import USCircle from '@/public/static/us-circle.png';
import Finals from '@/public/static/finals-rotate.png';
import FinalsCircle from '@/public/static/finals-circle.png';

export const COOKIE_NAME = 'token';

export const ATP = 'atp';
export const WTA = 'wta';

export const URL = {
    dashboard: '/',
    login: '/login',
    players: '/players',
    ranking: '/ranking',
    rules: '/rules',
    tournaments: '/tournaments',
}

export const STATUS_OPTIONS = [
    { value: 'Ativo', label: 'Ativo' },
    { value: 'Afastado', label: 'Afastado' },
    { value: 'Inativo', label: 'Inativo' },
]

export const USER_STATUS_OPTIONS = [
    { value: true, label: 'Verificado' },
    { value: false, label: 'Não verificado' },
]

export const TOURNAMENT_STATUS_OPTIONS = [
    { value: true, label: 'Em andamento' },
    { value: false, label: 'Finalizado' },
]

export const SHIRT_SIZE = [
    { value: 'P', label: 'P' },
    { value: 'M', label: 'M' },
    { value: 'G', label: 'G' },
    { value: 'GG', label: 'GG' },
]

export const YEARS_OPTIONS = [
    { value: '2024', label: '2024' },
    // { value: '2025', label: '2025' }
]

// export const YEARS = ['2024', '2025'];
export const YEARS = ['2024'];

export const TOURNAMENT_ID = {
    AABB: 'aabb',
    // AB: 'ab',
    // AO: 'ao',
    // RG: 'rg',
    // WIMBLEDON: 'wimbledon',
    // US: 'usopen',
    // FINALS: 'finals',
    // DOUBLES: 'ab-doubles',
    // WIMBLEDON_WTA: 'wimbledon-wta',
}

const TOURNAMENT_NAMES = {
    AABB: 'Circuito AABB',
    // AB: 'AB Open',
    // AO: 'AB Australian Open',
    // RG: 'AB Roland Garros',
    // WIMBLEDON: 'AB Wimbledon',
    // US: 'AB US Open',
    // FINALS: 'AB Finals',
    // DOUBLES: 'AB Duplas',
    // WIMBLEDON_WTA: 'AB Wimbledon WTA',
}

export const TOURNAMENTS = [
    { value: TOURNAMENT_ID.AABB, headerSrcImg: AABB, contentSrcImg: { src: AABBCircle, alt: TOURNAMENT_NAMES.AABB }, bgColor: 'bg-blue-50', link: `/tournaments/${TOURNAMENT_ID.AABB}`},
    // { value: TOURNAMENT_ID.AO, headerSrcImg: AO, contentSrcImg: { src: AOCircle, alt: TOURNAMENT_NAMES.AO }, bgColor: 'bg-blue-50', link: `/tournaments/${TOURNAMENT_ID.AO}`},
    // { value: TOURNAMENT_ID.RG, headerSrcImg: RG, contentSrcImg: { src: RGCircle, alt: TOURNAMENT_NAMES.RG }, bgColor: 'bg-orange-50', link: `/tournaments/${TOURNAMENT_ID.RG}`},
    // { value: TOURNAMENT_ID.WIMBLEDON, headerSrcImg: Wimbledon, contentSrcImg: { src: WimbledonCircle, alt: TOURNAMENT_NAMES.WIMBLEDON }, bgColor: 'bg-green-50', link: `/tournaments/${TOURNAMENT_ID.WIMBLEDON}`},
    // { value: TOURNAMENT_ID.US, headerSrcImg: US, contentSrcImg: { src: USCircle, alt: TOURNAMENT_NAMES.US }, bgColor: 'bg-blue-50', link: `/tournaments/${TOURNAMENT_ID.US}`},
    // { value: TOURNAMENT_ID.FINALS, headerSrcImg: Finals, contentSrcImg: { src: FinalsCircle, alt: TOURNAMENT_NAMES.FINALS }, bgColor: 'bg-blue-200', link: `/tournaments/${TOURNAMENT_ID.FINALS}` },
    
    // { value: TOURNAMENT_ID.AB, headerSrcImg: AB, contentSrcImg: { src: ABCircle, alt: TOURNAMENT_NAMES.AB }, bgColor: 'bg-white', link: `/tournaments/${TOURNAMENT_ID.AB}`},
    // { value: TOURNAMENT_ID.DOUBLES, headerSrcImg: ABDoubles, contentSrcImg: { src: ABCircle, alt: TOURNAMENT_NAMES.DOUBLES }, bgColor: 'bg-white', link: `/tournaments/${TOURNAMENT_ID.DOUBLES}`},
    // // { value:  'ab-duplas', subtitle: 'Janeiro', headerSrcImg: Finals, contentSrcImg: { src: FinalsCircle, alt: TOURNAMENT_NAMES.FINALS }, bgColor: 'bg-blue-200', link: '/tournaments/finals'},

    // { value: TOURNAMENT_ID.WIMBLEDON_WTA, headerSrcImg: WimbledonWTA, contentSrcImg: { src: WimbledonCircleWTA, alt: TOURNAMENT_NAMES.WIMBLEDON }, bgColor: 'bg-red-100', link: `/tournaments/${TOURNAMENT_ID.WIMBLEDON_WTA}`},
]

export const TOURNAMENT_DICTIONARY = [
    // { id: TOURNAMENT_ID.AO, value: TOURNAMENT_NAMES.AO },
    // { id: TOURNAMENT_ID.RG, value: TOURNAMENT_NAMES.RG },
    // { id: TOURNAMENT_ID.WIMBLEDON, value: TOURNAMENT_NAMES.WIMBLEDON },
    // { id: TOURNAMENT_ID.US, value: TOURNAMENT_NAMES.US },
    // { id: TOURNAMENT_ID.FINALS, value: TOURNAMENT_NAMES.FINALS },
    // { id: TOURNAMENT_ID.WIMBLEDON_WTA, value: TOURNAMENT_NAMES.WIMBLEDON_WTA },
    // { id: TOURNAMENT_ID.AB, value: TOURNAMENT_NAMES.AB },
    // { id: TOURNAMENT_ID.DOUBLES, value: TOURNAMENT_NAMES.DOUBLES },
]

export const TOURNAMENT_CATEGORY = [
    { value: ATP, label: 'ATP' },
    { value: WTA, label: 'WTA' },
]

export const GAME_RESULTS = [
    '2', '1', '0'
]

export const CLASSIFICATION = [
    '1/2', '3/4', '5/6', '7/8', '9/10', '11/12', '13/14', '15/16'
]

export const RANKING_TAB_GENERAL = "general" 
export const RANKING_TAB_WTA = "wta" 

export const DATE_FORMAT = "dd/MM/yyyy"

export const DATE_TIME_FORMAT = "dd/MM/yyyy HH:mm:ss"

export const FINALS_CLASS_ID = 7;

export const ROLE_ADMIN = 'admin';

export const GAME_FLOW_WO = 'wo';
export const GAME_FLOW_SORTED = 'sorted';