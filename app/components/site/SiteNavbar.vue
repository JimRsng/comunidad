<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";

const { loggedIn, user, clear, openInPopup } = useUserSession();

watch(loggedIn, (value) => {
  if (!value || !user.value?.twitchLogin) return;
  navigateTo(`/u/${user.value.twitchLogin}`);
});

const userMenu = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: "Perfil",
      icon: "lucide:user",
      to: `/u/${user.value?.twitchLogin}`
    }
  ],
  [
    {
      label: "Salir",
      icon: "lucide:log-out",
      color: "error",
      onSelect: clear
    }
  ]
]);

const { pages: navPages, bodyPages } = await useNavbar();
</script>

<template>
  <UHeader>
    <template #title>
      <div class="flex items-center gap-2">
        <img :src="SITE.logo" class="h-10 w-auto light:invert" :alt="SITE.main">
        <h1 class="font-normal text-lg uppercase font-bebas tracking-widest">{{ SITE.main }}</h1>
      </div>
    </template>
    <UNavigationMenu
      id="nav-main"
      :items="navPages.main"
      variant="link"
      :highlight="false"
      class="w-full justify-center"
      :ui="{ linkLabel: 'uppercase', item: 'p-0' }"
    />
    <USeparator orientation="vertical" class="h-8 mx-4" color="primary" />
    <UNavigationMenu
      :items="navPages.apps"
      variant="link"
      :highlight="false"
      class="w-full justify-center"
      :ui="{ linkLabel: 'uppercase', item: 'p-0' }"
    />
    <template #body>
      <UNavigationMenu
        id="nav-body-main"
        :items="bodyPages.main"
        variant="link"
        orientation="vertical"
        :highlight="false"
        class="w-full justify-center"
        :ui="{ linkLabel: 'uppercase' }"
      />
      <USeparator orientation="horizontal" class="my-4" color="primary" />
      <UNavigationMenu
        :items="bodyPages.apps"
        variant="link"
        orientation="vertical"
        :highlight="false"
        class="w-full justify-center"
        :ui="{ linkLabel: 'uppercase' }"
      />
    </template>
  </UHeader>
  <UHeader class="top-16 h-8" :toggle="false">
    <UNavigationMenu
      :items="bodyPages.apps?.find(item => item.label === SITE.name)?.children || []"
      variant="link"
      arrow
    />

    <template #title>
      <div class="flex items-center gap-2">
        <h2>{{ SITE.name }}</h2>
      </div>
    </template>

    <template #right>
      <UColorModeButton />
      <UDropdownMenu v-if="user" :items="userMenu" :content="{ align: 'end', side: 'bottom', sideOffset: 8 }" :modal="false" arrow>
        <UButton
          :label="user.twitchDisplay"
          trailing-icon="lucide:chevron-down"
          variant="subtle"
          color="neutral"
          :ui="{
            base: 'text-md hover:bg-accented/50 data-active:bg-accented',
          }"
        >
          <template #leading>
            <UAvatar v-if="user.twitchProfileImage" :src="user.twitchProfileImage" :alt="user.twitchDisplay" size="2xs" />
            <UAvatar v-else :alt="user.twitchDisplay" size="2xs" class="bg-accented" />
          </template>
        </UButton>
      </UDropdownMenu>
      <UButton
        v-else
        label="Unirse"
        icon="simple-icons:twitch"
        variant="soft"
        color="neutral"
        :ui="{
          leadingIcon: 'text-white',
          base: 'text-white text-md dark:bg-violet-600 light:bg-violet-800 dark:hover:bg-violet-700 light:hover:bg-violet-900',
        }"
        @click="openInPopup('/auth/twitch')"
      />
    </template>
  </UHeader>
</template>
