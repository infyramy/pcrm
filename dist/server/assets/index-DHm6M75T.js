import { defineComponent, ref, computed, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderTeleport } from "vue/server-renderer";
import { useRouter } from "vue-router";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$7 } from "./BreadcrumbSeparator-DiH4M1VE.js";
import { c as _sfc_main$1, d as _sfc_main$2, a as _sfc_main$9, b as _sfc_main$a } from "../entry-server.js";
import { _ as _sfc_main$8 } from "./Label-DfI0N5Qf.js";
import { CircleHelp, ArrowLeft, Check } from "lucide-vue-next";
import "reka-ui";
import "pinia";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "@vueuse/core";
import "@iconify/vue";
import "vue-sonner";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const breadcrumb = [
      { count: 1, label: "Dashboard", action: true, href: "/admin/dashboard" },
      { count: 2, label: "Points", action: false, href: "/" }
    ];
    const currentStep = ref(1);
    const phoneNumber = ref("");
    const receiptNumber = ref("");
    const receiptAmount = ref("");
    const showSuccessModal = ref(false);
    const customerName = ref("Adam Johari");
    const customerPhone = ref("60123456789");
    const currentPoints = ref(5e3);
    const calculatedPoints = computed(() => {
      var _a;
      const amount = parseFloat(
        ((_a = receiptAmount.value) == null ? void 0 : _a.replace(/[^0-9.]/g, "")) || "0"
      );
      return Math.floor(amount / 5);
    });
    function goToStep(step) {
      currentStep.value = step;
    }
    function resetForm() {
      router.push("/admin/dashboard");
    }
    function submitPoints() {
      showSuccessModal.value = true;
    }
    function closeSuccessModal() {
      showSuccessModal.value = false;
      resetForm();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="space-y-6"><header class="flex shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { class: "-ml-1" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        orientation: "vertical",
        class: "mr-2 h-4"
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(breadcrumb, (item) => {
              _push2(ssrRenderComponent(unref(_sfc_main$4), {
                key: item.label
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(_sfc_main$5), { class: "hidden md:block" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (item.action) {
                            _push4(ssrRenderComponent(unref(_sfc_main$6), {
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
                            _push4(ssrRenderComponent(unref(_sfc_main$6), null, {
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
                            item.action ? (openBlock(), createBlock(unref(_sfc_main$6), {
                              key: 0,
                              href: item.href
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.label), 1)
                              ]),
                              _: 2
                            }, 1032, ["href"])) : (openBlock(), createBlock(unref(_sfc_main$6), { key: 1 }, {
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
                      _push3(ssrRenderComponent(unref(_sfc_main$7), { class: "hidden md:block" }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode(unref(_sfc_main$5), { class: "hidden md:block" }, {
                        default: withCtx(() => [
                          item.action ? (openBlock(), createBlock(unref(_sfc_main$6), {
                            key: 0,
                            href: item.href
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])) : (openBlock(), createBlock(unref(_sfc_main$6), { key: 1 }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ]),
                            _: 2
                          }, 1024))
                        ]),
                        _: 2
                      }, 1024),
                      item.count !== breadcrumb.length ? (openBlock(), createBlock(unref(_sfc_main$7), {
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
                  return createVNode(unref(_sfc_main$4), {
                    key: item.label
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), { class: "hidden md:block" }, {
                        default: withCtx(() => [
                          item.action ? (openBlock(), createBlock(unref(_sfc_main$6), {
                            key: 0,
                            href: item.href
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ]),
                            _: 2
                          }, 1032, ["href"])) : (openBlock(), createBlock(unref(_sfc_main$6), { key: 1 }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.label), 1)
                            ]),
                            _: 2
                          }, 1024))
                        ]),
                        _: 2
                      }, 1024),
                      item.count !== breadcrumb.length ? (openBlock(), createBlock(unref(_sfc_main$7), {
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
      _push(`</div></header><main class="max-w-lg mx-auto"><h1 class="text-2xl font-semibold mb-6">Add Loyalty Points</h1>`);
      if (currentStep.value === 1) {
        _push(`<div class="space-y-6"><div><p class="text-lg text-gray-700 mb-6"> Step 1 — Enter customer&#39;s phone number to select. </p>`);
        _push(ssrRenderComponent(unref(_sfc_main$8), {
          for: "phone",
          class: "mb-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Phone number`);
            } else {
              return [
                createTextVNode("Phone number")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex mb-6">`);
        _push(ssrRenderComponent(unref(_sfc_main$9), {
          id: "phone",
          modelValue: phoneNumber.value,
          "onUpdate:modelValue": ($event) => phoneNumber.value = $event,
          class: "",
          placeholder: "0123456789"
        }, null, _parent));
        _push(`</div></div><div class="flex space-x-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$a), {
          variant: "outline",
          class: "w-full md:w-32",
          onClick: resetForm
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Cancel `);
            } else {
              return [
                createTextVNode(" Cancel ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$a), {
          class: "w-full md:flex-1 bg-[#d9a779] hover:bg-[#c69668]",
          onClick: ($event) => goToStep(2),
          disabled: !phoneNumber.value
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Continue `);
            } else {
              return [
                createTextVNode(" Continue ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      if (currentStep.value === 2) {
        _push(`<div class="space-y-6"><div><h2 class="text-xl font-semibold mb-2">Enter details</h2><p class="text-gray-600 mb-6"> Now enter the details and please check before continue. </p><div class="flex items-center p-4 border rounded-md mb-6"><div class="w-10 h-10 flex items-center justify-center bg-[#f8f0e7] text-[#d9a779] rounded-md mr-4"><span class="text-lg font-semibold">AJ</span></div><div class="flex-1"><div class="font-medium">${ssrInterpolate(customerName.value)}</div><div class="text-sm text-gray-500">+${ssrInterpolate(customerPhone.value)}</div></div><div class="text-right"><div class="text-sm text-gray-500">Current</div><div class="font-medium">${ssrInterpolate(currentPoints.value)} pts</div></div></div><div class="mb-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$8), {
          for: "receipt",
          class: "mb-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Receipt no.`);
            } else {
              return [
                createTextVNode("Receipt no.")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="relative">`);
        _push(ssrRenderComponent(unref(_sfc_main$9), {
          id: "receipt",
          modelValue: receiptNumber.value,
          "onUpdate:modelValue": ($event) => receiptNumber.value = $event,
          class: "w-full",
          placeholder: "#HS23234231123"
        }, null, _parent));
        _push(ssrRenderComponent(unref(CircleHelp), { class: "absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" }, null, _parent));
        _push(`</div></div><div class="mb-2">`);
        _push(ssrRenderComponent(unref(_sfc_main$8), {
          for: "amount",
          class: "mb-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Amount on receipt`);
            } else {
              return [
                createTextVNode("Amount on receipt")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="relative">`);
        _push(ssrRenderComponent(unref(_sfc_main$9), {
          id: "amount",
          modelValue: receiptAmount.value,
          "onUpdate:modelValue": ($event) => receiptAmount.value = $event,
          class: "w-full",
          placeholder: "RM 100.00"
        }, null, _parent));
        _push(`</div></div><p class="text-sm text-gray-500 italic mb-4"> Customers earn 1 point for every RM5 spent. </p><div class="bg-[#f8f0e7] p-4 rounded-md text-center mb-6"><p class="text-gray-800">${ssrInterpolate(customerName.value)} earned <span class="font-semibold">${ssrInterpolate(calculatedPoints.value)} points</span>, redeemable for <span class="font-semibold">RM ${ssrInterpolate((calculatedPoints.value * 0.01).toFixed(2))}</span></p></div></div><div class="flex space-x-4">`);
        _push(ssrRenderComponent(unref(_sfc_main$a), {
          variant: "outline",
          class: "w-full md:w-32 flex items-center justify-center",
          onClick: ($event) => goToStep(1)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ArrowLeft), { class: "h-4 w-4 mr-2" }, null, _parent2, _scopeId));
              _push2(` Back `);
            } else {
              return [
                createVNode(unref(ArrowLeft), { class: "h-4 w-4 mr-2" }),
                createTextVNode(" Back ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(unref(_sfc_main$a), {
          class: "w-full md:flex-1 bg-[#d9a779] hover:bg-[#c69668]",
          onClick: submitPoints,
          disabled: !receiptNumber.value || !receiptAmount.value
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Continue `);
            } else {
              return [
                createTextVNode(" Continue ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</main></div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (showSuccessModal.value) {
          _push2(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white rounded-lg max-w-md w-full p-6 mx-4"><div class="text-center"><div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">`);
          _push2(ssrRenderComponent(unref(Check), { class: "h-8 w-8 text-green-500" }, null, _parent));
          _push2(`</div><h3 class="text-xl font-semibold mb-2"> Successfully added points! </h3><p class="text-gray-600 mb-6"><span class="font-semibold">${ssrInterpolate(calculatedPoints.value)}</span> points has been added to <span class="font-semibold">${ssrInterpolate(customerName.value)}&#39;s</span> account. </p>`);
          _push2(ssrRenderComponent(unref(_sfc_main$a), {
            variant: "outline",
            class: "w-full",
            onClick: closeSuccessModal
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(` OK `);
              } else {
                return [
                  createTextVNode(" OK ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push2(`</div></div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/admin/points/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
