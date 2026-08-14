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
        content: "py-2 px-3"
      }
    },
    dropdownMenu: {
      slots: {
        arrow: "fill-current"
      }
    }
  }
});
