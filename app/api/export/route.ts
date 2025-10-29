import { NextRequest, NextResponse } from 'next/server'
import JSZip from 'jszip'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { html, css, js, template } = data

    const zip = new JSZip()

    // Add HTML file
    zip.file('index.html', html || '')

    // Add CSS file if exists
    if (css) {
      zip.file('styles.css', css)
    }

    // Add JS file if exists
    if (js) {
      zip.file('script.js', js)
    }

    // Add package.json for React apps
    if (template === 'react-app') {
      const packageJson = {
        name: 'filter-ai-project',
        version: '1.0.0',
        scripts: {
          start: 'serve -s .',
        },
        dependencies: {
          react: '^18.2.0',
          'react-dom': '^18.2.0',
        },
      }
      zip.file('package.json', JSON.stringify(packageJson, null, 2))
    }

    // Add README
    const readme = `# Filter.AI Project

This project was generated using Filter.AI.

## How to Use

1. Extract this ZIP file
2. Open index.html in your browser
3. Or serve it using a local server

## Deploy

You can deploy this to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Generated with ❤️ by Filter.AI
`
    zip.file('README.md', readme)

    const zipBlob = await zip.generateAsync({ type: 'blob' })
    const arrayBuffer = await zipBlob.arrayBuffer()

    return new NextResponse(arrayBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename=project.zip',
      },
    })
  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Failed to create ZIP file' },
      { status: 500 }
    )
  }
}
