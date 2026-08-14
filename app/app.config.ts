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
        arrow: "fill-current",
        content: "py-2 px-3 bg-elevated border border-accented"
      }
    },
    dropdownMenu: {
      slots: {
        content: "bg-elevated border border-accented",
        viewport: "divide-accented",
        arrow: "fill-current"
      },
      variants: {
        active: {
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
    }
  }
});
