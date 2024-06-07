// Loading animation
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function CardSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex p-4">
        <div className="h-5 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-16 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex items-center justify-center truncate rounded-xl bg-white px-4 py-8">
        <div className="h-44 w-40 rounded-md bg-gray-200" />
      </div>
    </div>
  );
}

export function CardGamesSkeleton() {
  return (
    <div
      className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2 shadow-sm`}
    >
      <div className="flex justify-center p-2">
        <div className="h-6 w-5 rounded-md bg-gray-200" />
        <div className="ml-2 h-6 w-32 rounded-md bg-gray-200 text-sm font-medium" />
      </div>
      <div className="flex flex-col items-center justify-center truncate rounded-xl bg-white px-2 py-2 gap-4">
        <div className="flex gap-4 justify-between">
          <div className="flex gap-4 ">
            <div className="h-6 w-6 rounded-md bg-gray-200" />
            <div className="h-6 w-32 rounded-md bg-gray-200" />
          </div>
          <div className="h-6 w-6 rounded-md bg-gray-200" />
        </div>
        <div className="flex gap-4 justify-between">
          <div className="flex gap-4 ">
            <div className="h-6 w-6 rounded-md bg-gray-200" />
            <div className="h-6 w-32 rounded-md bg-gray-200" />
          </div>
          <div className="h-6 w-6 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function GamesSkeleton() {
  return (
    <div
      className={`${shimmer} rounded-xl p-2 shadow-sm`}
    >
      <div className="flex justify-between py-8 gap-2 w-[1100px]">
        <div className="h-6 w-60 rounded-md bg-gray-200" />
        <div className="h-6 w-60 rounded-md bg-gray-200" />
        <div className="h-6 w-60 rounded-md bg-gray-200" />
        <div className="h-6 w-60 rounded-md bg-gray-200" />
      </div>

      <div className={`${shimmer} flex items-center gap-4 w-[1100px]`}>
        <div className="flex flex-col w-[270px] gap-6">
          <CardGamesSkeleton />
          <CardGamesSkeleton />
          <CardGamesSkeleton />
          <CardGamesSkeleton />
        </div>
        <div className="flex flex-col w-[270px] gap-4">
          <CardGamesSkeleton />
          <CardGamesSkeleton />
          <CardGamesSkeleton />
          <CardGamesSkeleton />
        </div>
        <div className="flex flex-col w-[270px] gap-2">
          <CardGamesSkeleton />
          <CardGamesSkeleton />
          <CardGamesSkeleton />
          <CardGamesSkeleton />
        </div>
        <div className="flex flex-col w-[270px] gap-1">
          <CardGamesSkeleton />
          <CardGamesSkeleton />
          <CardGamesSkeleton />
          <CardGamesSkeleton />
        </div>
      </div>
    </div>
  );
}

export function GameScheduleRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-20 rounded bg-gray-100"></div>
          <div className="h-6 w-20 rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}


export function GameScheduleSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden bg-white">
            <GameScheduleRowSkeleton />
            <GameScheduleRowSkeleton />
            <GameScheduleRowSkeleton />
            <GameScheduleRowSkeleton />
            <GameScheduleRowSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-1 font-medium sm:pl-6">
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <GameScheduleRowSkeleton />
              <GameScheduleRowSkeleton />
              <GameScheduleRowSkeleton />
              <GameScheduleRowSkeleton />
              <GameScheduleRowSkeleton />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function RankingRowSkeleton() {
  return (
    <tr className="w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-gray-100"></div>
          <div className="h-6 w-40 rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function RankingLeaderSkeleton() {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden bg-white">
            <RankingRowSkeleton />
            <RankingRowSkeleton />
            <RankingRowSkeleton />
            <RankingRowSkeleton />
            <RankingRowSkeleton />
            <RankingRowSkeleton />
            <RankingRowSkeleton />
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-1 font-medium sm:pl-6">
                </th>
              </tr>
            </thead>
            <div className="bg-white">
              <RankingRowSkeleton />
              <RankingRowSkeleton />
              <RankingRowSkeleton />
              <RankingRowSkeleton />
              <RankingRowSkeleton />
              <RankingRowSkeleton />
              <RankingRowSkeleton />
            </div>
          </table>
        </div>
      </div>
    </div>
  );
}

export function BarRowSkeleton() {
  return (
    <tr className="flex justify-center items-center w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="md:hidden flex items-end gap-3 bg-white">
          <div className="h-12 w-8 rounded bg-gray-100"></div>
          <div className="h-20 w-8 rounded bg-gray-100"></div>
          <div className="h-44 w-8 rounded bg-gray-100"></div>
          <div className="h-32 w-8 rounded bg-gray-100"></div>
          <div className="h-12 w-8 rounded bg-gray-100"></div>
        </div>
        <div className="hidden lg:flex items-end gap-3">
          <div className="h-12 w-8 rounded bg-gray-100"></div>
          <div className="h-20 w-8 rounded bg-gray-100"></div>
          <div className="h-44 w-8 rounded bg-gray-100"></div>
          <div className="h-32 w-8 rounded bg-gray-100"></div>
          <div className="h-12 w-8 rounded bg-gray-100"></div>
          <div className="h-8 w-8 rounded bg-gray-100"></div>
          <div className="h-40 w-8 rounded bg-gray-100"></div>
          <div className="h-12 w-8 rounded bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function BarChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="h-[300px] rounded-md bg-white p-4 flex justify-center items-center">
          <BarRowSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export function PieRowSkeleton() {
  return (
    <tr className="flex justify-center items-center w-full border-b border-gray-100 last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
      <td className="relative overflow-hidden whitespace-nowrap py-3 pl-6 pr-3">
        <div className="md:hidden flex items-end gap-3 bg-white">
          <div className="h-32 w-32 rounded-full bg-gray-100"></div>
        </div>
        <div className="hidden lg:flex items-end gap-3">
          <div className="h-48 w-48 rounded-full bg-gray-100"></div>
        </div>
      </td>
    </tr>
  );
}

export function PieChartSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="h-[300px] rounded-md bg-white p-4 flex justify-center items-center">
          <PieRowSkeleton />
        </div>
        <div className="flex items-center pb-2 pt-6">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

function NotesRow() {
  return (
    <div className="flex gap-2">
      <div className="h-5 w-5 rounded-full bg-gray-200" />
      <div className="ml-2 h-4 w-32 md:w-96 rounded-md bg-gray-200" />
    </div>
  )
}
export function NotesSkeleton() {
  return (
    <div className={`${shimmer} relative w-full overflow-hidden md:col-span-4`}>
      <div className="rounded-xl bg-gray-100 p-4">
        <div className="flex items-center pb-2">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="ml-2 h-4 w-20 rounded-md bg-gray-200" />
        </div>
        <div className="rounded-md bg-white p-4 flex flex-col justify-center items-center gap-2">
          <NotesRow />
          <NotesRow />
          <NotesRow />
          <NotesRow />
        </div>
      </div>
    </div>
  );
}
