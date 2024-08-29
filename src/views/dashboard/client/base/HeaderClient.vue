<script setup lang="ts">


</script>

<template>

  <div class="w-full text-white bg-main-color">
        <div 
            class="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8">
            <div class="p-4 flex flex-row items-center justify-between">
                <a href="#"
                    class="text-lg font-semibold tracking-widest uppercase rounded-lg focus:outline-none focus:shadow-outline">{email}
                    <p>{ group.name}</p>
                </a>
                
            </div>
            <nav
                class="flex-col flex-grow pb-4 md:pb-0 hidden md:flex md:justify-end md:flex-row">
                <div class="relative" >
                    <div
                        class="flex flex-row items-center space-x-2 w-full px-4 py-2 mt-2 text-sm font-semibold text-left  00 md:w-auto md:inline md:mt-0 md:ml-4   focus:outline-none focus:shadow-outline">
                        <span class="text-black">Log out</span>
                        
                        
                    </div>
                    
                </div>
            </nav>
        </div>
    </div>
</template>

<style scoped></style>
