import { CLASSIFICATION } from "@/lib/constants";
import Card from "../card";

const CURRENT_ROUND_DICTIONARY = [
    { key: 'RoundOf64', value: 'round-64' },
    { key: 'RoundOf32', value: 'round-32' },
    { key: 'RoundOf16', value: 'round-16' },
    { key: 'Eighthfinal', value: 'round-default' },
    { key: 'Quarterfinal', value: 'round-default' },
    { key: 'Semifinal', value: 'round-default' },
    { key: 'final', value: 'round-default' }
]

const CLASS_NAME_DICTIONARY = [
    { key: 'RoundOf64', value: 'playoffs-64-finals' },
    { key: 'RoundOf32', value: 'playoffs-32-finals' },
    { key: 'RoundOf16', value: 'playoffs-sixteenth-finals' },
    { key: 'Eighthfinal', value: 'playoffs-eighth-finals' },
    { key: 'Quarterfinal', value: 'playoffs-quarter-finals' },
    { key: 'Semifinal', value: 'playoffs-semi-finals' },
    { key: 'final', value: 'playoffs-finals' }
]

type CardListProps = {
    games: any,
    tournament: string;
    year?: number | null | undefined;

}

function CardList({ games, tournament, year }: CardListProps) {
    const uniqueRounds = [...new Set(games.data.map((item: any) => item.round))];

    function getValueFromKey(key: any, dictionary: any) {
        const roundObject = dictionary.find((item: any) => item.key === key);
        return roundObject ? roundObject.value : null;
    }

    return (
        <div className="flex items-center gap-">
            {uniqueRounds.map((round: any, index) => (
                <div className={`flex flex-col justify-center items-center`}>
                    <Card
                        data={games.data.filter((game: any) => game.round === round)}
                        classification={round === 'final' ? CLASSIFICATION : []}
                        className={`${getValueFromKey(uniqueRounds[0], CURRENT_ROUND_DICTIONARY)} ${getValueFromKey(round, CLASS_NAME_DICTIONARY)} ${index === 0 ? 'isFirst' : ''}`} 
                        tournament={tournament}
                        year={year}
                    />

                </div>
            ))}
        </div >
    )
}

export default CardList;