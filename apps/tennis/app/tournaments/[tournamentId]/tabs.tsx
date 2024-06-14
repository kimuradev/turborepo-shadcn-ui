"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/ui/tabs"
import { type TournamentTabs } from "@/lib/definitions";

import ClassificationDetails from "./classification/details";
import { useTournamentClassification } from "./useTournamentClassification";

export default function TournamentTabs({ classes, tournament, year, classId}: TournamentTabs) {
    const DEFAULT_CLASS = classId || '1';
    // @ts-ignore
    const [{ isLoading, games}, { handleClickTab }] = useTournamentClassification({ year, tournament, classId : DEFAULT_CLASS})

    return (
        <Tabs defaultValue={DEFAULT_CLASS} className="w-[400px]">
            <TabsList>
                {classes?.map((c: any) => (
                    <TabsTrigger key={c.id} value={c.id.toString()} onClick={() => handleClickTab?.(c.id)}>{c.name}</TabsTrigger>
                ))}
            </TabsList>

            {classes?.map((c: any) => (
                <TabsContent key={c.id} value={c.id.toString()}>
                    <ClassificationDetails isLoading={isLoading} games={games} />
                </TabsContent>
            ))}
        </Tabs>
    )
}