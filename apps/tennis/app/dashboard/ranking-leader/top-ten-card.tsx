import { TopTenProps } from "@tennis/lib/definitions";
import { getInitialLetterName } from "@tennis/lib/utils";

export default function TopTenCard({ player_name, class_id: currentClass, points, index}: TopTenProps) {
    const getBackgroundClass = (position: number) => {
        switch (position) {
            case 0:
                return 'bg-[#fde047]'
            case 1:
                return 'bg-[#e5e7eb]'
            case 2:
                return 'bg-[#f59e0b]'
            default:
                return 'border'
        }
    }

    return (
        <div className="flex items-center">
            <div className={`flex h-10 w-10 rounded-full ${getBackgroundClass(index)} justify-center items-center`}>
                {getInitialLetterName(player_name)}
            </div>
            <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{player_name}</p>
                <p className="text-sm text-muted-foreground">
                   {currentClass}
                </p>
            </div>
            <div className="ml-auto font-medium pl-2">{points} pts </div>
        </div>
    )
}