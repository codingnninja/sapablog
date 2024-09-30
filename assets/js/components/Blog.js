  export function Blog() {
    return `
      <div id="layout" class="">
        <Header />
        <main class="font-sans text-gray-800 leading-relaxed max-w-3xl mx-auto p-4 overflow-x-hidden">
          <Articles />  
        </main>

        <footer class="mt-auto p-4 text-center border-t border-gray-100">
          Footer content here
        </footer>
      </div>
    `;
  }