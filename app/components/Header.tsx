import {PortableText} from '@portabletext/react'

import {ThemeToggle} from '~/components/ThemeToggle'
import type {ThemePreference} from '~/types/themePreference'

type HeaderProps = {
  theme: ThemePreference
  content: any
}

export function Header(props: HeaderProps) {
  return (
    <>
      <header className="border-b border-gray-100 transition-colors duration-1000 ease-in-out dark:border-gray-900">
        <div className="container mx-auto flex items-center justify-between p-4 lg:px-12">
          <p className="text-lg font-bold tracking-tighter text-black dark:text-white lg:text-2xl">
            One <s>Million</s> Hundred Toggles
          </p>
          <ThemeToggle theme={props.theme} />
        </div>
      </header>
      {props.content ? (
        <section className="bg-gray-50 dark:bg-gray-900 dark:border-gray-900 border-b border-gray-100">
          <div className="container mx-auto p-4 lg:px-12">
            <div className="prose dark:prose-invert">
              <PortableText value={props.content} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
