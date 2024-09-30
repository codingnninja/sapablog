  export function PostEditor(){

    return `
      <div id="post-editor" class="hidden font-sans text-gray-800 leading-relaxed max-w-3xl mx-auto p-4 overflow-x-hidden">
          <div id="json-output" class="hidden"></div>
          <textarea id="markdown-input" placeholder="Enter your markdown here (including front-matter if any)..." class="p-4"></textarea>
      <button onclick="$render(Publish)" class="m-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-blue-600">Publish article</button>
      </div>
      <small id="editor-notif"></small>
    `;
  }