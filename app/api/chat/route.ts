import { NextRequest, NextResponse } from 'next/server'
import { defaultChatbot } from '@/lib/chatbot'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting could be added here
    const contentType = request.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      )
    }

    const body = await request.json().catch(() => null)
    if (!body) {
      return NextResponse.json(
        { error: 'Invalid JSON payload' },
        { status: 400 }
      )
    }

    const { message } = body

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required and must be a string' },
        { status: 400 }
      )
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: 'Message too long (max 1000 characters)' },
        { status: 400 }
      )
    }

    // Process the message with the chatbot
    const response = await defaultChatbot.processMessage(message.trim())

    return NextResponse.json({
      success: true,
      response: {
        id: response.id,
        type: response.type,
        content: response.content,
        timestamp: response.timestamp,
        metadata: response.metadata
      }
    })
  } catch (error) {
    console.error('Chat API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'Something went wrong'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Chat API is running',
    version: '1.0.0',
    endpoints: {
      POST: '/api/chat - Send a message to the chatbot'
    }
  })
}

