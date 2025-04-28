import { defineComponent, computed, ref, mergeProps, unref, withCtx, createBlock, createCommentVNode, renderSlot, openBlock, createVNode, Fragment, renderList, useSSRContext, createTextVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderSlot } from "vue/server-renderer";
import { g as cn, d as _sfc_main$4 } from "./App-B441prsD.js";
import { d as defaultColors, _ as _sfc_main$2, a as _sfc_main$3 } from "./index-CR_1aa16.js";
import { CurveType, Area, Line, Axis } from "@unovis/ts";
import { VisXYContainer, VisArea, VisLine, VisAxis } from "@unovis/vue";
import { useMounted } from "@vueuse/core";
import { useId } from "reka-ui";
import "vue-router";
import "pinia";
import "lucide-vue-next";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@iconify/vue";
import "vue-sonner";
import "./CardTitle-CBMkY7R9.js";
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AreaChart",
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
    curveType: { default: CurveType.MonotoneX },
    showGradiant: { type: Boolean, default: true }
  },
  emits: ["legendItemClick"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const chartRef = useId();
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
        _push(ssrRenderComponent(unref(_sfc_main$2), {
          items: legendItems.value,
          "onUpdate:items": ($event) => legendItems.value = $event,
          onLegendItemClick: handleLegendItemClick
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(VisXYContainer), {
        style: { height: unref(isMounted) ? "100%" : "auto" },
        margin: { left: 20, right: 20 },
        data: _ctx.data
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<svg width="0" height="0"${_scopeId}><defs${_scopeId}><!--[-->`);
            ssrRenderList(colors.value, (color, i) => {
              _push2(`<linearGradient${ssrRenderAttr("id", `${unref(chartRef)}-color-${i}`)} x1="0" y1="0" x2="0" y2="1"${_scopeId}>`);
              if (_ctx.showGradiant) {
                _push2(`<!--[--><stop offset="5%"${ssrRenderAttr("stop-color", color)} stop-opacity="0.4"${_scopeId}></stop><stop offset="95%"${ssrRenderAttr("stop-color", color)} stop-opacity="0"${_scopeId}></stop><!--]-->`);
              } else {
                _push2(`<stop offset="0%"${ssrRenderAttr("stop-color", color)}${_scopeId}></stop>`);
              }
              _push2(`</linearGradient>`);
            });
            _push2(`<!--]--></defs></svg>`);
            if (_ctx.showTooltip) {
              _push2(ssrRenderComponent(unref(_sfc_main$3), {
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
              _push2(ssrRenderComponent(unref(VisArea), {
                x: (_d, i2) => i2,
                y: (d) => d[category],
                color: "auto",
                "curve-type": _ctx.curveType,
                attributes: {
                  [unref(Area).selectors.area]: {
                    fill: `url(#${unref(chartRef)}-color-${i})`
                  }
                },
                opacity: ((_a = legendItems.value.find((item) => item.name === category)) == null ? void 0 : _a.inactive) ? _ctx.filterOpacity : 1
              }, null, _parent2, _scopeId));
            });
            _push2(`<!--]--><!--[-->`);
            ssrRenderList(_ctx.categories, (category, i) => {
              var _a;
              _push2(ssrRenderComponent(unref(VisLine), {
                x: (_d, i2) => i2,
                y: (d) => d[category],
                color: colors.value[i],
                "curve-type": _ctx.curveType,
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
              (openBlock(), createBlock("svg", {
                width: "0",
                height: "0"
              }, [
                createVNode("defs", null, [
                  (openBlock(true), createBlock(Fragment, null, renderList(colors.value, (color, i) => {
                    return openBlock(), createBlock("linearGradient", {
                      id: `${unref(chartRef)}-color-${i}`,
                      key: i,
                      x1: "0",
                      y1: "0",
                      x2: "0",
                      y2: "1"
                    }, [
                      _ctx.showGradiant ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode("stop", {
                          offset: "5%",
                          "stop-color": color,
                          "stop-opacity": "0.4"
                        }, null, 8, ["stop-color"]),
                        createVNode("stop", {
                          offset: "95%",
                          "stop-color": color,
                          "stop-opacity": "0"
                        }, null, 8, ["stop-color"])
                      ], 64)) : (openBlock(), createBlock("stop", {
                        key: 1,
                        offset: "0%",
                        "stop-color": color
                      }, null, 8, ["stop-color"]))
                    ], 8, ["id"]);
                  }), 128))
                ])
              ])),
              _ctx.showTooltip ? (openBlock(), createBlock(unref(_sfc_main$3), {
                key: 0,
                colors: colors.value,
                items: legendItems.value,
                index: index.value,
                "custom-tooltip": _ctx.customTooltip
              }, null, 8, ["colors", "items", "index", "custom-tooltip"])) : createCommentVNode("", true),
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.categories, (category, i) => {
                var _a;
                return openBlock(), createBlock(unref(VisArea), {
                  key: category,
                  x: (_d, i2) => i2,
                  y: (d) => d[category],
                  color: "auto",
                  "curve-type": _ctx.curveType,
                  attributes: {
                    [unref(Area).selectors.area]: {
                      fill: `url(#${unref(chartRef)}-color-${i})`
                    }
                  },
                  opacity: ((_a = legendItems.value.find((item) => item.name === category)) == null ? void 0 : _a.inactive) ? _ctx.filterOpacity : 1
                }, null, 8, ["x", "y", "curve-type", "attributes", "opacity"]);
              }), 128)),
              (openBlock(true), createBlock(Fragment, null, renderList(_ctx.categories, (category, i) => {
                var _a;
                return openBlock(), createBlock(unref(VisLine), {
                  key: category,
                  x: (_d, i2) => i2,
                  y: (d) => d[category],
                  color: colors.value[i],
                  "curve-type": _ctx.curveType,
                  attributes: {
                    [unref(Line).selectors.line]: {
                      opacity: ((_a = legendItems.value.find((item) => item.name === category)) == null ? void 0 : _a.inactive) ? _ctx.filterOpacity : 1
                    }
                  }
                }, null, 8, ["x", "y", "color", "curve-type", "attributes"]);
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/chart-area/AreaChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "area",
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
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(_sfc_main$4), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Click me`);
          } else {
            return [
              createTextVNode("Click me")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<section class="my-8">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        data,
        index: "name",
        categories: ["total", "predicted"]
      }, null, _parent));
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/admin/chart/area.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
