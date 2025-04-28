import { defineComponent, computed, ref, mergeProps, unref, withCtx, createBlock, createCommentVNode, renderSlot, openBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
import { g as cn } from "./App-B441prsD.js";
import { d as defaultColors, _ as _sfc_main$1, a as _sfc_main$2 } from "./index-CR_1aa16.js";
import { CurveType, Line, Axis } from "@unovis/ts";
import { VisXYContainer, VisLine, VisAxis } from "@unovis/vue";
import { useMounted } from "@vueuse/core";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "LineChart",
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
    curveType: { default: CurveType.MonotoneX }
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("w-full h-[400px] flex flex-col items-end", _ctx.$attrs.class ?? "")
      }, _attrs))}>`);
      if (_ctx.showLegend) {
        _push(ssrRenderComponent(unref(_sfc_main$1), {
          items: legendItems.value,
          "onUpdate:items": ($event) => legendItems.value = $event,
          onLegendItemClick: handleLegendItemClick
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(VisXYContainer), {
        margin: { left: 20, right: 20 },
        data: _ctx.data,
        style: { height: unref(isMounted) ? "100%" : "auto" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.showTooltip) {
              _push2(ssrRenderComponent(unref(_sfc_main$2), {
                colors: colors.value,
                items: legendItems.value,
                index: index.value,
                "custom-tooltip": _ctx.customTooltip
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!--[-->`);
            ssrRenderList(_ctx.categories, (category, i) => {
              var _a;
              _push2(ssrRenderComponent(unref(VisLine), {
                x: (_d, i2) => i2,
                y: (d) => d[category],
                "curve-type": _ctx.curveType,
                color: colors.value[i],
                attributes: {
                  [unref(Line).selectors.line]: {
                    opacity: ((_a = legendItems.value.find((item) => item.name === category)) == null ? void 0 : _a.inactive) ? _ctx.filterOpacity : 1
                  }
                }
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
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
              _ctx.showTooltip ? (openBlock(), createBlock(unref(_sfc_main$2), {
                key: 0,
                colors: colors.value,
                items: legendItems.value,
                index: index.value,
                "custom-tooltip": _ctx.customTooltip
              }, null, 8, ["colors", "items", "index", "custom-tooltip"])) : createCommentVNode("", true),
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.categories, (category, i) => {
                var _a;
                return openBlock(), createBlock(unref(VisLine), {
                  key: category,
                  x: (_d, i2) => i2,
                  y: (d) => d[category],
                  "curve-type": _ctx.curveType,
                  color: colors.value[i],
                  attributes: {
                    [unref(Line).selectors.line]: {
                      opacity: ((_a = legendItems.value.find((item) => item.name === category)) == null ? void 0 : _a.inactive) ? _ctx.filterOpacity : 1
                    }
                  }
                }, null, 8, ["x", "y", "curve-type", "color", "attributes"]);
              }), 128)),
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/chart-line/LineChart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _
};
