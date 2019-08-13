window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  ClothItem: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "64397Ov0BZLwrIglk2i+/hh", "ClothItem");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        canvas: cc.Node,
        icon: cc.Node,
        touchLocationDisplay: {
          default: null,
          type: cc.Label
        },
        follower: {
          default: null,
          type: cc.Node
        },
        followSpeed: 200
      },
      init: function init(data) {
        this.follower = data.follower;
      },
      onLoad: function onLoad() {},
      start: function start() {},
      update: function update(dt) {
        if (!this.isMoving) return;
        null != this.follower && this.follower.setPosition(this.moveToPos);
      }
    });
    cc._RF.pop();
  }, {} ],
  ClothLayout: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bec74Oi8dZNsYhppKhfYir8", "ClothLayout");
    "use strict";
    var ItemType = cc.Enum({
      Shirt: 0,
      Trouser: 1,
      Shoe: 2
    });
    var Item = cc.Class({
      name: "Item",
      properties: {
        id: 0,
        iconName: "",
        level: 0,
        itemType: {
          default: ItemType.Shirt,
          type: cc.Enum(ItemType)
        }
      }
    });
    cc.Class({
      extends: cc.Component,
      properties: {
        items: {
          default: [],
          type: Item
        },
        itemPrefab: {
          default: null,
          type: cc.Prefab
        },
        follower: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        var item = new Item();
        this.items.push(item);
        this.items.push(item);
        this.items.push(item);
        for (var i = 0; i < this.items.length; ++i) {
          var item = cc.instantiate(this.itemPrefab);
          var data = this.items[i];
          this.node.addChild(item);
          item.getComponent("ClothItem").init({
            follower: this.follower
          });
          var starWorldPos = item.convertToWorldSpaceAR(item.position);
          console.log(starWorldPos);
        }
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  HelloWorld: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: {
          default: null,
          type: cc.Label
        },
        text: "Hello, World!"
      },
      onLoad: function onLoad() {
        this.label.string = this.text;
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "ClothItem", "ClothLayout", "HelloWorld" ]);