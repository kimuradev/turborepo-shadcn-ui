import AOCircle from '@tennis/public/static/ao-circle.png';
import AB from '@tennis/public/static/AB-rotate.png';
import ABCircle from '@tennis/public/static/ab-circle.png';
import AO from '@tennis/public/static/ao-rotate.jpg';
import RG from '@tennis/public/static/rg-rotate.jpg';
import RGCircle from '@tennis/public/static/rg-circle.png';
import Wimbledon from '@tennis/public/static/wimbledon-rotate.jpg';
import WimbledonCircle from '@tennis/public/static/wimb-circle.png';
import US from '@tennis/public/static/us-open-rotate.jpg';
import USCircle from '@tennis/public/static/us-circle.png';
import Finals from '@tennis/public/static/finals-rotate.png';
import FinalsCircle from '@tennis/public/static/finals-circle.png';

export const COOKIE_NAME = 'token';

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

export const SHIRT_SIZE = [
    { value: 'P', label: 'P' },
    { value: 'M', label: 'M' },
    { value: 'G', label: 'G' },
    { value: 'GG', label: 'GG' },
]

export const YEARS = ['2024', '2025'];

export const TOURNAMENT_ID = {
    AB: 'ab',
    AO: 'ao',
    RG: 'rg',
    WIMBLEDON: 'wimbledon',
    US: 'usopen',
    FINALS: 'finals'
}

const TOURNAMENT_NAMES = {
    AB: 'AB Open',
    AO: 'AB Australian Open',
    RG: 'AB Roland Garros',
    WIMBLEDON: 'AB Wimbledon',
    US: 'AB US Open',
    FINALS: 'AB Finals'
}

export const TOURNAMENTS = [
    { value: TOURNAMENT_ID.AO, headerSrcImg: AO, contentSrcImg: { src: AOCircle, alt: TOURNAMENT_NAMES.AO }, bgColor: 'bg-blue-50', link: `/tournaments/${TOURNAMENT_ID.AO}`},
    { value: TOURNAMENT_ID.RG, headerSrcImg: RG, contentSrcImg: { src: RGCircle, alt: TOURNAMENT_NAMES.RG }, bgColor: 'bg-orange-50', link: `/tournaments/${TOURNAMENT_ID.RG}`},
    { value: TOURNAMENT_ID.WIMBLEDON, headerSrcImg: Wimbledon, contentSrcImg: { src: WimbledonCircle, alt: TOURNAMENT_NAMES.WIMBLEDON }, bgColor: 'bg-green-50', link: `/tournaments/${TOURNAMENT_ID.WIMBLEDON}`},
    { value: TOURNAMENT_ID.US, headerSrcImg: US, contentSrcImg: { src: USCircle, alt: TOURNAMENT_NAMES.US }, bgColor: 'bg-blue-50', link: `/tournaments/${TOURNAMENT_ID.US}`},
    { value: TOURNAMENT_ID.FINALS, headerSrcImg: Finals, contentSrcImg: { src: FinalsCircle, alt: TOURNAMENT_NAMES.FINALS }, bgColor: 'bg-blue-200', link: `/tournaments/${TOURNAMENT_ID.FINALS}` },
    { value: TOURNAMENT_ID.AB, headerSrcImg: AB, contentSrcImg: { src: ABCircle, alt: TOURNAMENT_NAMES.AB }, bgColor: 'bg-white', link: `/tournaments/${TOURNAMENT_ID.AB}`},
    // { value:  'ab-duplas', subtitle: 'Janeiro', headerSrcImg: Finals, contentSrcImg: { src: FinalsCircle, alt: TOURNAMENT_NAMES.FINALS }, bgColor: 'bg-blue-200', link: '/tournaments/finals'},
]

export const TOURNAMENT_DICTIONARY = [
    { id: TOURNAMENT_ID.AO, value: TOURNAMENT_NAMES.AO },
    { id: TOURNAMENT_ID.RG, value: TOURNAMENT_NAMES.RG },
    { id: TOURNAMENT_ID.US, value: TOURNAMENT_NAMES.US },
    { id: TOURNAMENT_ID.WIMBLEDON, value: TOURNAMENT_NAMES.WIMBLEDON },
    { id: TOURNAMENT_ID.FINALS, value: TOURNAMENT_NAMES.FINALS },
    { id: TOURNAMENT_ID.AB, value: TOURNAMENT_NAMES.AB },
]

export const GAME_RESULTS = [
    '2', '1', '0'
]

export const CLASSIFICATION = [
    '1/2', '3/4', '5/6', '7/8', '9/10', '11/12', '13/14', '15/16'
]

export const RANKING_TAB = "general" 

export const DATE_FORMAT = "dd/MM/yyyy"

export const FINALS_CLASS_ID = 7;

export const ROLE_ADMIN = 'admin';
