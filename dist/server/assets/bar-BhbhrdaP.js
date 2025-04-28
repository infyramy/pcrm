import { defineComponent, computed, ref, mergeProps, unref, withCtx, createBlock, createCommentVNode, createVNode, renderSlot, openBlock, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { e as cn } from "../entry-server.js";
import { d as defaultColors, _ as _sfc_main$2, a as _sfc_main$3 } from "./index-CxHfS1pZ.js";
import { GroupedBar, StackedBar, Axis } from "@unovis/ts";
import { VisGroupedBar, VisStackedBar, VisXYContainer, VisAxis } from "@unovis/vue";
import { useMounted } from "@vueuse/core";
import "pinia";
import "vue-router";
import "lucide-vue-next";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "reka-ui";
import "@iconify/vue";
import "vue-sonner";
import "./CardTitle-BMQemLyw.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "BarChart",
  __ssrInlineRender: true,
  props: {
    data: {},
    categories: {},
    index: {},
    colors: {},
    margin: { default: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) },
    filterOpacity: { default: 0.2 },
    xFormatter: {},
    yFormatter: {},
    showXAxis: { type: Boolean, default: true },
    showYAxis: { type: Boolean, default: true },
    showTooltip: { type: Boolean, default: true },
    showLegend: { type: Boolean, default: true },
    showGridLine: { type: Boolean, default: true },
    customTooltip: {},
    type: { default: "grouped" },
    roundedCorners: { default: 0 }
  },
  emits: ["legendItemClick"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const index = computed(() => props.index);
    const colors = computed(() => {
      var _a;
      return ((_a = props.colors) == null ? void 0 : _a.length) ? props.colors : defaultColors(props.categories.length);
    });
    const legendItems = ref(props.categories.map((category, i) => ({
      name: category,
      color: colors.value[i],
      inactive: false
    })));
    const isMounted = useMounted();
    function handleLegendItemClick(d, i) {
      emits("legendItemClick", d, i);
    }
    const VisBarComponent = computed(() => props.type === "grouped" ? VisGroupedBar : VisStackedBar);
    const selectorsBar = computed(() => props.type === "grouped" ? GroupedBar.selectors.bar : StackedBar.selectors.bar);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("w-full h-[400px] flex flex-col items-end", _ctx.$attrs.class ?? "")
      }, _attrs))}>`);
      if (_ctx.showLegend) {
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          items: legendItems.value,
          "onUpdate:items": ($event) => legendItems.value = $event,
          onLegendItemClick: handleLegendItemClick
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(VisXYContainer), {
        data: _ctx.data,
        style: { height: unref(isMounted) ? "100%" : "auto" },
        margin: _ctx.margin
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.showTooltip) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
                colors: colors.value,
                items: legendItems.value,
                "custom-tooltip": _ctx.customTooltip,
                index: index.value
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(VisBarComponent), {
              x: (_d, i) => i,
              y: _ctx.categories.map((category) => (d) => d[category]),
              color: colors.value,
              "rounded-corners": _ctx.roundedCorners,
              "bar-padding": 0.05,
              attributes: {
                [selectorsBar.value]: {
                  opacity: (_d, i) => {
                    var _a;
                    const pos = i % _ctx.categories.length;
                    return ((_a = legendItems.value[pos]) == null ? void 0 : _a.inactive) ? _ctx.filterOpacity : 1;
                  }
                }
              }
            }, null, _parent2, _scopeId));
            if (_ctx.showXAxis) {
              _push2(ssrRenderComponent(unref(VisAxis), {
                type: "x",
                "tick-format": _ctx.xFormatter ?? ((v) => {
                  var _a;
                  return (_a = _ctx.data[v]) == null ? void 0 : _a[index.value];
                }),
                "grid-line": false,
                "tick-line": false,
                "tick-text-color": "hsl(var(--vis-text-color))"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (_ctx.showYAxis) {
              _push2(ssrRenderComponent(unref(VisAxis), {
                type: "y",
                "tick-line": false,
                "tick-format": _ctx.yFormatter,
                "domain-line": false,
                "grid-line": _ctx.showGridLine,
                attributes: {
                  [unref(Axis).selectors.grid]: {
                    class: "text-muted"
                  }
                },
                "tick-text-color": "hsl(var(--vis-text-color))"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              _ctx.showTooltip ? (openBlock(), createBlock(unref(_sfc_main$3), {
                key: 0,
                colors: colors.value,
                items: legendItems.value,
                "custom-tooltip": _ctx.customTooltip,
                index: index.value
              }, null, 8, ["colors", "items", "custom-tooltip", "index"])) : createCommentVNode("", true),
              createVNode(unref(VisBarComponent), {
                x: (_d, i) => i,
                y: _ctx.categories.map((category) => (d) => d[category]),
                color: colors.value,
                "rounded-corners": _ctx.roundedCorners,
                "bar-padding": 0.05,
                attributes: {
                  [selectorsBar.value]: {
                    opacity: (_d, i) => {
                      var _a;
                      const pos = i % _ctx.categories.length;
                      return ((_a = legendItems.value[pos]) == null ? void 0 : _a.inactive) ? _ctx.filterOpacity : 1;
                    }
                  }
                }
              }, null, 8, ["x", "y", "color", "rounded-corners", "attributes"]),
              _ctx.showXAxis ? (openBlock(), createBlock(unref(VisAxis), {
                key: 1,
                type: "x",
                "tick-format": _ctx.xFormatter ?? ((v) => {
                  var _a;
                  return (_a = _ctx.data[v]) == null ? void 0 : _a[index.value];
                }),
                "grid-line": false,
                "tick-line": false,
                "tick-text-color": "hsl(var(--vis-text-color))"
              }, null, 8, ["tick-format"])) : createCommentVNode("", true),
              _ctx.showYAxis ? (openBlock(), createBlock(unref(VisAxis), {
                key: 2,
                type: "y",
                "tick-line": false,
                "tick-format": _ctx.yFormatter,
                "domain-line": false,
                "grid-line": _ctx.showGridLine,
                attributes: {
                  [unref(Axis).selectors.grid]: {
                    class: "text-muted"
                  }
                },
                "tick-text-color": "hsl(var(--vis-text-color))"
              }, null, 8, ["tick-format", "grid-line", "attributes"])) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/chart-bar/BarChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "bar",
  __ssrInlineRender: true,
  setup(__props) {
    const data = [
      {
        name: "Jan",
        total: Math.floor(Math.random() * 2e3) + 500,
        predicted: Math.floor(Math.random() * 2e3) + 500
      },
      {
        name: "Feb",
        total: Math.floor(Math.random() * 2e3) + 500,
        predicted: Math.floor(Math.random() * 2e3) + 500
      },
      {
        name: "Mar",
        total: Math.floor(Math.random() * 2e3) + 500,
        predicted: Math.floor(Math.random() * 2e3) + 500
      },
      {
        name: "Apr",
        total: Math.floor(Math.random() * 2e3) + 500,
        predicted: Math.floor(Math.random() * 2e3) + 500
      },
      {
        name: "May",
        total: Math.floor(Math.random() * 2e3) + 500,
        predicted: Math.floor(Math.random() * 2e3) + 500
      },
      {
        name: "Jun",
        total: Math.floor(Math.random() * 2e3) + 500,
        predicted: Math.floor(Math.random() * 2e3) + 500
      },
      {
        name: "Jul",
        total: Math.floor(Math.random() * 2e3) + 500,
        predicted: Math.floor(Math.random() * 2e3) + 500
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$1), mergeProps({
        data,
        index: "name",
        categories: ["total", "predicted"],
        "y-formatter": (_tick, _i, _ticks) => {
          return `${_tick}%`;
        }
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/admin/chart/bar.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
