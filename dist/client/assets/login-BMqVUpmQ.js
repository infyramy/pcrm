import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent } from "vue/server-renderer";
import { u as useAuthStore, a as _imports_0, b as _sfc_main$7, d as _sfc_main$8 } from "./App-B441prsD.js";
import { useRouter } from "vue-router";
import { _ as _sfc_main$1, a as _sfc_main$2, b as _sfc_main$3, c as _sfc_main$4, d as _sfc_main$5 } from "./CardTitle-CBMkY7R9.js";
import { _ as _sfc_main$6 } from "./Label-C1dzj2Ez.js";
import { toast } from "vue-sonner";
import "pinia";
import "lucide-vue-next";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
import "reka-ui";
import "@vueuse/core";
import "@iconify/vue";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const authStore = useAuthStore();
    const email = ref("");
    const password = ref("");
    const isSubmitting = ref(false);
    async function handleSubmit() {
      var _a, _b;
      if (!email.value || !password.value) {
        toast.error("Please fill in all fields");
        return;
      }
      try {
        isSubmitting.value = true;
        await authStore.login({
          email: email.value,
          password: password.value
        });
        console.log("authStore: ", authStore);
        console.log("authStore user_type: ", (_a = authStore.user) == null ? void 0 : _a.user_type);
        if (((_b = authStore.user) == null ? void 0 : _b.user_type) == "superadmin") {
          console.log("Masuk superadmin");
          router.push("/admin/dashboard");
        } else {
          console.log("Masuk else");
          router.push("/dashboard");
        }
      } catch (error) {
        toast.error(authStore.error || "Invalid email or password");
      } finally {
        isSubmitting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10" }, _attrs))}><div class="flex w-full max-w-sm flex-col gap-6"><a href="#" class="flex items-center gap-2 self-center font-medium"><img${ssrRenderAttr("src", _imports_0)} alt="Bemobile Logo" class="h-20 w-auto"></a><div class="flex flex-col gap-6">`);
      _push(ssrRenderComponent(unref(_sfc_main$1), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$2), { class: "text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$3), { class: "text-xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Welcome back `);
                      } else {
                        return [
                          createTextVNode(" Welcome back ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$4), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Login with your He&amp;She account `);
                      } else {
                        return [
                          createTextVNode(" Login with your He&She account ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$3), { class: "text-xl" }, {
                      default: withCtx(() => [
                        createTextVNode(" Welcome back ")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$4), null, {
                      default: withCtx(() => [
                        createTextVNode(" Login with your He&She account ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$5), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<form${_scopeId2}><div class="grid gap-6"${_scopeId2}><div class=""${_scopeId2}><form class="grid gap-6"${_scopeId2}><div class="grid gap-2"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { "html-for": "email" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Email / Username`);
                      } else {
                        return [
                          createTextVNode("Email / Username")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "email",
                    type: "text",
                    modelValue: email.value,
                    "onUpdate:modelValue": ($event) => email.value = $event,
                    placeholder: "m@example.com",
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div class="grid gap-2"${_scopeId2}><div class="flex items-center"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$6), { "html-for": "password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Password`);
                      } else {
                        return [
                          createTextVNode("Password")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<a href="#" tabindex="-1" class="ml-auto text-sm underline-offset-4 hover:underline"${_scopeId2}> Forgot your password? </a></div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$7), {
                    id: "password",
                    type: "password",
                    modelValue: password.value,
                    "onUpdate:modelValue": ($event) => password.value = $event,
                    required: ""
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    type: "submit",
                    class: "w-full",
                    disabled: isSubmitting.value
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Login `);
                      } else {
                        return [
                          createTextVNode(" Login ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form></div></div></form>`);
                } else {
                  return [
                    createVNode("form", null, [
                      createVNode("div", { class: "grid gap-6" }, [
                        createVNode("div", { class: "" }, [
                          createVNode("form", {
                            onSubmit: withModifiers(handleSubmit, ["prevent"]),
                            class: "grid gap-6"
                          }, [
                            createVNode("div", { class: "grid gap-2" }, [
                              createVNode(unref(_sfc_main$6), { "html-for": "email" }, {
                                default: withCtx(() => [
                                  createTextVNode("Email / Username")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$7), {
                                id: "email",
                                type: "text",
                                modelValue: email.value,
                                "onUpdate:modelValue": ($event) => email.value = $event,
                                placeholder: "m@example.com",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode("div", { class: "grid gap-2" }, [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode(unref(_sfc_main$6), { "html-for": "password" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Password")
                                  ]),
                                  _: 1
                                }),
                                createVNode("a", {
                                  href: "#",
                                  tabindex: "-1",
                                  class: "ml-auto text-sm underline-offset-4 hover:underline"
                                }, " Forgot your password? ")
                              ]),
                              createVNode(unref(_sfc_main$7), {
                                id: "password",
                                type: "password",
                                modelValue: password.value,
                                "onUpdate:modelValue": ($event) => password.value = $event,
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode(unref(_sfc_main$8), {
                              type: "submit",
                              class: "w-full",
                              disabled: isSubmitting.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Login ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ], 32)
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$2), { class: "text-center" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$3), { class: "text-xl" }, {
                    default: withCtx(() => [
                      createTextVNode(" Welcome back ")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$4), null, {
                    default: withCtx(() => [
                      createTextVNode(" Login with your He&She account ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$5), null, {
                default: withCtx(() => [
                  createVNode("form", null, [
                    createVNode("div", { class: "grid gap-6" }, [
                      createVNode("div", { class: "" }, [
                        createVNode("form", {
                          onSubmit: withModifiers(handleSubmit, ["prevent"]),
                          class: "grid gap-6"
                        }, [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(unref(_sfc_main$6), { "html-for": "email" }, {
                              default: withCtx(() => [
                                createTextVNode("Email / Username")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$7), {
                              id: "email",
                              type: "text",
                              modelValue: email.value,
                              "onUpdate:modelValue": ($event) => email.value = $event,
                              placeholder: "m@example.com",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode(unref(_sfc_main$6), { "html-for": "password" }, {
                                default: withCtx(() => [
                                  createTextVNode("Password")
                                ]),
                                _: 1
                              }),
                              createVNode("a", {
                                href: "#",
                                tabindex: "-1",
                                class: "ml-auto text-sm underline-offset-4 hover:underline"
                              }, " Forgot your password? ")
                            ]),
                            createVNode(unref(_sfc_main$7), {
                              id: "password",
                              type: "password",
                              modelValue: password.value,
                              "onUpdate:modelValue": ($event) => password.value = $event,
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(unref(_sfc_main$8), {
                            type: "submit",
                            class: "w-full",
                            disabled: isSubmitting.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Login ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ], 32)
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="text-balance text-center text-xs text-muted-foreground [&amp;_a]:underline [&amp;_a]:underline-offset-4 [&amp;_a]:hover:text-primary"> By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>. </div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
