"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAdminDashboard } from "@/hooks/use-admin-dashboard"
import { Skeleton } from "@/components/ui/skeleton"
import { IconUsers, IconSearch, IconMail, IconShield, IconDotsVertical } from "@tabler/icons-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function AdminUsersPage() {
  const { users, loading, error } = useAdminDashboard();
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="p-6 space-y-6"><Skeleton className="h-10 w-48 bg-zinc-900" /><Skeleton className="h-64 bg-zinc-900" /></div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Platform Users</h1>
          <p className="text-zinc-400">Directory of all retail and institutional accounts.</p>
        </div>
        <div className="flex gap-2">
            <div className="relative">
                <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                <Input 
                    placeholder="Search users..." 
                    className="pl-10 bg-zinc-900 border-zinc-800 text-white w-64" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Button className="bg-[#00FF00] text-black hover:bg-[#00DD00]">Export CSV</Button>
        </div>
      </div>

      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <IconUsers size={20} className="text-[#00FF00]" /> Registered Accounts
          </CardTitle>
          <CardDescription>Total {users.length} users found.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400 pl-6">Name</TableHead>
                <TableHead className="text-zinc-400">Email</TableHead>
                <TableHead className="text-zinc-400">Role</TableHead>
                <TableHead className="text-zinc-400">Joined</TableHead>
                <TableHead className="text-zinc-400 text-right pr-6">Management</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                <TableRow key={user._id} className="border-zinc-800 hover:bg-zinc-800/50">
                  <TableCell className="font-medium text-white pl-6">{user.name}</TableCell>
                  <TableCell className="text-zinc-300">
                     <div className="flex items-center gap-2">
                        <IconMail size={14} className="text-zinc-500" />
                        {user.email}
                     </div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        user.role === 'admin' ? 'bg-red-500/10 text-red-500' : 
                        user.role === 'institution' ? 'bg-[#00FF00]/10 text-[#00FF00]' : 
                        'bg-zinc-800 text-zinc-400'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-zinc-500 text-xs">
                     {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right pr-6">
                    <DropdownMenu>
                       <DropdownMenuTrigger>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:text-white">
                             <IconDotsVertical size={16} />
                          </Button>
                       </DropdownMenuTrigger>
                       <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-300">
                          <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800">View Activity</DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-zinc-800 focus:bg-zinc-800">Assign Role</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500 hover:bg-red-500/10 focus:bg-red-500/10">Deactivate Account</DropdownMenuItem>
                       </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-zinc-500 py-10">
                    No users matching your search.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
