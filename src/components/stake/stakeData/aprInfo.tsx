import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

import { Info } from "lucide-react";

import { Button } from "@/components/ui/button";

const AprInfo = () => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button className="px-0 bg-transparent hover:bg-transparent">
          <Info size={16} />
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">Info: </h4>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe,
              tenetur.
            </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">Disclaimer</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default AprInfo;
