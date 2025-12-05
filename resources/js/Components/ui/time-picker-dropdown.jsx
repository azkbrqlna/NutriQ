"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";

export function TimePickerDropdown({ value, onChange }) {
    const [open, setOpen] = React.useState(false);

    // parsing "HH:mm"
    const parsed = value
        ? {
              hour: parseInt(value.split(":")[0], 10),
              minute: parseInt(value.split(":")[1], 10),
          }
        : { hour: null, minute: null };

    const [hour, setHour] = React.useState(parsed.hour);
    const [minute, setMinute] = React.useState(parsed.minute);

    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);

    const applyInstant = (h, m) => {
        if (h === null || m === null) return;
        const formatted = `${String(h).padStart(2, "0")}:${String(m).padStart(
            2,
            "0"
        )}`;
        onChange(formatted);
        setOpen(false);
    };

    return (
        <div className="w-full">
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        className={cn(
                            "w-full justify-start bg-white border border-[#C7D2AB] text-black py-[1.2rem]",
                            !value && "text-muted-foreground"
                        )}
                    >
                        <Clock className="mr-2 h-5 w-5 text-gray-700" />
                        {value || "Pilih jam"}
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-auto p-0 bg-white shadow-lg"
                    align="start"
                >
                    <div className="flex flex-col gap-2 p-3 pb-4">
                        {/* JAM & MENIT */}
                        <div className="flex gap-5">
                            {/* HOURS */}
                            <div>
                                <p className="text-sm font-medium text-gray-700 text-center">
                                    Hours
                                </p>
                                <div className="h-40 overflow-y-auto border rounded-md w-16 text-center">
                                    {hours.map((h) => (
                                        <div
                                            key={h}
                                            onClick={() => {
                                                setHour(h);
                                                applyInstant(h, minute);
                                            }}
                                            className={cn(
                                                "py-1 cursor-pointer hover:bg-gray-200",
                                                hour === h &&
                                                    "bg-gray-300 font-semibold"
                                            )}
                                        >
                                            {String(h).padStart(2, "0")}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* MINUTES */}
                            <div>
                                <p className="text-sm font-medium text-gray-700 text-center">
                                    Minutes
                                </p>
                                <div className="h-40 overflow-y-auto border rounded-md w-16 text-center">
                                    {minutes.map((m) => (
                                        <div
                                            key={m}
                                            onClick={() => {
                                                setMinute(m);
                                                applyInstant(hour, m);
                                            }}
                                            className={cn(
                                                "py-1 cursor-pointer hover:bg-gray-200",
                                                minute === m &&
                                                    "bg-gray-300 font-semibold"
                                            )}
                                        >
                                            {String(m).padStart(2, "0")}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Clear (kiri) & Now (kanan) */}
                        <div className="flex justify-between pt-2">
                            <Button
                                variant="destructive"
                                size="sm"
                                className="px-4"
                                onClick={() => {
                                    setHour(null);
                                    setMinute(null);
                                    onChange("");
                                    setOpen(false);
                                }}
                            >
                                Clear
                            </Button>

                            <Button
                                variant="secondary"
                                size="sm"
                                className="px-4 text-black"
                                onClick={() => {
                                    const now = new Date();
                                    const h = now.getHours();
                                    const m = now.getMinutes();
                                    applyInstant(h, m);
                                }}
                            >
                                Now
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
