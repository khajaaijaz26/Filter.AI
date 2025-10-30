import Link from 'next/link'
import { FiZap, FiCode, FiLayout, FiDownload, FiUploadCloud } from 'react-icons/fi'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Build with AI
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                In Seconds
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Create apps, websites, landing pages, and presentations using simple text prompts. 
              Export, deploy, or download — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/generator"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
              >
                <FiZap className="mr-2" />
                Start Building
              </Link>
              <Link
                href="/auth/signin"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Build
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<FiCode className="w-8 h-8" />}
              title="AI Code Generator"
              description="Generate complete applications from simple text descriptions. Preview and edit code in real-time."
            />
            <FeatureCard
              icon={<FiLayout className="w-8 h-8" />}
              title="Multiple Templates"
              description="Choose from websites, landing pages, React apps, admin panels, and presentation templates."
            />
            <FeatureCard
              icon={<FiDownload className="w-8 h-8" />}
              title="Export Options"
              description="Download your project as a ZIP file or export individual files with one click."
            />
            <FeatureCard
              icon={<FiUploadCloud className="w-8 h-8" />}
              title="Deploy to Vercel"
              description="Publish your project to Vercel with automatic deployment and live URL generation."
            />
            <FeatureCard
              icon={<FiZap className="w-8 h-8" />}
              title="Live Preview"
              description="See your changes instantly with a live preview sandbox environment."
            />
            <FeatureCard
              icon={<FiCode className="w-8 h-8" />}
              title="Save Projects"
              description="Save your work to your dashboard and continue editing anytime."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Start Building?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers creating amazing projects with AI
          </p>
          <Link
            href="/auth/signup"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
