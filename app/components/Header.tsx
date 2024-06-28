import {ThemeToggle} from '~/components/ThemeToggle'
import type {ThemePreference} from '~/types/themePreference'

export function Header(props: {theme: ThemePreference}) {
  return (
    <>
      <header className="border-b border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900">
        <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
          <p className="text-lg font-bold tracking-tighter text-black dark:text-white lg:text-2xl">
            One Million Toggles
          </p>
          <ThemeToggle theme={props.theme} />
        </div>
      </header>
      <section className="bg-gray-50 dark:bg-gray-900 dark:border-gray-900 border-b border-gray-100">
        <div className="container mx-auto p-4 lg:px-12">
          <div className="prose dark:prose-invert">
            <p>
              Real-time updates served from the{' '}
              <a href="https://sanity.io">Sanity.io</a> CDN powered by the{' '}
              <a href="https://www.sanity.io/docs/live-content-api">
                Live Content API
              </a>
              .
            </p>
            <p>
              Open <a href="/studio">Sanity Studio</a> for this project to view
              content changes in the dashboard.
            </p>
            <p>
              <a href="https://github.com/SimeonGriggs/one-million-toggles">
                Clone this project on GitHub
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
