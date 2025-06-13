"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { Database } from "@/lib/supabase/database.types"

// Tentukan tipe untuk satu baris data dari tabel hak_cipta
export type Pendaftaran = Database["public"]["Tables"]["hak_cipta"]["Row"]

// Map untuk memberikan warna pada badge status
const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" } = {
  draft: "secondary",
  submitted: "default",
  review: "default",
  revisi: "destructive",
  approved: "secondary", // Consider a 'success' variant if you have one
  rejected: "destructive",
};


export const columns: ColumnDef<Pendaftaran>[] = [
  {
    accessorKey: "judul",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Judul
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "jenis_karya",
    header: "Jenis Karya",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const variant = statusVariantMap[status] || "default";
        return <Badge variant={variant} className="capitalize">{status}</Badge>
    }
  },
  {
    accessorKey: "created_at",
    header: "Tanggal Dibuat",
    cell: ({ row }) => {
        const date = new Date(row.getValue("created_at"))
        const formatted = date.toLocaleDateString("id-ID", {
            year: 'numeric', month: 'long', day: 'numeric'
        })
        return <div className="font-medium">{formatted}</div>
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const pendaftaran = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Buka menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(pendaftaran.id)}
            >
              Salin ID Pendaftaran
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/user/pendaftaran/${pendaftaran.id}`}>Lihat Detail</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/user/pendaftaran/${pendaftaran.id}/edit`}>Edit</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]