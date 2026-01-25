import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, UserIcon } from "lucide-react";
import "@/index.css";
interface HeaderProps {
  onUserClick: () => void;
}

export function Header({ onUserClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#3D5F7B] text-slate-100 shadow-sm">
      <div className="h-16 px-2 sm:px-4 md:px-6 flex items-center justify-between">
        {/* Logo + Search */}
        <div className="flex items-center gap-5 flex-1 min-w-0">
          {/* Logo: text and icon for larger screens / just icon for smaller screens */}
          <img src="/src/assets/logo.svg" alt="Logo" className="h-8 w-8" />
          <div className="hidden monomaniac-one-regular text-2xl md:inline-block h-9">
              Vortex
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-70 md:max-w-100">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            <Input
              className="h-9 sm:h-9 w-full pl-10 bg-white text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-md"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* User Button */}
        <Button
          aria-label="User"
          variant="default"
          className="shrink-0"
          onClick={onUserClick}
        >
          <UserIcon strokeWidth={2.5} />
        </Button>
      </div>
    </header>
  );
}
