import { defineComponent, ref, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$7 } from "./BreadcrumbSeparator-EF14FTrJ.js";
import { e as _sfc_main$1, f as _sfc_main$2, d as _sfc_main$8, l as _sfc_main$k, m as _sfc_main$l, n as _sfc_main$m, o as _sfc_main$n, p as _sfc_main$q, q as _sfc_main$r, s as _sfc_main$s, i as _sfc_main$t, j as _sfc_main$u, k as _sfc_main$v, t as _sfc_main$w, v as _sfc_main$x } from "./App-B441prsD.js";
import { Plus, ChevronDown, CircleHelp, MoreVertical } from "lucide-vue-next";
import { _ as _sfc_main$g, a as _sfc_main$h, b as _sfc_main$i, c as _sfc_main$j, d as _sfc_main$o, e as _sfc_main$p } from "./TableHeader-BMEle1uT.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d, e as _sfc_main$e, f as _sfc_main$f } from "./SelectValue-C-A7JiIp.js";
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
    const breadcrumb = [
      { count: 1, label: "Loyalty Points History", action: false, href: "/" }
    ];
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
    const transactions = ref([
      {
        id: "#PTS00003706",
        name: "Aidan Rahman",
        phone: "+60 19-123 4567",
        date: "12 Mar 2025",
        time: "2:45 PM",
        points: -10,
        performedBy: "Aidan Rahman",
        role: "Operator — SSM Ipoh",
        avatar: "",
        initials: "AR"
      },
      {
        id: "#PTS00005205",
        name: "Farhan Lim",
        phone: "+60 18-234 5678",
        date: "20 May 2023",
        time: "3:15 PM",
        points: 15,
        performedBy: "Farhan Lim",
        role: "Operator — SSM Ipoh",
        avatar: "",
        initials: "FL"
      },
      {
        id: "#PTS00006403",
        name: "Zara Tan",
        phone: "+60 11-345 6789",
        date: "05 Apr 2023",
        time: "1:45 PM",
        points: -5,
        performedBy: "Zara Tan",
        role: "Employee — UiTM, Shah Alam",
        avatar: "",
        initials: "ZT"
      },
      {
        id: "#PTS00002901",
        name: "Siti Rahim",
        phone: "+60 20-456 7890",
        date: "30 Mar 2023",
        time: "10:30 AM",
        points: 20,
        performedBy: "Nina Farhana",
        role: "Employee — UiTM, Shah Alam",
        avatar: "",
        initials: "SR"
      },
      {
        id: "#PTS00008102",
        name: "Aisha Noor",
        phone: "+60 21-567 8901",
        date: "15 Feb 2023",
        time: "11:30 AM",
        points: -3,
        performedBy: "Nina Farhana",
        role: "Operator — Kafe Siswa USM",
        avatar: "",
        initials: "AN"
      },
      {
        id: "#PTS00004504",
        name: "Liam Yusof",
        phone: "+60 22-678 9012",
        date: "01 Jan 2023",
        time: "9:00 AM",
        points: 5,
        performedBy: "Nina Farhana",
        role: "Operator — Kafe Siswa USM",
        avatar: "",
        initials: "LY"
      }
    ]);
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
      _push(`</div></header><main class="space-y-6"><div class="flex justify-between"><div><h2 class="text-3xl font-bold tracking-tight"> Loyalty Points History </h2><p class="text-muted-foreground"> Manage your customer or add or redeem points </p></div><div class="flex gap-2">`);
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
      _push(`</div></div><div class="flex justify-between"><div>`);
      _push(ssrRenderComponent(unref(_sfc_main$9), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$a), { class: "w-[180px]" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$b), { placeholder: "UUM" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$b), { placeholder: "UUM" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$c), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$d), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$e), null, {
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
                          _push4(ssrRenderComponent(unref(_sfc_main$f), {
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
                          createVNode(unref(_sfc_main$e), null, {
                            default: withCtx(() => [
                              createTextVNode("Branch")
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(branches.value, (data, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$f), {
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
                    createVNode(unref(_sfc_main$d), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$e), null, {
                          default: withCtx(() => [
                            createTextVNode("Branch")
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(branches.value, (data, index) => {
                          return openBlock(), createBlock(unref(_sfc_main$f), {
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
              createVNode(unref(_sfc_main$a), { class: "w-[180px]" }, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$b), { placeholder: "UUM" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$c), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$d), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$e), null, {
                        default: withCtx(() => [
                          createTextVNode("Branch")
                        ]),
                        _: 1
                      }),
                      (openBlock(true), createBlock(Fragment, null, renderList(branches.value, (data, index) => {
                        return openBlock(), createBlock(unref(_sfc_main$f), {
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
      _push(`</div><div>`);
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
      _push(`</div></div><div>`);
      _push(ssrRenderComponent(unref(_sfc_main$g), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$h), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$i), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$j), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Ref. ID `);
                              _push5(ssrRenderComponent(unref(_sfc_main$k), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$l), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$m), null, {
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$n), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<p${_scopeId7}>Transaction reference ID</p>`);
                                              } else {
                                                return [
                                                  createVNode("p", null, "Transaction reference ID")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$m), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$n), null, {
                                              default: withCtx(() => [
                                                createVNode("p", null, "Transaction reference ID")
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
                                      createVNode(unref(_sfc_main$l), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$m), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$n), null, {
                                            default: withCtx(() => [
                                              createVNode("p", null, "Transaction reference ID")
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
                                createTextVNode(" Ref. ID "),
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$l), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$m), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$n), null, {
                                          default: withCtx(() => [
                                            createVNode("p", null, "Transaction reference ID")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$j), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Name / Phone Number`);
                            } else {
                              return [
                                createTextVNode("Name / Phone Number")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$j), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Date / Time`);
                            } else {
                              return [
                                createTextVNode("Date / Time")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$j), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Points`);
                            } else {
                              return [
                                createTextVNode("Points")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$j), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Performed by`);
                            } else {
                              return [
                                createTextVNode("Performed by")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$j), null, {
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
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createTextVNode(" Ref. ID "),
                              createVNode(unref(_sfc_main$k), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$l), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$m), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$n), null, {
                                        default: withCtx(() => [
                                          createVNode("p", null, "Transaction reference ID")
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
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createTextVNode("Name / Phone Number")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createTextVNode("Date / Time")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createTextVNode("Points")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createTextVNode("Performed by")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$j), null, {
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
                    createVNode(unref(_sfc_main$i), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$j), null, {
                          default: withCtx(() => [
                            createTextVNode(" Ref. ID "),
                            createVNode(unref(_sfc_main$k), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$l), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$m), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$n), null, {
                                      default: withCtx(() => [
                                        createVNode("p", null, "Transaction reference ID")
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
                        createVNode(unref(_sfc_main$j), null, {
                          default: withCtx(() => [
                            createTextVNode("Name / Phone Number")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), null, {
                          default: withCtx(() => [
                            createTextVNode("Date / Time")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), null, {
                          default: withCtx(() => [
                            createTextVNode("Points")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), null, {
                          default: withCtx(() => [
                            createTextVNode("Performed by")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$j), null, {
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
            _push2(ssrRenderComponent(unref(_sfc_main$o), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(transactions.value, (transaction) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$i), {
                      key: transaction.id,
                      class: "border-b"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$p), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(transaction.id)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(transaction.id), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$p), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center gap-3"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(_sfc_main$q), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$r), {
                                        src: transaction.avatar
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$s), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(transaction.initials)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(transaction.initials), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$r), {
                                          src: transaction.avatar
                                        }, null, 8, ["src"]),
                                        createVNode(unref(_sfc_main$s), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(transaction.initials), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`<div${_scopeId4}><div class="font-medium"${_scopeId4}>${ssrInterpolate(transaction.name)}</div><div class="text-sm text-muted-foreground"${_scopeId4}>${ssrInterpolate(transaction.phone)}</div></div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode(unref(_sfc_main$q), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$r), {
                                          src: transaction.avatar
                                        }, null, 8, ["src"]),
                                        createVNode(unref(_sfc_main$s), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(transaction.initials), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("div", null, [
                                      createVNode("div", { class: "font-medium" }, toDisplayString(transaction.name), 1),
                                      createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(transaction.phone), 1)
                                    ])
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$p), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div${_scopeId4}>${ssrInterpolate(transaction.date)}</div><div class="text-sm text-muted-foreground"${_scopeId4}>${ssrInterpolate(transaction.time)}</div>`);
                              } else {
                                return [
                                  createVNode("div", null, toDisplayString(transaction.date), 1),
                                  createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(transaction.time), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$p), {
                            class: transaction.points > 0 ? "text-green-600" : "text-red-600"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(transaction.points > 0 ? "+" : "")}${ssrInterpolate(transaction.points)} pts `);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(transaction.points > 0 ? "+" : "") + toDisplayString(transaction.points) + " pts ", 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$p), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div${_scopeId4}>${ssrInterpolate(transaction.performedBy)}</div><div class="text-sm text-muted-foreground"${_scopeId4}>${ssrInterpolate(transaction.role)}</div>`);
                              } else {
                                return [
                                  createVNode("div", null, toDisplayString(transaction.performedBy), 1),
                                  createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(transaction.role), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$p), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$t), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$u), { asChild: "" }, {
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
                                      _push6(ssrRenderComponent(unref(_sfc_main$v), { align: "end" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$w), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`View details`);
                                                } else {
                                                  return [
                                                    createTextVNode("View details")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$w), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Edit transaction`);
                                                } else {
                                                  return [
                                                    createTextVNode("Edit transaction")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$x), null, null, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$w), { class: "text-red-600" }, {
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
                                              createVNode(unref(_sfc_main$w), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("View details")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$w), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Edit transaction")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$x)),
                                              createVNode(unref(_sfc_main$w), { class: "text-red-600" }, {
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
                                        createVNode(unref(_sfc_main$u), { asChild: "" }, {
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
                                        createVNode(unref(_sfc_main$v), { align: "end" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$w), null, {
                                              default: withCtx(() => [
                                                createTextVNode("View details")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$w), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Edit transaction")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$x)),
                                            createVNode(unref(_sfc_main$w), { class: "text-red-600" }, {
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
                                  createVNode(unref(_sfc_main$t), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$u), { asChild: "" }, {
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
                                      createVNode(unref(_sfc_main$v), { align: "end" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$w), null, {
                                            default: withCtx(() => [
                                              createTextVNode("View details")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$w), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Edit transaction")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$x)),
                                          createVNode(unref(_sfc_main$w), { class: "text-red-600" }, {
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
                            createVNode(unref(_sfc_main$p), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(transaction.id), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$p), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode(unref(_sfc_main$q), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$r), {
                                        src: transaction.avatar
                                      }, null, 8, ["src"]),
                                      createVNode(unref(_sfc_main$s), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(transaction.initials), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode("div", null, [
                                    createVNode("div", { class: "font-medium" }, toDisplayString(transaction.name), 1),
                                    createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(transaction.phone), 1)
                                  ])
                                ])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$p), null, {
                              default: withCtx(() => [
                                createVNode("div", null, toDisplayString(transaction.date), 1),
                                createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(transaction.time), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$p), {
                              class: transaction.points > 0 ? "text-green-600" : "text-red-600"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(transaction.points > 0 ? "+" : "") + toDisplayString(transaction.points) + " pts ", 1)
                              ]),
                              _: 2
                            }, 1032, ["class"]),
                            createVNode(unref(_sfc_main$p), null, {
                              default: withCtx(() => [
                                createVNode("div", null, toDisplayString(transaction.performedBy), 1),
                                createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(transaction.role), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$p), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$t), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$u), { asChild: "" }, {
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
                                    createVNode(unref(_sfc_main$v), { align: "end" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$w), null, {
                                          default: withCtx(() => [
                                            createTextVNode("View details")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$w), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Edit transaction")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$x)),
                                        createVNode(unref(_sfc_main$w), { class: "text-red-600" }, {
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
                    (openBlock(true), createBlock(Fragment, null, renderList(transactions.value, (transaction) => {
                      return openBlock(), createBlock(unref(_sfc_main$i), {
                        key: transaction.id,
                        class: "border-b"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$p), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(transaction.id), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$p), null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode(unref(_sfc_main$q), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$r), {
                                      src: transaction.avatar
                                    }, null, 8, ["src"]),
                                    createVNode(unref(_sfc_main$s), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(transaction.initials), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("div", null, [
                                  createVNode("div", { class: "font-medium" }, toDisplayString(transaction.name), 1),
                                  createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(transaction.phone), 1)
                                ])
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$p), null, {
                            default: withCtx(() => [
                              createVNode("div", null, toDisplayString(transaction.date), 1),
                              createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(transaction.time), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$p), {
                            class: transaction.points > 0 ? "text-green-600" : "text-red-600"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(transaction.points > 0 ? "+" : "") + toDisplayString(transaction.points) + " pts ", 1)
                            ]),
                            _: 2
                          }, 1032, ["class"]),
                          createVNode(unref(_sfc_main$p), null, {
                            default: withCtx(() => [
                              createVNode("div", null, toDisplayString(transaction.performedBy), 1),
                              createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(transaction.role), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$p), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$t), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$u), { asChild: "" }, {
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
                                  createVNode(unref(_sfc_main$v), { align: "end" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$w), null, {
                                        default: withCtx(() => [
                                          createTextVNode("View details")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$w), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Edit transaction")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$x)),
                                      createVNode(unref(_sfc_main$w), { class: "text-red-600" }, {
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
              createVNode(unref(_sfc_main$h), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$i), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$j), null, {
                        default: withCtx(() => [
                          createTextVNode(" Ref. ID "),
                          createVNode(unref(_sfc_main$k), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$l), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$m), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$n), null, {
                                    default: withCtx(() => [
                                      createVNode("p", null, "Transaction reference ID")
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
                      createVNode(unref(_sfc_main$j), null, {
                        default: withCtx(() => [
                          createTextVNode("Name / Phone Number")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$j), null, {
                        default: withCtx(() => [
                          createTextVNode("Date / Time")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$j), null, {
                        default: withCtx(() => [
                          createTextVNode("Points")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$j), null, {
                        default: withCtx(() => [
                          createTextVNode("Performed by")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$j), null, {
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
              createVNode(unref(_sfc_main$o), null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(transactions.value, (transaction) => {
                    return openBlock(), createBlock(unref(_sfc_main$i), {
                      key: transaction.id,
                      class: "border-b"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$p), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(transaction.id), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$p), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode(unref(_sfc_main$q), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$r), {
                                    src: transaction.avatar
                                  }, null, 8, ["src"]),
                                  createVNode(unref(_sfc_main$s), null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(transaction.initials), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode("div", null, [
                                createVNode("div", { class: "font-medium" }, toDisplayString(transaction.name), 1),
                                createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(transaction.phone), 1)
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$p), null, {
                          default: withCtx(() => [
                            createVNode("div", null, toDisplayString(transaction.date), 1),
                            createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(transaction.time), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$p), {
                          class: transaction.points > 0 ? "text-green-600" : "text-red-600"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(transaction.points > 0 ? "+" : "") + toDisplayString(transaction.points) + " pts ", 1)
                          ]),
                          _: 2
                        }, 1032, ["class"]),
                        createVNode(unref(_sfc_main$p), null, {
                          default: withCtx(() => [
                            createVNode("div", null, toDisplayString(transaction.performedBy), 1),
                            createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(transaction.role), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$p), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$t), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$u), { asChild: "" }, {
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
                                createVNode(unref(_sfc_main$v), { align: "end" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$w), null, {
                                      default: withCtx(() => [
                                        createTextVNode("View details")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$w), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Edit transaction")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$x)),
                                    createVNode(unref(_sfc_main$w), { class: "text-red-600" }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/admin/loyalty/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
