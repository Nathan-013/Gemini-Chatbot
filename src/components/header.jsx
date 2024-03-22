import { Dumbbell } from "lucide-react";

export default function Header() {
  return (
    <div className="flex items-center gap-3 text-white pl-5 bg-zinc-950 rounded-lg py-2">
      <div>
        <Dumbbell size={36} strokeWidth={2.4} />
      </div>
      <h2 className="font-normal text-5xl">
        Chat<span className="font-bold text-purple-900">Fit</span>
      </h2>
    </div>
  )
}