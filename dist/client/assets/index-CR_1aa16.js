import { defineComponent, unref, createApp, useSSRContext, ref, onMounted, nextTick, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode } from "vue";
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { omit, BulletLegend } from "@unovis/ts";
import { VisTooltip, VisCrosshair, VisBulletLegend } from "@unovis/vue";
import { h as buttonVariants } from "./App-B441prsD.js";
import { _ as _sfc_main$4, a as _sfc_main$5, b as _sfc_main$6, d as _sfc_main$7 } from "./CardTitle-CBMkY7R9.js";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ChartCrosshair",
  __ssrInlineRender: true,
  props: {
    colors: { default: () => [] },
    index: {},
    items: {},
    customTooltip: {}
  },
  setup(__props) {
    const props = __props;
    const wm = /* @__PURE__ */ new WeakMap();
    function template(d) {
      if (wm.has(d)) {
        return wm.get(d);
      } else {
        const componentDiv = document.createElement("div");
        const omittedData = Object.entries(omit(d, [props.index])).map(([key, value]) => {
          const legendReference = props.items.find((i) => i.name === key);
          return { ...legendReference, value };
        });
        const TooltipComponent = props.customTooltip ?? _sfc_main;
        createApp(TooltipComponent, { title: d[props.index].toString(), data: omittedData }).mount(componentDiv);
        wm.set(d, componentDiv.innerHTML);
        return componentDiv.innerHTML;
      }
    }
    function color(_d, i) {
      return props.colors[i] ?? "transparent";
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(VisTooltip), {
        "horizontal-shift": 20,
        "vertical-shift": 20
      }, null, _parent));
      _push(ssrRenderComponent(unref(VisCrosshair), {
        template,
        color
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/chart/ChartCrosshair.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ChartLegend",
  __ssrInlineRender: true,
  props: {
    items: { default: () => [] }
  },
  emits: ["legendItemClick", "update:items"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const elRef = ref();
    onMounted(() => {
      const selector = `.${BulletLegend.selectors.item}`;
      nextTick(() => {
        var _a;
        const elements = (_a = elRef.value) == null ? void 0 : _a.querySelectorAll(selector);
        const classes = buttonVariants({ variant: "ghost", size: "xs" }).split(" ");
        elements == null ? void 0 : elements.forEach((el) => el.classList.add(...classes, "!inline-flex", "!mr-2"));
      });
    });
    function onLegendItemClick(d, i) {
      emits("legendItemClick", d, i);
      const isBulletActive = !props.items[i].inactive;
      const isFilterApplied = props.items.some((i2) => i2.inactive);
      if (isFilterApplied && isBulletActive) {
        emits("update:items", props.items.map((item) => ({ ...item, inactive: false })));
      } else {
        emits("update:items", props.items.map((item) => item.name === d.name ? { ...d, inactive: false } : { ...item, inactive: true }));
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "elRef",
        ref: elRef,
        class: "w-max"
      }, _attrs))}>`);
      _push(ssrRenderComponent(unref(VisBulletLegend), {
        items: _ctx.items,
        "on-legend-item-click": onLegendItemClick
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/chart/ChartLegend.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ChartSingleTooltip",
  __ssrInlineRender: true,
  props: {
    selector: {},
    index: {},
    items: {},
    valueFormatter: { type: Function },
    customTooltip: {}
  },
  setup(__props) {
    const props = __props;
    const wm = /* @__PURE__ */ new WeakMap();
    function template(d, i, elements) {
      const valueFormatter = props.valueFormatter ?? ((tick) => `${tick}`);
      if (props.index in d) {
        if (wm.has(d)) {
          return wm.get(d);
        } else {
          const componentDiv = document.createElement("div");
          const omittedData = Object.entries(omit(d, [props.index])).map(([key, value]) => {
            var _a;
            const legendReference = (_a = props.items) == null ? void 0 : _a.find((i2) => i2.name === key);
            return { ...legendReference, value: valueFormatter(value) };
          });
          const TooltipComponent = props.customTooltip ?? _sfc_main;
          createApp(TooltipComponent, { title: d[props.index], data: omittedData }).mount(componentDiv);
          wm.set(d, componentDiv.innerHTML);
          return componentDiv.innerHTML;
        }
      } else {
        const data = d.data;
        if (wm.has(data)) {
          return wm.get(data);
        } else {
          const style = getComputedStyle(elements[i]);
          const omittedData = [{ name: data.name, value: valueFormatter(data[props.index]), color: style.fill }];
          const componentDiv = document.createElement("div");
          const TooltipComponent = props.customTooltip ?? _sfc_main;
          createApp(TooltipComponent, { title: d[props.index], data: omittedData }).mount(componentDiv);
          wm.set(d, componentDiv.innerHTML);
          return componentDiv.innerHTML;
        }
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(VisTooltip), mergeProps({
        "horizontal-shift": 20,
        "vertical-shift": 20,
        triggers: {
          [_ctx.selector]: template
        }
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/chart/ChartSingleTooltip.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ChartTooltip",
  __ssrInlineRender: true,
  props: {
    title: {},
    data: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$4), mergeProps({ class: "text-sm" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (_ctx.title) {
              _push2(ssrRenderComponent(unref(_sfc_main$5), { class: "p-3 border-b" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$6), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(_ctx.title)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(_ctx.title), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$6), null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.title), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(unref(_sfc_main$7), { class: "p-3 min-w-[180px] flex flex-col gap-1" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(_ctx.data, (item, key) => {
                    _push3(`<div class="flex justify-between"${_scopeId2}><div class="flex items-center"${_scopeId2}><span class="w-2.5 h-2.5 mr-2"${_scopeId2}><svg width="100%" height="100%" viewBox="0 0 30 30"${_scopeId2}><path d=" M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0"${ssrRenderAttr("stroke", item.color)}${ssrRenderAttr("fill", item.color)} stroke-width="1"${_scopeId2}></path></svg></span><span${_scopeId2}>${ssrInterpolate(item.name)}</span></div><span class="font-semibold ml-4"${_scopeId2}>${ssrInterpolate(item.value)}</span></div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(_ctx.data, (item, key) => {
                      return openBlock(), createBlock("div", {
                        key,
                        class: "flex justify-between"
                      }, [
                        createVNode("div", { class: "flex items-center" }, [
                          createVNode("span", { class: "w-2.5 h-2.5 mr-2" }, [
                            (openBlock(), createBlock("svg", {
                              width: "100%",
                              height: "100%",
                              viewBox: "0 0 30 30"
                            }, [
                              createVNode("path", {
                                d: " M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0",
                                stroke: item.color,
                                fill: item.color,
                                "stroke-width": "1"
                              }, null, 8, ["stroke", "fill"])
                            ]))
                          ]),
                          createVNode("span", null, toDisplayString(item.name), 1)
                        ]),
                        createVNode("span", { class: "font-semibold ml-4" }, toDisplayString(item.value), 1)
                      ]);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              _ctx.title ? (openBlock(), createBlock(unref(_sfc_main$5), {
                key: 0,
                class: "p-3 border-b"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$6), null, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.title), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(unref(_sfc_main$7), { class: "p-3 min-w-[180px] flex flex-col gap-1" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.data, (item, key) => {
                    return openBlock(), createBlock("div", {
                      key,
                      class: "flex justify-between"
                    }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode("span", { class: "w-2.5 h-2.5 mr-2" }, [
                          (openBlock(), createBlock("svg", {
                            width: "100%",
                            height: "100%",
                            viewBox: "0 0 30 30"
                          }, [
                            createVNode("path", {
                              d: " M 15 15 m -14, 0 a 14,14 0 1,1 28,0 a 14,14 0 1,1 -28,0",
                              stroke: item.color,
                              fill: item.color,
                              "stroke-width": "1"
                            }, null, 8, ["stroke", "fill"])
                          ]))
                        ]),
                        createVNode("span", null, toDisplayString(item.name), 1)
                      ]),
                      createVNode("span", { class: "font-semibold ml-4" }, toDisplayString(item.value), 1)
                    ]);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/chart/ChartTooltip.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function defaultColors(count = 3) {
  const quotient = Math.floor(count / 2);
  const remainder = count % 2;
  const primaryCount = quotient + remainder;
  const secondaryCount = quotient;
  return [
    ...Array.from(new Array(primaryCount).keys()).map((i) => `hsl(var(--vis-primary-color) / ${1 - 1 / primaryCount * i})`),
    ...Array.from(new Array(secondaryCount).keys()).map((i) => `hsl(var(--vis-secondary-color) / ${1 - 1 / secondaryCount * i})`)
  ];
}
export {
  _sfc_main$2 as _,
  _sfc_main$3 as a,
  _sfc_main$1 as b,
  defaultColors as d
};
