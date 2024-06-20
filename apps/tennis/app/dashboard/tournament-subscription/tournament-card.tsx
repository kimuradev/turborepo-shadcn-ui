import { TOURNAMENTS } from "@/lib/constants";
import CardTournament from "./card";


function TournamentCard({ data, tournamentIndex }: any) {
    return (
        <div className="pl-4">
            <div className='flex flex-wrap gap-6 justify-center items-center'>
                <CardTournament
                    key={data.id}
                    id={data.id}
                    title={data.name}
                    subtitle={data.description}
                    headerSrcImg={TOURNAMENTS[tournamentIndex]?.headerSrcImg || ''}
                    contentSrcImg={TOURNAMENTS[tournamentIndex]?.contentSrcImg || { src: '', alt: '' }}
                    bgColor={TOURNAMENTS[tournamentIndex]?.bgColor || ''}
                    link={TOURNAMENTS[tournamentIndex]?.link || ''}
                    year={data.year}
                    subscriptionIsOpen={data.active}
                    started={data.started}
                    paymentStatus={data.paymentStatus}
                    isSubscribed={data.isSubscribed}
                    isPaymentPending={data.isPaymentPending}
                />
            </div>
        </div>
    )
}

export default TournamentCard;