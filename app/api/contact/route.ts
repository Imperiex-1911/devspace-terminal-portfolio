import { NextRequest, NextResponse } from 'next/server'

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Sanitize input to prevent XSS
const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
}

export async function POST(request: NextRequest) {
  try {
    // Check content type
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
    
    // Validate required fields
    const { name, email, subject, message } = body as Partial<ContactFormData>
    
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Type check
    if (typeof name !== 'string' || typeof email !== 'string' || 
        typeof subject !== 'string' || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'All fields must be strings' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message)
    }

    // Validate email format
    if (!EMAIL_REGEX.test(sanitizedData.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate field lengths
    if (sanitizedData.name.length < 2 || sanitizedData.name.length > 100) {
      return NextResponse.json(
        { error: 'Name must be between 2 and 100 characters' },
        { status: 400 }
      )
    }

    if (sanitizedData.subject.length < 5 || sanitizedData.subject.length > 200) {
      return NextResponse.json(
        { error: 'Subject must be between 5 and 200 characters' },
        { status: 400 }
      )
    }

    if (sanitizedData.message.length < 10 || sanitizedData.message.length > 2000) {
      return NextResponse.json(
        { error: 'Message must be between 10 and 2000 characters' },
        { status: 400 }
      )
    }

    // Simulate email sending (in a real app, you'd integrate with an email service)
    const emailData = {
      to: process.env.CONTACT_EMAIL || 'developer@example.com',
      from: sanitizedData.email,
      subject: `Portfolio Contact: ${sanitizedData.subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from DevSpace Terminal portfolio</em></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${sanitizedData.name}
        Email: ${sanitizedData.email}
        Subject: ${sanitizedData.subject}
        
        Message:
        ${sanitizedData.message}
        
        ---
        Sent from DevSpace Terminal portfolio
      `
    }

    // In a real application, you would:
    // 1. Send the email using a service like SendGrid, Resend, or Nodemailer
    // 2. Store the submission in a database
    // 3. Send a confirmation email to the user
    
    // For demo purposes, we'll just log the data
    if (process.env.NODE_ENV === 'development') {
      console.log('Contact form submission:', emailData)
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      data: {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        name: sanitizedData.name,
        email: sanitizedData.email,
        subject: sanitizedData.subject
      }
    })
  } catch (error) {
    console.error('Contact API error:', error)
    
    return NextResponse.json(
      { 
        error: 'Failed to send message',
        message: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : 'Internal server error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Contact API is running',
    version: '1.0.0',
    endpoints: {
      POST: '/api/contact - Submit contact form'
    },
    fields: {
      name: 'string (2-100 characters)',
      email: 'string (valid email format)',
      subject: 'string (5-200 characters)',
      message: 'string (10-2000 characters)'
    }
  })
}

