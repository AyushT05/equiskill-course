import React from 'react';
import ReactMarkdown from 'react-markdown';
import YouTube from 'react-youtube';
import rehypeRaw from 'rehype-raw';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css'; // Essential for proper math formatting

const opts = {
  height: '390',
  width: '100%',
  playerVars: {
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      {/* Chapter Title & Description */}
      <h2 className="font-semibold text-3xl text-gray-800">{chapter?.ChapterName || chapter?.["Chapter Name"]}</h2>
      <p className="text-gray-600 mt-2">{chapter?.About || chapter?.Description || chapter?.["About"]}</p>

      {/* Video Section */}
      {content?.videoId && (
        <div className="flex justify-center my-8">
          <div className="w-full lg:w-3/4">
            <YouTube videoId={content.videoId} opts={opts} className="rounded-lg shadow-md" />
          </div>
        </div>
      )}

      {/* Content Blocks */}
      <div className="space-y-6">
        {content?.content?.["topics"]?.map((item, index) => (
          <div
            key={index}
            className="p-6 bg-purple-50 shadow-sm rounded-lg border-l-4 border-primary"
          >
            
            <h3 className="font-semibold text-2xl text-primary">{item?.title || item?.["title"]}</h3>
            <ReactMarkdown 
              remarkPlugins={[remarkMath]} 
              rehypePlugins={[rehypeRaw, rehypeKatex]} 
              className="text-lg text-gray-800 leading-relaxed mt-3"
            >
                {item?.explanation || item?.["explanation"] || ""}
            </ReactMarkdown>
            {/* Code Block */}
            {(() => {
              const codeStr = String(
                item?.code_example ||
                item?.codeExample ||
                item?.["code_example"] ||
                ""
              )
                .replace('<precode>', '')
                .replace('</precode>', '')
                .trim();
              
              if (!codeStr || codeStr.toLowerCase() === "null") return null;

              return (
                <div className="p-4 bg-gray-900 text-white rounded-md mt-4 text-sm overflow-x-auto">
                  <pre>
                    <code>{codeStr}</code>
                  </pre>
                </div>
              );
            })()}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
