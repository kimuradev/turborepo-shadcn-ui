import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type PlayersProps = {
    id?: string,
    name: string,
    class_id?: string,
    status: string,
    phone?: string,
    email?: string,
}

export type DetailsProps = {
    unique_id: string;
    game_number: string,
    player1: string,
    player2: string,
    type?: string,
}

export type GameDetailsProps = {
    data: DetailsProps[] | never[],
    game_week: string[] | never[]
}

export type TopTenProps = {
    player_name: string
    class_id?: string
    points: string,
    index: number
}

export type TopTenDataProps = {
    data: TopTenProps[]
    isLoading?: boolean
}

export type DashboardCardProps = {
    title: string,
    description?: string,
    className?: string,
    isEditable?: boolean,
    children: React.ReactNode
}

export type DialogDemoProps = {
    isOpen: boolean,
    isLoading?: boolean,
    data: {
        id: string,
        name: string
    }
    handleCancel: () => void,
    handleRemovePlayer: (response: any) => void
}

export type Players = {
    id: string
    class: string,
    status: "Ativo" | "Afastado" | "Inativo"
    name: string
}

export type DialogProps = {
    isOpen: boolean,
    isLoading?: boolean,
    data: {
        id: string,
        name: string,
    }
}

export type CardProps = {
    data: DetailsProps[]
    classification?: string[] | undefined
}

export type TournamentDetails = {
    tournament: string,
}

export type DialogResultProps = {
    isOpen: boolean,
    data: any,
    handleCancel: () => void,
}

type DataProps = {
    id: string,
    unique_id: string,
    player1: string,
    player2: string,
    player1_id: string,
    player2_id: string,
    player1_score: string,
    player2_score: string,
    game_number: string,
    round: string,
    class_id: string
}

export type TournamentResultProps = {
    data: DataProps,
    player1: string,
    player2: string,
    handleCloseDialog: () => void
}

export type GameWeekProps = {
    id: string,
    week: string[]
}

export type TournamentTabs = {
    classes: string[],
    tournament: string,
    year?: number | null,
    classId?: string,
}

export type FinalsDetailsProps = {
    tournament: string,
    year?: number | null,
}

export type CardTournamentProps = {
    id: string,
    title: string,
    subtitle: string,
    headerSrcImg: string | StaticImport,
    contentSrcImg: {
        src: string | StaticImport,
        alt: string
    },
    bgColor: string,
    link: string,
    year: string,
    subscriptionIsOpen: boolean,
    started: boolean,
    subscription: any,
}

export type ProfileProps = {
    id?: string,
    user?: string,
    cpf?: string,
    email?: string,
    name?: string,
    phone?: string
}

export type SubscribedPlayersProps = {
    data: {
        points: number,
        player_id: string,
        player_name: string,
        payment: PaymentStatus
    } | [],
    isLoading: boolean
}

export type PaymentStatus =   'paid' | 'pending' | 'irregular'