"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// 1. Definisikan interface untuk props yang akan diterima
interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  className?: string;
}

// 2. Terima 'value' dan 'onChange' dari props
export function DatePicker({ value, onChange, className }: DatePickerProps) {
  // 3. Hapus 'useState' internal. State akan dikelola oleh react-hook-form.
  // const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            // Gunakan 'value' dari props untuk menentukan style
            !value && "text-muted-foreground",
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {/* Tampilkan 'value' dari props */}
          {value ? format(value, "PPP") : <span>Pilih tanggal</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          // 'selected' dikontrol oleh 'value' dari props
          selected={value}
          // Saat tanggal dipilih, panggil fungsi 'onChange' dari props
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}