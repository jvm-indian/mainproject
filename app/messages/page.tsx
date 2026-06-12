import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/navigation/navbar'
import { MessagesInterface } from '@/components/messages/messages-interface'

export default async function MessagesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Fetch user's conversations
  const { data: conversations } = await supabase
    .from('conversations')
    .select(`
      *,
      participant_1_profile:users!participant_1(id, name, email, role),
      participant_2_profile:users!participant_2(id, name, email, role)
    `)
    .or(`participant_1.eq.${user.id},participant_2.eq.${user.id}`)
    .order('last_message_at', { ascending: false })

  // 1. Fetch current user profile to determine role
  const { data: userProfile } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  const role = userProfile?.role

  let allowedUserIds: string[] = []
  
  if (role === 'SHG_Worker') {
    const { data: allotments } = await supabase.from('allotments').select('campus_id').eq('shg_id', user.id)
    allowedUserIds = (allotments || []).map(a => a.campus_id)
  } else if (role === 'Institution') {
    const { data: allotments } = await supabase.from('allotments').select('shg_id').eq('campus_id', user.id)
    allowedUserIds = (allotments || []).map(a => a.shg_id)
  }

  // Fetch all users for new conversation (excluding current user)
  let usersQuery = supabase
    .from('users')
    .select('id, name, email, role')
    .neq('id', user.id)
    
  // If not admin, restrict to allotted users
  if (role !== 'Admin') {
    if (allowedUserIds.length > 0) {
      usersQuery = usersQuery.in('id', allowedUserIds)
    } else {
      // If no allotments, ensure query returns nothing (or we just mock it)
      // a hack is to query for an impossible ID, but let's just not execute if no allowed IDs
      // but to keep types happy we can query 'id' in ['empty'] or just use neq to self and an impossible condition
      usersQuery = usersQuery.eq('id', '00000000-0000-0000-0000-000000000000') 
    }
  }

  const { data: allUsers } = await usersQuery.limit(50)

  return (
    <main className="min-h-screen bg-background">
      <Navbar user={user} />
      <div className="pt-16 h-screen">
        <MessagesInterface 
          currentUserId={user.id}
          conversations={conversations || []}
          allUsers={allUsers || []}
        />
      </div>
    </main>
  )
}
