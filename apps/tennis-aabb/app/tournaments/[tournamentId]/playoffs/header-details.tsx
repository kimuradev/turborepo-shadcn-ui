
const ROUND_DICTIONARY = [
    { key: 'Sixteenthfinal', value: 'Rodada 16'},
    { key: 'Eighthfinal', value: 'Oitavas de Final'},
    { key: 'Quarterfinal', value: 'Quartas de Final'},
    { key: 'Semifinal', value: 'Semi Final'},
    { key: 'final', value: 'Final'}
]

export default function HeaderDetails({ games }: any) {
    const uniqueRounds = [...new Set(games.data.map((item: any) => item.round))];

    function getValueFromKey(key: string) {
        const roundObject = ROUND_DICTIONARY.find(item => item.key === key);
        return roundObject ? roundObject.value : null;
    }

    return (
        <div className={`flex mt-4 mb-4 gap-8 ml-4 w-[1600px] `}>
            {uniqueRounds.map((round: any) => (
                <div className="flex justify-center w-[270px] "  >
                    <span className="text-muted-foreground font-semibold text-center whitespace-nowrap">{getValueFromKey(round)}</span>
                </div>
            ))}
        </div>
    )
}