alert("a");

var emptyTemplate = _.template(`
<div style="padding: 15px; border: 2px dashed #CCC; background-color: #EEE; color: #999; text-align: center;">
  MENU
</div>
`);

var menuTemplate = _.template(`
<div class="menu">
  <% _.forEach(items, function(item) { %>
    <a href="<%= item.url %>" target="_blank"><%= item.text %></a>
  <% }); %>
</div>
`);

unlayer.registerTool({
  name: "menu_tool",
  label: "My Menu",
  icon: "fa-bars",
  supportedDisplayModes: ["web", "email"],
  options: {
    default: {
      title: null,
    },
    menu: {
      title: "Menu Items",
      position: 1,
      options: {
        menu: {
          label: "Menu Items",
          defaultValue: {
            items: [],
          },
          widget: "menu_editor", // Custom Property Editor
        },
      },
    },
  },
  values: {},
  renderer: {
    Viewer: unlayer.createViewer({
      render(values) {
        // If the user has added no items yet, show empty placeholder template
        if (values.menu.items.length == 0) return emptyTemplate();

        return menuTemplate({ items: values.menu.items });
      },
    }),
    exporters: {
      web: function (values) {
        return menuTemplate({ items: values.menu.items });
      },
      email: function (values) {
        return menuTemplate({ items: values.menu.items });
      },
    },
    head: {
      css: function (values) {},
      js: function (values) {},
    },
  },
});
