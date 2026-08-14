import type { NavigationMenuItem } from "@nuxt/ui";

const appLinks = {
  main: "https://site.jimtracker.com",
  tracker: "https://jimtracker.com",
  comunidad: "https://comunidad.jimtracker.com",
  ruletas: "https://ruletas.jimtracker.com",
  watch: "https://watch.jimtracker.com"
};

const currentSiteKey = SITE.key as keyof typeof appLinks;

const pages: Record<string, NavigationMenuItem[]> = {
  main: [
    {
      label: "Inicio",
      to: appLinks.main
    },
    {
      label: "Legado",
      to: `${appLinks.main}#legado`
    },
    {
      label: "Horario",
      to: `${appLinks.main}#horario`
    },
    {
      label: "Clips",
      to: `${appLinks.main}#clips`
    },
    {
      label: "Redes",
      to: `${appLinks.main}#redes`
    }
  ],
  apps: [
    {
      value: "tracker",
      label: "Tracker",
      to: appLinks.tracker,
      icon: "simple-icons:leagueoflegends",
      active: currentSiteKey === "tracker",
      defaultOpen: currentSiteKey === "tracker",
      children: [
        {
          label: "Solo Queue",
          defaultOpen: true,
          children: [
            {
              label: "2026",
              to: `${appLinks.tracker}/season/2026`
            },
            {
              label: "2025",
              to: `${appLinks.tracker}/season/2025`
            }
          ]
        },
        {
          label: "Soloboom",
          defaultOpen: true,
          children: [
            {
              label: "2025",
              to: `${appLinks.tracker}/season/2025/soloboom`
            }
          ]
        },
        {
          label: "Retos",
          defaultOpen: true,
          children: [
            {
              label: "One by One",
              to: `${appLinks.tracker}/season/2026/reto-one-by-one`
            },
            {
              label: "Reto Nami",
              to: `${appLinks.tracker}/season/2026/reto-nami`
            }
          ]
        },
        {
          label: "Galería",
          to: `${appLinks.tracker}/gallery`
        }
      ]
    },
    {
      value: "comunidad",
      label: "Comunidad",
      to: appLinks.comunidad,
      icon: "lucide:users",
      active: currentSiteKey === "comunidad",
      defaultOpen: currentSiteKey === "comunidad",
      children: [
        {
          label: "Tabla",
          to: appLinks.comunidad
        },
        {
          label: "Actividad",
          to: `${appLinks.comunidad}/actividad`
        }
      ]
    }
  ]
};

const normalizeToApp = (navPages: Record<string, NavigationMenuItem[]>) => {
  const prefix = appLinks[currentSiteKey];

  const normalizeItem = (item: NavigationMenuItem): NavigationMenuItem => {
    const { to, children, ...rest } = item;
    let newTo = to;
    if (typeof to === "string") {
      const escPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const stripped = to.replace(new RegExp(`^${escPrefix}`), "");
      newTo = stripped === "" ? "/" : stripped;
    }
    const newChildren = Array.isArray(children) ? children.map(normalizeItem) : undefined;
    return {
      ...rest,
      ...(newTo !== undefined ? { to: newTo } : {}),
      ...(newChildren !== undefined ? { children: newChildren } : {})
    };
  };

  return Object.fromEntries(
    Object.entries(navPages).map(([key, items]) => [key,
      key === currentSiteKey ? items.map(normalizeItem) : items.map((item) => {
        if (item.value === currentSiteKey) {
          return normalizeItem(item);
        }
        return item;
      })
    ])
  );
};

export const useNav = () => {
  const navPages = normalizeToApp(pages);

  const pagesWithoutChildren = Object.fromEntries(
    Object.entries(navPages).map(([key, items]) => [key,
      items.map((item) => {
        const { children, ...rest } = item;
        return rest;
      })
    ])
  );

  const pagesWithChildrenWithoutTo = Object.fromEntries(
    Object.entries(navPages).map(([key, items]) => [key,
      items.map((item) => {
        if (item.children) {
          const { to, ...rest } = item;
          return rest;
        }
        return item;
      })
    ])
  );

  return {
    pages: pagesWithoutChildren,
    bodyPages: pagesWithChildrenWithoutTo
  };
};
