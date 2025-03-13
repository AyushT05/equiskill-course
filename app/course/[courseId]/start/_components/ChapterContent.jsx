import React from 'react';
import ReactMarkdown from 'react-markdown';
import YouTube from 'react-youtube';
import rehypeRaw from 'rehype-raw';

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
      <h2 className="font-semibold text-3xl text-gray-800">{chapter?.["Chapter Name"]}</h2>
      <p className="text-gray-600 mt-2">{chapter?.["About"]}</p>

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
            
            <h3 className="font-semibold text-2xl text-primary">{item?.["title"]}</h3>
            <ReactMarkdown rehypePlugins={[rehypeRaw]} className="text-lg text-gray-800 leading-relaxed mt-3">
                {item?.["explanation"]}
              </ReactMarkdown>
            {/* Code Block */}
            {item.codeExample && (
              <div className="p-4 bg-gray-900 text-white rounded-md mt-4 text-sm overflow-x-auto">
                <pre>
                  <code>{item?.["code_example"].replace('<precode>', '').replace('</precode>', '')}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChapterContent;
