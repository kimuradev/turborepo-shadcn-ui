"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/ui/tabs"

import { useTournamentClassification } from "./useTournamentClassification";
import PlayoffsDetails from "./playoffs/details";


type TournamentTabsProps = {
    classes: string[],
    tournament: string,
    year: number,
    classId?: string,
}

export default function TournamentTabs({ classes, tournament, year, classId }: TournamentTabsProps) {
    const DEFAULT_CLASS = classId || '1';
    // @ts-ignore
    const [{ isLoading, games, currentClassId }, { handleClickTab }] = useTournamentClassification({ year, tournament, classId: DEFAULT_CLASS })

    return (
        <Tabs defaultValue={DEFAULT_CLASS} className="w-[400px]">
            <TabsList>
                {classes?.map((c: any) => (
                    <TabsTrigger key={c.id} value={c.id.toString()} onClick={() => handleClickTab?.(c.id)}>{c.name}</TabsTrigger>
                ))}
            </TabsList>

            {classes?.map((c: any) => (
                <TabsContent key={c.id} value={c.id.toString()}>
                    <PlayoffsDetails classes={classes} games={games} isLoading={isLoading} tournament={tournament} year={year} classId={currentClassId}/>
                </TabsContent>
            ))}
        </Tabs>
    )
}