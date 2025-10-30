import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const TEMPLATE_CODES: Record<string, string> = {
  website: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-50">
    <nav class="bg-white shadow-sm">
        <div class="container mx-auto px-4 py-4">
            <h1 class="text-2xl font-bold text-blue-600">{{title}}</h1>
        </div>
    </nav>
    <main class="container mx-auto px-4 py-8">
        <section class="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 class="text-4xl font-bold mb-4">{{heading}}</h2>
            <p class="text-lg text-gray-600">{{description}}</p>
        </section>
        <section class="grid md:grid-cols-3 gap-6">
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-xl font-semibold mb-2">Feature 1</h3>
                <p class="text-gray-600">Amazing feature description</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-xl font-semibold mb-2">Feature 2</h3>
                <p class="text-gray-600">Another great feature</p>
            </div>
            <div class="bg-white rounded-lg shadow-sm p-6">
                <h3 class="text-xl font-semibold mb-2">Feature 3</h3>
                <p class="text-gray-600">One more feature</p>
            </div>
        </section>
    </main>
    <footer class="bg-white mt-16 py-8">
        <div class="container mx-auto px-4 text-center text-gray-600">
            <p>&copy; 2024 {{title}}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`,
  landing: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-blue-500 to-purple-600">
    <div class="min-h-screen flex items-center justify-center px-4">
        <div class="text-center text-white">
            <h1 class="text-6xl font-bold mb-6">{{heading}}</h1>
            <p class="text-2xl mb-8 opacity-90">{{description}}</p>
            <button class="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl transition-shadow">
                Get Started
            </button>
        </div>
    </div>
</body>
</html>`,
  'react-app': `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        function App() {
            return (
                <div className="min-h-screen bg-gray-50 p-8">
                    <div className="container mx-auto">
                        <h1 className="text-4xl font-bold mb-4">{{heading}}</h1>
                        <p className="text-xl text-gray-600">{{description}}</p>
                    </div>
                </div>
            );
        }
        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>`,
  admin: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100">
    <div class="flex h-screen">
        <aside class="w-64 bg-gray-900 text-white p-6">
            <h1 class="text-2xl font-bold mb-8">{{title}}</h1>
            <nav class="space-y-2">
                <a href="#" class="block py-2 px-4 rounded bg-gray-800">Dashboard</a>
                <a href="#" class="block py-2 px-4 rounded hover:bg-gray-800">Users</a>
                <a href="#" class="block py-2 px-4 rounded hover:bg-gray-800">Settings</a>
            </nav>
        </aside>
        <main class="flex-1 p-8">
            <h2 class="text-3xl font-bold mb-6">{{heading}}</h2>
            <div class="grid grid-cols-3 gap-6">
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-gray-500 text-sm">Total Users</h3>
                    <p class="text-3xl font-bold mt-2">1,234</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-gray-500 text-sm">Revenue</h3>
                    <p class="text-3xl font-bold mt-2">$12,345</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6">
                    <h3 class="text-gray-500 text-sm">Active</h3>
                    <p class="text-3xl font-bold mt-2">567</p>
                </div>
            </div>
        </main>
    </div>
</body>
</html>`,
  presentation: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{title}}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-black text-white">
    <div class="min-h-screen flex items-center justify-center p-8">
        <div class="text-center max-w-4xl">
            <h1 class="text-7xl font-bold mb-8">{{heading}}</h1>
            <p class="text-3xl opacity-80">{{description}}</p>
            <div class="mt-12 text-gray-400">
                <p>Press → for next slide</p>
            </div>
        </div>
    </div>
</body>
</html>`,
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { prompt, template } = await request.json()

    if (!prompt || !template) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check usage limit for authenticated users
    if (session?.user?.id) {
      const { prisma } = await import('@/lib/prisma')
      const user = await prisma.user.findUnique({
        where: { id: session.user.id },
      })

      if (user && user.usageLimit <= 0) {
        return NextResponse.json(
          { error: 'Usage limit reached. Please upgrade your plan.' },
          { status: 429 }
        )
      }

      // Decrement usage limit
      if (user) {
        await prisma.user.update({
          where: { id: session.user.id },
          data: { usageLimit: user.usageLimit - 1 },
        })
      }
    }

    // Get base template
    let htmlCode = TEMPLATE_CODES[template] || TEMPLATE_CODES.website

    // Simple AI simulation - replace placeholders with prompt-based content
    const title = prompt.split(' ').slice(0, 3).join(' ') || 'My Project'
    const heading = prompt.split('.')[0] || 'Welcome'
    const description = prompt.slice(0, 100) || 'Built with Filter.AI'

    htmlCode = htmlCode
      .replace(/\{\{title\}\}/g, title)
      .replace(/\{\{heading\}\}/g, heading)
      .replace(/\{\{description\}\}/g, description)

    return NextResponse.json({
      html: htmlCode,
      css: '',
      js: '',
      template,
      prompt,
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate code' },
      { status: 500 }
    )
  }
}
