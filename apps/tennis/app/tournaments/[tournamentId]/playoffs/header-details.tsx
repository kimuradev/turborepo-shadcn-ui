
const ROUND_DICTIONARY = [
    { key: 'RoundOf64', value: 'Rodada 64'},
    { key: 'RoundOf32', value: 'Rodada 32'},
    { key: 'RoundOf16', value: 'Rodada 16'},
    { key: 'Eighthfinal', value: 'Oitavas de Final'},
    { key: 'Quarterfinal', value: 'Quartas de Final'},
    { key: 'Semifinal', value: 'Semi Final'},
    { key: 'final', value: 'Final'}
]

export default function HeaderDetails({ games }: any) {
    const uniqueRounds = [...new Set(games.data.map((item: any) => item.round))];

    function getHeaderWidth() {
        const calc = uniqueRounds.length * 210;
        return `w-[${calc}px]`
    }

    function getValueFromKey(key: string) {
        const roundObject = ROUND_DICTIONARY.find(item => item.key === key);
        return roundObject ? roundObject.value : null;
    }

    return (
        <div className={`flex mt-4 mb-4 gap-8 ml-4 ${getHeaderWidth()}`}>
            {uniqueRounds.map((round: any) => (
                <span className="m-4 text-muted-foreground font-semibold w-[210px] text-center whitespace-nowrap">{getValueFromKey(round)}</span>
            ))}
        </div>
    )
}