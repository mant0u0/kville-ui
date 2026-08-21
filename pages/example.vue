<template>
  <main class="page-shell bg-desert-50">
    <div
      class="mx-auto grid w-[min(100%,1180px)] grid-cols-[230px_minmax(0,1fr)] gap-10 px-6 py-10 max-lg:grid-cols-1 max-lg:gap-8 max-md:px-4 max-md:py-6"
    >
      <UIPageSidebar />

      <div class="min-w-0">
        <UIPageHeader
          eyebrow="SINGLE PAGE"
          title="空白範例頁"
          description="這是一個不含子頁的獨立頁面，可從首頁直接進入。"
        />
      </div>
    </div>
  </main>
</template>
