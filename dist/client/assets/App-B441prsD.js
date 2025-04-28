import { useRouter, createRouter as createRouter$1, createWebHistory, useRoute } from "vue-router";
import { ref, computed, defineComponent, unref, mergeProps, withCtx, renderSlot, useSSRContext, createVNode, resolveDynamicComponent, createBlock, openBlock, Fragment, createTextVNode, toDisplayString, createCommentVNode, renderList, resolveComponent } from "vue";
import { ssrRenderComponent, ssrRenderSlot, ssrRenderAttrs, ssrRenderClass, ssrGetDynamicModelProps, ssrInterpolate, ssrRenderVNode, ssrRenderAttr, ssrRenderList } from "vue/server-renderer";
import { defineStore } from "pinia";
import { LayoutDashboard, Users, Gift, UserRound, Building, FileText, Settings, X, PanelLeft, Check, Circle, ChevronRight, ChevronsUpDown, Sparkles, BadgeCheck, CreditCard, Bell, LogOut, HelpCircle } from "lucide-vue-next";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Primitive, useForwardPropsEmits, DialogRoot, DialogClose, DialogPortal, DialogOverlay, DialogContent, DialogDescription, DialogTitle, DialogTrigger, createContext, TooltipRoot, TooltipPortal, TooltipContent, TooltipProvider, TooltipTrigger, Separator, CollapsibleRoot, CollapsibleContent, CollapsibleTrigger, AvatarRoot, AvatarFallback, AvatarImage, DropdownMenuRoot, DropdownMenuCheckboxItem, DropdownMenuItemIndicator, DropdownMenuPortal, DropdownMenuContent, DropdownMenuGroup, useForwardProps, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "reka-ui";
import { useVModel, useMediaQuery, useEventListener, useColorMode } from "@vueuse/core";
import { Icon } from "@iconify/vue";
import { Toaster } from "vue-sonner";
const useAuthStore = defineStore("auth", () => {
  const router2 = useRouter();
  const user = ref(null);
  const token = ref(null);
  const isLoading = ref(false);
  const error = ref(null);
  const isAuthenticated = computed(() => !!token.value);
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user.value = JSON.parse(storedUser);
  }
  async function login(credentials) {
    isLoading.value = true;
    error.value = null;
    console.log("credentials: ", credentials);
    try {
      token.value = "laiusldaijbsdljabs;djasd";
      user.value = {
        id: "1",
        email: "admin@heandshe.com",
        username: "admin",
        fullname: "Superadmin",
        user_type: "superadmin",
        avatar: `https://i.pravatar.cc/300`
      };
      if (token.value) {
        localStorage.setItem("auth_token", token.value);
        localStorage.setItem("user", JSON.stringify(user.value));
      }
    } catch (e) {
      console.log("Login error: ", e);
      error.value = e.data.message;
      throw e;
    } finally {
      isLoading.value = false;
    }
  }
  function logout() {
    user.value = null;
    token.value = null;
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    router2.push("/login");
  }
  function init() {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      token.value = storedToken;
    }
  }
  return {
    user,
    token,
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    init
  };
});
function createRouter() {
  const routes = [
    {
      path: "/login",
      name: "login",
      component: () => import("./login-BMqVUpmQ.js"),
      meta: {
        layout: "blank",
        requiresAuth: false
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("./index-CZxzeTmE.js"),
      meta: {
        layout: "dashboard",
        requiresAuth: true
      }
    },
    {
      path: "/",
      redirect: "/dashboard"
    },
    {
      path: "/admin/dashboard",
      name: "admin-dashboard",
      component: () => import("./index-Dt3I5t4-.js"),
      meta: {
        layout: "dashboard",
        requiresAuth: true
      }
    },
    {
      path: "/admin/points",
      name: "admin-points",
      component: () => import("./index-CEMJgti3.js"),
      meta: {
        layout: "dashboard",
        requiresAuth: true
      }
    },
    {
      path: "/admin/customers",
      name: "admin-customers",
      component: () => import("./index-CPI7uImB.js"),
      meta: {
        layout: "dashboard",
        requiresAuth: true
      }
    },
    {
      path: "/admin/loyalty",
      name: "admin-loyalty",
      component: () => import("./index-BVWHghCv.js"),
      meta: {
        layout: "dashboard",
        requiresAuth: true
      }
    },
    {
      path: "/admin/chart/area",
      name: "admin-chart-area",
      component: () => import("./area-CrMq38zP.js"),
      meta: {
        layout: "dashboard",
        requiresAuth: true
      }
    },
    {
      path: "/admin/employee",
      name: "admin-employee",
      component: () => import("./index-C1vcyAZj.js"),
      meta: {
        layout: "dashboard",
        requiresAuth: true
      }
    },
    {
      path: "/admin/branch",
      name: "admin-branch",
      component: () => import("./index-DQoP6iRL.js"),
      meta: {
        layout: "dashboard",
        requiresAuth: true
      }
    },
    {
      path: "/admin/settings",
      name: "admin-settings",
      component: () => import("./index-C9gKRSbe.js"),
      meta: {
        layout: "dashboard",
        requiresAuth: true
      }
    },
    {
      path: "/admin/chart/line",
      name: "admin-chart-line",
      component: () => import("./line-Db5be_bA.js"),
      meta: {
        layout: "dashboard",
        requiresAuth: true
      }
    },
    {
      path: "/admin/chart/bar",
      name: "admin-chart-bar",
      component: () => import("./bar-DH6OJtnG.js"),
      meta: {
        layout: "dashboard",
        requiresAuth: true
      }
    },
    {
      path: "/admin/chart/donut",
      name: "admin-chart-donut",
      component: () => import("./donut-DoltlJlT.js"),
      meta: {
        layout: "dashboard",
        requiresAuth: true
      }
    }
  ];
  const router2 = createRouter$1({
    history: createWebHistory(),
    routes
  });
  router2.beforeEach(async (to, _from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
    if (requiresAuth && !authStore.isAuthenticated) {
      next("/login");
    } else {
      next();
    }
  });
  return router2;
}
const router = createRouter();
const _imports_0 = "/assets/logo-C8pbqY3Y.jpg";
const useNavigationStore = defineStore("navigation", () => {
  const authStore = useAuthStore();
  const userNavigation = [
    {
      title: "Main",
      menu: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
          isActive: true
        },
        {
          title: "Documents",
          url: "/documents",
          icon: FileText,
          items: [
            {
              title: "My Documents",
              url: "/documents/my"
            },
            {
              title: "Shared",
              url: "/documents/shared"
            }
          ]
        }
      ]
    },
    {
      title: "Account",
      menu: [
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
          items: [
            {
              title: "Profile",
              url: "/settings/profile"
            },
            {
              title: "Preferences",
              url: "/settings/preferences"
            }
          ]
        }
      ]
    }
  ];
  const superadminNavigation = [
    {
      title: "Main",
      menu: [
        {
          title: "Dashboard",
          url: "/admin/dashboard",
          icon: LayoutDashboard,
          isActive: true
        },
        {
          title: "Customers",
          url: "/admin/customers",
          icon: Users,
          isActive: true
        },
        {
          title: "Loyalty",
          url: "/admin/loyalty",
          icon: Gift,
          isActive: true
        }
      ]
    },
    {
      title: "Management",
      menu: [
        {
          title: "Employee",
          url: "/admin/employee",
          icon: UserRound,
          isActive: true
        },
        {
          title: "Branch",
          url: "/admin/branch",
          icon: Building,
          isActive: true
        }
      ]
    }
  ];
  const navigation = computed(() => {
    var _a;
    return ((_a = authStore.user) == null ? void 0 : _a.user_type) === "superadmin" ? superadminNavigation : userNavigation;
  });
  return {
    navigation
  };
});
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const _sfc_main$10 = /* @__PURE__ */ defineComponent({
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    variant: {},
    size: {},
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        as: _ctx.as,
        "as-child": _ctx.asChild,
        class: unref(cn)(unref(buttonVariants)({ variant: _ctx.variant, size: _ctx.size }), props.class)
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
const _sfc_setup$10 = _sfc_main$10.setup;
_sfc_main$10.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/button/Button.vue");
  return _sfc_setup$10 ? _sfc_setup$10(props, ctx) : void 0;
};
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        xs: "h-7 rounded px-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  __name: "Sheet",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    defaultOpen: { type: Boolean },
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogRoot), mergeProps(unref(forwarded), _attrs), {
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
const _sfc_setup$$ = _sfc_main$$.setup;
_sfc_main$$.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/Sheet.vue");
  return _sfc_setup$$ ? _sfc_setup$$(props, ctx) : void 0;
};
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  __name: "SheetClose",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogClose), mergeProps(props, _attrs), {
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
const _sfc_setup$_ = _sfc_main$_.setup;
_sfc_main$_.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetClose.vue");
  return _sfc_setup$_ ? _sfc_setup$_(props, ctx) : void 0;
};
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SheetContent",
  __ssrInlineRender: true,
  props: {
    class: {},
    side: {},
    forceMount: { type: Boolean },
    trapFocus: { type: Boolean },
    disableOutsidePointerEvents: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, side, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DialogOverlay), { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(DialogContent), mergeProps({
              class: unref(cn)(unref(sheetVariants)({ side: _ctx.side }), props.class)
            }, { ...unref(forwarded), ..._ctx.$attrs }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(ssrRenderComponent(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(X), { class: "w-4 h-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(X), { class: "w-4 h-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default"),
                    createVNode(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" }, {
                      default: withCtx(() => [
                        createVNode(unref(X), { class: "w-4 h-4" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DialogOverlay), { class: "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }),
              createVNode(unref(DialogContent), mergeProps({
                class: unref(cn)(unref(sheetVariants)({ side: _ctx.side }), props.class)
              }, { ...unref(forwarded), ..._ctx.$attrs }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default"),
                  createVNode(unref(DialogClose), { class: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary" }, {
                    default: withCtx(() => [
                      createVNode(unref(X), { class: "w-4 h-4" })
                    ]),
                    _: 1
                  })
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$Z = _sfc_main$Z.setup;
_sfc_main$Z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetContent.vue");
  return _sfc_setup$Z ? _sfc_setup$Z(props, ctx) : void 0;
};
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  __name: "SheetDescription",
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogDescription), mergeProps({
        class: unref(cn)("text-sm text-muted-foreground", props.class)
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
const _sfc_setup$Y = _sfc_main$Y.setup;
_sfc_main$Y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetDescription.vue");
  return _sfc_setup$Y ? _sfc_setup$Y(props, ctx) : void 0;
};
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  __name: "SheetFooter",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "flex flex-col-reverse sm:flex-row sm:justify-end sm:gap-x-2",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$X = _sfc_main$X.setup;
_sfc_main$X.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetFooter.vue");
  return _sfc_setup$X ? _sfc_setup$X(props, ctx) : void 0;
};
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  __name: "SheetHeader",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("flex flex-col gap-y-2 text-center sm:text-left", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$W = _sfc_main$W.setup;
_sfc_main$W.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetHeader.vue");
  return _sfc_setup$W ? _sfc_setup$W(props, ctx) : void 0;
};
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  __name: "SheetTitle",
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTitle), mergeProps({
        class: unref(cn)("text-lg font-semibold text-foreground", props.class)
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
const _sfc_setup$V = _sfc_main$V.setup;
_sfc_main$V.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetTitle.vue");
  return _sfc_setup$V ? _sfc_setup$V(props, ctx) : void 0;
};
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  __name: "SheetTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DialogTrigger), mergeProps(props, _attrs), {
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
const _sfc_setup$U = _sfc_main$U.setup;
_sfc_main$U.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sheet/SheetTrigger.vue");
  return _sfc_setup$U ? _sfc_setup$U(props, ctx) : void 0;
};
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const [useSidebar, provideSidebarContext] = createContext("Sidebar");
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "Sidebar",
  __ssrInlineRender: true,
  props: {
    side: { default: "left" },
    variant: { default: "sidebar" },
    collapsible: { default: "offcanvas" },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      if (_ctx.collapsible === "none") {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: unref(cn)("flex h-full w-[--sidebar-width] flex-col bg-sidebar text-sidebar-foreground", props.class)
        }, _ctx.$attrs, _attrs))}>`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div>`);
      } else if (unref(isMobile)) {
        _push(ssrRenderComponent(unref(_sfc_main$$), mergeProps({ open: unref(openMobile) }, _ctx.$attrs, { "onUpdate:open": unref(setOpenMobile) }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$Z), {
                "data-sidebar": "sidebar",
                "data-mobile": "true",
                side: _ctx.side,
                class: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
                style: {
                  "--sidebar-width": unref(SIDEBAR_WIDTH_MOBILE)
                }
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex h-full w-full flex-col"${_scopeId2}>`);
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex h-full w-full flex-col" }, [
                        renderSlot(_ctx.$slots, "default")
                      ])
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$Z), {
                  "data-sidebar": "sidebar",
                  "data-mobile": "true",
                  side: _ctx.side,
                  class: "w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
                  style: {
                    "--sidebar-width": unref(SIDEBAR_WIDTH_MOBILE)
                  }
                }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex h-full w-full flex-col" }, [
                      renderSlot(_ctx.$slots, "default")
                    ])
                  ]),
                  _: 3
                }, 8, ["side", "style"])
              ];
            }
          }),
          _: 3
        }, _parent));
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({
          class: "group peer hidden md:block",
          "data-state": unref(state),
          "data-collapsible": unref(state) === "collapsed" ? _ctx.collapsible : "",
          "data-variant": _ctx.variant,
          "data-side": _ctx.side
        }, _attrs))}><div class="${ssrRenderClass(unref(cn)(
          "duration-200 relative h-svh w-[--sidebar-width] bg-transparent transition-[width] ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          _ctx.variant === "floating" || _ctx.variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon]"
        ))}"></div><div${ssrRenderAttrs(mergeProps({
          class: unref(cn)(
            "duration-200 fixed inset-y-0 z-10 hidden h-svh w-[--sidebar-width] transition-[left,right,width] ease-linear md:flex",
            _ctx.side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
            // Adjust the padding for floating and inset variants.
            _ctx.variant === "floating" || _ctx.variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-[--sidebar-width-icon] group-data-[side=left]:border-r group-data-[side=right]:border-l",
            props.class
          )
        }, _ctx.$attrs))}><div data-sidebar="sidebar" class="flex h-full w-full flex-col text-sidebar-foreground bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow">`);
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
        _push(`</div></div></div>`);
      }
    };
  }
});
const _sfc_setup$T = _sfc_main$T.setup;
_sfc_main$T.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/Sidebar.vue");
  return _sfc_setup$T ? _sfc_setup$T(props, ctx) : void 0;
};
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  __name: "SidebarContent",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "content",
        class: unref(cn)("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$S = _sfc_main$S.setup;
_sfc_main$S.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarContent.vue");
  return _sfc_setup$S ? _sfc_setup$S(props, ctx) : void 0;
};
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "SidebarFooter",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "footer",
        class: unref(cn)("flex flex-col gap-2 p-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$R = _sfc_main$R.setup;
_sfc_main$R.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarFooter.vue");
  return _sfc_setup$R ? _sfc_setup$R(props, ctx) : void 0;
};
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroup",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "group",
        class: unref(cn)("relative flex w-full min-w-0 flex-col p-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$Q = _sfc_main$Q.setup;
_sfc_main$Q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarGroup.vue");
  return _sfc_setup$Q ? _sfc_setup$Q(props, ctx) : void 0;
};
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroupAction",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-sidebar": "group-action",
        as: _ctx.as,
        "as-child": _ctx.asChild,
        class: unref(cn)(
          "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "after:absolute after:-inset-2 after:md:hidden",
          "group-data-[collapsible=icon]:hidden",
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
const _sfc_setup$P = _sfc_main$P.setup;
_sfc_main$P.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarGroupAction.vue");
  return _sfc_setup$P ? _sfc_setup$P(props, ctx) : void 0;
};
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroupContent",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "group-content",
        class: unref(cn)("w-full text-sm", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$O = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarGroupContent.vue");
  return _sfc_setup$O ? _sfc_setup$O(props, ctx) : void 0;
};
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  __name: "SidebarGroupLabel",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-sidebar": "group-label",
        as: _ctx.as,
        "as-child": _ctx.asChild,
        class: unref(cn)(
          "duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
          "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
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
const _sfc_setup$N = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarGroupLabel.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  __name: "SidebarHeader",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "header",
        class: unref(cn)("flex flex-col gap-2 p-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$M = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarHeader.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    modelValue: {},
    class: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, {
      passive: true,
      defaultValue: props.defaultValue
    });
    return (_ctx, _push, _parent, _attrs) => {
      let _temp0;
      _push(`<input${ssrRenderAttrs((_temp0 = mergeProps({
        class: unref(cn)("flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", props.class)
      }, _attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, unref(modelValue)))))}>`);
    };
  }
});
const _sfc_setup$L = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/input/Input.vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  __name: "SidebarInput",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$L), mergeProps({
        "data-sidebar": "input",
        class: unref(cn)(
          "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
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
const _sfc_setup$K = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarInput.vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  __name: "SidebarInset",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({
        class: unref(cn)(
          "relative flex min-h-svh flex-1 flex-col bg-background",
          "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main>`);
    };
  }
});
const _sfc_setup$J = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarInset.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenu",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({
        "data-sidebar": "menu",
        class: unref(cn)("flex w-full min-w-0 flex-col gap-1", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</ul>`);
    };
  }
});
const _sfc_setup$I = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenu.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const _sfc_main$H = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuAction",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { default: "button" },
    showOnHover: { type: Boolean },
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-sidebar": "menu-action",
        class: unref(cn)(
          "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
          "after:absolute after:-inset-2 after:md:hidden",
          "peer-data-[size=sm]/menu-button:top-1",
          "peer-data-[size=default]/menu-button:top-1.5",
          "peer-data-[size=lg]/menu-button:top-2.5",
          "group-data-[collapsible=icon]:hidden",
          _ctx.showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
          props.class
        ),
        as: _ctx.as,
        "as-child": _ctx.asChild
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
const _sfc_setup$H = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuAction.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuBadge",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "menu-badge",
        class: unref(cn)(
          "absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none",
          "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
          "peer-data-[size=sm]/menu-button:top-1",
          "peer-data-[size=default]/menu-button:top-1.5",
          "peer-data-[size=lg]/menu-button:top-2.5",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$G = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuBadge.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "Tooltip",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    delayDuration: {},
    disableHoverableContent: { type: Boolean },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipRoot), mergeProps(unref(forwarded), _attrs), {
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
const _sfc_setup$F = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/Tooltip.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "TooltipContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    ariaLabel: {},
    asChild: { type: Boolean },
    as: {},
    side: {},
    sideOffset: { default: 4 },
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TooltipContent), mergeProps({ ...unref(forwarded), ..._ctx.$attrs }, {
              class: unref(cn)("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class)
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(TooltipContent), mergeProps({ ...unref(forwarded), ..._ctx.$attrs }, {
                class: unref(cn)("z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class)
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$E = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/TooltipContent.vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "TooltipProvider",
  __ssrInlineRender: true,
  props: {
    delayDuration: {},
    skipDelayDuration: {},
    disableHoverableContent: { type: Boolean },
    disableClosingTrigger: { type: Boolean },
    disabled: { type: Boolean },
    ignoreNonKeyboardFocus: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipProvider), mergeProps(props, _attrs), {
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
const _sfc_setup$D = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/TooltipProvider.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const _sfc_main$C = /* @__PURE__ */ defineComponent({
  __name: "TooltipTrigger",
  __ssrInlineRender: true,
  props: {
    reference: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipTrigger), mergeProps(props, _attrs), {
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
const _sfc_setup$C = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/tooltip/TooltipTrigger.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuButtonChild",
  __ssrInlineRender: true,
  props: {
    variant: { default: "default" },
    size: { default: "default" },
    isActive: { type: Boolean },
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-sidebar": "menu-button",
        "data-size": _ctx.size,
        "data-active": _ctx.isActive,
        class: unref(cn)(unref(sidebarMenuButtonVariants)({ variant: _ctx.variant, size: _ctx.size }), props.class),
        as: _ctx.as,
        "as-child": _ctx.asChild
      }, _ctx.$attrs, _attrs), {
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
const _sfc_setup$B = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuButtonChild.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  ...{
    inheritAttrs: false
  },
  __name: "SidebarMenuButton",
  __ssrInlineRender: true,
  props: {
    variant: { default: "default" },
    size: { default: "default" },
    isActive: { type: Boolean },
    class: {},
    asChild: { type: Boolean },
    as: { default: "button" },
    tooltip: {}
  },
  setup(__props) {
    const props = __props;
    const { isMobile, state } = useSidebar();
    const delegatedProps = computed(() => {
      const { tooltip, ...delegated } = props;
      return delegated;
    });
    return (_ctx, _push, _parent, _attrs) => {
      if (!_ctx.tooltip) {
        _push(ssrRenderComponent(_sfc_main$B, mergeProps({ ...delegatedProps.value, ..._ctx.$attrs }, _attrs), {
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
      } else {
        _push(ssrRenderComponent(unref(_sfc_main$F), _attrs, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(_sfc_main$C), { "as-child": "" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_sfc_main$B, { ...delegatedProps.value, ..._ctx.$attrs }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push4, _parent4, _scopeId3);
                        } else {
                          return [
                            renderSlot(_ctx.$slots, "default")
                          ];
                        }
                      }),
                      _: 3
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_sfc_main$B, { ...delegatedProps.value, ..._ctx.$attrs }, {
                        default: withCtx(() => [
                          renderSlot(_ctx.$slots, "default")
                        ]),
                        _: 3
                      }, 16)
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$E), {
                side: "right",
                align: "center",
                hidden: unref(state) !== "collapsed" || unref(isMobile)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (typeof _ctx.tooltip === "string") {
                      _push3(`<!--[-->${ssrInterpolate(_ctx.tooltip)}<!--]-->`);
                    } else {
                      ssrRenderVNode(_push3, createVNode(resolveDynamicComponent(_ctx.tooltip), null, null), _parent3, _scopeId2);
                    }
                  } else {
                    return [
                      typeof _ctx.tooltip === "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createTextVNode(toDisplayString(_ctx.tooltip), 1)
                      ], 64)) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.tooltip), { key: 1 }))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(_sfc_main$C), { "as-child": "" }, {
                  default: withCtx(() => [
                    createVNode(_sfc_main$B, { ...delegatedProps.value, ..._ctx.$attrs }, {
                      default: withCtx(() => [
                        renderSlot(_ctx.$slots, "default")
                      ]),
                      _: 3
                    }, 16)
                  ]),
                  _: 3
                }),
                createVNode(unref(_sfc_main$E), {
                  side: "right",
                  align: "center",
                  hidden: unref(state) !== "collapsed" || unref(isMobile)
                }, {
                  default: withCtx(() => [
                    typeof _ctx.tooltip === "string" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                      createTextVNode(toDisplayString(_ctx.tooltip), 1)
                    ], 64)) : (openBlock(), createBlock(resolveDynamicComponent(_ctx.tooltip), { key: 1 }))
                  ]),
                  _: 1
                }, 8, ["hidden"])
              ];
            }
          }),
          _: 3
        }, _parent));
      }
    };
  }
});
const _sfc_setup$A = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuButton.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuItem",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        "data-sidebar": "menu-item",
        class: unref(cn)("group/menu-item relative", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</li>`);
    };
  }
});
const _sfc_setup$z = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuItem.vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "Skeleton",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: unref(cn)("animate-pulse rounded-md bg-primary/10", props.class)
      }, _attrs))}></div>`);
    };
  }
});
const _sfc_setup$y = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/skeleton/Skeleton.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSkeleton",
  __ssrInlineRender: true,
  props: {
    showIcon: { type: Boolean },
    class: {}
  },
  setup(__props) {
    const props = __props;
    const width = computed(() => {
      return `${Math.floor(Math.random() * 40) + 50}%`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-sidebar": "menu-skeleton",
        class: unref(cn)("rounded-md h-8 flex gap-2 px-2 items-center", props.class)
      }, _attrs))}>`);
      if (_ctx.showIcon) {
        _push(ssrRenderComponent(unref(_sfc_main$y), {
          class: "size-4 rounded-md",
          "data-sidebar": "menu-skeleton-icon"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(_sfc_main$y), {
        class: "h-4 flex-1 max-w-[--skeleton-width]",
        "data-sidebar": "menu-skeleton-text",
        style: { "--skeleton-width": width.value }
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$x = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuSkeleton.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSub",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({
        "data-sidebar": "menu-badge",
        class: unref(cn)(
          "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
          "group-data-[collapsible=icon]:hidden",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</ul>`);
    };
  }
});
const _sfc_setup$w = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuSub.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "SidebarMenuSubButton",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: { default: "a" },
    size: { default: "md" },
    isActive: { type: Boolean },
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Primitive), mergeProps({
        "data-sidebar": "menu-sub-button",
        as: _ctx.as,
        "as-child": _ctx.asChild,
        "data-size": _ctx.size,
        "data-active": _ctx.isActive,
        class: unref(cn)(
          "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
          "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
          _ctx.size === "sm" && "text-xs",
          _ctx.size === "md" && "text-sm",
          "group-data-[collapsible=icon]:hidden",
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
const _sfc_setup$v = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuSubButton.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$u = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<li${ssrRenderAttrs(_attrs)}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</li>`);
}
const _sfc_setup$u = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarMenuSubItem.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const SidebarMenuSubItem = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "SidebarProvider",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean, default: true },
    open: { type: Boolean, default: void 0 },
    class: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const isMobile = useMediaQuery("(max-width: 768px)");
    const openMobile = ref(false);
    const open = useVModel(props, "open", emits, {
      defaultValue: props.defaultOpen ?? false,
      passive: props.open === void 0
    });
    function setOpen(value) {
      open.value = value;
      document.cookie = `${SIDEBAR_COOKIE_NAME}=${open.value}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
    }
    function setOpenMobile(value) {
      openMobile.value = value;
    }
    function toggleSidebar() {
      return isMobile.value ? setOpenMobile(!openMobile.value) : setOpen(!open.value);
    }
    useEventListener("keydown", (event) => {
      if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggleSidebar();
      }
    });
    const state = computed(() => open.value ? "expanded" : "collapsed");
    provideSidebarContext({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(TooltipProvider), mergeProps({ "delay-duration": 0 }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div${ssrRenderAttrs(mergeProps({
              style: {
                "--sidebar-width": unref(SIDEBAR_WIDTH),
                "--sidebar-width-icon": unref(SIDEBAR_WIDTH_ICON)
              },
              class: unref(cn)("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", props.class)
            }, _ctx.$attrs))}${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", mergeProps({
                style: {
                  "--sidebar-width": unref(SIDEBAR_WIDTH),
                  "--sidebar-width-icon": unref(SIDEBAR_WIDTH_ICON)
                },
                class: unref(cn)("group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar", props.class)
              }, _ctx.$attrs), [
                renderSlot(_ctx.$slots, "default")
              ], 16)
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$t = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarProvider.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "SidebarRail",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { toggleSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<button${ssrRenderAttrs(mergeProps({
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabindex: -1,
        title: "Toggle Sidebar",
        class: unref(cn)(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          props.class
        )
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</button>`);
    };
  }
});
const _sfc_setup$s = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarRail.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "Separator",
  __ssrInlineRender: true,
  props: {
    orientation: {},
    decorative: { type: Boolean },
    asChild: { type: Boolean },
    as: {},
    class: {},
    label: {}
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Separator), mergeProps(delegatedProps.value, {
        class: unref(cn)(
          "shrink-0 bg-border relative",
          props.orientation === "vertical" ? "w-px h-full" : "h-px w-full",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (props.label) {
              _push2(`<span class="${ssrRenderClass(
                unref(cn)(
                  "text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center",
                  props.orientation === "vertical" ? "w-[1px] px-1 py-2" : "h-[1px] py-1 px-2"
                )
              )}"${_scopeId}>${ssrInterpolate(props.label)}</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              props.label ? (openBlock(), createBlock("span", {
                key: 0,
                class: unref(cn)(
                  "text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center",
                  props.orientation === "vertical" ? "w-[1px] px-1 py-2" : "h-[1px] py-1 px-2"
                )
              }, toDisplayString(props.label), 3)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$r = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/separator/Separator.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "SidebarSeparator",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$r), mergeProps({
        "data-sidebar": "separator",
        class: unref(cn)("mx-2 w-auto bg-sidebar-border", props.class)
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
const _sfc_setup$q = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarSeparator.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "SidebarTrigger",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    const { toggleSidebar } = useSidebar();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$10), mergeProps({
        "data-sidebar": "trigger",
        variant: "ghost",
        size: "icon",
        class: unref(cn)("h-7 w-7", props.class),
        onClick: unref(toggleSidebar)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(PanelLeft), null, null, _parent2, _scopeId));
            _push2(`<span class="sr-only"${_scopeId}>Toggle Sidebar</span>`);
          } else {
            return [
              createVNode(unref(PanelLeft)),
              createVNode("span", { class: "sr-only" }, "Toggle Sidebar")
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$p = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sidebar/SidebarTrigger.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "Collapsible",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    disabled: { type: Boolean },
    unmountOnHide: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CollapsibleRoot), mergeProps(unref(forwarded), _attrs), {
        default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", { open }, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", { open })
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$o = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/collapsible/Collapsible.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "CollapsibleContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CollapsibleContent), mergeProps(props, { class: "overflow-hidden transition-all data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down" }, _attrs), {
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
const _sfc_setup$n = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/collapsible/CollapsibleContent.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "CollapsibleTrigger",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(CollapsibleTrigger), mergeProps(props, _attrs), {
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
const _sfc_setup$m = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/collapsible/CollapsibleTrigger.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "Avatar",
  __ssrInlineRender: true,
  props: {
    class: {},
    size: { default: "sm" },
    shape: { default: "circle" }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AvatarRoot), mergeProps({
        class: unref(cn)(unref(avatarVariant)({ size: _ctx.size, shape: _ctx.shape }), props.class)
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
const _sfc_setup$l = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/avatar/Avatar.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "AvatarFallback",
  __ssrInlineRender: true,
  props: {
    delayMs: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AvatarFallback), mergeProps(props, _attrs), {
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
const _sfc_setup$k = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/avatar/AvatarFallback.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "AvatarImage",
  __ssrInlineRender: true,
  props: {
    src: {},
    referrerPolicy: {},
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(AvatarImage), mergeProps(props, { class: "h-full w-full object-cover" }, _attrs), {
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
const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/avatar/AvatarImage.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const avatarVariant = cva(
  "inline-flex items-center justify-center font-normal text-foreground select-none shrink-0 bg-secondary overflow-hidden",
  {
    variants: {
      size: {
        sm: "h-10 w-10 text-xs",
        base: "h-16 w-16 text-2xl",
        lg: "h-32 w-32 text-5xl"
      },
      shape: {
        circle: "rounded-full",
        square: "rounded-md"
      }
    }
  }
);
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenu",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean },
    dir: {},
    modal: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuRoot), mergeProps(unref(forwarded), _attrs), {
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
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenu.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuCheckboxItem",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: [Boolean, String] },
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["select", "update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuCheckboxItem), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DropdownMenuItemIndicator), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Check), { class: "w-4 h-4" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Check), { class: "w-4 h-4" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("span", { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, [
                createVNode(unref(DropdownMenuItemIndicator), null, {
                  default: withCtx(() => [
                    createVNode(unref(Check), { class: "w-4 h-4" })
                  ]),
                  _: 1
                })
              ]),
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuCheckboxItem.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    side: {},
    sideOffset: { default: 4 },
    align: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuPortal), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(DropdownMenuContent), mergeProps(unref(forwarded), {
              class: unref(cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class)
            }), {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                } else {
                  return [
                    renderSlot(_ctx.$slots, "default")
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(DropdownMenuContent), mergeProps(unref(forwarded), {
                class: unref(cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class)
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["class"])
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuContent.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuGroup",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuGroup), mergeProps(props, _attrs), {
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
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuGroup.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuItem",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {},
    inset: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuItem), mergeProps(unref(forwardedProps), {
        class: unref(cn)(
          "relative flex cursor-default select-none items-center rounded-sm gap-2 px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50  [&>svg]:size-4 [&>svg]:shrink-0",
          _ctx.inset && "pl-8",
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
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuItem.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuLabel",
  __ssrInlineRender: true,
  props: {
    asChild: { type: Boolean },
    as: {},
    class: {},
    inset: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwardedProps = useForwardProps(delegatedProps);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuLabel), mergeProps(unref(forwardedProps), {
        class: unref(cn)("px-2 py-1.5 text-sm font-semibold", _ctx.inset && "pl-8", props.class)
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
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuLabel.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuRadioGroup",
  __ssrInlineRender: true,
  props: {
    modelValue: {},
    asChild: { type: Boolean },
    as: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuRadioGroup), mergeProps(unref(forwarded), _attrs), {
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
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuRadioGroup.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuRadioItem",
  __ssrInlineRender: true,
  props: {
    value: {},
    disabled: { type: Boolean },
    textValue: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuRadioItem), mergeProps(unref(forwarded), {
        class: unref(cn)(
          "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(DropdownMenuItemIndicator), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(Circle), { class: "h-4 w-4 fill-current" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(Circle), { class: "h-4 w-4 fill-current" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</span>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("span", { class: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center" }, [
                createVNode(unref(DropdownMenuItemIndicator), null, {
                  default: withCtx(() => [
                    createVNode(unref(Circle), { class: "h-4 w-4 fill-current" })
                  ]),
                  _: 1
                })
              ]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuRadioItem.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSeparator",
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuSeparator), mergeProps(delegatedProps.value, {
        class: unref(cn)("-mx-1 my-1 h-px bg-muted", props.class)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuSeparator.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuShortcut",
  __ssrInlineRender: true,
  props: {
    class: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: unref(cn)("ml-auto text-xs tracking-widest opacity-60", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuShortcut.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSub",
  __ssrInlineRender: true,
  props: {
    defaultOpen: { type: Boolean },
    open: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const forwarded = useForwardPropsEmits(props, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuSub), mergeProps(unref(forwarded), _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuSub.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSubContent",
  __ssrInlineRender: true,
  props: {
    forceMount: { type: Boolean },
    loop: { type: Boolean },
    sideOffset: {},
    alignOffset: {},
    avoidCollisions: { type: Boolean },
    collisionBoundary: {},
    collisionPadding: {},
    arrowPadding: {},
    sticky: {},
    hideWhenDetached: { type: Boolean },
    positionStrategy: {},
    updatePositionStrategy: {},
    disableUpdateOnLayoutShift: { type: Boolean },
    prioritizePosition: { type: Boolean },
    reference: {},
    asChild: { type: Boolean },
    as: {},
    class: {}
  },
  emits: ["escapeKeyDown", "pointerDownOutside", "focusOutside", "interactOutside", "entryFocus", "openAutoFocus", "closeAutoFocus"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const delegatedProps = computed(() => {
      const { class: _, ...delegated } = props;
      return delegated;
    });
    const forwarded = useForwardPropsEmits(delegatedProps, emits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuSubContent), mergeProps(unref(forwarded), {
        class: unref(cn)("z-50 min-w-32 overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", props.class)
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
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuSubContent.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuSubTrigger",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    textValue: {},
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
      _push(ssrRenderComponent(unref(DropdownMenuSubTrigger), mergeProps(unref(forwardedProps), {
        class: unref(cn)(
          "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent",
          props.class
        )
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(ssrRenderComponent(unref(ChevronRight), { class: "ml-auto h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              renderSlot(_ctx.$slots, "default"),
              createVNode(unref(ChevronRight), { class: "ml-auto h-4 w-4" })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuSubTrigger.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DropdownMenuTrigger",
  __ssrInlineRender: true,
  props: {
    disabled: { type: Boolean },
    asChild: { type: Boolean },
    as: {}
  },
  setup(__props) {
    const props = __props;
    const forwardedProps = useForwardProps(props);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(DropdownMenuTrigger), mergeProps({ class: "outline-none" }, unref(forwardedProps), _attrs), {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/dropdown-menu/DropdownMenuTrigger.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "NavUser",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const { isMobile } = useSidebar();
    console.log("User Store: ", authStore.user);
    function handleLogout() {
      authStore.logout();
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$I), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$z), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$i), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$5), { "as-child": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$A), {
                                size: "lg",
                                class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  var _a, _b, _c, _d;
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$l), { class: "h-8 w-8 rounded-lg" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        var _a2, _b2, _c2, _d2;
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$j), {
                                            src: ((_a2 = unref(authStore).user) == null ? void 0 : _a2.avatar) ? String(unref(authStore).user.avatar) : "",
                                            alt: ((_b2 = unref(authStore).user) == null ? void 0 : _b2.username) ? String(unref(authStore).user.username) : ""
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` CN `);
                                              } else {
                                                return [
                                                  createTextVNode(" CN ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$j), {
                                              src: ((_c2 = unref(authStore).user) == null ? void 0 : _c2.avatar) ? String(unref(authStore).user.avatar) : "",
                                              alt: ((_d2 = unref(authStore).user) == null ? void 0 : _d2.username) ? String(unref(authStore).user.username) : ""
                                            }, null, 8, ["src", "alt"]),
                                            createVNode(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" CN ")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="grid flex-1 text-left text-sm leading-tight"${_scopeId5}><span class="truncate font-semibold"${_scopeId5}>${ssrInterpolate((_a = unref(authStore).user) == null ? void 0 : _a.fullname)}</span><span class="truncate text-xs"${_scopeId5}>${ssrInterpolate((_b = unref(authStore).user) == null ? void 0 : _b.email)}</span></div>`);
                                    _push6(ssrRenderComponent(unref(ChevronsUpDown), { class: "ml-auto size-4" }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$l), { class: "h-8 w-8 rounded-lg" }, {
                                        default: withCtx(() => {
                                          var _a2, _b2;
                                          return [
                                            createVNode(unref(_sfc_main$j), {
                                              src: ((_a2 = unref(authStore).user) == null ? void 0 : _a2.avatar) ? String(unref(authStore).user.avatar) : "",
                                              alt: ((_b2 = unref(authStore).user) == null ? void 0 : _b2.username) ? String(unref(authStore).user.username) : ""
                                            }, null, 8, ["src", "alt"]),
                                            createVNode(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" CN ")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                                        createVNode("span", { class: "truncate font-semibold" }, toDisplayString((_c = unref(authStore).user) == null ? void 0 : _c.fullname), 1),
                                        createVNode("span", { class: "truncate text-xs" }, toDisplayString((_d = unref(authStore).user) == null ? void 0 : _d.email), 1)
                                      ]),
                                      createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$A), {
                                  size: "lg",
                                  class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                }, {
                                  default: withCtx(() => {
                                    var _a, _b;
                                    return [
                                      createVNode(unref(_sfc_main$l), { class: "h-8 w-8 rounded-lg" }, {
                                        default: withCtx(() => {
                                          var _a2, _b2;
                                          return [
                                            createVNode(unref(_sfc_main$j), {
                                              src: ((_a2 = unref(authStore).user) == null ? void 0 : _a2.avatar) ? String(unref(authStore).user.avatar) : "",
                                              alt: ((_b2 = unref(authStore).user) == null ? void 0 : _b2.username) ? String(unref(authStore).user.username) : ""
                                            }, null, 8, ["src", "alt"]),
                                            createVNode(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" CN ")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                                        createVNode("span", { class: "truncate font-semibold" }, toDisplayString((_a = unref(authStore).user) == null ? void 0 : _a.fullname), 1),
                                        createVNode("span", { class: "truncate text-xs" }, toDisplayString((_b = unref(authStore).user) == null ? void 0 : _b.email), 1)
                                      ]),
                                      createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                                    ];
                                  }),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$g), {
                          class: "w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg",
                          side: unref(isMobile) ? "bottom" : "right",
                          align: "end",
                          "side-offset": 4
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$d), { class: "p-0 font-normal" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  var _a, _b, _c, _d;
                                  if (_push6) {
                                    _push6(`<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(unref(_sfc_main$l), { class: "h-8 w-8 rounded-lg" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        var _a2, _b2, _c2, _d2;
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$j), {
                                            src: ((_a2 = unref(authStore).user) == null ? void 0 : _a2.avatar) ? String(unref(authStore).user.avatar) : "",
                                            alt: ((_b2 = unref(authStore).user) == null ? void 0 : _b2.username) ? String(unref(authStore).user.username) : ""
                                          }, null, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(` CN `);
                                              } else {
                                                return [
                                                  createTextVNode(" CN ")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$j), {
                                              src: ((_c2 = unref(authStore).user) == null ? void 0 : _c2.avatar) ? String(unref(authStore).user.avatar) : "",
                                              alt: ((_d2 = unref(authStore).user) == null ? void 0 : _d2.username) ? String(unref(authStore).user.username) : ""
                                            }, null, 8, ["src", "alt"]),
                                            createVNode(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" CN ")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`<div class="grid flex-1 text-left text-sm leading-tight"${_scopeId5}><span class="truncate font-semibold"${_scopeId5}>${ssrInterpolate((_a = unref(authStore).user) == null ? void 0 : _a.fullname)}</span><span class="truncate text-xs"${_scopeId5}>${ssrInterpolate((_b = unref(authStore).user) == null ? void 0 : _b.email)}</span></div></div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" }, [
                                        createVNode(unref(_sfc_main$l), { class: "h-8 w-8 rounded-lg" }, {
                                          default: withCtx(() => {
                                            var _a2, _b2;
                                            return [
                                              createVNode(unref(_sfc_main$j), {
                                                src: ((_a2 = unref(authStore).user) == null ? void 0 : _a2.avatar) ? String(unref(authStore).user.avatar) : "",
                                                alt: ((_b2 = unref(authStore).user) == null ? void 0 : _b2.username) ? String(unref(authStore).user.username) : ""
                                              }, null, 8, ["src", "alt"]),
                                              createVNode(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" CN ")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                                          createVNode("span", { class: "truncate font-semibold" }, toDisplayString((_c = unref(authStore).user) == null ? void 0 : _c.fullname), 1),
                                          createVNode("span", { class: "truncate text-xs" }, toDisplayString((_d = unref(authStore).user) == null ? void 0 : _d.email), 1)
                                        ])
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$f), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(Sparkles), null, null, _parent7, _scopeId6));
                                          _push7(` Upgrade to Pro `);
                                        } else {
                                          return [
                                            createVNode(unref(Sparkles)),
                                            createTextVNode(" Upgrade to Pro ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$e), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Sparkles)),
                                          createTextVNode(" Upgrade to Pro ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$f), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(BadgeCheck), null, null, _parent7, _scopeId6));
                                          _push7(` Account `);
                                        } else {
                                          return [
                                            createVNode(unref(BadgeCheck)),
                                            createTextVNode(" Account ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(CreditCard), null, null, _parent7, _scopeId6));
                                          _push7(` Billing `);
                                        } else {
                                          return [
                                            createVNode(unref(CreditCard)),
                                            createTextVNode(" Billing ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(unref(_sfc_main$e), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(Bell), null, null, _parent7, _scopeId6));
                                          _push7(` Notifications `);
                                        } else {
                                          return [
                                            createVNode(unref(Bell)),
                                            createTextVNode(" Notifications ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$e), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(BadgeCheck)),
                                          createTextVNode(" Account ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$e), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(CreditCard)),
                                          createTextVNode(" Billing ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$e), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(Bell)),
                                          createTextVNode(" Notifications ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$a), null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(_sfc_main$e), { onClick: handleLogout }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(LogOut), null, null, _parent6, _scopeId5));
                                    _push6(` Log out `);
                                  } else {
                                    return [
                                      createVNode(unref(LogOut)),
                                      createTextVNode(" Log out ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$d), { class: "p-0 font-normal" }, {
                                  default: withCtx(() => {
                                    var _a, _b;
                                    return [
                                      createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" }, [
                                        createVNode(unref(_sfc_main$l), { class: "h-8 w-8 rounded-lg" }, {
                                          default: withCtx(() => {
                                            var _a2, _b2;
                                            return [
                                              createVNode(unref(_sfc_main$j), {
                                                src: ((_a2 = unref(authStore).user) == null ? void 0 : _a2.avatar) ? String(unref(authStore).user.avatar) : "",
                                                alt: ((_b2 = unref(authStore).user) == null ? void 0 : _b2.username) ? String(unref(authStore).user.username) : ""
                                              }, null, 8, ["src", "alt"]),
                                              createVNode(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" CN ")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                                          createVNode("span", { class: "truncate font-semibold" }, toDisplayString((_a = unref(authStore).user) == null ? void 0 : _a.fullname), 1),
                                          createVNode("span", { class: "truncate text-xs" }, toDisplayString((_b = unref(authStore).user) == null ? void 0 : _b.email), 1)
                                        ])
                                      ])
                                    ];
                                  }),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a)),
                                createVNode(unref(_sfc_main$f), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(Sparkles)),
                                        createTextVNode(" Upgrade to Pro ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a)),
                                createVNode(unref(_sfc_main$f), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(BadgeCheck)),
                                        createTextVNode(" Account ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(CreditCard)),
                                        createTextVNode(" Billing ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$e), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(Bell)),
                                        createTextVNode(" Notifications ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$a)),
                                createVNode(unref(_sfc_main$e), { onClick: handleLogout }, {
                                  default: withCtx(() => [
                                    createVNode(unref(LogOut)),
                                    createTextVNode(" Log out ")
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
                          createVNode(unref(_sfc_main$5), { "as-child": "" }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$A), {
                                size: "lg",
                                class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                              }, {
                                default: withCtx(() => {
                                  var _a, _b;
                                  return [
                                    createVNode(unref(_sfc_main$l), { class: "h-8 w-8 rounded-lg" }, {
                                      default: withCtx(() => {
                                        var _a2, _b2;
                                        return [
                                          createVNode(unref(_sfc_main$j), {
                                            src: ((_a2 = unref(authStore).user) == null ? void 0 : _a2.avatar) ? String(unref(authStore).user.avatar) : "",
                                            alt: ((_b2 = unref(authStore).user) == null ? void 0 : _b2.username) ? String(unref(authStore).user.username) : ""
                                          }, null, 8, ["src", "alt"]),
                                          createVNode(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" CN ")
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                                      createVNode("span", { class: "truncate font-semibold" }, toDisplayString((_a = unref(authStore).user) == null ? void 0 : _a.fullname), 1),
                                      createVNode("span", { class: "truncate text-xs" }, toDisplayString((_b = unref(authStore).user) == null ? void 0 : _b.email), 1)
                                    ]),
                                    createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                                  ];
                                }),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$g), {
                            class: "w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg",
                            side: unref(isMobile) ? "bottom" : "right",
                            align: "end",
                            "side-offset": 4
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$d), { class: "p-0 font-normal" }, {
                                default: withCtx(() => {
                                  var _a, _b;
                                  return [
                                    createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" }, [
                                      createVNode(unref(_sfc_main$l), { class: "h-8 w-8 rounded-lg" }, {
                                        default: withCtx(() => {
                                          var _a2, _b2;
                                          return [
                                            createVNode(unref(_sfc_main$j), {
                                              src: ((_a2 = unref(authStore).user) == null ? void 0 : _a2.avatar) ? String(unref(authStore).user.avatar) : "",
                                              alt: ((_b2 = unref(authStore).user) == null ? void 0 : _b2.username) ? String(unref(authStore).user.username) : ""
                                            }, null, 8, ["src", "alt"]),
                                            createVNode(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                              default: withCtx(() => [
                                                createTextVNode(" CN ")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }),
                                        _: 1
                                      }),
                                      createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                                        createVNode("span", { class: "truncate font-semibold" }, toDisplayString((_a = unref(authStore).user) == null ? void 0 : _a.fullname), 1),
                                        createVNode("span", { class: "truncate text-xs" }, toDisplayString((_b = unref(authStore).user) == null ? void 0 : _b.email), 1)
                                      ])
                                    ])
                                  ];
                                }),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a)),
                              createVNode(unref(_sfc_main$f), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(Sparkles)),
                                      createTextVNode(" Upgrade to Pro ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a)),
                              createVNode(unref(_sfc_main$f), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(BadgeCheck)),
                                      createTextVNode(" Account ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(CreditCard)),
                                      createTextVNode(" Billing ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$e), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(Bell)),
                                      createTextVNode(" Notifications ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$a)),
                              createVNode(unref(_sfc_main$e), { onClick: handleLogout }, {
                                default: withCtx(() => [
                                  createVNode(unref(LogOut)),
                                  createTextVNode(" Log out ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["side"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$i), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$5), { "as-child": "" }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$A), {
                              size: "lg",
                              class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            }, {
                              default: withCtx(() => {
                                var _a, _b;
                                return [
                                  createVNode(unref(_sfc_main$l), { class: "h-8 w-8 rounded-lg" }, {
                                    default: withCtx(() => {
                                      var _a2, _b2;
                                      return [
                                        createVNode(unref(_sfc_main$j), {
                                          src: ((_a2 = unref(authStore).user) == null ? void 0 : _a2.avatar) ? String(unref(authStore).user.avatar) : "",
                                          alt: ((_b2 = unref(authStore).user) == null ? void 0 : _b2.username) ? String(unref(authStore).user.username) : ""
                                        }, null, 8, ["src", "alt"]),
                                        createVNode(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" CN ")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                                    createVNode("span", { class: "truncate font-semibold" }, toDisplayString((_a = unref(authStore).user) == null ? void 0 : _a.fullname), 1),
                                    createVNode("span", { class: "truncate text-xs" }, toDisplayString((_b = unref(authStore).user) == null ? void 0 : _b.email), 1)
                                  ]),
                                  createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                                ];
                              }),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$g), {
                          class: "w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg",
                          side: unref(isMobile) ? "bottom" : "right",
                          align: "end",
                          "side-offset": 4
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$d), { class: "p-0 font-normal" }, {
                              default: withCtx(() => {
                                var _a, _b;
                                return [
                                  createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" }, [
                                    createVNode(unref(_sfc_main$l), { class: "h-8 w-8 rounded-lg" }, {
                                      default: withCtx(() => {
                                        var _a2, _b2;
                                        return [
                                          createVNode(unref(_sfc_main$j), {
                                            src: ((_a2 = unref(authStore).user) == null ? void 0 : _a2.avatar) ? String(unref(authStore).user.avatar) : "",
                                            alt: ((_b2 = unref(authStore).user) == null ? void 0 : _b2.username) ? String(unref(authStore).user.username) : ""
                                          }, null, 8, ["src", "alt"]),
                                          createVNode(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                            default: withCtx(() => [
                                              createTextVNode(" CN ")
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                                      createVNode("span", { class: "truncate font-semibold" }, toDisplayString((_a = unref(authStore).user) == null ? void 0 : _a.fullname), 1),
                                      createVNode("span", { class: "truncate text-xs" }, toDisplayString((_b = unref(authStore).user) == null ? void 0 : _b.email), 1)
                                    ])
                                  ])
                                ];
                              }),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a)),
                            createVNode(unref(_sfc_main$f), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Sparkles)),
                                    createTextVNode(" Upgrade to Pro ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a)),
                            createVNode(unref(_sfc_main$f), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(BadgeCheck)),
                                    createTextVNode(" Account ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(CreditCard)),
                                    createTextVNode(" Billing ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$e), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(Bell)),
                                    createTextVNode(" Notifications ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$a)),
                            createVNode(unref(_sfc_main$e), { onClick: handleLogout }, {
                              default: withCtx(() => [
                                createVNode(unref(LogOut)),
                                createTextVNode(" Log out ")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["side"])
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
              createVNode(unref(_sfc_main$z), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$i), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$5), { "as-child": "" }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$A), {
                            size: "lg",
                            class: "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                          }, {
                            default: withCtx(() => {
                              var _a, _b;
                              return [
                                createVNode(unref(_sfc_main$l), { class: "h-8 w-8 rounded-lg" }, {
                                  default: withCtx(() => {
                                    var _a2, _b2;
                                    return [
                                      createVNode(unref(_sfc_main$j), {
                                        src: ((_a2 = unref(authStore).user) == null ? void 0 : _a2.avatar) ? String(unref(authStore).user.avatar) : "",
                                        alt: ((_b2 = unref(authStore).user) == null ? void 0 : _b2.username) ? String(unref(authStore).user.username) : ""
                                      }, null, 8, ["src", "alt"]),
                                      createVNode(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" CN ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }),
                                  _: 1
                                }),
                                createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                                  createVNode("span", { class: "truncate font-semibold" }, toDisplayString((_a = unref(authStore).user) == null ? void 0 : _a.fullname), 1),
                                  createVNode("span", { class: "truncate text-xs" }, toDisplayString((_b = unref(authStore).user) == null ? void 0 : _b.email), 1)
                                ]),
                                createVNode(unref(ChevronsUpDown), { class: "ml-auto size-4" })
                              ];
                            }),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$g), {
                        class: "w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg",
                        side: unref(isMobile) ? "bottom" : "right",
                        align: "end",
                        "side-offset": 4
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$d), { class: "p-0 font-normal" }, {
                            default: withCtx(() => {
                              var _a, _b;
                              return [
                                createVNode("div", { class: "flex items-center gap-2 px-1 py-1.5 text-left text-sm" }, [
                                  createVNode(unref(_sfc_main$l), { class: "h-8 w-8 rounded-lg" }, {
                                    default: withCtx(() => {
                                      var _a2, _b2;
                                      return [
                                        createVNode(unref(_sfc_main$j), {
                                          src: ((_a2 = unref(authStore).user) == null ? void 0 : _a2.avatar) ? String(unref(authStore).user.avatar) : "",
                                          alt: ((_b2 = unref(authStore).user) == null ? void 0 : _b2.username) ? String(unref(authStore).user.username) : ""
                                        }, null, 8, ["src", "alt"]),
                                        createVNode(unref(_sfc_main$k), { class: "rounded-lg" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" CN ")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "grid flex-1 text-left text-sm leading-tight" }, [
                                    createVNode("span", { class: "truncate font-semibold" }, toDisplayString((_a = unref(authStore).user) == null ? void 0 : _a.fullname), 1),
                                    createVNode("span", { class: "truncate text-xs" }, toDisplayString((_b = unref(authStore).user) == null ? void 0 : _b.email), 1)
                                  ])
                                ])
                              ];
                            }),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a)),
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(Sparkles)),
                                  createTextVNode(" Upgrade to Pro ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a)),
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(BadgeCheck)),
                                  createTextVNode(" Account ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(CreditCard)),
                                  createTextVNode(" Billing ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(_sfc_main$e), null, {
                                default: withCtx(() => [
                                  createVNode(unref(Bell)),
                                  createTextVNode(" Notifications ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$a)),
                          createVNode(unref(_sfc_main$e), { onClick: handleLogout }, {
                            default: withCtx(() => [
                              createVNode(unref(LogOut)),
                              createTextVNode(" Log out ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["side"])
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
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layouts/components/NavUser.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const mode = useColorMode();
    const navigationStore = useNavigationStore();
    const router2 = useRouter();
    function toggleMode() {
      mode.value = mode.value === "dark" ? "light" : "dark";
    }
    const navigation = computed(() => navigationStore.navigation);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$t), _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$T), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$M), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center justify-center gap-2 mt-4"${_scopeId3}><img${ssrRenderAttr("src", _imports_0)} alt="logo" class="h-20 w-auto fill-blue-500 rounded-lg"${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center justify-center gap-2 mt-4" }, [
                            createVNode("img", {
                              src: _imports_0,
                              alt: "logo",
                              class: "h-20 w-auto fill-blue-500 rounded-lg"
                            })
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$S), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(navigation.value, (group) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$Q), {
                            key: group.title
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$N), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(group.title)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(group.title), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`<!--[-->`);
                                ssrRenderList(group.menu, (item) => {
                                  _push5(ssrRenderComponent(unref(_sfc_main$I), {
                                    key: item.title
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        if (item.items) {
                                          _push6(ssrRenderComponent(unref(_sfc_main$o), {
                                            "as-child": "",
                                            "default-open": item.isActive,
                                            class: "group/collapsible"
                                          }, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(ssrRenderComponent(unref(_sfc_main$z), null, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(unref(_sfc_main$m), { "as-child": "" }, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(ssrRenderComponent(unref(_sfc_main$A), {
                                                              tooltip: item.title
                                                            }, {
                                                              default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                                if (_push10) {
                                                                  if (item.icon) {
                                                                    ssrRenderVNode(_push10, createVNode(resolveDynamicComponent(item.icon), { class: "text-primary" }, null), _parent10, _scopeId9);
                                                                  } else {
                                                                    _push10(`<!---->`);
                                                                  }
                                                                  _push10(`<span${_scopeId9}>${ssrInterpolate(item.title)}</span>`);
                                                                  _push10(ssrRenderComponent(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" }, null, _parent10, _scopeId9));
                                                                } else {
                                                                  return [
                                                                    item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                                      key: 0,
                                                                      class: "text-primary"
                                                                    })) : createCommentVNode("", true),
                                                                    createVNode("span", null, toDisplayString(item.title), 1),
                                                                    createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                                                  ];
                                                                }
                                                              }),
                                                              _: 2
                                                            }, _parent9, _scopeId8));
                                                          } else {
                                                            return [
                                                              createVNode(unref(_sfc_main$A), {
                                                                tooltip: item.title
                                                              }, {
                                                                default: withCtx(() => [
                                                                  item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                                    key: 0,
                                                                    class: "text-primary"
                                                                  })) : createCommentVNode("", true),
                                                                  createVNode("span", null, toDisplayString(item.title), 1),
                                                                  createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                                                ]),
                                                                _: 2
                                                              }, 1032, ["tooltip"])
                                                            ];
                                                          }
                                                        }),
                                                        _: 2
                                                      }, _parent8, _scopeId7));
                                                      _push8(ssrRenderComponent(unref(_sfc_main$n), null, {
                                                        default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                          if (_push9) {
                                                            _push9(ssrRenderComponent(unref(_sfc_main$w), null, {
                                                              default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                                if (_push10) {
                                                                  _push10(`<!--[-->`);
                                                                  ssrRenderList(item.items, (subItem) => {
                                                                    _push10(ssrRenderComponent(unref(SidebarMenuSubItem), {
                                                                      key: subItem.title
                                                                    }, {
                                                                      default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                        if (_push11) {
                                                                          _push11(ssrRenderComponent(unref(_sfc_main$v), { "as-child": "" }, {
                                                                            default: withCtx((_11, _push12, _parent12, _scopeId11) => {
                                                                              if (_push12) {
                                                                                _push12(`<a${ssrRenderAttr("href", subItem.url)}${_scopeId11}><span${_scopeId11}>${ssrInterpolate(subItem.title)}</span></a>`);
                                                                              } else {
                                                                                return [
                                                                                  createVNode("a", {
                                                                                    href: subItem.url
                                                                                  }, [
                                                                                    createVNode("span", null, toDisplayString(subItem.title), 1)
                                                                                  ], 8, ["href"])
                                                                                ];
                                                                              }
                                                                            }),
                                                                            _: 2
                                                                          }, _parent11, _scopeId10));
                                                                        } else {
                                                                          return [
                                                                            createVNode(unref(_sfc_main$v), { "as-child": "" }, {
                                                                              default: withCtx(() => [
                                                                                createVNode("a", {
                                                                                  href: subItem.url
                                                                                }, [
                                                                                  createVNode("span", null, toDisplayString(subItem.title), 1)
                                                                                ], 8, ["href"])
                                                                              ]),
                                                                              _: 2
                                                                            }, 1024)
                                                                          ];
                                                                        }
                                                                      }),
                                                                      _: 2
                                                                    }, _parent10, _scopeId9));
                                                                  });
                                                                  _push10(`<!--]-->`);
                                                                } else {
                                                                  return [
                                                                    (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                                                      return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                                                        key: subItem.title
                                                                      }, {
                                                                        default: withCtx(() => [
                                                                          createVNode(unref(_sfc_main$v), { "as-child": "" }, {
                                                                            default: withCtx(() => [
                                                                              createVNode("a", {
                                                                                href: subItem.url
                                                                              }, [
                                                                                createVNode("span", null, toDisplayString(subItem.title), 1)
                                                                              ], 8, ["href"])
                                                                            ]),
                                                                            _: 2
                                                                          }, 1024)
                                                                        ]),
                                                                        _: 2
                                                                      }, 1024);
                                                                    }), 128))
                                                                  ];
                                                                }
                                                              }),
                                                              _: 2
                                                            }, _parent9, _scopeId8));
                                                          } else {
                                                            return [
                                                              createVNode(unref(_sfc_main$w), null, {
                                                                default: withCtx(() => [
                                                                  (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                                                    return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                                                      key: subItem.title
                                                                    }, {
                                                                      default: withCtx(() => [
                                                                        createVNode(unref(_sfc_main$v), { "as-child": "" }, {
                                                                          default: withCtx(() => [
                                                                            createVNode("a", {
                                                                              href: subItem.url
                                                                            }, [
                                                                              createVNode("span", null, toDisplayString(subItem.title), 1)
                                                                            ], 8, ["href"])
                                                                          ]),
                                                                          _: 2
                                                                        }, 1024)
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
                                                      }, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(_sfc_main$A), {
                                                              tooltip: item.title
                                                            }, {
                                                              default: withCtx(() => [
                                                                item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                                  key: 0,
                                                                  class: "text-primary"
                                                                })) : createCommentVNode("", true),
                                                                createVNode("span", null, toDisplayString(item.title), 1),
                                                                createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                                              ]),
                                                              _: 2
                                                            }, 1032, ["tooltip"])
                                                          ]),
                                                          _: 2
                                                        }, 1024),
                                                        createVNode(unref(_sfc_main$n), null, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(_sfc_main$w), null, {
                                                              default: withCtx(() => [
                                                                (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                                                  return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                                                    key: subItem.title
                                                                  }, {
                                                                    default: withCtx(() => [
                                                                      createVNode(unref(_sfc_main$v), { "as-child": "" }, {
                                                                        default: withCtx(() => [
                                                                          createVNode("a", {
                                                                            href: subItem.url
                                                                          }, [
                                                                            createVNode("span", null, toDisplayString(subItem.title), 1)
                                                                          ], 8, ["href"])
                                                                        ]),
                                                                        _: 2
                                                                      }, 1024)
                                                                    ]),
                                                                    _: 2
                                                                  }, 1024);
                                                                }), 128))
                                                              ]),
                                                              _: 2
                                                            }, 1024)
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                return [
                                                  createVNode(unref(_sfc_main$z), null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(_sfc_main$A), {
                                                            tooltip: item.title
                                                          }, {
                                                            default: withCtx(() => [
                                                              item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                                key: 0,
                                                                class: "text-primary"
                                                              })) : createCommentVNode("", true),
                                                              createVNode("span", null, toDisplayString(item.title), 1),
                                                              createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                                            ]),
                                                            _: 2
                                                          }, 1032, ["tooltip"])
                                                        ]),
                                                        _: 2
                                                      }, 1024),
                                                      createVNode(unref(_sfc_main$n), null, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(_sfc_main$w), null, {
                                                            default: withCtx(() => [
                                                              (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                                                return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                                                  key: subItem.title
                                                                }, {
                                                                  default: withCtx(() => [
                                                                    createVNode(unref(_sfc_main$v), { "as-child": "" }, {
                                                                      default: withCtx(() => [
                                                                        createVNode("a", {
                                                                          href: subItem.url
                                                                        }, [
                                                                          createVNode("span", null, toDisplayString(subItem.title), 1)
                                                                        ], 8, ["href"])
                                                                      ]),
                                                                      _: 2
                                                                    }, 1024)
                                                                  ]),
                                                                  _: 2
                                                                }, 1024);
                                                              }), 128))
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        } else {
                                          _push6(ssrRenderComponent(unref(_sfc_main$z), null, {
                                            default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                              if (_push7) {
                                                _push7(ssrRenderComponent(unref(_sfc_main$A), {
                                                  tooltip: item.title,
                                                  onClick: ($event) => unref(router2).push(item.url)
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      if (item.icon) {
                                                        ssrRenderVNode(_push8, createVNode(resolveDynamicComponent(item.icon), { class: "text-primary" }, null), _parent8, _scopeId7);
                                                      } else {
                                                        _push8(`<!---->`);
                                                      }
                                                      _push8(`<span${_scopeId7}>${ssrInterpolate(item.title)}</span>`);
                                                    } else {
                                                      return [
                                                        item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                          key: 0,
                                                          class: "text-primary"
                                                        })) : createCommentVNode("", true),
                                                        createVNode("span", null, toDisplayString(item.title), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                              } else {
                                                return [
                                                  createVNode(unref(_sfc_main$A), {
                                                    tooltip: item.title,
                                                    onClick: ($event) => unref(router2).push(item.url)
                                                  }, {
                                                    default: withCtx(() => [
                                                      item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                        key: 0,
                                                        class: "text-primary"
                                                      })) : createCommentVNode("", true),
                                                      createVNode("span", null, toDisplayString(item.title), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["tooltip", "onClick"])
                                                ];
                                              }
                                            }),
                                            _: 2
                                          }, _parent6, _scopeId5));
                                        }
                                      } else {
                                        return [
                                          item.items ? (openBlock(), createBlock(unref(_sfc_main$o), {
                                            key: 0,
                                            "as-child": "",
                                            "default-open": item.isActive,
                                            class: "group/collapsible"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$z), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$A), {
                                                        tooltip: item.title
                                                      }, {
                                                        default: withCtx(() => [
                                                          item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                            key: 0,
                                                            class: "text-primary"
                                                          })) : createCommentVNode("", true),
                                                          createVNode("span", null, toDisplayString(item.title), 1),
                                                          createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                                        ]),
                                                        _: 2
                                                      }, 1032, ["tooltip"])
                                                    ]),
                                                    _: 2
                                                  }, 1024),
                                                  createVNode(unref(_sfc_main$n), null, {
                                                    default: withCtx(() => [
                                                      createVNode(unref(_sfc_main$w), null, {
                                                        default: withCtx(() => [
                                                          (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                                            return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                                              key: subItem.title
                                                            }, {
                                                              default: withCtx(() => [
                                                                createVNode(unref(_sfc_main$v), { "as-child": "" }, {
                                                                  default: withCtx(() => [
                                                                    createVNode("a", {
                                                                      href: subItem.url
                                                                    }, [
                                                                      createVNode("span", null, toDisplayString(subItem.title), 1)
                                                                    ], 8, ["href"])
                                                                  ]),
                                                                  _: 2
                                                                }, 1024)
                                                              ]),
                                                              _: 2
                                                            }, 1024);
                                                          }), 128))
                                                        ]),
                                                        _: 2
                                                      }, 1024)
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1032, ["default-open"])) : (openBlock(), createBlock(unref(_sfc_main$z), { key: 1 }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$A), {
                                                tooltip: item.title,
                                                onClick: ($event) => unref(router2).push(item.url)
                                              }, {
                                                default: withCtx(() => [
                                                  item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                    key: 0,
                                                    class: "text-primary"
                                                  })) : createCommentVNode("", true),
                                                  createVNode("span", null, toDisplayString(item.title), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["tooltip", "onClick"])
                                            ]),
                                            _: 2
                                          }, 1024))
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$N), null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(group.title), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  (openBlock(true), createBlock(Fragment, null, renderList(group.menu, (item) => {
                                    return openBlock(), createBlock(unref(_sfc_main$I), {
                                      key: item.title
                                    }, {
                                      default: withCtx(() => [
                                        item.items ? (openBlock(), createBlock(unref(_sfc_main$o), {
                                          key: 0,
                                          "as-child": "",
                                          "default-open": item.isActive,
                                          class: "group/collapsible"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$z), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$A), {
                                                      tooltip: item.title
                                                    }, {
                                                      default: withCtx(() => [
                                                        item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                          key: 0,
                                                          class: "text-primary"
                                                        })) : createCommentVNode("", true),
                                                        createVNode("span", null, toDisplayString(item.title), 1),
                                                        createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                                      ]),
                                                      _: 2
                                                    }, 1032, ["tooltip"])
                                                  ]),
                                                  _: 2
                                                }, 1024),
                                                createVNode(unref(_sfc_main$n), null, {
                                                  default: withCtx(() => [
                                                    createVNode(unref(_sfc_main$w), null, {
                                                      default: withCtx(() => [
                                                        (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                                          return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                                            key: subItem.title
                                                          }, {
                                                            default: withCtx(() => [
                                                              createVNode(unref(_sfc_main$v), { "as-child": "" }, {
                                                                default: withCtx(() => [
                                                                  createVNode("a", {
                                                                    href: subItem.url
                                                                  }, [
                                                                    createVNode("span", null, toDisplayString(subItem.title), 1)
                                                                  ], 8, ["href"])
                                                                ]),
                                                                _: 2
                                                              }, 1024)
                                                            ]),
                                                            _: 2
                                                          }, 1024);
                                                        }), 128))
                                                      ]),
                                                      _: 2
                                                    }, 1024)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1032, ["default-open"])) : (openBlock(), createBlock(unref(_sfc_main$z), { key: 1 }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$A), {
                                              tooltip: item.title,
                                              onClick: ($event) => unref(router2).push(item.url)
                                            }, {
                                              default: withCtx(() => [
                                                item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                  key: 0,
                                                  class: "text-primary"
                                                })) : createCommentVNode("", true),
                                                createVNode("span", null, toDisplayString(item.title), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["tooltip", "onClick"])
                                          ]),
                                          _: 2
                                        }, 1024))
                                      ]),
                                      _: 2
                                    }, 1024);
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
                          (openBlock(true), createBlock(Fragment, null, renderList(navigation.value, (group) => {
                            return openBlock(), createBlock(unref(_sfc_main$Q), {
                              key: group.title
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$N), null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(group.title), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                (openBlock(true), createBlock(Fragment, null, renderList(group.menu, (item) => {
                                  return openBlock(), createBlock(unref(_sfc_main$I), {
                                    key: item.title
                                  }, {
                                    default: withCtx(() => [
                                      item.items ? (openBlock(), createBlock(unref(_sfc_main$o), {
                                        key: 0,
                                        "as-child": "",
                                        "default-open": item.isActive,
                                        class: "group/collapsible"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$z), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$A), {
                                                    tooltip: item.title
                                                  }, {
                                                    default: withCtx(() => [
                                                      item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                        key: 0,
                                                        class: "text-primary"
                                                      })) : createCommentVNode("", true),
                                                      createVNode("span", null, toDisplayString(item.title), 1),
                                                      createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["tooltip"])
                                                ]),
                                                _: 2
                                              }, 1024),
                                              createVNode(unref(_sfc_main$n), null, {
                                                default: withCtx(() => [
                                                  createVNode(unref(_sfc_main$w), null, {
                                                    default: withCtx(() => [
                                                      (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                                        return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                                          key: subItem.title
                                                        }, {
                                                          default: withCtx(() => [
                                                            createVNode(unref(_sfc_main$v), { "as-child": "" }, {
                                                              default: withCtx(() => [
                                                                createVNode("a", {
                                                                  href: subItem.url
                                                                }, [
                                                                  createVNode("span", null, toDisplayString(subItem.title), 1)
                                                                ], 8, ["href"])
                                                              ]),
                                                              _: 2
                                                            }, 1024)
                                                          ]),
                                                          _: 2
                                                        }, 1024);
                                                      }), 128))
                                                    ]),
                                                    _: 2
                                                  }, 1024)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1032, ["default-open"])) : (openBlock(), createBlock(unref(_sfc_main$z), { key: 1 }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$A), {
                                            tooltip: item.title,
                                            onClick: ($event) => unref(router2).push(item.url)
                                          }, {
                                            default: withCtx(() => [
                                              item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                key: 0,
                                                class: "text-primary"
                                              })) : createCommentVNode("", true),
                                              createVNode("span", null, toDisplayString(item.title), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["tooltip", "onClick"])
                                        ]),
                                        _: 2
                                      }, 1024))
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$R), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex flex-col items-center gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(unref(_sfc_main$Q), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(_sfc_main$I), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$z), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$A), {
                                            tooltip: "Support",
                                            onClick: ($event) => unref(router2).push("/support")
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                ssrRenderVNode(_push8, createVNode(resolveDynamicComponent(unref(HelpCircle)), { class: "text-primary" }, null), _parent8, _scopeId7);
                                                _push8(`<span${_scopeId7}>Support</span>`);
                                              } else {
                                                return [
                                                  (openBlock(), createBlock(resolveDynamicComponent(unref(HelpCircle)), { class: "text-primary" })),
                                                  createVNode("span", null, "Support")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$A), {
                                            tooltip: "Settings",
                                            onClick: ($event) => unref(router2).push("/admin/settings")
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                ssrRenderVNode(_push8, createVNode(resolveDynamicComponent(unref(Settings)), { class: "text-primary" }, null), _parent8, _scopeId7);
                                                _push8(`<span${_scopeId7}>Settings</span>`);
                                              } else {
                                                return [
                                                  (openBlock(), createBlock(resolveDynamicComponent(unref(Settings)), { class: "text-primary" })),
                                                  createVNode("span", null, "Settings")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$A), {
                                              tooltip: "Support",
                                              onClick: ($event) => unref(router2).push("/support")
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(resolveDynamicComponent(unref(HelpCircle)), { class: "text-primary" })),
                                                createVNode("span", null, "Support")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"]),
                                            createVNode(unref(_sfc_main$A), {
                                              tooltip: "Settings",
                                              onClick: ($event) => unref(router2).push("/admin/settings")
                                            }, {
                                              default: withCtx(() => [
                                                (openBlock(), createBlock(resolveDynamicComponent(unref(Settings)), { class: "text-primary" })),
                                                createVNode("span", null, "Settings")
                                              ]),
                                              _: 1
                                            }, 8, ["onClick"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$z), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$A), {
                                            tooltip: "Support",
                                            onClick: ($event) => unref(router2).push("/support")
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(), createBlock(resolveDynamicComponent(unref(HelpCircle)), { class: "text-primary" })),
                                              createVNode("span", null, "Support")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"]),
                                          createVNode(unref(_sfc_main$A), {
                                            tooltip: "Settings",
                                            onClick: ($event) => unref(router2).push("/admin/settings")
                                          }, {
                                            default: withCtx(() => [
                                              (openBlock(), createBlock(resolveDynamicComponent(unref(Settings)), { class: "text-primary" })),
                                              createVNode("span", null, "Settings")
                                            ]),
                                            _: 1
                                          }, 8, ["onClick"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(_sfc_main$I), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$z), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$A), {
                                          tooltip: "Support",
                                          onClick: ($event) => unref(router2).push("/support")
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(), createBlock(resolveDynamicComponent(unref(HelpCircle)), { class: "text-primary" })),
                                            createVNode("span", null, "Support")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"]),
                                        createVNode(unref(_sfc_main$A), {
                                          tooltip: "Settings",
                                          onClick: ($event) => unref(router2).push("/admin/settings")
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(), createBlock(resolveDynamicComponent(unref(Settings)), { class: "text-primary" })),
                                            createVNode("span", null, "Settings")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$10), {
                          class: "w-full",
                          variant: "ghost",
                          onClick: toggleMode
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(Icon), {
                                class: "",
                                icon: unref(mode) === "dark" ? "radix-icons:moon" : "radix-icons:sun"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(Icon), {
                                  class: "",
                                  icon: unref(mode) === "dark" ? "radix-icons:moon" : "radix-icons:sun"
                                }, null, 8, ["icon"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_sfc_main$4, null, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex flex-col items-center gap-2" }, [
                            createVNode(unref(_sfc_main$Q), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$I), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$z), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$A), {
                                          tooltip: "Support",
                                          onClick: ($event) => unref(router2).push("/support")
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(), createBlock(resolveDynamicComponent(unref(HelpCircle)), { class: "text-primary" })),
                                            createVNode("span", null, "Support")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"]),
                                        createVNode(unref(_sfc_main$A), {
                                          tooltip: "Settings",
                                          onClick: ($event) => unref(router2).push("/admin/settings")
                                        }, {
                                          default: withCtx(() => [
                                            (openBlock(), createBlock(resolveDynamicComponent(unref(Settings)), { class: "text-primary" })),
                                            createVNode("span", null, "Settings")
                                          ]),
                                          _: 1
                                        }, 8, ["onClick"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(unref(_sfc_main$10), {
                              class: "w-full",
                              variant: "ghost",
                              onClick: toggleMode
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(Icon), {
                                  class: "",
                                  icon: unref(mode) === "dark" ? "radix-icons:moon" : "radix-icons:sun"
                                }, null, 8, ["icon"])
                              ]),
                              _: 1
                            }),
                            createVNode(_sfc_main$4)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$s), null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$M), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex items-center justify-center gap-2 mt-4" }, [
                          createVNode("img", {
                            src: _imports_0,
                            alt: "logo",
                            class: "h-20 w-auto fill-blue-500 rounded-lg"
                          })
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$S), null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(navigation.value, (group) => {
                          return openBlock(), createBlock(unref(_sfc_main$Q), {
                            key: group.title
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$N), null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(group.title), 1)
                                ]),
                                _: 2
                              }, 1024),
                              (openBlock(true), createBlock(Fragment, null, renderList(group.menu, (item) => {
                                return openBlock(), createBlock(unref(_sfc_main$I), {
                                  key: item.title
                                }, {
                                  default: withCtx(() => [
                                    item.items ? (openBlock(), createBlock(unref(_sfc_main$o), {
                                      key: 0,
                                      "as-child": "",
                                      "default-open": item.isActive,
                                      class: "group/collapsible"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$z), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$A), {
                                                  tooltip: item.title
                                                }, {
                                                  default: withCtx(() => [
                                                    item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                      key: 0,
                                                      class: "text-primary"
                                                    })) : createCommentVNode("", true),
                                                    createVNode("span", null, toDisplayString(item.title), 1),
                                                    createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                                  ]),
                                                  _: 2
                                                }, 1032, ["tooltip"])
                                              ]),
                                              _: 2
                                            }, 1024),
                                            createVNode(unref(_sfc_main$n), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(_sfc_main$w), null, {
                                                  default: withCtx(() => [
                                                    (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                                      return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                                        key: subItem.title
                                                      }, {
                                                        default: withCtx(() => [
                                                          createVNode(unref(_sfc_main$v), { "as-child": "" }, {
                                                            default: withCtx(() => [
                                                              createVNode("a", {
                                                                href: subItem.url
                                                              }, [
                                                                createVNode("span", null, toDisplayString(subItem.title), 1)
                                                              ], 8, ["href"])
                                                            ]),
                                                            _: 2
                                                          }, 1024)
                                                        ]),
                                                        _: 2
                                                      }, 1024);
                                                    }), 128))
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1032, ["default-open"])) : (openBlock(), createBlock(unref(_sfc_main$z), { key: 1 }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$A), {
                                          tooltip: item.title,
                                          onClick: ($event) => unref(router2).push(item.url)
                                        }, {
                                          default: withCtx(() => [
                                            item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                              key: 0,
                                              class: "text-primary"
                                            })) : createCommentVNode("", true),
                                            createVNode("span", null, toDisplayString(item.title), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["tooltip", "onClick"])
                                      ]),
                                      _: 2
                                    }, 1024))
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$R), null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "flex flex-col items-center gap-2" }, [
                          createVNode(unref(_sfc_main$Q), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$I), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$z), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$A), {
                                        tooltip: "Support",
                                        onClick: ($event) => unref(router2).push("/support")
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(resolveDynamicComponent(unref(HelpCircle)), { class: "text-primary" })),
                                          createVNode("span", null, "Support")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"]),
                                      createVNode(unref(_sfc_main$A), {
                                        tooltip: "Settings",
                                        onClick: ($event) => unref(router2).push("/admin/settings")
                                      }, {
                                        default: withCtx(() => [
                                          (openBlock(), createBlock(resolveDynamicComponent(unref(Settings)), { class: "text-primary" })),
                                          createVNode("span", null, "Settings")
                                        ]),
                                        _: 1
                                      }, 8, ["onClick"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$10), {
                            class: "w-full",
                            variant: "ghost",
                            onClick: toggleMode
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(Icon), {
                                class: "",
                                icon: unref(mode) === "dark" ? "radix-icons:moon" : "radix-icons:sun"
                              }, null, 8, ["icon"])
                            ]),
                            _: 1
                          }),
                          createVNode(_sfc_main$4)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$s))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$J), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<main class="flex-1 p-6"${_scopeId2}>`);
                  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  _push3(`</main>`);
                } else {
                  return [
                    createVNode("main", { class: "flex-1 p-6" }, [
                      renderSlot(_ctx.$slots, "default")
                    ])
                  ];
                }
              }),
              _: 3
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$T), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$M), null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-center gap-2 mt-4" }, [
                        createVNode("img", {
                          src: _imports_0,
                          alt: "logo",
                          class: "h-20 w-auto fill-blue-500 rounded-lg"
                        })
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$S), null, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(navigation.value, (group) => {
                        return openBlock(), createBlock(unref(_sfc_main$Q), {
                          key: group.title
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$N), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(group.title), 1)
                              ]),
                              _: 2
                            }, 1024),
                            (openBlock(true), createBlock(Fragment, null, renderList(group.menu, (item) => {
                              return openBlock(), createBlock(unref(_sfc_main$I), {
                                key: item.title
                              }, {
                                default: withCtx(() => [
                                  item.items ? (openBlock(), createBlock(unref(_sfc_main$o), {
                                    key: 0,
                                    "as-child": "",
                                    "default-open": item.isActive,
                                    class: "group/collapsible"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$z), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$m), { "as-child": "" }, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$A), {
                                                tooltip: item.title
                                              }, {
                                                default: withCtx(() => [
                                                  item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                                    key: 0,
                                                    class: "text-primary"
                                                  })) : createCommentVNode("", true),
                                                  createVNode("span", null, toDisplayString(item.title), 1),
                                                  createVNode(unref(ChevronRight), { class: "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" })
                                                ]),
                                                _: 2
                                              }, 1032, ["tooltip"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(unref(_sfc_main$n), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(_sfc_main$w), null, {
                                                default: withCtx(() => [
                                                  (openBlock(true), createBlock(Fragment, null, renderList(item.items, (subItem) => {
                                                    return openBlock(), createBlock(unref(SidebarMenuSubItem), {
                                                      key: subItem.title
                                                    }, {
                                                      default: withCtx(() => [
                                                        createVNode(unref(_sfc_main$v), { "as-child": "" }, {
                                                          default: withCtx(() => [
                                                            createVNode("a", {
                                                              href: subItem.url
                                                            }, [
                                                              createVNode("span", null, toDisplayString(subItem.title), 1)
                                                            ], 8, ["href"])
                                                          ]),
                                                          _: 2
                                                        }, 1024)
                                                      ]),
                                                      _: 2
                                                    }, 1024);
                                                  }), 128))
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["default-open"])) : (openBlock(), createBlock(unref(_sfc_main$z), { key: 1 }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$A), {
                                        tooltip: item.title,
                                        onClick: ($event) => unref(router2).push(item.url)
                                      }, {
                                        default: withCtx(() => [
                                          item.icon ? (openBlock(), createBlock(resolveDynamicComponent(item.icon), {
                                            key: 0,
                                            class: "text-primary"
                                          })) : createCommentVNode("", true),
                                          createVNode("span", null, toDisplayString(item.title), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["tooltip", "onClick"])
                                    ]),
                                    _: 2
                                  }, 1024))
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$R), null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex flex-col items-center gap-2" }, [
                        createVNode(unref(_sfc_main$Q), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$I), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$z), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$A), {
                                      tooltip: "Support",
                                      onClick: ($event) => unref(router2).push("/support")
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(resolveDynamicComponent(unref(HelpCircle)), { class: "text-primary" })),
                                        createVNode("span", null, "Support")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode(unref(_sfc_main$A), {
                                      tooltip: "Settings",
                                      onClick: ($event) => unref(router2).push("/admin/settings")
                                    }, {
                                      default: withCtx(() => [
                                        (openBlock(), createBlock(resolveDynamicComponent(unref(Settings)), { class: "text-primary" })),
                                        createVNode("span", null, "Settings")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$10), {
                          class: "w-full",
                          variant: "ghost",
                          onClick: toggleMode
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(Icon), {
                              class: "",
                              icon: unref(mode) === "dark" ? "radix-icons:moon" : "radix-icons:sun"
                            }, null, 8, ["icon"])
                          ]),
                          _: 1
                        }),
                        createVNode(_sfc_main$4)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$s))
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$J), null, {
                default: withCtx(() => [
                  createVNode("main", { class: "flex-1 p-6" }, [
                    renderSlot(_ctx.$slots, "default")
                  ])
                ]),
                _: 3
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layouts/dashboard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/layouts/blank.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const BlankLayout = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Sonner",
  __ssrInlineRender: true,
  props: {
    invert: { type: Boolean },
    theme: {},
    position: {},
    hotkey: {},
    richColors: { type: Boolean },
    expand: { type: Boolean },
    duration: {},
    gap: {},
    visibleToasts: {},
    closeButton: { type: Boolean },
    toastOptions: {},
    class: {},
    style: {},
    offset: {},
    dir: {},
    icons: {},
    containerAriaLabel: {},
    pauseWhenPageIsHidden: { type: Boolean },
    cn: { type: Function }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Toaster), mergeProps({ class: "toaster group" }, props, { "toast-options": {
        classes: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      } }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/components/ui/sonner/Sonner.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "App",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const authStore = useAuthStore();
    authStore.init();
    const layout = computed(() => {
      return route.meta.layout || "blank";
    });
    const layouts = {
      dashboard: _sfc_main$3,
      blank: BlankLayout
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_view = resolveComponent("router-view");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(_sfc_main$1), { position: "top-right" }, null, _parent));
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(layouts[layout.value]), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_router_view, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_router_view)
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as _,
  _imports_0 as a,
  _sfc_main$L as b,
  createRouter as c,
  _sfc_main$10 as d,
  _sfc_main$p as e,
  _sfc_main$r as f,
  cn as g,
  buttonVariants as h,
  _sfc_main$i as i,
  _sfc_main$5 as j,
  _sfc_main$g as k,
  _sfc_main$D as l,
  _sfc_main$F as m,
  _sfc_main$C as n,
  _sfc_main$E as o,
  _sfc_main$l as p,
  _sfc_main$j as q,
  router as r,
  _sfc_main$k as s,
  _sfc_main$e as t,
  useAuthStore as u,
  _sfc_main$a as v
};
