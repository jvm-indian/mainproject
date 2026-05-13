import { NextResponse } from 'next/server'

// In-memory store for Hackathon Demo
type PickupRequest = {
  id: string
  institutionName: string
  date: string
  volume: string
  status: 'Pending' | 'Approved'
}

let mockRequests: PickupRequest[] = [
  { id: 'req-1', institutionName: 'City University', date: '2026-05-14T10:00', volume: 'Over 200 kg', status: 'Pending' },
  { id: 'req-2', institutionName: 'Global Tech Park', date: '2026-05-15T14:30', volume: '50 kg - 200 kg', status: 'Approved' }
]

export async function GET() {
  return NextResponse.json({ requests: mockRequests })
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action, payload } = body
    
    if (action === 'create') {
      const newReq: PickupRequest = {
        id: `req-${Date.now()}`,
        institutionName: payload.institutionName || 'Unknown Institution',
        date: payload.date,
        volume: payload.volume,
        status: 'Pending'
      }
      mockRequests.push(newReq)
      return NextResponse.json({ success: true, request: newReq })
    }
    
    if (action === 'approve') {
      const index = mockRequests.findIndex(r => r.id === payload.id)
      if (index > -1) {
        mockRequests[index].status = 'Approved'
        return NextResponse.json({ success: true, request: mockRequests[index] })
      }
      return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed' }, { status: 500 })
  }
}
