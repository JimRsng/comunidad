export default defineAppConfig({
  ui: {
    header: {
      slots: {
        root: "bg-default/70 backdrop-blur border-b border-primary/30 h-(--ui-header-height) w-full shadow-sm"
      }
    },
    container: {
      base: "max-w-full lg:px-12"
    },
    popover: {
      slots: {
        arrow: "fill-current text-[var(--ui-bg-accented)]",
        content: "py-2 px-3 bg-elevated border border-accented"
      }
    },
    dropdownMenu: {
      slots: {
        content: "bg-elevated border border-accented",
        viewport: "divide-accented",
        arrow: "fill-current text-[var(--ui-bg-accented)]"
      },
      variants: {
        active: {
          true: {
            item: "before:bg-accented/50"
          },
          false: {
            item: "data-highlighted:before:bg-accented/50"
          }
        }
      }
    },
    separator: {
      variants: {
        color: {
          primary: {
            border: "border-primary/30"
          },
          neutral: {
            border: "border-accented"
          }
        }
      }
    },
    selectMenu: {
      slots: {
        arrow: "fill-current text-[var(--ui-bg-accented)]",
        content: "bg-elevated border border-accented",
        input: "border-accented",
        item: "data-highlighted:not-data-disabled:before:bg-accented/50"
      }
    },
    table: {
      slots: {
        tbody: "divide-accented/30"
      }
    }
  }
});
