import { defineComponent, computed, ref, mergeProps, unref, withCtx, createVNode, renderSlot, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
import { e as cn } from "../entry-server.js";
import { d as defaultColors, b as _sfc_main$2 } from "./index-CxHfS1pZ.js";
import { Donut } from "@unovis/ts";
import { VisSingleContainer, VisDonut } from "@unovis/vue";
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
  __name: "DonutChart",
  __ssrInlineRender: true,
  props: {
    data: {},
    colors: {},
    index: {},
    margin: { default: () => ({ top: 0, bottom: 0, left: 0, right: 0 }) },
    showLegend: { type: Boolean, default: true },
    showTooltip: { type: Boolean, default: true },
    filterOpacity: { default: 0.2 },
    category: {},
    type: { default: "donut" },
    sortFunction: { type: Function, default: () => void 0 },
    valueFormatter: {},
    customTooltip: {}
  },
  setup(__props) {
    const props = __props;
    const valueFormatter = props.valueFormatter ?? ((tick) => `${tick}`);
    const category = computed(() => props.category);
    const index = computed(() => props.index);
    const isMounted = useMounted();
    const activeSegmentKey = ref();
    const colors = computed(() => {
      var _a;
      return ((_a = props.colors) == null ? void 0 : _a.length) ? props.colors : defaultColors(props.data.filter((d) => d[props.category]).filter(Boolean).length);
    });
    const legendItems = computed(() => props.data.map((item, i) => ({
      name: item[props.index],
      color: colors.value[i],
      inactive: false
    })));
    const totalValue = computed(() => props.data.reduce((prev, curr) => {
      return prev + curr[props.category];
    }, 0));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("w-full h-48 flex flex-col items-end", _ctx.$attrs.class ?? "")
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(VisSingleContainer), {
        style: { height: unref(isMounted) ? "100%" : "auto" },
        margin: { left: 20, right: 20 },
        data: _ctx.data
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), {
              selector: unref(Donut).selectors.segment,
              index: category.value,
              items: legendItems.value,
              "value-formatter": unref(valueFormatter),
              "custom-tooltip": _ctx.customTooltip
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(VisDonut), {
              value: (d) => d[category.value],
              "sort-function": _ctx.sortFunction,
              color: colors.value,
              "arc-width": _ctx.type === "donut" ? 20 : 0,
              "show-background": false,
              "central-label": _ctx.type === "donut" ? unref(valueFormatter)(totalValue.value) : "",
              events: {
                [unref(Donut).selectors.segment]: {
                  click: (d, _ev, i, elements) => {
                    var _a, _b;
                    if (((_a = d == null ? void 0 : d.data) == null ? void 0 : _a[index.value]) === activeSegmentKey.value) {
                      activeSegmentKey.value = void 0;
                      elements.forEach((el) => el.style.opacity = "1");
                    } else {
                      activeSegmentKey.value = (_b = d == null ? void 0 : d.data) == null ? void 0 : _b[index.value];
                      elements.forEach((el) => el.style.opacity = `${_ctx.filterOpacity}`);
                      elements[i].style.opacity = "1";
                    }
                  }
                }
              }
            }, null, _parent2, _scopeId));
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode(unref(_sfc_main$2), {
                selector: unref(Donut).selectors.segment,
                index: category.value,
                items: legendItems.value,
                "value-formatter": unref(valueFormatter),
                "custom-tooltip": _ctx.customTooltip
              }, null, 8, ["selector", "index", "items", "value-formatter", "custom-tooltip"]),
              createVNode(unref(VisDonut), {
                value: (d) => d[category.value],
                "sort-function": _ctx.sortFunction,
                color: colors.value,
                "arc-width": _ctx.type === "donut" ? 20 : 0,
                "show-background": false,
                "central-label": _ctx.type === "donut" ? unref(valueFormatter)(totalValue.value) : "",
                events: {
                  [unref(Donut).selectors.segment]: {
                    click: (d, _ev, i, elements) => {
                      var _a, _b;
                      if (((_a = d == null ? void 0 : d.data) == null ? void 0 : _a[index.value]) === activeSegmentKey.value) {
                        activeSegmentKey.value = void 0;
                        elements.forEach((el) => el.style.opacity = "1");
                      } else {
                        activeSegmentKey.value = (_b = d == null ? void 0 : d.data) == null ? void 0 : _b[index.value];
                        elements.forEach((el) => el.style.opacity = `${_ctx.filterOpacity}`);
                        elements[i].style.opacity = "1";
                      }
                    }
                  }
                }
              }, null, 8, ["value", "sort-function", "color", "arc-width", "central-label", "events"]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/chart-donut/DonutChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "donut",
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
      }
    ];
    function valueFormatter(tick) {
      return typeof tick === "number" ? `$ ${new Intl.NumberFormat("us").format(tick).toString()}` : "";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$1), mergeProps({
        index: "name",
        category: "total",
        data,
        "value-formatter": valueFormatter
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/admin/chart/donut.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
