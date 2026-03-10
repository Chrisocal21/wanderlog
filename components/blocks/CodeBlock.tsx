'use client';

import type { CodeBlock as CodeBlockType } from '@/types';

interface CodeBlockProps {
  block: CodeBlockType;
  isEditor?: boolean;
}

export function CodeBlock({ block, isEditor = false }: CodeBlockProps) {
  const { code, language, caption, showLineNumbers } = block.content;

  const lines = code.split('\n');

  // Get language label
  const languageLabels: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    html: 'HTML',
    css: 'CSS',
    json: 'JSON',
    bash: 'Bash',
    sql: 'SQL',
    jsx: 'JSX',
    tsx: 'TSX',
    php: 'PHP',
    ruby: 'Ruby',
    go: 'Go',
    rust: 'Rust',
    java: 'Java',
    cpp: 'C++',
    c: 'C',
    swift: 'Swift',
    kotlin: 'Kotlin',
  };

  const languageLabel = languageLabels[language.toLowerCase()] || language;

  return (
    <div className={isEditor ? 'max-w-2xl' : 'max-w-4xl'}>
      <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        {/* Header with language label */}
        <div className="bg-gray-800 px-4 py-2 flex items-center justify-between border-b border-gray-700">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
            {languageLabel}
          </span>
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        {/* Code content */}
        <div className="overflow-x-auto">
          <pre className="p-4 text-sm leading-relaxed">
            <code className="text-gray-100 font-mono">
              {showLineNumbers ? (
                <div className="flex">
                  <div className="text-gray-500 select-none pr-4 text-right" style={{ minWidth: '2.5rem' }}>
                    {lines.map((_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <div className="flex-1">
                    {lines.map((line, i) => (
                      <div key={i}>{line || '\n'}</div>
                    ))}
                  </div>
                </div>
              ) : (
                code
              )}
            </code>
          </pre>
        </div>
      </div>
      {caption && (
        <p className="text-sm text-gray-600 italic mt-3 text-center">{caption}</p>
      )}
    </div>
  );
}
