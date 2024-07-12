import { forwardRef } from 'react';
import { CLASSIFICATION } from "@/lib/constants";
import Card from "../card";

const CURRENT_ROUND_DICTIONARY = [
    { key: "Sixteenthfinal", value: 'round-16' },
    { key: "Eighthfinal", value: 'round-default' },
    { key: 'Quarterfinal', value: 'round-default' },
    { key: 'Semifinal', value: 'round-default' },
    { key: 'final', value: 'round-default' }
]

const CLASS_NAME_DICTIONARY = [
    { key: 'Sixteenthfinal', value: 'playoffs-sixteenth-finals' },
    { key: 'Eighthfinal', value: 'playoffs-eighth-finals' },
    { key: 'Quarterfinal', value: 'playoffs-quarter-finals' },
    { key: 'Semifinal', value: 'playoffs-semi-finals' },
    { key: 'final', value: 'playoffs-finals' }
]

type CardListProps = {
    classes: any,
    games: any,
    tournament: string;
    year?: number | null | undefined;
    classId: string
}

const CardList = forwardRef((props: CardListProps, ref: any) => {
    const { classes, games, tournament, year, classId }: CardListProps = props;
    const uniqueRounds = [...new Set(games.data.map((item: any) => item.round))];

    function getValueFromKey(key: any, dictionary: any) {
        const roundObject = dictionary.find((item: any) => item.key === key);
        return roundObject ? roundObject.value : null;
    }

    function getClassName (classId: number) {
        const foundClass = classes.find((c: any) => c.id === classId)
        return foundClass ? foundClass.name : 'N/A';
    }

    return (
        <div className="flex items-center mx-4" ref={ref} >
            <div className="hidden print:flex bg-gray-100 h-[1100px] justify-center items-center p-2 text-nowrap">
                {getClassName(parseInt(classId, 10))}
            </div>
            {uniqueRounds.map((round: any, index) => (
                <div className="flex flex-col justify-center items-center">
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
})

export default CardList;