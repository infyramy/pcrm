import { defineComponent, computed, unref, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext, renderSlot, ref, createCommentVNode } from "vue";
import { ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot, ssrRenderAttrs } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { e as cn, f as buttonVariants, u as useAuthStore, c as _sfc_main$d, d as _sfc_main$e, b as _sfc_main$k, g as _sfc_main$s, h as _sfc_main$t, i as _sfc_main$u } from "../entry-server.js";
import { _ as _sfc_main$f, a as _sfc_main$g, b as _sfc_main$h, c as _sfc_main$i, d as _sfc_main$j } from "./BreadcrumbSeparator-DiH4M1VE.js";
import { _ as _sfc_main$v, a as _sfc_main$w, b as _sfc_main$x, d as _sfc_main$y } from "./CardTitle-BMQemLyw.js";
import { ChevronRight, ChevronLeft, Plus, Calendar, ChevronDown, MoreVertical, ArrowUp, ArrowDown } from "lucide-vue-next";
import { _ as _sfc_main$l, a as _sfc_main$m, b as _sfc_main$n, c as _sfc_main$o, d as _sfc_main$p, e as _sfc_main$q, f as _sfc_main$r } from "./SelectValue-BJLx0vNb.js";
import { _ as _sfc_main$z } from "./LineChart-CET1UKPE.js";
import { useForwardPropsEmits, RangeCalendarRoot, useForwardProps, RangeCalendarCell, RangeCalendarCellTrigger, RangeCalendarGrid, RangeCalendarGridBody, RangeCalendarGridHead, RangeCalendarGridRow, RangeCalendarHeadCell, RangeCalendarHeader, RangeCalendarHeading, RangeCalendarNext, RangeCalendarPrev } from "reka-ui";
import { today, getLocalTimeZone } from "@internationalized/date";
import "pinia";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "@iconify/vue";
import "vue-sonner";
import "./index-CxHfS1pZ.js";
import "@unovis/ts";
import "@unovis/vue";
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendar",
  __ssrInlineRender: true,
  props: {
    defaultPlaceholder: {},
    defaultValue: {},
    modelValue: {},
    placeholder: {},
    allowNonContiguousRanges: { type: Boolean },
    pagedNavigation: { type: Boolean },
    preventDeselect: { type: Boolean },
    weekStartsOn: {},
    weekdayFormat: {},
    calendarLabel: {},
    fixedWeeks: { type: Boolean },
    maxValue: {},
    minValue: {},
    locale: {},
    numberOfMonths: {},
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    initialFocus: { type: Boolean },
    isDateDisabled: { type: Function },
    isDateUnavailable: { type: Function },
    dir: {},
    nextPage: { type: Function },
    prevPage: { type: Function },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["update:modelValue", "update:placeholder", "update:startValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RangeCalendarRoot), mergeProps({
        class: unref(cn)("p-3", props.class)
      }, unref(forwarded), _attrs), {
        default: withCtx(({ grid, weekDays }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$4), null, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$1), null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$2), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$1)),
                    createVNode(unref(_sfc_main$3)),
                    createVNode(unref(_sfc_main$2))
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(`<div class="flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0"${_scopeId}><!--[-->`);
            ssrRenderList(grid, (month) => {
              _push2(ssrRenderComponent(unref(_sfc_main$9), {
                key: month.value.toString()
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$7), null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(weekDays, (day) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$5), { key: day }, {
                                    default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(day)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(day), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                    return openBlock(), createBlock(unref(_sfc_main$5), { key: day }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(day), 1)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$6), null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                  return openBlock(), createBlock(unref(_sfc_main$5), { key: day }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(day), 1)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(_sfc_main$8), null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(month.rows, (weekDates, index) => {
                            _push4(ssrRenderComponent(unref(_sfc_main$6), {
                              key: `weekDate-${index}`,
                              class: "mt-2 w-full"
                            }, {
                              default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<!--[-->`);
                                  ssrRenderList(weekDates, (weekDate) => {
                                    _push5(ssrRenderComponent(unref(_sfc_main$b), {
                                      key: weekDate.toString(),
                                      date: weekDate
                                    }, {
                                      default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(ssrRenderComponent(unref(_sfc_main$a), {
                                            day: weekDate,
                                            month: month.value
                                          }, null, _parent6, _scopeId5));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$a), {
                                              day: weekDate,
                                              month: month.value
                                            }, null, 8, ["day", "month"])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  });
                                  _push5(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                      return openBlock(), createBlock(unref(_sfc_main$b), {
                                        key: weekDate.toString(),
                                        date: weekDate
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$a), {
                                            day: weekDate,
                                            month: month.value
                                          }, null, 8, ["day", "month"])
                                        ]),
                                        _: 2
                                      }, 1032, ["date"]);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                              return openBlock(), createBlock(unref(_sfc_main$6), {
                                key: `weekDate-${index}`,
                                class: "mt-2 w-full"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                    return openBlock(), createBlock(unref(_sfc_main$b), {
                                      key: weekDate.toString(),
                                      date: weekDate
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$a), {
                                          day: weekDate,
                                          month: month.value
                                        }, null, 8, ["day", "month"])
                                      ]),
                                      _: 2
                                    }, 1032, ["date"]);
                                  }), 128))
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                return openBlock(), createBlock(unref(_sfc_main$5), { key: day }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(day), 1)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(_sfc_main$8), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$6), {
                              key: `weekDate-${index}`,
                              class: "mt-2 w-full"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                  return openBlock(), createBlock(unref(_sfc_main$b), {
                                    key: weekDate.toString(),
                                    date: weekDate
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), {
                                        day: weekDate,
                                        month: month.value
                                      }, null, 8, ["day", "month"])
                                    ]),
                                    _: 2
                                  }, 1032, ["date"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode(unref(_sfc_main$4), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$1)),
                  createVNode(unref(_sfc_main$3)),
                  createVNode(unref(_sfc_main$2))
                ]),
                _: 1
              }),
              createVNode("div", { class: "flex flex-col gap-y-4 mt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0" }, [
                (openBlock(true), createBlock(Fragment, null, renderList(grid, (month) => {
                  return openBlock(), createBlock(unref(_sfc_main$9), {
                    key: month.value.toString()
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$7), null, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$6), null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(weekDays, (day) => {
                                return openBlock(), createBlock(unref(_sfc_main$5), { key: day }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(day), 1)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(unref(_sfc_main$8), null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(month.rows, (weekDates, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$6), {
                              key: `weekDate-${index}`,
                              class: "mt-2 w-full"
                            }, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(weekDates, (weekDate) => {
                                  return openBlock(), createBlock(unref(_sfc_main$b), {
                                    key: weekDate.toString(),
                                    date: weekDate
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), {
                                        day: weekDate,
                                        month: month.value
                                      }, null, 8, ["day", "month"])
                                    ]),
                                    _: 2
                                  }, 1032, ["date"]);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/range-calendar/RangeCalendar.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarCell",
  __ssrInlineRender: true,
  props: {
    date: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RangeCalendarCell), mergeProps({
        class: unref(cn)("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([data-selected])]:bg-accent first:[&:has([data-selected])]:rounded-l-md last:[&:has([data-selected])]:rounded-r-md [&:has([data-selected][data-outside-view])]:bg-accent/50 [&:has([data-selected][data-selection-end])]:rounded-r-md [&:has([data-selected][data-selection-start])]:rounded-l-md", props.class)
      }, unref(forwardedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/range-calendar/RangeCalendarCell.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarCellTrigger",
  __ssrInlineRender: true,
  props: {
    day: {},
    month: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RangeCalendarCellTrigger), mergeProps({
        class: unref(cn)(
          unref(buttonVariants)({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal data-[selected]:opacity-100",
          "[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground",
          // Selection Start
          "data-[selection-start]:bg-primary data-[selection-start]:text-primary-foreground data-[selection-start]:hover:bg-primary data-[selection-start]:hover:text-primary-foreground data-[selection-start]:focus:bg-primary data-[selection-start]:focus:text-primary-foreground",
          // Selection End
          "data-[selection-end]:bg-primary data-[selection-end]:text-primary-foreground data-[selection-end]:hover:bg-primary data-[selection-end]:hover:text-primary-foreground data-[selection-end]:focus:bg-primary data-[selection-end]:focus:text-primary-foreground",
          // Outside months
          "data-[outside-view]:text-muted-foreground data-[outside-view]:opacity-50 [&[data-outside-view][data-selected]]:text-muted-foreground [&[data-outside-view][data-selected]]:opacity-30",
          // Disabled
          "data-[disabled]:text-muted-foreground data-[disabled]:opacity-50",
          // Unavailable
          "data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through",
          props.class
        )
      }, unref(forwardedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/range-calendar/RangeCalendarCellTrigger.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarGrid",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RangeCalendarGrid), mergeProps({
        class: unref(cn)("w-full border-collapse space-y-1", props.class)
      }, unref(forwardedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/range-calendar/RangeCalendarGrid.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarGridBody",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RangeCalendarGridBody), mergeProps(props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/range-calendar/RangeCalendarGridBody.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarGridHead",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RangeCalendarGridHead), mergeProps(props, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/range-calendar/RangeCalendarGridHead.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarGridRow",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RangeCalendarGridRow), mergeProps({
        class: unref(cn)("flex", props.class)
      }, unref(forwardedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/range-calendar/RangeCalendarGridRow.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarHeadCell",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RangeCalendarHeadCell), mergeProps({
        class: unref(cn)("w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground", props.class)
      }, unref(forwardedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/range-calendar/RangeCalendarHeadCell.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarHeader",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RangeCalendarHeader), mergeProps({
        class: unref(cn)("relative flex w-full items-center justify-between pt-1", props.class)
      }, unref(forwardedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/range-calendar/RangeCalendarHeader.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarHeading",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RangeCalendarHeading), mergeProps({
        class: unref(cn)("text-sm font-medium", props.class)
      }, unref(forwardedProps), _attrs), {
        default: withCtx(({ headingValue }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", { headingValue }, () => {
              _push2(`${ssrInterpolate(headingValue)}`);
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", { headingValue }, () => [
                createTextVNode(toDisplayString(headingValue), 1)
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/range-calendar/RangeCalendarHeading.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarNextButton",
  __ssrInlineRender: true,
  props: {
    nextPage: { type: Function },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RangeCalendarNext), mergeProps({
        class: unref(cn)(
          unref(buttonVariants)({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          props.class
        )
      }, unref(forwardedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ChevronRight), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ChevronRight), { class: "h-4 w-4" })
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/range-calendar/RangeCalendarNextButton.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RangeCalendarPrevButton",
  __ssrInlineRender: true,
  props: {
    prevPage: { type: Function },
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(RangeCalendarPrev), mergeProps({
        class: unref(cn)(
          unref(buttonVariants)({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          props.class
        )
      }, unref(forwardedProps), _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, () => {
              _push2(ssrRenderComponent(unref(ChevronLeft), { class: "h-4 w-4" }, null, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, () => [
                createVNode(unref(ChevronLeft), { class: "h-4 w-4" })
              ])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/range-calendar/RangeCalendarPrevButton.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const router = useRouter();
    const breadcrumb = [{ count: 1, label: "Dashboard", action: false, href: "/" }];
    const branches = ref([
      {
        title: "UUM",
        value: "uum"
      },
      {
        title: "UM",
        value: "um"
      }
    ]);
    const dateRange = ref([
      {
        title: "Today",
        value: "today"
      },
      {
        title: "Yesterday",
        value: "yesterday"
      },
      {
        title: "Last 7 Days",
        value: "last-7-days"
      },
      {
        title: "Last 30 Days",
        value: "last-30-days"
      },
      {
        title: "This Month",
        value: "this-month"
      },
      {
        title: "This Week",
        value: "this-week"
      },
      {
        title: "Lifetime",
        value: "lifetime"
      }
    ]);
    const start = today(getLocalTimeZone());
    const end = start.add({ days: 7 });
    const value = ref({
      start,
      end
    });
    const lineChartData = [
      { month: "Jan", "2023": 35, "2024": 45, "2025": 60 },
      { month: "Feb", "2023": 37, "2024": 47, "2025": 62 },
      { month: "Mar", "2023": 36, "2024": 48, "2025": 64 },
      { month: "Apr", "2023": 38, "2024": 50, "2025": 65 },
      { month: "May", "2023": 42, "2024": 52, "2025": 67 },
      { month: "Jun", "2023": 39, "2024": 49, "2025": 68 },
      { month: "Jul", "2023": 41, "2024": 53, "2025": 69 },
      { month: "Aug", "2023": 44, "2024": 56, "2025": 72 },
      { month: "Sep", "2023": 45, "2024": 54, "2025": 70 },
      { month: "Oct", "2023": 43, "2024": 55, "2025": 69 },
      { month: "Nov", "2023": 47, "2024": 57, "2025": 71 },
      { month: "Dec", "2023": 51, "2024": 59, "2025": 74 }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><header class="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$d), { class: "-ml-1" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$e), {
        orientation: "vertical",
        class: "mr-2 h-4"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$f), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(breadcrumb, (item) => {
              _push2(ssrRenderComponent(unref(_sfc_main$g), {
                key: item.label
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$h), { class: "hidden md:block" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (item.action) {
                            _push4(ssrRenderComponent(unref(_sfc_main$i), {
                              href: item.href
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.label)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.label), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(item.label)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(item.label), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          }
                        } else {
                          return [
                            item.action ? (openBlock(), createBlock(unref(_sfc_main$i), {
                              key: 0,
                              href: item.href
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.label), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])) : (openBlock(), createBlock(unref(_sfc_main$i), { key: 1 }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.label), 1)
                              ]),
                              _: 2
                            }, 1024))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    if (item.count !== breadcrumb.length) {
                      _push3(ssrRenderComponent(unref(_sfc_main$j), { class: "hidden md:block" }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode(unref(_sfc_main$h), { class: "hidden md:block" }, {
                        default: withCtx(() => [
                          item.action ? (openBlock(), createBlock(unref(_sfc_main$i), {
                            key: 0,
                            href: item.href
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])) : (openBlock(), createBlock(unref(_sfc_main$i), { key: 1 }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ]),
                            _: 2
                          }, 1024))
                        ]),
                        _: 2
                      }, 1024),
                      item.count !== breadcrumb.length ? (openBlock(), createBlock(unref(_sfc_main$j), {
                        key: 0,
                        class: "hidden md:block"
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                (openBlock(), createBlock(Fragment, null, renderList(breadcrumb, (item) => {
                  return createVNode(unref(_sfc_main$g), {
                    key: item.label
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$h), { class: "hidden md:block" }, {
                        default: withCtx(() => [
                          item.action ? (openBlock(), createBlock(unref(_sfc_main$i), {
                            key: 0,
                            href: item.href
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])) : (openBlock(), createBlock(unref(_sfc_main$i), { key: 1 }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ]),
                            _: 2
                          }, 1024))
                        ]),
                        _: 2
                      }, 1024),
                      item.count !== breadcrumb.length ? (openBlock(), createBlock(unref(_sfc_main$j), {
                        key: 0,
                        class: "hidden md:block"
                      })) : createCommentVNode("", true)
                    ]),
                    _: 2
                  }, 1024);
                }), 64))
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></header><main class="space-y-6"><div class="flex justify-between"><div><h2 class="text-3xl font-bold tracking-tight">Dashboard</h2><p class="text-muted-foreground"> Welcome back, ${ssrInterpolate((_a = unref(authStore).user) == null ? void 0 : _a.fullname)}! </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$k), {
        onClick: ($event) => unref(router).push("/admin/points")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Plus), null, null, _parent2, _scopeId));
            _push2(` Add Point`);
          } else {
            return [
              createVNode(unref(Plus)),
              createTextVNode(" Add Point")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$k), { variant: "outline" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Redeem Point`);
          } else {
            return [
              createTextVNode("Redeem Point")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="flex justify-between items-center"><div class="flex">`);
      _push(ssrRenderComponent(unref(_sfc_main$l), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$m), { class: "w-[180px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$n), { placeholder: "Select a branch" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$n), { placeholder: "Select a branch" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$o), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$p), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$q), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Branch`);
                            } else {
                              return [
                                createTextVNode("Branch")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<!--[-->`);
                        ssrRenderList(branches.value, (data, index) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$r), {
                            key: index,
                            value: data.value
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(data.title)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(data.title), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          createVNode(unref(_sfc_main$q), null, {
                            default: withCtx(() => [
                              createTextVNode("Branch")
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(branches.value, (data, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$r), {
                              key: index,
                              value: data.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(data.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$p), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$q), null, {
                          default: withCtx(() => [
                            createTextVNode("Branch")
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(branches.value, (data, index) => {
                          return openBlock(), createBlock(unref(_sfc_main$r), {
                            key: index,
                            value: data.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(data.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$m), { class: "w-[180px]" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$n), { placeholder: "Select a branch" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$o), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$p), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$q), null, {
                        default: withCtx(() => [
                          createTextVNode("Branch")
                        ]),
                        _: 1
                      }),
                      (openBlock(true), createBlock(Fragment, null, renderList(branches.value, (data, index) => {
                        return openBlock(), createBlock(unref(_sfc_main$r), {
                          key: index,
                          value: data.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(data.title), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$l), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$m), { class: "w-[180px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$n), { placeholder: "Select a date range" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$n), { placeholder: "Select a date range" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$o), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$p), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$q), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Date Range`);
                            } else {
                              return [
                                createTextVNode("Date Range")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<!--[-->`);
                        ssrRenderList(dateRange.value, (data, index) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$r), {
                            key: index,
                            value: data.value
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(data.title)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(data.title), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          createVNode(unref(_sfc_main$q), null, {
                            default: withCtx(() => [
                              createTextVNode("Date Range")
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(dateRange.value, (data, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$r), {
                              key: index,
                              value: data.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(data.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$p), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$q), null, {
                          default: withCtx(() => [
                            createTextVNode("Date Range")
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(dateRange.value, (data, index) => {
                          return openBlock(), createBlock(unref(_sfc_main$r), {
                            key: index,
                            value: data.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(data.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$m), { class: "w-[180px]" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$n), { placeholder: "Select a date range" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$o), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$p), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$q), null, {
                        default: withCtx(() => [
                          createTextVNode("Date Range")
                        ]),
                        _: 1
                      }),
                      (openBlock(true), createBlock(Fragment, null, renderList(dateRange.value, (data, index) => {
                        return openBlock(), createBlock(unref(_sfc_main$r), {
                          key: index,
                          value: data.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(data.title), 1)
                          ]),
                          _: 2
                        }, 1032, ["value"]);
                      }), 128))
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$s), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$t), { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$k), { variant: "outline" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(Calendar), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                        _push4(`<span${_scopeId3}>Custom range</span></div>`);
                        _push4(ssrRenderComponent(unref(ChevronDown), { class: "h-4 w-4 opacity-50" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(unref(Calendar), { class: "h-4 w-4" }),
                            createVNode("span", null, "Custom range")
                          ]),
                          createVNode(unref(ChevronDown), { class: "h-4 w-4 opacity-50" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(unref(Calendar), { class: "h-4 w-4" }),
                          createVNode("span", null, "Custom range")
                        ]),
                        createVNode(unref(ChevronDown), { class: "h-4 w-4 opacity-50" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$u), {
              class: "w-auto",
              align: "end",
              side: "bottom"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    class: ""
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$c), {
                      modelValue: value.value,
                      "onUpdate:modelValue": ($event) => value.value = $event,
                      class: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$t), { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$k), { variant: "outline" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(unref(Calendar), { class: "h-4 w-4" }),
                        createVNode("span", null, "Custom range")
                      ]),
                      createVNode(unref(ChevronDown), { class: "h-4 w-4 opacity-50" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$u), {
                class: "w-auto",
                align: "end",
                side: "bottom"
              }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$c), {
                    modelValue: value.value,
                    "onUpdate:modelValue": ($event) => value.value = $event,
                    class: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">`);
      _push(ssrRenderComponent(unref(_sfc_main$v), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$w), { class: "flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$x), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Total customers *`);
                      } else {
                        return [
                          createTextVNode("Total customers *")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(MoreVertical), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$x), null, {
                      default: withCtx(() => [
                        createTextVNode("Total customers *")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(MoreVertical), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$y), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-4xl font-bold"${_scopeId2}>2,420</p><div class="flex items-center pt-4 text-sm"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ArrowUp), { class: "mr-1 h-4 w-4 text-green-500" }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-green-500 font-medium"${_scopeId2}>40%</span><span class="text-muted-foreground ml-1"${_scopeId2}>vs last month</span></div>`);
                } else {
                  return [
                    createVNode("p", { class: "text-4xl font-bold" }, "2,420"),
                    createVNode("div", { class: "flex items-center pt-4 text-sm" }, [
                      createVNode(unref(ArrowUp), { class: "mr-1 h-4 w-4 text-green-500" }),
                      createVNode("span", { class: "text-green-500 font-medium" }, "40%"),
                      createVNode("span", { class: "text-muted-foreground ml-1" }, "vs last month")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$w), { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$x), null, {
                    default: withCtx(() => [
                      createTextVNode("Total customers *")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(MoreVertical), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$y), null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-4xl font-bold" }, "2,420"),
                  createVNode("div", { class: "flex items-center pt-4 text-sm" }, [
                    createVNode(unref(ArrowUp), { class: "mr-1 h-4 w-4 text-green-500" }),
                    createVNode("span", { class: "text-green-500 font-medium" }, "40%"),
                    createVNode("span", { class: "text-muted-foreground ml-1" }, "vs last month")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$v), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$w), { class: "flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$x), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Points Awarded`);
                      } else {
                        return [
                          createTextVNode("Points Awarded")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(MoreVertical), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$x), null, {
                      default: withCtx(() => [
                        createTextVNode("Points Awarded")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(MoreVertical), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$y), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-4xl font-bold"${_scopeId2}>1,210</p><div class="flex items-center pt-4 text-sm"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ArrowDown), { class: "mr-1 h-4 w-4 text-red-500" }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-red-500 font-medium"${_scopeId2}>10%</span><span class="text-muted-foreground ml-1"${_scopeId2}>vs last month</span></div>`);
                } else {
                  return [
                    createVNode("p", { class: "text-4xl font-bold" }, "1,210"),
                    createVNode("div", { class: "flex items-center pt-4 text-sm" }, [
                      createVNode(unref(ArrowDown), { class: "mr-1 h-4 w-4 text-red-500" }),
                      createVNode("span", { class: "text-red-500 font-medium" }, "10%"),
                      createVNode("span", { class: "text-muted-foreground ml-1" }, "vs last month")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$w), { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$x), null, {
                    default: withCtx(() => [
                      createTextVNode("Points Awarded")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(MoreVertical), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$y), null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-4xl font-bold" }, "1,210"),
                  createVNode("div", { class: "flex items-center pt-4 text-sm" }, [
                    createVNode(unref(ArrowDown), { class: "mr-1 h-4 w-4 text-red-500" }),
                    createVNode("span", { class: "text-red-500 font-medium" }, "10%"),
                    createVNode("span", { class: "text-muted-foreground ml-1" }, "vs last month")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$v), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$w), { class: "flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$x), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Points Redeemed`);
                      } else {
                        return [
                          createTextVNode("Points Redeemed")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(MoreVertical), { class: "h-4 w-4 text-muted-foreground" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$x), null, {
                      default: withCtx(() => [
                        createTextVNode("Points Redeemed")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(MoreVertical), { class: "h-4 w-4 text-muted-foreground" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$y), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-4xl font-bold"${_scopeId2}>316</p><div class="flex items-center pt-4 text-sm"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(ArrowUp), { class: "mr-1 h-4 w-4 text-green-500" }, null, _parent3, _scopeId2));
                  _push3(`<span class="text-green-500 font-medium"${_scopeId2}>20%</span><span class="text-muted-foreground ml-1"${_scopeId2}>vs last month</span></div>`);
                } else {
                  return [
                    createVNode("p", { class: "text-4xl font-bold" }, "316"),
                    createVNode("div", { class: "flex items-center pt-4 text-sm" }, [
                      createVNode(unref(ArrowUp), { class: "mr-1 h-4 w-4 text-green-500" }),
                      createVNode("span", { class: "text-green-500 font-medium" }, "20%"),
                      createVNode("span", { class: "text-muted-foreground ml-1" }, "vs last month")
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$w), { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$x), null, {
                    default: withCtx(() => [
                      createTextVNode("Points Redeemed")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(MoreVertical), { class: "h-4 w-4 text-muted-foreground" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$y), null, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-4xl font-bold" }, "316"),
                  createVNode("div", { class: "flex items-center pt-4 text-sm" }, [
                    createVNode(unref(ArrowUp), { class: "mr-1 h-4 w-4 text-green-500" }),
                    createVNode("span", { class: "text-green-500 font-medium" }, "20%"),
                    createVNode("span", { class: "text-muted-foreground ml-1" }, "vs last month")
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div>`);
      _push(ssrRenderComponent(unref(_sfc_main$v), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$w), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$x), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Total customer`);
                      } else {
                        return [
                          createTextVNode("Total customer")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$x), null, {
                      default: withCtx(() => [
                        createTextVNode("Total customer")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$y), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$z), {
                    data: lineChartData,
                    index: "month",
                    categories: ["2023", "2024", "2025"],
                    colors: ["#8b6f4e", "#e0c4a8", "#d28c45"],
                    "y-formatter": (_tick, _i, _ticks) => {
                      return `${_tick}`;
                    }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$z), {
                      data: lineChartData,
                      index: "month",
                      categories: ["2023", "2024", "2025"],
                      colors: ["#8b6f4e", "#e0c4a8", "#d28c45"],
                      "y-formatter": (_tick, _i, _ticks) => {
                        return `${_tick}`;
                      }
                    }, null, 8, ["y-formatter"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$w), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$x), null, {
                    default: withCtx(() => [
                      createTextVNode("Total customer")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$y), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$z), {
                    data: lineChartData,
                    index: "month",
                    categories: ["2023", "2024", "2025"],
                    colors: ["#8b6f4e", "#e0c4a8", "#d28c45"],
                    "y-formatter": (_tick, _i, _ticks) => {
                      return `${_tick}`;
                    }
                  }, null, 8, ["y-formatter"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></main></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/admin/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
