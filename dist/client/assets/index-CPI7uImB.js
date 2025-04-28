import { defineComponent, ref, computed, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, createCommentVNode, Fragment, renderList, resolveDynamicComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderVNode, ssrRenderClass } from "vue/server-renderer";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$7 } from "./BreadcrumbSeparator-EF14FTrJ.js";
import { e as _sfc_main$1, f as _sfc_main$2, d as _sfc_main$8, b as _sfc_main$9, l as _sfc_main$l, m as _sfc_main$m, n as _sfc_main$n, o as _sfc_main$o, p as _sfc_main$r, q as _sfc_main$s, s as _sfc_main$t, i as _sfc_main$u, j as _sfc_main$v, k as _sfc_main$w, t as _sfc_main$x, v as _sfc_main$y } from "./App-B441prsD.js";
import { ChevronUp, ChevronDown, Plus, Search, CircleHelp, MoreVertical } from "lucide-vue-next";
import { _ as _sfc_main$h, a as _sfc_main$i, b as _sfc_main$j, c as _sfc_main$k, d as _sfc_main$p, e as _sfc_main$q } from "./TableHeader-BMEle1uT.js";
import { _ as _sfc_main$a, a as _sfc_main$b, b as _sfc_main$c, c as _sfc_main$d, d as _sfc_main$e, e as _sfc_main$f, f as _sfc_main$g } from "./SelectValue-C-A7JiIp.js";
import "reka-ui";
import "vue-router";
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
    const breadcrumb = [{ count: 1, label: "Customers", action: false, href: "/" }];
    const searchTerm = ref("");
    const sortDirection = ref(null);
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
    const customersData = [
      {
        name: "Nadia Rahman",
        phone: "+60 15-678 9012",
        points: 375,
        totalSpent: "45.60",
        createdDate: "12 Mar 2025",
        createdBy: "Self sign up",
        avatar: "",
        initials: "NR",
        status: "Active"
      },
      {
        name: "Farah Lim",
        phone: "+60 13-456 7890",
        points: 520,
        totalSpent: "32.75",
        createdDate: "20 May 2023",
        createdBy: "Operator — SSM Ipoh",
        avatar: "",
        initials: "FL",
        status: "Inactive"
      },
      {
        name: "Zara Wong",
        phone: "+60 14-567 8901",
        points: 640,
        totalSpent: "28.90",
        createdDate: "05 Apr 2023",
        createdBy: "Employee — UiTM, Shah Alam",
        avatar: "",
        initials: "ZW",
        status: "Active"
      },
      {
        name: "Siti Aisyah",
        phone: "+60 16-789 0123",
        points: 290,
        totalSpent: "50.00",
        createdDate: "30 Mar 2023",
        createdBy: "Operator — Kafe Siswa USM",
        avatar: "",
        initials: "SA",
        status: "Active"
      },
      {
        name: "Aisha Tan",
        phone: "+60 12-345 6789",
        points: 810,
        totalSpent: "37.25",
        createdDate: "15 Feb 2023",
        createdBy: "Employee — KPJ Tawakkal",
        avatar: "",
        initials: "AT",
        status: "Inactive"
      },
      {
        name: "Lina Yusof",
        phone: "+60 17-890 1234",
        points: 455,
        totalSpent: "41.15",
        createdDate: "01 Jan 2023",
        createdBy: "Employee — UUM SoM",
        avatar: "",
        initials: "LY",
        status: "Active"
      },
      {
        name: "Kamal Ibrahim",
        phone: "+60 19-234 5678",
        points: 180,
        totalSpent: "15.50",
        createdDate: "10 Jun 2023",
        createdBy: "Self sign up",
        avatar: "",
        initials: "KI",
        status: "Inactive"
      },
      {
        name: "Mei Lin Chen",
        phone: "+60 11-789 0123",
        points: 320,
        totalSpent: "27.80",
        createdDate: "25 Apr 2023",
        createdBy: "Operator — UTM Skudai",
        avatar: "",
        initials: "MC",
        status: "Inactive"
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
    const customers = computed(() => {
      let filteredData = customersData;
      if (searchTerm.value.trim()) {
        const term = searchTerm.value.toLowerCase();
        filteredData = customersData.filter(
          (customer) => customer.name.toLowerCase().includes(term) || customer.phone.toLowerCase().includes(term) || customer.createdBy.toLowerCase().includes(term)
        );
      }
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
      _push(`</div></header><main class="space-y-6"><div class="flex justify-between"><div><h2 class="text-3xl font-bold tracking-tight">Customers</h2><p class="text-muted-foreground"> Manage your customer or add or redeem points </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$8), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Plus), null, null, _parent2, _scopeId));
            _push2(` New Customer`);
          } else {
            return [
              createVNode(unref(Plus)),
              createTextVNode(" New Customer")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div><div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-4"><div class="relative w-full sm:max-w-xs">`);
      _push(ssrRenderComponent(unref(Search), { class: "absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$9), {
        type: "search",
        placeholder: "Search customers...",
        class: "w-full pl-8 bg-background",
        modelValue: searchTerm.value,
        "onUpdate:modelValue": ($event) => searchTerm.value = $event
      }, null, _parent));
      _push(`</div><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$a), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$b), { class: "w-[180px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$c), { placeholder: "Select a branch" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$c), { placeholder: "Select a branch" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$d), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$e), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$f), null, {
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
                          _push4(ssrRenderComponent(unref(_sfc_main$g), {
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
                          createVNode(unref(_sfc_main$f), null, {
                            default: withCtx(() => [
                              createTextVNode("Branch")
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(branches.value, (data, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$g), {
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
                    createVNode(unref(_sfc_main$e), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$f), null, {
                          default: withCtx(() => [
                            createTextVNode("Branch")
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(branches.value, (data, index) => {
                          return openBlock(), createBlock(unref(_sfc_main$g), {
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
              createVNode(unref(_sfc_main$b), { class: "w-[180px]" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$c), { placeholder: "Select a branch" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$d), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$e), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$f), null, {
                        default: withCtx(() => [
                          createTextVNode("Branch")
                        ]),
                        _: 1
                      }),
                      (openBlock(true), createBlock(Fragment, null, renderList(branches.value, (data, index) => {
                        return openBlock(), createBlock(unref(_sfc_main$g), {
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
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        variant: "outline",
        class: "gap-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Filter `);
            _push2(ssrRenderComponent(unref(ChevronDown), { class: "h-4 w-4" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Filter "),
              createVNode(unref(ChevronDown), { class: "h-4 w-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
      _push(ssrRenderComponent(unref(_sfc_main$h), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$i), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$j), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$k), null, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$k), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Point Balance `);
                              _push5(ssrRenderComponent(unref(_sfc_main$l), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$m), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$n), null, {
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$o), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<p${_scopeId7}>Customer loyalty points balance</p>`);
                                              } else {
                                                return [
                                                  createVNode("p", null, "Customer loyalty points balance")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$n), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$o), null, {
                                              default: withCtx(() => [
                                                createVNode("p", null, "Customer loyalty points balance")
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
                                      createVNode(unref(_sfc_main$m), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$n), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$o), null, {
                                            default: withCtx(() => [
                                              createVNode("p", null, "Customer loyalty points balance")
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
                                createTextVNode(" Point Balance "),
                                createVNode(unref(_sfc_main$l), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$m), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$n), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$o), null, {
                                          default: withCtx(() => [
                                            createVNode("p", null, "Customer loyalty points balance")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$k), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total spent`);
                            } else {
                              return [
                                createTextVNode("Total spent")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$k), null, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$k), null, {
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
                        _push4(ssrRenderComponent(unref(_sfc_main$k), null, {
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
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode("Name / Phone no.")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode(" Point Balance "),
                              createVNode(unref(_sfc_main$l), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$m), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$n), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$o), null, {
                                        default: withCtx(() => [
                                          createVNode("p", null, "Customer loyalty points balance")
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
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode("Total spent")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createTextVNode("Created on / by")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$k), null, {
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
                          createVNode(unref(_sfc_main$k), null, {
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
                    createVNode(unref(_sfc_main$j), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$k), null, {
                          default: withCtx(() => [
                            createTextVNode("Name / Phone no.")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$k), null, {
                          default: withCtx(() => [
                            createTextVNode(" Point Balance "),
                            createVNode(unref(_sfc_main$l), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$m), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$n), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$o), null, {
                                      default: withCtx(() => [
                                        createVNode("p", null, "Customer loyalty points balance")
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
                        createVNode(unref(_sfc_main$k), null, {
                          default: withCtx(() => [
                            createTextVNode("Total spent")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$k), null, {
                          default: withCtx(() => [
                            createTextVNode("Created on / by")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$k), null, {
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
                        createVNode(unref(_sfc_main$k), null, {
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
            _push2(ssrRenderComponent(unref(_sfc_main$p), { class: "space-y-8" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(customers.value, (customer) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$j), {
                      key: customer.phone,
                      class: ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$q), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center gap-3"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(_sfc_main$r), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$s), {
                                        src: customer.avatar
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$t), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(customer.initials)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(customer.initials), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$s), {
                                          src: customer.avatar
                                        }, null, 8, ["src"]),
                                        createVNode(unref(_sfc_main$t), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(customer.initials), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`<div${_scopeId4}><div class="font-medium"${_scopeId4}>${ssrInterpolate(customer.name)}</div><div class="text-sm text-muted-foreground"${_scopeId4}>${ssrInterpolate(customer.phone)}</div></div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode(unref(_sfc_main$r), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$s), {
                                          src: customer.avatar
                                        }, null, 8, ["src"]),
                                        createVNode(unref(_sfc_main$t), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(customer.initials), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("div", null, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(customer.name), 1),
                                      createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(customer.phone), 1)
                                    ])
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$q), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(customer.points)} pts`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(customer.points) + " pts", 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$q), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`RM ${ssrInterpolate(customer.totalSpent)}`);
                              } else {
                                return [
                                  createTextVNode("RM " + toDisplayString(customer.totalSpent), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$q), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div${_scopeId4}>${ssrInterpolate(customer.createdDate)}</div><div class="text-sm text-muted-foreground"${_scopeId4}>${ssrInterpolate(customer.createdBy)}</div>`);
                              } else {
                                return [
                                  createVNode("div", null, toDisplayString(customer.createdDate), 1),
                                  createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(customer.createdBy), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$q), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center"${_scopeId4}><span class="${ssrRenderClass([
                                  customer.status === "Active" ? "bg-green-500" : "bg-gray-400",
                                  "mr-2 h-2 w-2 rounded-full"
                                ])}"${_scopeId4}></span> ${ssrInterpolate(customer.status)}</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center" }, [
                                    createVNode("span", {
                                      class: [
                                        "mr-2 h-2 w-2 rounded-full",
                                        customer.status === "Active" ? "bg-green-500" : "bg-gray-400"
                                      ]
                                    }, null, 2),
                                    createTextVNode(" " + toDisplayString(customer.status), 1)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$q), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$u), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$v), { asChild: "" }, {
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
                                      _push6(ssrRenderComponent(unref(_sfc_main$w), { align: "end" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$x), null, {
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$x), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Add points`);
                                                } else {
                                                  return [
                                                    createTextVNode("Add points")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$x), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Redeem points`);
                                                } else {
                                                  return [
                                                    createTextVNode("Redeem points")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$y), null, null, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$x), null, {
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
                                              createVNode(unref(_sfc_main$x), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Edit")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$x), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Add points")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$x), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Redeem points")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$y)),
                                              createVNode(unref(_sfc_main$x), null, {
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
                                        createVNode(unref(_sfc_main$v), { asChild: "" }, {
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
                                        createVNode(unref(_sfc_main$w), { align: "end" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$x), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Edit")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$x), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Add points")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$x), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Redeem points")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$y)),
                                            createVNode(unref(_sfc_main$x), null, {
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
                                  createVNode(unref(_sfc_main$u), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$v), { asChild: "" }, {
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
                                      createVNode(unref(_sfc_main$w), { align: "end" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$x), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Edit")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$x), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Add points")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$x), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Redeem points")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$y)),
                                          createVNode(unref(_sfc_main$x), null, {
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
                            createVNode(unref(_sfc_main$q), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode(unref(_sfc_main$r), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$s), {
                                        src: customer.avatar
                                      }, null, 8, ["src"]),
                                      createVNode(unref(_sfc_main$t), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(customer.initials), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode("div", null, [
                                    createVNode("div", { class: "font-medium" }, toDisplayString(customer.name), 1),
                                    createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(customer.phone), 1)
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$q), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(customer.points) + " pts", 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$q), null, {
                              default: withCtx(() => [
                                createTextVNode("RM " + toDisplayString(customer.totalSpent), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$q), null, {
                              default: withCtx(() => [
                                createVNode("div", null, toDisplayString(customer.createdDate), 1),
                                createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(customer.createdBy), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$q), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center" }, [
                                  createVNode("span", {
                                    class: [
                                      "mr-2 h-2 w-2 rounded-full",
                                      customer.status === "Active" ? "bg-green-500" : "bg-gray-400"
                                    ]
                                  }, null, 2),
                                  createTextVNode(" " + toDisplayString(customer.status), 1)
                                ])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$q), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$u), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$v), { asChild: "" }, {
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
                                    createVNode(unref(_sfc_main$w), { align: "end" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$x), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Edit")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$x), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Add points")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$x), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Redeem points")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$y)),
                                        createVNode(unref(_sfc_main$x), null, {
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
                    (openBlock(true), createBlock(Fragment, null, renderList(customers.value, (customer) => {
                      return openBlock(), createBlock(unref(_sfc_main$j), {
                        key: customer.phone,
                        class: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$q), null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode(unref(_sfc_main$r), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$s), {
                                      src: customer.avatar
                                    }, null, 8, ["src"]),
                                    createVNode(unref(_sfc_main$t), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(customer.initials), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("div", null, [
                                  createVNode("div", { class: "font-medium" }, toDisplayString(customer.name), 1),
                                  createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(customer.phone), 1)
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$q), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(customer.points) + " pts", 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$q), null, {
                            default: withCtx(() => [
                              createTextVNode("RM " + toDisplayString(customer.totalSpent), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$q), null, {
                            default: withCtx(() => [
                              createVNode("div", null, toDisplayString(customer.createdDate), 1),
                              createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(customer.createdBy), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$q), null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center" }, [
                                createVNode("span", {
                                  class: [
                                    "mr-2 h-2 w-2 rounded-full",
                                    customer.status === "Active" ? "bg-green-500" : "bg-gray-400"
                                  ]
                                }, null, 2),
                                createTextVNode(" " + toDisplayString(customer.status), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$q), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$u), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$v), { asChild: "" }, {
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
                                  createVNode(unref(_sfc_main$w), { align: "end" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$x), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Edit")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$x), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Add points")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$x), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Redeem points")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$y)),
                                      createVNode(unref(_sfc_main$x), null, {
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
              createVNode(unref(_sfc_main$i), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$j), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$k), null, {
                        default: withCtx(() => [
                          createTextVNode("Name / Phone no.")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$k), null, {
                        default: withCtx(() => [
                          createTextVNode(" Point Balance "),
                          createVNode(unref(_sfc_main$l), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$m), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$n), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$o), null, {
                                    default: withCtx(() => [
                                      createVNode("p", null, "Customer loyalty points balance")
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
                      createVNode(unref(_sfc_main$k), null, {
                        default: withCtx(() => [
                          createTextVNode("Total spent")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$k), null, {
                        default: withCtx(() => [
                          createTextVNode("Created on / by")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$k), null, {
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
                      createVNode(unref(_sfc_main$k), null, {
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
              createVNode(unref(_sfc_main$p), { class: "space-y-8" }, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(customers.value, (customer) => {
                    return openBlock(), createBlock(unref(_sfc_main$j), {
                      key: customer.phone,
                      class: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$q), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode(unref(_sfc_main$r), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$s), {
                                    src: customer.avatar
                                  }, null, 8, ["src"]),
                                  createVNode(unref(_sfc_main$t), null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(customer.initials), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode("div", null, [
                                createVNode("div", { class: "font-medium" }, toDisplayString(customer.name), 1),
                                createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(customer.phone), 1)
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$q), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(customer.points) + " pts", 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$q), null, {
                          default: withCtx(() => [
                            createTextVNode("RM " + toDisplayString(customer.totalSpent), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$q), null, {
                          default: withCtx(() => [
                            createVNode("div", null, toDisplayString(customer.createdDate), 1),
                            createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(customer.createdBy), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$q), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center" }, [
                              createVNode("span", {
                                class: [
                                  "mr-2 h-2 w-2 rounded-full",
                                  customer.status === "Active" ? "bg-green-500" : "bg-gray-400"
                                ]
                              }, null, 2),
                              createTextVNode(" " + toDisplayString(customer.status), 1)
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$q), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$u), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$v), { asChild: "" }, {
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
                                createVNode(unref(_sfc_main$w), { align: "end" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$x), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Edit")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$x), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Add points")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$x), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Redeem points")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$y)),
                                    createVNode(unref(_sfc_main$x), null, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/admin/customers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
