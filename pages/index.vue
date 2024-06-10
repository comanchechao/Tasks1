<template>
  <div
    class="h-screen w-screen flex items-center justify-center space-x-7 px-52 py-64 bg-mainWhite"
  >
    <NuxtLink
      class="h-full w-1/2 flex items-center justify-center bg-mainWhite border-mainPurple rounded-md cursor-pointer transition ease-in duration-300 hover:bg-mainPurple hover:text-mainWhite text-mainPurple border-2"
      to="/TaskTwo"
    >
      <div>
        <h1 class="text-4xl">Task 2</h1>
      </div>
    </NuxtLink>
    <NuxtLink
      class="h-full w-1/2 flex items-center justify-center bg-mainWhite border-mainPurple rounded-md cursor-pointer transition ease-in duration-300 hover:bg-mainPurple hover:text-mainWhite text-mainPurple border-2"
      to="/TaskOne"
    >
      <div>
        <h1 class="text-4xl">Task 1</h1>
      </div>
    </NuxtLink>
  </div>
</template>
