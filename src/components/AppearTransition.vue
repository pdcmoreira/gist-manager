<template>
  <Transition
    appear
    enter-from-class="opacity-0 translate-y-8"
    leave-to-class="opacity-0 translate-y-8"
    enter-active-class="transition duration-1000 "
    leave-active-class="transition duration-1000"
  >
    <slot />
  </Transition>
</template>
