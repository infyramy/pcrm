import { defineComponent, unref, mergeProps, withCtx, renderSlot, useSSRContext, computed, createVNode, ref, createTextVNode, toDisplayString, createBlock, openBlock, createCommentVNode, Fragment, renderList } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$7, a as _sfc_main$8, b as _sfc_main$9, c as _sfc_main$a, d as _sfc_main$b } from "./BreadcrumbSeparator-EF14FTrJ.js";
import { g as cn, e as _sfc_main$5, f as _sfc_main$6, b as _sfc_main$d, d as _sfc_main$j } from "./App-B441prsD.js";
import { useForwardPropsEmits, TabsRoot, TabsContent, TabsList, useForwardProps, TabsTrigger } from "reka-ui";
import { _ as _sfc_main$c } from "./Label-C1dzj2Ez.js";
import { _ as _sfc_main$e, a as _sfc_main$f, b as _sfc_main$g, c as _sfc_main$h, f as _sfc_main$i } from "./SelectValue-C-A7JiIp.js";
import { Upload } from "lucide-vue-next";
import "vue-router";
import "pinia";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "@iconify/vue";
import "vue-sonner";
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Tabs",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    orientation: {},
    dir: {},
    activationMode: {},
    modelValue: {},
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsRoot), mergeProps(unref(forwarded), _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tabs/Tabs.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TabsContent",
  __ssrInlineRender: true,
  props: {
    value: {},
    forceMount: { type: Boolean },
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsContent), mergeProps({
        class: unref(cn)("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", props.class)
      }, delegatedProps.value, _attrs), {
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tabs/TabsContent.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TabsList",
  __ssrInlineRender: true,
  props: {
    loop: { type: Boolean },
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TabsList), mergeProps(delegatedProps.value, {
        class: unref(cn)(
          "inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
          props.class
        )
      }, _attrs), {
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tabs/TabsList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TabsTrigger",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
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
      _push(ssrRenderComponent(unref(TabsTrigger), mergeProps(unref(forwardedProps), {
        class: unref(cn)(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="truncate"${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</span>`);
          } else {
            return [
              createVNode("span", { class: "truncate" }, [
                renderSlot(_ctx.$slots, "default")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tabs/TabsTrigger.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumb = [{ count: 1, label: "Settings", action: false, href: "/" }];
    const fileInput = ref(null);
    const logoInput = ref(null);
    const profile = ref({
      name: "Alif Irfan",
      countryCode: "+60",
      phone: "1234567898",
      profileImage: null
    });
    const generalSettings = ref({
      systemName: "He & She Loyalty System",
      systemLogo: null,
      pointsPerRM: 1,
      rmValue: 1,
      pointsRedemption: 10,
      redemptionValue: 1,
      minPoints: 50
    });
    const handleImageUpload = () => {
      var _a;
      (_a = fileInput.value) == null ? void 0 : _a.click();
    };
    const onFileChange = (event) => {
      const input = event.target;
      if (input.files && input.files.length > 0) {
        profile.value.profileImage = input.files[0];
      }
    };
    const handleLogoUpload = () => {
      var _a;
      (_a = logoInput.value) == null ? void 0 : _a.click();
    };
    const onLogoChange = (event) => {
      const input = event.target;
      if (input.files && input.files.length > 0) {
        generalSettings.value.systemLogo = input.files[0];
      }
    };
    const saveProfile = () => {
      console.log("Saving profile:", profile.value);
    };
    const saveGeneralSettings = () => {
      console.log("Saving general settings:", generalSettings.value);
    };
    const resetForm = () => {
      profile.value = {
        name: "Alif Irfan",
        countryCode: "+60",
        phone: "1234567898",
        profileImage: null
      };
    };
    const resetGeneralSettings = () => {
      generalSettings.value = {
        systemName: "He & She Loyalty System",
        systemLogo: null,
        pointsPerRM: 1,
        rmValue: 1,
        pointsRedemption: 10,
        redemptionValue: 1,
        minPoints: 50
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="space-y-6"><header class="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$5), { class: "-ml-1" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$6), {
        orientation: "vertical",
        class: "mr-2 h-4"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$7), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(breadcrumb, (item) => {
              _push2(ssrRenderComponent(unref(_sfc_main$8), {
                key: item.label
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$9), { class: "hidden md:block" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (item.action) {
                            _push4(ssrRenderComponent(unref(_sfc_main$a), {
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
                            _push4(ssrRenderComponent(unref(_sfc_main$a), null, {
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
                            item.action ? (openBlock(), createBlock(unref(_sfc_main$a), {
                              key: 0,
                              href: item.href
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.label), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])) : (openBlock(), createBlock(unref(_sfc_main$a), { key: 1 }, {
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
                      _push3(ssrRenderComponent(unref(_sfc_main$b), { class: "hidden md:block" }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode(unref(_sfc_main$9), { class: "hidden md:block" }, {
                        default: withCtx(() => [
                          item.action ? (openBlock(), createBlock(unref(_sfc_main$a), {
                            key: 0,
                            href: item.href
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])) : (openBlock(), createBlock(unref(_sfc_main$a), { key: 1 }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ]),
                            _: 2
                          }, 1024))
                        ]),
                        _: 2
                      }, 1024),
                      item.count !== breadcrumb.length ? (openBlock(), createBlock(unref(_sfc_main$b), {
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
                  return createVNode(unref(_sfc_main$8), {
                    key: item.label
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$9), { class: "hidden md:block" }, {
                        default: withCtx(() => [
                          item.action ? (openBlock(), createBlock(unref(_sfc_main$a), {
                            key: 0,
                            href: item.href
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])) : (openBlock(), createBlock(unref(_sfc_main$a), { key: 1 }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ]),
                            _: 2
                          }, 1024))
                        ]),
                        _: 2
                      }, 1024),
                      item.count !== breadcrumb.length ? (openBlock(), createBlock(unref(_sfc_main$b), {
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
      _push(`</div></header><main>`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        "default-value": "profile",
        class: "w-full"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "mb-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$1), { value: "profile" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`My Profile`);
                      } else {
                        return [
                          createTextVNode("My Profile")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), { value: "general" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`General Settings`);
                      } else {
                        return [
                          createTextVNode("General Settings")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), { value: "points" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Points Configuration`);
                      } else {
                        return [
                          createTextVNode("Points Configuration")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$1), { value: "notifications" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Notifications`);
                      } else {
                        return [
                          createTextVNode("Notifications")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$1), { value: "profile" }, {
                      default: withCtx(() => [
                        createTextVNode("My Profile")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), { value: "general" }, {
                      default: withCtx(() => [
                        createTextVNode("General Settings")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), { value: "points" }, {
                      default: withCtx(() => [
                        createTextVNode("Points Configuration")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$1), { value: "notifications" }, {
                      default: withCtx(() => [
                        createTextVNode("Notifications")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), { value: "profile" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-8"${_scopeId2}><div${_scopeId2}><h2 class="text-xl font-semibold"${_scopeId2}>Personal info</h2><p class="text-muted-foreground"${_scopeId2}>Update your photo and personal details here.</p></div><div class="space-y-6"${_scopeId2}><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { "html-for": "name" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Name`);
                      } else {
                        return [
                          createTextVNode("Name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    id: "name",
                    modelValue: profile.value.name,
                    "onUpdate:modelValue": ($event) => profile.value.name = $event,
                    placeholder: "Your name"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { "html-for": "phone" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Phone number`);
                      } else {
                        return [
                          createTextVNode("Phone number")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$e), {
                    modelValue: profile.value.countryCode,
                    "onUpdate:modelValue": ($event) => profile.value.countryCode = $event,
                    class: "w-24"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$f), { class: "rounded-r-none border-r-0" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$g), { placeholder: "+60" }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$g), { placeholder: "+60" })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$h), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$i), { value: "+60" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`+60`);
                                  } else {
                                    return [
                                      createTextVNode("+60")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$i), { value: "+65" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`+65`);
                                  } else {
                                    return [
                                      createTextVNode("+65")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$i), { value: "+1" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`+1`);
                                  } else {
                                    return [
                                      createTextVNode("+1")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$i), { value: "+60" }, {
                                  default: withCtx(() => [
                                    createTextVNode("+60")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$i), { value: "+65" }, {
                                  default: withCtx(() => [
                                    createTextVNode("+65")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$i), { value: "+1" }, {
                                  default: withCtx(() => [
                                    createTextVNode("+1")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$f), { class: "rounded-r-none border-r-0" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$g), { placeholder: "+60" })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$h), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$i), { value: "+60" }, {
                                default: withCtx(() => [
                                  createTextVNode("+60")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$i), { value: "+65" }, {
                                default: withCtx(() => [
                                  createTextVNode("+65")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$i), { value: "+1" }, {
                                default: withCtx(() => [
                                  createTextVNode("+1")
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    id: "phone",
                    modelValue: profile.value.phone,
                    "onUpdate:modelValue": ($event) => profile.value.phone = $event,
                    class: "flex-1 rounded-l-none",
                    placeholder: "Your phone number"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div></div><div class="space-y-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Profile image`);
                      } else {
                        return [
                          createTextVNode("Profile image")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"${_scopeId2}><div class="flex flex-col items-center space-y-2"${_scopeId2}><div class="text-muted-foreground"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Upload), { class: "h-6 w-6 mb-2" }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="text-center"${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>Click to upload</p><p class="text-xs text-muted-foreground"${_scopeId2}>or drag and drop</p></div><p class="text-xs text-muted-foreground"${_scopeId2}>SVG, PNG, JPG or GIF (max. 800×400px)</p></div><input type="file" class="hidden" accept="image/svg+xml,image/png,image/jpeg,image/gif"${_scopeId2}></div></div></div><div class="flex justify-end space-x-4 mt-8 pt-4 border-t"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$j), {
                    variant: "outline",
                    onClick: resetForm
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cancel`);
                      } else {
                        return [
                          createTextVNode("Cancel")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$j), { onClick: saveProfile }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Save`);
                      } else {
                        return [
                          createTextVNode("Save")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-8" }, [
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-xl font-semibold" }, "Personal info"),
                        createVNode("p", { class: "text-muted-foreground" }, "Update your photo and personal details here.")
                      ]),
                      createVNode("div", { class: "space-y-6" }, [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$c), { "html-for": "name" }, {
                            default: withCtx(() => [
                              createTextVNode("Name")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$d), {
                            id: "name",
                            modelValue: profile.value.name,
                            "onUpdate:modelValue": ($event) => profile.value.name = $event,
                            placeholder: "Your name"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$c), { "html-for": "phone" }, {
                            default: withCtx(() => [
                              createTextVNode("Phone number")
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "flex" }, [
                            createVNode(unref(_sfc_main$e), {
                              modelValue: profile.value.countryCode,
                              "onUpdate:modelValue": ($event) => profile.value.countryCode = $event,
                              class: "w-24"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$f), { class: "rounded-r-none border-r-0" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$g), { placeholder: "+60" })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$h), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$i), { value: "+60" }, {
                                      default: withCtx(() => [
                                        createTextVNode("+60")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$i), { value: "+65" }, {
                                      default: withCtx(() => [
                                        createTextVNode("+65")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$i), { value: "+1" }, {
                                      default: withCtx(() => [
                                        createTextVNode("+1")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(unref(_sfc_main$d), {
                              id: "phone",
                              modelValue: profile.value.phone,
                              "onUpdate:modelValue": ($event) => profile.value.phone = $event,
                              class: "flex-1 rounded-l-none",
                              placeholder: "Your phone number"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ]),
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(unref(_sfc_main$c), null, {
                            default: withCtx(() => [
                              createTextVNode("Profile image")
                            ]),
                            _: 1
                          }),
                          createVNode("div", {
                            class: "border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors",
                            onClick: handleImageUpload
                          }, [
                            createVNode("div", { class: "flex flex-col items-center space-y-2" }, [
                              createVNode("div", { class: "text-muted-foreground" }, [
                                createVNode(unref(Upload), { class: "h-6 w-6 mb-2" })
                              ]),
                              createVNode("div", { class: "text-center" }, [
                                createVNode("p", { class: "text-sm font-medium" }, "Click to upload"),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, "or drag and drop")
                              ]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, "SVG, PNG, JPG or GIF (max. 800×400px)")
                            ]),
                            createVNode("input", {
                              type: "file",
                              class: "hidden",
                              ref_key: "fileInput",
                              ref: fileInput,
                              accept: "image/svg+xml,image/png,image/jpeg,image/gif",
                              onChange: onFileChange
                            }, null, 544)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-4 mt-8 pt-4 border-t" }, [
                        createVNode(unref(_sfc_main$j), {
                          variant: "outline",
                          onClick: resetForm
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), { onClick: saveProfile }, {
                          default: withCtx(() => [
                            createTextVNode("Save")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), { value: "general" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="space-y-8"${_scopeId2}><div${_scopeId2}><h2 class="text-xl font-semibold"${_scopeId2}>General Settings</h2><p class="text-muted-foreground"${_scopeId2}>Update your photo and personal details here.</p></div><div class="space-y-8"${_scopeId2}><div class="space-y-2 pt-4 border-t"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { "html-for": "systemName" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`System Name`);
                      } else {
                        return [
                          createTextVNode("System Name")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    id: "systemName",
                    modelValue: generalSettings.value.systemName,
                    "onUpdate:modelValue": ($event) => generalSettings.value.systemName = $event,
                    placeholder: "Enter system name"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="space-y-2 pt-4 border-t"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`System Logo`);
                      } else {
                        return [
                          createTextVNode("System Logo")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"${_scopeId2}><div class="flex flex-col items-center space-y-2"${_scopeId2}><div class="text-muted-foreground"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(Upload), { class: "h-6 w-6 mb-2" }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="text-center"${_scopeId2}><p class="text-amber-600 font-medium"${_scopeId2}>Click to upload</p><p class="text-xs text-muted-foreground"${_scopeId2}>or drag and drop</p></div><p class="text-xs text-muted-foreground"${_scopeId2}>SVG, PNG, JPG or GIF (max. 800×400px)</p></div><input type="file" class="hidden" accept="image/svg+xml,image/png,image/jpeg,image/gif"${_scopeId2}></div></div></div><div class="space-y-8 pt-8 border-t"${_scopeId2}><div${_scopeId2}><h2 class="text-xl font-semibold"${_scopeId2}>Points Configuration</h2><p class="text-muted-foreground"${_scopeId2}>Customize your points settings to manage how customers earn and redeem points.</p></div><div class="space-y-2 pt-4 border-t"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Points Awarded per RM Spent`);
                      } else {
                        return [
                          createTextVNode("Points Awarded per RM Spent")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>Adjust how many points customers earn per RM spent.</p><div class="flex items-center gap-4 mt-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    modelValue: generalSettings.value.pointsPerRM,
                    "onUpdate:modelValue": ($event) => generalSettings.value.pointsPerRM = $event,
                    type: "number",
                    class: "w-24"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>point(s) for ever</span><div class="relative flex items-center"${_scopeId2}><span class="absolute left-3 text-muted-foreground"${_scopeId2}>RM</span>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    modelValue: generalSettings.value.rmValue,
                    "onUpdate:modelValue": ($event) => generalSettings.value.rmValue = $event,
                    type: "number",
                    class: "pl-10 w-28"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><span${_scopeId2}>spent</span></div><p class="text-xs text-muted-foreground mt-1"${_scopeId2}>Recommended is 1 point per RM.</p></div><div class="space-y-2 pt-4 border-t"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Points Redemption Ratio`);
                      } else {
                        return [
                          createTextVNode("Points Redemption Ratio")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>Set the value of points when customers redeem points.</p><div class="flex items-center gap-4 mt-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    modelValue: generalSettings.value.pointsRedemption,
                    "onUpdate:modelValue": ($event) => generalSettings.value.pointsRedemption = $event,
                    type: "number",
                    class: "w-24"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>point(s) for</span><div class="relative flex items-center"${_scopeId2}><span class="absolute left-3 text-muted-foreground"${_scopeId2}>RM</span>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    modelValue: generalSettings.value.redemptionValue,
                    "onUpdate:modelValue": ($event) => generalSettings.value.redemptionValue = $event,
                    type: "number",
                    step: "0.01",
                    class: "pl-10 w-28"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><span${_scopeId2}>discount</span></div><p class="text-xs text-muted-foreground mt-1"${_scopeId2}>Recommended ratio is 10 points per RM1.</p></div><div class="space-y-2 pt-4 border-t"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Minimum Points Required`);
                      } else {
                        return [
                          createTextVNode("Minimum Points Required")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}>Set minimum points customers need before redemption is allowed.</p><div class="flex items-center gap-4 mt-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$d), {
                    modelValue: generalSettings.value.minPoints,
                    "onUpdate:modelValue": ($event) => generalSettings.value.minPoints = $event,
                    type: "number",
                    class: "w-24"
                  }, null, _parent3, _scopeId2));
                  _push3(`<span${_scopeId2}>point(s) required to redeem</span></div><p class="text-xs text-muted-foreground mt-1"${_scopeId2}>Recommended minimum is 50.</p></div></div><div class="flex justify-end space-x-4 mt-8 pt-4 border-t"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$j), {
                    variant: "outline",
                    onClick: resetGeneralSettings
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Cancel`);
                      } else {
                        return [
                          createTextVNode("Cancel")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$j), { onClick: saveGeneralSettings }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Save`);
                      } else {
                        return [
                          createTextVNode("Save")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "space-y-8" }, [
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-xl font-semibold" }, "General Settings"),
                        createVNode("p", { class: "text-muted-foreground" }, "Update your photo and personal details here.")
                      ]),
                      createVNode("div", { class: "space-y-8" }, [
                        createVNode("div", { class: "space-y-2 pt-4 border-t" }, [
                          createVNode(unref(_sfc_main$c), { "html-for": "systemName" }, {
                            default: withCtx(() => [
                              createTextVNode("System Name")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$d), {
                            id: "systemName",
                            modelValue: generalSettings.value.systemName,
                            "onUpdate:modelValue": ($event) => generalSettings.value.systemName = $event,
                            placeholder: "Enter system name"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "space-y-2 pt-4 border-t" }, [
                          createVNode(unref(_sfc_main$c), null, {
                            default: withCtx(() => [
                              createTextVNode("System Logo")
                            ]),
                            _: 1
                          }),
                          createVNode("div", {
                            class: "border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors",
                            onClick: handleLogoUpload
                          }, [
                            createVNode("div", { class: "flex flex-col items-center space-y-2" }, [
                              createVNode("div", { class: "text-muted-foreground" }, [
                                createVNode(unref(Upload), { class: "h-6 w-6 mb-2" })
                              ]),
                              createVNode("div", { class: "text-center" }, [
                                createVNode("p", { class: "text-amber-600 font-medium" }, "Click to upload"),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, "or drag and drop")
                              ]),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, "SVG, PNG, JPG or GIF (max. 800×400px)")
                            ]),
                            createVNode("input", {
                              type: "file",
                              class: "hidden",
                              ref_key: "logoInput",
                              ref: logoInput,
                              accept: "image/svg+xml,image/png,image/jpeg,image/gif",
                              onChange: onLogoChange
                            }, null, 544)
                          ])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-8 pt-8 border-t" }, [
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-xl font-semibold" }, "Points Configuration"),
                          createVNode("p", { class: "text-muted-foreground" }, "Customize your points settings to manage how customers earn and redeem points.")
                        ]),
                        createVNode("div", { class: "space-y-2 pt-4 border-t" }, [
                          createVNode(unref(_sfc_main$c), null, {
                            default: withCtx(() => [
                              createTextVNode("Points Awarded per RM Spent")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Adjust how many points customers earn per RM spent."),
                          createVNode("div", { class: "flex items-center gap-4 mt-2" }, [
                            createVNode(unref(_sfc_main$d), {
                              modelValue: generalSettings.value.pointsPerRM,
                              "onUpdate:modelValue": ($event) => generalSettings.value.pointsPerRM = $event,
                              type: "number",
                              class: "w-24"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("span", null, "point(s) for ever"),
                            createVNode("div", { class: "relative flex items-center" }, [
                              createVNode("span", { class: "absolute left-3 text-muted-foreground" }, "RM"),
                              createVNode(unref(_sfc_main$d), {
                                modelValue: generalSettings.value.rmValue,
                                "onUpdate:modelValue": ($event) => generalSettings.value.rmValue = $event,
                                type: "number",
                                class: "pl-10 w-28"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("span", null, "spent")
                          ]),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Recommended is 1 point per RM.")
                        ]),
                        createVNode("div", { class: "space-y-2 pt-4 border-t" }, [
                          createVNode(unref(_sfc_main$c), null, {
                            default: withCtx(() => [
                              createTextVNode("Points Redemption Ratio")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Set the value of points when customers redeem points."),
                          createVNode("div", { class: "flex items-center gap-4 mt-2" }, [
                            createVNode(unref(_sfc_main$d), {
                              modelValue: generalSettings.value.pointsRedemption,
                              "onUpdate:modelValue": ($event) => generalSettings.value.pointsRedemption = $event,
                              type: "number",
                              class: "w-24"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("span", null, "point(s) for"),
                            createVNode("div", { class: "relative flex items-center" }, [
                              createVNode("span", { class: "absolute left-3 text-muted-foreground" }, "RM"),
                              createVNode(unref(_sfc_main$d), {
                                modelValue: generalSettings.value.redemptionValue,
                                "onUpdate:modelValue": ($event) => generalSettings.value.redemptionValue = $event,
                                type: "number",
                                step: "0.01",
                                class: "pl-10 w-28"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("span", null, "discount")
                          ]),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Recommended ratio is 10 points per RM1.")
                        ]),
                        createVNode("div", { class: "space-y-2 pt-4 border-t" }, [
                          createVNode(unref(_sfc_main$c), null, {
                            default: withCtx(() => [
                              createTextVNode("Minimum Points Required")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, "Set minimum points customers need before redemption is allowed."),
                          createVNode("div", { class: "flex items-center gap-4 mt-2" }, [
                            createVNode(unref(_sfc_main$d), {
                              modelValue: generalSettings.value.minPoints,
                              "onUpdate:modelValue": ($event) => generalSettings.value.minPoints = $event,
                              type: "number",
                              class: "w-24"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode("span", null, "point(s) required to redeem")
                          ]),
                          createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Recommended minimum is 50.")
                        ])
                      ]),
                      createVNode("div", { class: "flex justify-end space-x-4 mt-8 pt-4 border-t" }, [
                        createVNode(unref(_sfc_main$j), {
                          variant: "outline",
                          onClick: resetGeneralSettings
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), { onClick: saveGeneralSettings }, {
                          default: withCtx(() => [
                            createTextVNode("Save")
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), { value: "points" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4 border rounded-md"${_scopeId2}> Points configuration content </div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 border rounded-md" }, " Points configuration content ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$3), { value: "notifications" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="p-4 border rounded-md"${_scopeId2}> Notifications content </div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-4 border rounded-md" }, " Notifications content ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "mb-6" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$1), { value: "profile" }, {
                    default: withCtx(() => [
                      createTextVNode("My Profile")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$1), { value: "general" }, {
                    default: withCtx(() => [
                      createTextVNode("General Settings")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$1), { value: "points" }, {
                    default: withCtx(() => [
                      createTextVNode("Points Configuration")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$1), { value: "notifications" }, {
                    default: withCtx(() => [
                      createTextVNode("Notifications")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$3), { value: "profile" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-8" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-xl font-semibold" }, "Personal info"),
                      createVNode("p", { class: "text-muted-foreground" }, "Update your photo and personal details here.")
                    ]),
                    createVNode("div", { class: "space-y-6" }, [
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$c), { "html-for": "name" }, {
                          default: withCtx(() => [
                            createTextVNode("Name")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$d), {
                          id: "name",
                          modelValue: profile.value.name,
                          "onUpdate:modelValue": ($event) => profile.value.name = $event,
                          placeholder: "Your name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$c), { "html-for": "phone" }, {
                          default: withCtx(() => [
                            createTextVNode("Phone number")
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex" }, [
                          createVNode(unref(_sfc_main$e), {
                            modelValue: profile.value.countryCode,
                            "onUpdate:modelValue": ($event) => profile.value.countryCode = $event,
                            class: "w-24"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$f), { class: "rounded-r-none border-r-0" }, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$g), { placeholder: "+60" })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$i), { value: "+60" }, {
                                    default: withCtx(() => [
                                      createTextVNode("+60")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$i), { value: "+65" }, {
                                    default: withCtx(() => [
                                      createTextVNode("+65")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$i), { value: "+1" }, {
                                    default: withCtx(() => [
                                      createTextVNode("+1")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(unref(_sfc_main$d), {
                            id: "phone",
                            modelValue: profile.value.phone,
                            "onUpdate:modelValue": ($event) => profile.value.phone = $event,
                            class: "flex-1 rounded-l-none",
                            placeholder: "Your phone number"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode(unref(_sfc_main$c), null, {
                          default: withCtx(() => [
                            createTextVNode("Profile image")
                          ]),
                          _: 1
                        }),
                        createVNode("div", {
                          class: "border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors",
                          onClick: handleImageUpload
                        }, [
                          createVNode("div", { class: "flex flex-col items-center space-y-2" }, [
                            createVNode("div", { class: "text-muted-foreground" }, [
                              createVNode(unref(Upload), { class: "h-6 w-6 mb-2" })
                            ]),
                            createVNode("div", { class: "text-center" }, [
                              createVNode("p", { class: "text-sm font-medium" }, "Click to upload"),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, "or drag and drop")
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "SVG, PNG, JPG or GIF (max. 800×400px)")
                          ]),
                          createVNode("input", {
                            type: "file",
                            class: "hidden",
                            ref_key: "fileInput",
                            ref: fileInput,
                            accept: "image/svg+xml,image/png,image/jpeg,image/gif",
                            onChange: onFileChange
                          }, null, 544)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-4 mt-8 pt-4 border-t" }, [
                      createVNode(unref(_sfc_main$j), {
                        variant: "outline",
                        onClick: resetForm
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$j), { onClick: saveProfile }, {
                        default: withCtx(() => [
                          createTextVNode("Save")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$3), { value: "general" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "space-y-8" }, [
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-xl font-semibold" }, "General Settings"),
                      createVNode("p", { class: "text-muted-foreground" }, "Update your photo and personal details here.")
                    ]),
                    createVNode("div", { class: "space-y-8" }, [
                      createVNode("div", { class: "space-y-2 pt-4 border-t" }, [
                        createVNode(unref(_sfc_main$c), { "html-for": "systemName" }, {
                          default: withCtx(() => [
                            createTextVNode("System Name")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$d), {
                          id: "systemName",
                          modelValue: generalSettings.value.systemName,
                          "onUpdate:modelValue": ($event) => generalSettings.value.systemName = $event,
                          placeholder: "Enter system name"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", { class: "space-y-2 pt-4 border-t" }, [
                        createVNode(unref(_sfc_main$c), null, {
                          default: withCtx(() => [
                            createTextVNode("System Logo")
                          ]),
                          _: 1
                        }),
                        createVNode("div", {
                          class: "border border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors",
                          onClick: handleLogoUpload
                        }, [
                          createVNode("div", { class: "flex flex-col items-center space-y-2" }, [
                            createVNode("div", { class: "text-muted-foreground" }, [
                              createVNode(unref(Upload), { class: "h-6 w-6 mb-2" })
                            ]),
                            createVNode("div", { class: "text-center" }, [
                              createVNode("p", { class: "text-amber-600 font-medium" }, "Click to upload"),
                              createVNode("p", { class: "text-xs text-muted-foreground" }, "or drag and drop")
                            ]),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, "SVG, PNG, JPG or GIF (max. 800×400px)")
                          ]),
                          createVNode("input", {
                            type: "file",
                            class: "hidden",
                            ref_key: "logoInput",
                            ref: logoInput,
                            accept: "image/svg+xml,image/png,image/jpeg,image/gif",
                            onChange: onLogoChange
                          }, null, 544)
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "space-y-8 pt-8 border-t" }, [
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-xl font-semibold" }, "Points Configuration"),
                        createVNode("p", { class: "text-muted-foreground" }, "Customize your points settings to manage how customers earn and redeem points.")
                      ]),
                      createVNode("div", { class: "space-y-2 pt-4 border-t" }, [
                        createVNode(unref(_sfc_main$c), null, {
                          default: withCtx(() => [
                            createTextVNode("Points Awarded per RM Spent")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Adjust how many points customers earn per RM spent."),
                        createVNode("div", { class: "flex items-center gap-4 mt-2" }, [
                          createVNode(unref(_sfc_main$d), {
                            modelValue: generalSettings.value.pointsPerRM,
                            "onUpdate:modelValue": ($event) => generalSettings.value.pointsPerRM = $event,
                            type: "number",
                            class: "w-24"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("span", null, "point(s) for ever"),
                          createVNode("div", { class: "relative flex items-center" }, [
                            createVNode("span", { class: "absolute left-3 text-muted-foreground" }, "RM"),
                            createVNode(unref(_sfc_main$d), {
                              modelValue: generalSettings.value.rmValue,
                              "onUpdate:modelValue": ($event) => generalSettings.value.rmValue = $event,
                              type: "number",
                              class: "pl-10 w-28"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("span", null, "spent")
                        ]),
                        createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Recommended is 1 point per RM.")
                      ]),
                      createVNode("div", { class: "space-y-2 pt-4 border-t" }, [
                        createVNode(unref(_sfc_main$c), null, {
                          default: withCtx(() => [
                            createTextVNode("Points Redemption Ratio")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Set the value of points when customers redeem points."),
                        createVNode("div", { class: "flex items-center gap-4 mt-2" }, [
                          createVNode(unref(_sfc_main$d), {
                            modelValue: generalSettings.value.pointsRedemption,
                            "onUpdate:modelValue": ($event) => generalSettings.value.pointsRedemption = $event,
                            type: "number",
                            class: "w-24"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("span", null, "point(s) for"),
                          createVNode("div", { class: "relative flex items-center" }, [
                            createVNode("span", { class: "absolute left-3 text-muted-foreground" }, "RM"),
                            createVNode(unref(_sfc_main$d), {
                              modelValue: generalSettings.value.redemptionValue,
                              "onUpdate:modelValue": ($event) => generalSettings.value.redemptionValue = $event,
                              type: "number",
                              step: "0.01",
                              class: "pl-10 w-28"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("span", null, "discount")
                        ]),
                        createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Recommended ratio is 10 points per RM1.")
                      ]),
                      createVNode("div", { class: "space-y-2 pt-4 border-t" }, [
                        createVNode(unref(_sfc_main$c), null, {
                          default: withCtx(() => [
                            createTextVNode("Minimum Points Required")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, "Set minimum points customers need before redemption is allowed."),
                        createVNode("div", { class: "flex items-center gap-4 mt-2" }, [
                          createVNode(unref(_sfc_main$d), {
                            modelValue: generalSettings.value.minPoints,
                            "onUpdate:modelValue": ($event) => generalSettings.value.minPoints = $event,
                            type: "number",
                            class: "w-24"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode("span", null, "point(s) required to redeem")
                        ]),
                        createVNode("p", { class: "text-xs text-muted-foreground mt-1" }, "Recommended minimum is 50.")
                      ])
                    ]),
                    createVNode("div", { class: "flex justify-end space-x-4 mt-8 pt-4 border-t" }, [
                      createVNode(unref(_sfc_main$j), {
                        variant: "outline",
                        onClick: resetGeneralSettings
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Cancel")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$j), { onClick: saveGeneralSettings }, {
                        default: withCtx(() => [
                          createTextVNode("Save")
                        ]),
                        _: 1
                      })
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$3), { value: "points" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-4 border rounded-md" }, " Points configuration content ")
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$3), { value: "notifications" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "p-4 border rounded-md" }, " Notifications content ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/admin/settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
