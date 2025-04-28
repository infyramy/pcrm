import { defineComponent, ref, computed, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, createCommentVNode, Fragment, renderList, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderVNode, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$7 } from "./BreadcrumbSeparator-DiH4M1VE.js";
import { c as _sfc_main$1, d as _sfc_main$2, b as _sfc_main$8, g as _sfc_main$9, h as _sfc_main$a, i as _sfc_main$b, q as _sfc_main$c, j as _sfc_main$h, k as _sfc_main$i, l as _sfc_main$j, m as _sfc_main$k, n as _sfc_main$n, o as _sfc_main$o, p as _sfc_main$p, r as _sfc_main$q } from "../entry-server.js";
import { ChevronUp, ChevronDown, Plus, CircleHelp, MoreVertical } from "lucide-vue-next";
import { _ as _sfc_main$d, a as _sfc_main$e, b as _sfc_main$f, c as _sfc_main$g, d as _sfc_main$l, e as _sfc_main$m } from "./TableHeader-DjFLJ7yN.js";
import "reka-ui";
import "pinia";
import "vue-router";
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
    const breadcrumb = [{ count: 1, label: "Employee", action: false, href: "/" }];
    const sortDirection = ref(null);
    const employeesData = [
      {
        name: "Arif Zainal",
        phone: "+60 15-678 9012",
        role: "HQ Admin",
        branch: "-",
        status: "Active",
        createdDate: "12 Mar 2025",
        createdBy: "-",
        avatar: "",
        initials: "AZ"
      },
      {
        name: "Maya Iskandar",
        phone: "+60 13-456 7890",
        role: "Staff",
        branch: "SSM Ipoh",
        status: "Active",
        createdDate: "20 May 2023",
        createdBy: "Operator — SSM Ipoh",
        avatar: "",
        initials: "MI"
      },
      {
        name: "Hafiz Rahim",
        phone: "+60 14-567 8901",
        role: "Operator",
        branch: "UiTM, Shah Alam",
        status: "Active",
        createdDate: "05 Apr 2023",
        createdBy: "Employee — UiTM, Shah Alam",
        avatar: "",
        initials: "HR"
      },
      {
        name: "Nina Farhana",
        phone: "+60 16-789 0123",
        role: "Staff",
        branch: "Kafe Siswa USM",
        status: "Active",
        createdDate: "30 Mar 2023",
        createdBy: "Operator — Kafe Siswa USM",
        avatar: "",
        initials: "NF"
      },
      {
        name: "Rizal Amir",
        phone: "+60 12-345 6789",
        role: "Staff",
        branch: "KPJ Tawakkal",
        status: "Active",
        createdDate: "15 Feb 2023",
        createdBy: "Employee — KPJ Tawakkal",
        avatar: "",
        initials: "RA"
      },
      {
        name: "Siti Nurul",
        phone: "+60 17-890 1234",
        role: "Staff",
        branch: "UUM SoM",
        status: "Active",
        createdDate: "01 Jan 2023",
        createdBy: "Employee — UUM SoM",
        avatar: "",
        initials: "SN"
      }
    ];
    function toggleSort() {
      if (sortDirection.value === null) {
        sortDirection.value = "asc";
      } else if (sortDirection.value === "asc") {
        sortDirection.value = "desc";
      } else {
        sortDirection.value = null;
      }
    }
    const employees = computed(() => {
      let filteredData = employeesData;
      if (sortDirection.value === "asc") {
        return [...filteredData].sort((a, b) => a.status.localeCompare(b.status));
      } else if (sortDirection.value === "desc") {
        return [...filteredData].sort((a, b) => b.status.localeCompare(a.status));
      }
      return filteredData;
    });
    const statusSortIcon = computed(() => {
      if (sortDirection.value === "asc") return ChevronUp;
      if (sortDirection.value === "desc") return ChevronDown;
      return ChevronDown;
    });
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
      _push(`</div></header><main class="space-y-6"><div class="flex justify-between"><div><h2 class="text-3xl font-bold tracking-tight">List of Employee</h2><p class="text-muted-foreground">Manage your Employee</p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$8), { class: "bg-[#DE8536] hover:bg-[#c9762f]" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Plus), { class: "mr-1" }, null, _parent2, _scopeId));
            _push2(` New Employee `);
          } else {
            return [
              createVNode(unref(Plus), { class: "mr-1" }),
              createTextVNode(" New Employee ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div><div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4"><div class="relative">`);
      _push(ssrRenderComponent(unref(_sfc_main$9), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$a), { asChild: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    variant: "outline",
                    class: "w-[180px]"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` All branches `);
                        _push4(ssrRenderComponent(unref(ChevronDown), { class: "ml-auto h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" All branches "),
                          createVNode(unref(ChevronDown), { class: "ml-auto h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$8), {
                      variant: "outline",
                      class: "w-[180px]"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" All branches "),
                        createVNode(unref(ChevronDown), { class: "ml-auto h-4 w-4" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$b), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`All branches`);
                      } else {
                        return [
                          createTextVNode("All branches")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`UUM SoM`);
                      } else {
                        return [
                          createTextVNode("UUM SoM")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`KPJ Tawakkal`);
                      } else {
                        return [
                          createTextVNode("KPJ Tawakkal")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kafe Siswa USM`);
                      } else {
                        return [
                          createTextVNode("Kafe Siswa USM")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`UiTM, Shah Alam`);
                      } else {
                        return [
                          createTextVNode("UiTM, Shah Alam")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`SSM Ipoh`);
                      } else {
                        return [
                          createTextVNode("SSM Ipoh")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createTextVNode("All branches")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createTextVNode("UUM SoM")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createTextVNode("KPJ Tawakkal")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createTextVNode("Kafe Siswa USM")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createTextVNode("UiTM, Shah Alam")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createTextVNode("SSM Ipoh")
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
              createVNode(unref(_sfc_main$a), { asChild: "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$8), {
                    variant: "outline",
                    class: "w-[180px]"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" All branches "),
                      createVNode(unref(ChevronDown), { class: "ml-auto h-4 w-4" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$b), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createTextVNode("All branches")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createTextVNode("UUM SoM")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createTextVNode("KPJ Tawakkal")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createTextVNode("Kafe Siswa USM")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createTextVNode("UiTM, Shah Alam")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createTextVNode("SSM Ipoh")
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
      _push(ssrRenderComponent(unref(_sfc_main$9), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$a), { asChild: "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$8), {
                    variant: "outline",
                    class: "gap-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Filter `);
                        _push4(ssrRenderComponent(unref(ChevronDown), { class: "h-4 w-4" }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Filter "),
                          createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$8), {
                      variant: "outline",
                      class: "gap-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Filter "),
                        createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$b), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`All Status`);
                      } else {
                        return [
                          createTextVNode("All Status")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Active`);
                      } else {
                        return [
                          createTextVNode("Active")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(_sfc_main$c), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Inactive`);
                      } else {
                        return [
                          createTextVNode("Inactive")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createTextVNode("All Status")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createTextVNode("Active")
                      ]),
                      _: 1
                    }),
                    createVNode(unref(_sfc_main$c), null, {
                      default: withCtx(() => [
                        createTextVNode("Inactive")
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
              createVNode(unref(_sfc_main$a), { asChild: "" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$8), {
                    variant: "outline",
                    class: "gap-2"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Filter "),
                      createVNode(unref(ChevronDown), { class: "h-4 w-4" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$b), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createTextVNode("All Status")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createTextVNode("Active")
                    ]),
                    _: 1
                  }),
                  createVNode(unref(_sfc_main$c), null, {
                    default: withCtx(() => [
                      createTextVNode("Inactive")
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
      _push(`</div></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$d), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$e), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$f), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$g), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Name / Phone no.`);
                            } else {
                              return [
                                createTextVNode("Name / Phone no.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$g), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Role `);
                              _push5(ssrRenderComponent(unref(_sfc_main$h), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$i), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$j), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(unref(CircleHelp), { class: "ml-1 h-4 w-4" }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(unref(_sfc_main$k), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<p${_scopeId7}>Employee role in the organization</p>`);
                                              } else {
                                                return [
                                                  createVNode("p", null, "Employee role in the organization")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$j), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$k), null, {
                                              default: withCtx(() => [
                                                createVNode("p", null, "Employee role in the organization")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(unref(_sfc_main$i), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$j), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$k), null, {
                                            default: withCtx(() => [
                                              createVNode("p", null, "Employee role in the organization")
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" Role "),
                                createVNode(unref(_sfc_main$h), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$i), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$j), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$k), null, {
                                          default: withCtx(() => [
                                            createVNode("p", null, "Employee role in the organization")
                                          ]),
                                          _: 1
                                        })
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
                        _push4(ssrRenderComponent(unref(_sfc_main$g), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Assigned Branch`);
                            } else {
                              return [
                                createTextVNode("Assigned Branch")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$g), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<button class="flex items-center hover:text-primary focus:outline-none"${_scopeId4}> Status `);
                              ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(statusSortIcon.value), { class: "ml-1 h-4 w-4" }, null), _parent5, _scopeId4);
                              _push5(`</button>`);
                            } else {
                              return [
                                createVNode("button", {
                                  onClick: toggleSort,
                                  class: "flex items-center hover:text-primary focus:outline-none"
                                }, [
                                  createTextVNode(" Status "),
                                  (openBlock(), createBlock(resolveDynamicComponent(statusSortIcon.value), { class: "ml-1 h-4 w-4" }))
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$g), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Created on / by`);
                            } else {
                              return [
                                createTextVNode("Created on / by")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$g), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Actions`);
                            } else {
                              return [
                                createTextVNode("Actions")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(_sfc_main$g), null, {
                            default: withCtx(() => [
                              createTextVNode("Name / Phone no.")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$g), null, {
                            default: withCtx(() => [
                              createTextVNode(" Role "),
                              createVNode(unref(_sfc_main$h), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$i), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$j), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$k), null, {
                                        default: withCtx(() => [
                                          createVNode("p", null, "Employee role in the organization")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$g), null, {
                            default: withCtx(() => [
                              createTextVNode("Assigned Branch")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$g), null, {
                            default: withCtx(() => [
                              createVNode("button", {
                                onClick: toggleSort,
                                class: "flex items-center hover:text-primary focus:outline-none"
                              }, [
                                createTextVNode(" Status "),
                                (openBlock(), createBlock(resolveDynamicComponent(statusSortIcon.value), { class: "ml-1 h-4 w-4" }))
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$g), null, {
                            default: withCtx(() => [
                              createTextVNode("Created on / by")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$g), null, {
                            default: withCtx(() => [
                              createTextVNode("Actions")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$f), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$g), null, {
                          default: withCtx(() => [
                            createTextVNode("Name / Phone no.")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$g), null, {
                          default: withCtx(() => [
                            createTextVNode(" Role "),
                            createVNode(unref(_sfc_main$h), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$i), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$j), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$k), null, {
                                      default: withCtx(() => [
                                        createVNode("p", null, "Employee role in the organization")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$g), null, {
                          default: withCtx(() => [
                            createTextVNode("Assigned Branch")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$g), null, {
                          default: withCtx(() => [
                            createVNode("button", {
                              onClick: toggleSort,
                              class: "flex items-center hover:text-primary focus:outline-none"
                            }, [
                              createTextVNode(" Status "),
                              (openBlock(), createBlock(resolveDynamicComponent(statusSortIcon.value), { class: "ml-1 h-4 w-4" }))
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$g), null, {
                          default: withCtx(() => [
                            createTextVNode("Created on / by")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$g), null, {
                          default: withCtx(() => [
                            createTextVNode("Actions")
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$l), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(employees.value, (employee) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$f), {
                      key: employee.phone
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center gap-3"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(_sfc_main$n), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$o), {
                                        src: employee.avatar
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$p), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(employee.initials)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(employee.initials), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$o), {
                                          src: employee.avatar
                                        }, null, 8, ["src"]),
                                        createVNode(unref(_sfc_main$p), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(employee.initials), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`<div${_scopeId4}><div class="font-medium"${_scopeId4}>${ssrInterpolate(employee.name)}</div><div class="text-sm text-muted-foreground"${_scopeId4}>${ssrInterpolate(employee.phone)}</div></div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode(unref(_sfc_main$n), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$o), {
                                          src: employee.avatar
                                        }, null, 8, ["src"]),
                                        createVNode(unref(_sfc_main$p), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(employee.initials), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("div", null, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(employee.name), 1),
                                      createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(employee.phone), 1)
                                    ])
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(employee.role)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(employee.role), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(employee.branch)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(employee.branch), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center"${_scopeId4}><span class="${ssrRenderClass([
                                  employee.status === "Active" ? "bg-green-500" : "bg-gray-400",
                                  "mr-2 h-2 w-2 rounded-full"
                                ])}"${_scopeId4}></span> ${ssrInterpolate(employee.status)}</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center" }, [
                                    createVNode("span", {
                                      class: [
                                        "mr-2 h-2 w-2 rounded-full",
                                        employee.status === "Active" ? "bg-green-500" : "bg-gray-400"
                                      ]
                                    }, null, 2),
                                    createTextVNode(" " + toDisplayString(employee.status), 1)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div${_scopeId4}>${ssrInterpolate(employee.createdDate)}</div><div class="text-sm text-muted-foreground"${_scopeId4}>${ssrInterpolate(employee.createdBy)}</div>`);
                              } else {
                                return [
                                  createVNode("div", null, toDisplayString(employee.createdDate), 1),
                                  createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(employee.createdBy), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$m), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$9), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$a), { asChild: "" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$8), {
                                              variant: "ghost",
                                              size: "icon"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(ssrRenderComponent(unref(MoreVertical), { class: "h-4 w-4" }, null, _parent8, _scopeId7));
                                                  _push8(`<span class="sr-only"${_scopeId7}>Open menu</span>`);
                                                } else {
                                                  return [
                                                    createVNode(unref(MoreVertical), { class: "h-4 w-4" }),
                                                    createVNode("span", { class: "sr-only" }, "Open menu")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$8), {
                                                variant: "ghost",
                                                size: "icon"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(unref(MoreVertical), { class: "h-4 w-4" }),
                                                  createVNode("span", { class: "sr-only" }, "Open menu")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$b), { align: "end" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Edit`);
                                                } else {
                                                  return [
                                                    createTextVNode("Edit")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Change role`);
                                                } else {
                                                  return [
                                                    createTextVNode("Change role")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Deactivate`);
                                                } else {
                                                  return [
                                                    createTextVNode("Deactivate")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$q), null, null, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$c), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Delete`);
                                                } else {
                                                  return [
                                                    createTextVNode("Delete")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Edit")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Change role")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Deactivate")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$q)),
                                              createVNode(unref(_sfc_main$c), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Delete")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$a), { asChild: "" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$8), {
                                              variant: "ghost",
                                              size: "icon"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(unref(MoreVertical), { class: "h-4 w-4" }),
                                                createVNode("span", { class: "sr-only" }, "Open menu")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$b), { align: "end" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Edit")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Change role")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Deactivate")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$q)),
                                            createVNode(unref(_sfc_main$c), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Delete")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(unref(_sfc_main$9), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$a), { asChild: "" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$8), {
                                            variant: "ghost",
                                            size: "icon"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(unref(MoreVertical), { class: "h-4 w-4" }),
                                              createVNode("span", { class: "sr-only" }, "Open menu")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$b), { align: "end" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Edit")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Change role")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Deactivate")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$q)),
                                          createVNode(unref(_sfc_main$c), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Delete")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(_sfc_main$m), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode(unref(_sfc_main$n), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$o), {
                                        src: employee.avatar
                                      }, null, 8, ["src"]),
                                      createVNode(unref(_sfc_main$p), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(employee.initials), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode("div", null, [
                                    createVNode("div", { class: "font-medium" }, toDisplayString(employee.name), 1),
                                    createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(employee.phone), 1)
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$m), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(employee.role), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$m), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(employee.branch), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$m), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("span", {
                                    class: [
                                      "mr-2 h-2 w-2 rounded-full",
                                      employee.status === "Active" ? "bg-green-500" : "bg-gray-400"
                                    ]
                                  }, null, 2),
                                  createTextVNode(" " + toDisplayString(employee.status), 1)
                                ])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$m), null, {
                              default: withCtx(() => [
                                createVNode("div", null, toDisplayString(employee.createdDate), 1),
                                createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(employee.createdBy), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$m), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$9), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$a), { asChild: "" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$8), {
                                          variant: "ghost",
                                          size: "icon"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(unref(MoreVertical), { class: "h-4 w-4" }),
                                            createVNode("span", { class: "sr-only" }, "Open menu")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$b), { align: "end" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Edit")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Change role")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Deactivate")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$q)),
                                        createVNode(unref(_sfc_main$c), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Delete")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(employees.value, (employee) => {
                      return openBlock(), createBlock(unref(_sfc_main$f), {
                        key: employee.phone
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode(unref(_sfc_main$n), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$o), {
                                      src: employee.avatar
                                    }, null, 8, ["src"]),
                                    createVNode(unref(_sfc_main$p), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(employee.initials), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("div", null, [
                                  createVNode("div", { class: "font-medium" }, toDisplayString(employee.name), 1),
                                  createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(employee.phone), 1)
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(employee.role), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(employee.branch), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode("span", {
                                  class: [
                                    "mr-2 h-2 w-2 rounded-full",
                                    employee.status === "Active" ? "bg-green-500" : "bg-gray-400"
                                  ]
                                }, null, 2),
                                createTextVNode(" " + toDisplayString(employee.status), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode("div", null, toDisplayString(employee.createdDate), 1),
                              createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(employee.createdBy), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$m), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$9), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$a), { asChild: "" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$8), {
                                        variant: "ghost",
                                        size: "icon"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(unref(MoreVertical), { class: "h-4 w-4" }),
                                          createVNode("span", { class: "sr-only" }, "Open menu")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$b), { align: "end" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Edit")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Change role")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Deactivate")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$q)),
                                      createVNode(unref(_sfc_main$c), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Delete")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$e), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$f), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$g), null, {
                        default: withCtx(() => [
                          createTextVNode("Name / Phone no.")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$g), null, {
                        default: withCtx(() => [
                          createTextVNode(" Role "),
                          createVNode(unref(_sfc_main$h), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$i), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$j), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$k), null, {
                                    default: withCtx(() => [
                                      createVNode("p", null, "Employee role in the organization")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$g), null, {
                        default: withCtx(() => [
                          createTextVNode("Assigned Branch")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$g), null, {
                        default: withCtx(() => [
                          createVNode("button", {
                            onClick: toggleSort,
                            class: "flex items-center hover:text-primary focus:outline-none"
                          }, [
                            createTextVNode(" Status "),
                            (openBlock(), createBlock(resolveDynamicComponent(statusSortIcon.value), { class: "ml-1 h-4 w-4" }))
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$g), null, {
                        default: withCtx(() => [
                          createTextVNode("Created on / by")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$g), null, {
                        default: withCtx(() => [
                          createTextVNode("Actions")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$l), null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(employees.value, (employee) => {
                    return openBlock(), createBlock(unref(_sfc_main$f), {
                      key: employee.phone
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode(unref(_sfc_main$n), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$o), {
                                    src: employee.avatar
                                  }, null, 8, ["src"]),
                                  createVNode(unref(_sfc_main$p), null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(employee.initials), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode("div", null, [
                                createVNode("div", { class: "font-medium" }, toDisplayString(employee.name), 1),
                                createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(employee.phone), 1)
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(employee.role), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(employee.branch), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", {
                                class: [
                                  "mr-2 h-2 w-2 rounded-full",
                                  employee.status === "Active" ? "bg-green-500" : "bg-gray-400"
                                ]
                              }, null, 2),
                              createTextVNode(" " + toDisplayString(employee.status), 1)
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode("div", null, toDisplayString(employee.createdDate), 1),
                            createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(employee.createdBy), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$m), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$9), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$a), { asChild: "" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$8), {
                                      variant: "ghost",
                                      size: "icon"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(unref(MoreVertical), { class: "h-4 w-4" }),
                                        createVNode("span", { class: "sr-only" }, "Open menu")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(_sfc_main$b), { align: "end" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Edit")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Change role")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Deactivate")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$q)),
                                    createVNode(unref(_sfc_main$c), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Delete")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></main></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/admin/employee/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
