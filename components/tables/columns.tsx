"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge, badgeVariants } from "@/components/ui/badge"
import Link from "next/link"
import type { Database } from "@/lib/supabase/database.types"

// Mendefinisikan tipe data untuk satu baris pendaftaran
export type HakCipta = Database["public"]["Tables"]["hak_cipta"]["Row"]

// Mapping status ke varian warna badge
const statusVariantMap: { [key: string]: VariantProps<typeof badgeVariants>["variant"] } = {
  approved: "success",
  revisi: "warning",
  review: "secondary",
  submitted: "secondary",
  draft: "outline",
  rejected: "destructive",
}

export const columns: ColumnDef<HakCipta>[] = [
  {
    accessorKey: "judul",
    header: "Judul",
  },
  {
    accessorKey: "jenis_karya",
    header: "Jenis Karya",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      const variant = statusVariantMap[status] || "outline"
      return <Badge variant={variant} className="capitalize">{status}</Badge>
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Tanggal Dibuat
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"))
      return <div className="font-medium">{date.toLocaleDateString("id-ID")}</div>
    },
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
            <Link href={`/user/pendaftaran/${pendaftaran.id}`}>
              <DropdownMenuItem>Lihat Detail</DropdownMenuItem>
            </Link>
            <Link href={`/user/pendaftaran/${pendaftaran.id}/edit`}>
              <DropdownMenuItem>Edit Pendaftaran</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]