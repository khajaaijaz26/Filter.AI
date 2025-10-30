'use client'

import { useState } from 'react'
import { FiZap, FiDownload, FiUploadCloud, FiSave } from 'react-icons/fi'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const TEMPLATES = [
  { id: 'website', name: 'Website', description: 'Multi-page website' },
  { id: 'landing', name: 'Landing Page', description: 'Single page landing' },
  { id: 'react-app', name: 'React App', description: 'React application' },
  { id: 'admin', name: 'Admin Panel', description: 'Dashboard interface' },
  { id: 'presentation', name: 'Presentation', description: 'Slide deck' },
]

export default function Generator() {
  const { data: session } = useSession()
  const router = useRouter()
  const [prompt, setPrompt] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState('website')
  const [loading, setLoading] = useState(false)
  const [generatedCode, setGeneratedCode] = useState<{
    html: string
    css: string
    js: string
    template: string
    prompt: string
  } | null>(null)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          template: selectedTemplate,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate code')
      }

      setGeneratedCode(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate code')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    try {
      const response = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: prompt.slice(0, 50),
          template: selectedTemplate,
          code: JSON.stringify(generatedCode),
        }),
      })

      if (response.ok) {
        alert('Project saved successfully!')
        router.push('/dashboard')
      }
    } catch {
      alert('Failed to save project')
    }
  }

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generatedCode),
      })

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'project.zip'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch {
      alert('Failed to download project')
    }
  }

  const handleDeploy = async () => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    try {
      const response = await fetch('/api/deploy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generatedCode),
      })

      const data = await response.json()

      if (response.ok) {
        alert(`Deployed successfully! URL: ${data.url}`)
      } else {
        throw new Error(data.error)
      }
    } catch (err) {
      alert(`Failed to deploy: ${err instanceof Error ? err.message : 'Unknown error'}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">AI Code Generator</h1>
          <p className="text-gray-600">Describe what you want to build, and AI will generate it for you</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Choose Template</h2>
              <div className="space-y-2">
                {TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                      selectedTemplate === template.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">{template.name}</div>
                    <div className="text-sm text-gray-500">{template.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Describe Your Project</h2>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="E.g., Create a modern portfolio website with a hero section, about page, and contact form..."
                className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full mt-4 flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <FiZap className="mr-2" />
                {loading ? 'Generating...' : 'Generate'}
              </button>
              {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
              )}
            </div>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Generated Code</h2>
                {generatedCode && (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      <FiSave className="mr-1" />
                      Save
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <FiDownload className="mr-1" />
                      Download
                    </button>
                    <button
                      onClick={handleDeploy}
                      className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                    >
                      <FiUploadCloud className="mr-1" />
                      Deploy
                    </button>
                  </div>
                )}
              </div>

              {!generatedCode ? (
                <div className="h-96 flex items-center justify-center text-gray-400">
                  <div className="text-center">
                    <FiZap className="w-16 h-16 mx-auto mb-4 opacity-20" />
                    <p>Your generated code will appear here</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                      <span className="text-sm font-medium">Preview</span>
                    </div>
                    <div className="p-4 bg-white">
                      <iframe
                        srcDoc={generatedCode.html}
                        className="w-full h-96 border border-gray-300 rounded"
                        title="Preview"
                      />
                    </div>
                  </div>

                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                      <span className="text-sm font-medium">Code</span>
                    </div>
                    <pre className="p-4 bg-gray-50 overflow-x-auto text-sm">
                      <code>{generatedCode.html}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
