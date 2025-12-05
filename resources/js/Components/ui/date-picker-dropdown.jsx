"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/Components/ui/button";
import { Calendar } from "@/Components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/Components/ui/popover";
import { cn } from "@/lib/utils";

export function DatePickerDropdown({ value, onChange }) {
    const [open, setOpen] = React.useState(false);

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
                        <CalendarIcon className="mr-2 h-5 w-5 text-gray-700" />
                        {value ? format(value, "yyyy-MM-dd") : "Pilih tanggal"}
                    </Button>
                </PopoverTrigger>

                <PopoverContent
                    className="w-auto p-0 bg-white shadow-lg"
                    align="start"
                >
                    <div className="flex flex-col gap-2 p-3 pb-4">
                        <Calendar
                            mode="single"
                            captionLayout="dropdown"
                            selected={value}
                            defaultMonth={value}
                            onSelect={(date) => {
                                if (!date) return;
                                onChange(date);
                                setOpen(false);
                            }}
                            className="rounded-lg border shadow-sm"
                        />

                        {/* Tombol Clear (kiri) & Today (kanan) */}
                        <div className="flex justify-between pt-2">
                            <Button
                                variant="destructive"
                                size="sm"
                                className="px-4"
                                onClick={() => {
                                    onChange(null);
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
                                    const today = new Date();
                                    onChange(today);
                                    setOpen(false);
                                }}
                            >
                                Today
                            </Button>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
