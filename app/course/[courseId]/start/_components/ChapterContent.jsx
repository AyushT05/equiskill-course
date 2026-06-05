'use client';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import YouTube from 'react-youtube';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import {
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  BookOpen,
  Code2,
  Lightbulb,
  PlayCircle,
  FileText,
} from 'lucide-react';

// ─── helpers ────────────────────────────────────────────────────────────────

function detectLanguage(code = '') {
  if (/^\s*(def |import |from |class |print\()/.test(code)) return 'Python';
  if (/^\s*(const |let |var |function |=>|console\.)/.test(code)) return 'JavaScript';
  if (/^\s*(public |private |class |System\.out)/.test(code)) return 'Java';
  if (/^\s*(#include|int main|std::)/.test(code)) return 'C++';
  if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE)/i.test(code)) return 'SQL';
  if (/^\s*(<[a-zA-Z]|<!DOCTYPE)/i.test(code)) return 'HTML';
  return 'Code';
}

// ─── CopyButton ─────────────────────────────────────────────────────────────

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/10"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

// ─── CodeBlock ──────────────────────────────────────────────────────────────

function CodeBlock({ code }) {
  const lang = detectLanguage(code);
  return (
    <div className="mt-5 rounded-xl overflow-hidden border border-gray-700 shadow-lg">
      {/* toolbar */}
      <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
          </div>
          <span className="ml-2 text-xs font-medium text-gray-400 flex items-center gap-1.5">
            <Code2 size={12} />
            {lang}
          </span>
        </div>
        <CopyButton text={code} />
      </div>
      {/* code body */}
      <pre className="bg-gray-900 text-green-300 text-sm p-5 overflow-x-auto leading-relaxed font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ─── TopicCard ───────────────────────────────────────────────────────────────

function TopicCard({ item, index }) {
  const [open, setOpen] = useState(index === 0); // first card open by default

  const codeStr = String(
    item?.code_example ||
    item?.codeExample ||
    item?.['code_example'] ||
    ''
  )
    .replace('<precode>', '')
    .replace('</precode>', '')
    .trim();

  const hasCode = codeStr && codeStr.toLowerCase() !== 'null';
  const title = item?.title || item?.['title'] || `Topic ${index + 1}`;
  const explanation = item?.explanation || item?.['explanation'] || '';

  return (
    <div className="rounded-2xl border border-purple-100 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* card header — always visible, click to expand */}
      <button
        className="w-full flex items-center justify-between px-6 py-4 text-left group"
        onClick={() => setOpen(o => !o)}
      >
        <div className="flex items-center gap-3">
          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-700 text-sm font-bold flex items-center justify-center">
            {index + 1}
          </span>
          <h3 className="font-semibold text-gray-800 text-lg leading-snug">{title}</h3>
          {hasCode && (
            <span className="hidden sm:flex items-center gap-1 text-xs text-purple-500 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
              <Code2 size={10} /> code
            </span>
          )}
        </div>
        <span className="text-purple-400 group-hover:text-purple-600 transition-colors flex-shrink-0 ml-3">
          {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>

      {/* expandable body */}
      {open && (
        <div className="px-6 pb-6 border-t border-gray-50 pt-4">
          {/* explanation with left accent */}
          <div className="border-l-4 border-purple-300 pl-4">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeRaw, rehypeKatex]}
              components={{
                // style markdown elements inside explanation
                p: ({ children }) => (
                  <p className="text-gray-700 leading-relaxed mb-3 last:mb-0">{children}</p>
                ),
                strong: ({ children }) => (
                  <strong className="font-semibold text-gray-900">{children}</strong>
                ),
                em: ({ children }) => (
                  <em className="italic text-gray-600">{children}</em>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-outside ml-5 space-y-1 my-2 text-gray-700">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside ml-5 space-y-1 my-2 text-gray-700">{children}</ol>
                ),
                li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-purple-200 pl-3 my-2 italic text-gray-500">
                    {children}
                  </blockquote>
                ),
                // inline code
                code: ({ inline, children }) =>
                  inline ? (
                    <code className="bg-purple-50 text-purple-700 px-1.5 py-0.5 rounded text-sm font-mono border border-purple-100">
                      {children}
                    </code>
                  ) : (
                    <CodeBlock code={String(children).trim()} />
                  ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4 rounded-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="bg-purple-50">{children}</thead>,
                th: ({ children }) => (
                  <th className="px-4 py-2 text-left font-semibold text-purple-700 uppercase text-xs tracking-wide">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-2 text-gray-700 border-t border-gray-100">{children}</td>
                ),
              }}
            >
              {explanation}
            </ReactMarkdown>
          </div>

          {/* code example block */}
          {hasCode && <CodeBlock code={codeStr} />}
        </div>
      )}
    </div>
  );
}

// ─── ReadingTime ─────────────────────────────────────────────────────────────

function ReadingTime({ topics = [] }) {
  const totalWords = topics.reduce((acc, t) => {
    const words = (t?.explanation || '').split(/\s+/).length;
    return acc + words;
  }, 0);
  const mins = Math.max(1, Math.round(totalWords / 200));
  return (
    <span className="flex items-center gap-1.5 text-sm text-gray-500">
      <BookOpen size={14} />
      ~{mins} min read
    </span>
  );
}

// ─── VideoOpts ───────────────────────────────────────────────────────────────

const videoOpts = {
  height: '390',
  width: '100%',
  playerVars: { autoplay: 0 },
};

// ─── ChapterContent (main export) ────────────────────────────────────────────

function ChapterContent({ chapter, content }) {
  const chapterName = chapter?.ChapterName || chapter?.['Chapter Name'] || 'Chapter';
  const about = chapter?.About || chapter?.Description || chapter?.['About'] || '';
  const topics = content?.content?.['topics'] || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      {/* ── Chapter Header ── */}
      <div className="mb-8 pb-6 border-b border-gray-100">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 text-purple-600 text-sm font-medium mb-2">
              <FileText size={14} />
              Chapter
            </div>
            <h1 className="text-3xl font-bold text-gray-900 leading-tight">{chapterName}</h1>
            {about && (
              <p className="mt-3 text-gray-500 text-base leading-relaxed max-w-2xl">{about}</p>
            )}
          </div>
          {topics.length > 0 && (
            <div className="flex-shrink-0 flex flex-col items-end gap-2 mt-1">
              <ReadingTime topics={topics} />
              <span className="flex items-center gap-1.5 text-sm text-gray-500">
                <Lightbulb size={14} />
                {topics.length} topic{topics.length !== 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ── Video Section ── */}
      {content?.videoId && (
        <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100">
          <div className="bg-gray-900 px-4 py-2.5 flex items-center gap-2">
            <PlayCircle size={15} className="text-red-400" />
            <span className="text-white text-sm font-medium">Video Lesson</span>
          </div>
          <YouTube videoId={content.videoId} opts={videoOpts} className="w-full" />
        </div>
      )}

      {/* ── Topics ── */}
      {topics.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-purple-200 to-transparent" />
            <span className="text-xs uppercase tracking-widest font-semibold text-purple-400 px-2">
              Topics
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-purple-200 to-transparent" />
          </div>
          {topics.map((item, i) => (
            <TopicCard key={i} item={item} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <BookOpen size={40} className="mx-auto mb-3 opacity-30" />
          <p>No content available for this chapter yet.</p>
        </div>
      )}

      {/* ── Bottom spacer so last card isn't flush against viewport edge ── */}
      <div className="h-16" />
    </div>
  );
}

export default ChapterContent;
