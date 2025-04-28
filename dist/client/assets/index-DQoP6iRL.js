import { defineComponent, ref, unref, withCtx, createTextVNode, toDisplayString, createBlock, openBlock, createVNode, createCommentVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
import { _ as _sfc_main$3, a as _sfc_main$4, b as _sfc_main$5, c as _sfc_main$6, d as _sfc_main$7 } from "./BreadcrumbSeparator-EF14FTrJ.js";
import { e as _sfc_main$1, f as _sfc_main$2, d as _sfc_main$8, l as _sfc_main$j, m as _sfc_main$k, n as _sfc_main$l, o as _sfc_main$m, p as _sfc_main$p, q as _sfc_main$q, s as _sfc_main$r, i as _sfc_main$s, j as _sfc_main$t, k as _sfc_main$u, t as _sfc_main$v, v as _sfc_main$w } from "./App-B441prsD.js";
import { Plus, ChevronDown, CircleHelp, MoreVertical } from "lucide-vue-next";
import { _ as _sfc_main$f, a as _sfc_main$g, b as _sfc_main$h, c as _sfc_main$i, d as _sfc_main$n, e as _sfc_main$o } from "./TableHeader-BMEle1uT.js";
import { _ as _sfc_main$9, a as _sfc_main$a, b as _sfc_main$b, c as _sfc_main$c, d as _sfc_main$d, f as _sfc_main$e } from "./SelectValue-C-A7JiIp.js";
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
      { count: 1, label: "List of Branch", action: false, href: "/" }
    ];
    const branches = ref([
      {
        title: "UiTM Shah Alam",
        value: "uitm"
      },
      {
        title: "UM Sentral",
        value: "um-sentral"
      },
      {
        title: "UM - KK12",
        value: "um-kk12"
      },
      {
        title: "UPM - Library",
        value: "upm-library"
      },
      {
        title: "USM - Kafe Siswa",
        value: "usm-kafe"
      },
      {
        title: "IIUM Gombak",
        value: "iium"
      }
    ]);
    const branchList = ref([
      {
        id: 1,
        name: "UiTM Shah Alam",
        locationName: "Universiti Teknologi MARA",
        address: "40450 Shah Alam, Selangor, Malaysia",
        admin: "Aiman Othman",
        adminAvatar: "",
        adminInitials: "AO",
        totalStaff: 5,
        createdOn: "12 Mar 2025"
      },
      {
        id: 2,
        name: "UM Sentral",
        locationName: "Universiti Malaya, Jalan Universiti",
        address: "50603 Kuala Lumpur, Malaysia",
        admin: "Syafiq Rahim",
        adminAvatar: "",
        adminInitials: "SR",
        totalStaff: 10,
        createdOn: "20 May 2023"
      },
      {
        id: 3,
        name: "UM - KK12",
        locationName: "Universiti Malaya, Jalan Universiti",
        address: "50603 Kuala Lumpur, Malaysia",
        admin: "Farhan Idris",
        adminAvatar: "",
        adminInitials: "FI",
        totalStaff: 30,
        createdOn: "05 Apr 2023"
      },
      {
        id: 4,
        name: "UPM - Library",
        locationName: "Universiti Putra Malaysia",
        address: "43400 Serdang, Selangor, Malaysia",
        admin: "Aiman Zulkifli",
        adminAvatar: "",
        adminInitials: "AZ",
        totalStaff: 15,
        createdOn: "30 Mar 2023"
      },
      {
        id: 5,
        name: "USM - Kafe Siswa",
        locationName: "Café Siswa, Universiti Sains Malaysia",
        address: "11800 Pulau Pinang, Malaysia",
        admin: "Hafiz Azman",
        adminAvatar: "",
        adminInitials: "HA",
        totalStaff: 25,
        createdOn: "15 Feb 2023"
      },
      {
        id: 6,
        name: "IIUM Gambang",
        locationName: "Gambang",
        address: "26300 Kuantan, Pahang, Malaysia",
        admin: "Zainal Rahman",
        adminAvatar: "",
        adminInitials: "ZR",
        totalStaff: 20,
        createdOn: "01 Jan 2023"
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
      _push(`</div></header><main class="space-y-6"><div class="flex justify-between"><div><h2 class="text-3xl font-bold tracking-tight">List of Branch</h2><p class="text-muted-foreground"> Manage or create He &amp; She branches </p></div><div class="flex gap-2">`);
      _push(ssrRenderComponent(unref(_sfc_main$8), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Plus), { class: "mr-2 h-4 w-4" }, null, _parent2, _scopeId));
            _push2(` New Branch `);
          } else {
            return [
              createVNode(unref(Plus), { class: "mr-2 h-4 w-4" }),
              createTextVNode(" New Branch ")
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
                  _push3(ssrRenderComponent(unref(_sfc_main$b), { placeholder: "All branchs" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(_sfc_main$b), { placeholder: "All branchs" })
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
                        _push4(ssrRenderComponent(unref(_sfc_main$e), { value: "all" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`All branchs`);
                            } else {
                              return [
                                createTextVNode("All branchs")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<!--[-->`);
                        ssrRenderList(branches.value, (data, index) => {
                          _push4(ssrRenderComponent(unref(_sfc_main$e), {
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
                          createVNode(unref(_sfc_main$e), { value: "all" }, {
                            default: withCtx(() => [
                              createTextVNode("All branchs")
                            ]),
                            _: 1
                          }),
                          (openBlock(true), createBlock(Fragment, null, renderList(branches.value, (data, index) => {
                            return openBlock(), createBlock(unref(_sfc_main$e), {
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
                        createVNode(unref(_sfc_main$e), { value: "all" }, {
                          default: withCtx(() => [
                            createTextVNode("All branchs")
                          ]),
                          _: 1
                        }),
                        (openBlock(true), createBlock(Fragment, null, renderList(branches.value, (data, index) => {
                          return openBlock(), createBlock(unref(_sfc_main$e), {
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
                  createVNode(unref(_sfc_main$b), { placeholder: "All branchs" })
                ]),
                _: 1
              }),
              createVNode(unref(_sfc_main$c), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$d), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$e), { value: "all" }, {
                        default: withCtx(() => [
                          createTextVNode("All branchs")
                        ]),
                        _: 1
                      }),
                      (openBlock(true), createBlock(Fragment, null, renderList(branches.value, (data, index) => {
                        return openBlock(), createBlock(unref(_sfc_main$e), {
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
      _push(ssrRenderComponent(unref(_sfc_main$f), null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$g), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(_sfc_main$h), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Branch Name`);
                            } else {
                              return [
                                createTextVNode("Branch Name")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Location `);
                              _push5(ssrRenderComponent(unref(_sfc_main$j), null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(unref(_sfc_main$k), null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(unref(_sfc_main$l), null, {
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
                                          _push7(ssrRenderComponent(unref(_sfc_main$m), null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`<p${_scopeId7}>Branch location</p>`);
                                              } else {
                                                return [
                                                  createVNode("p", null, "Branch location")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(unref(_sfc_main$l), null, {
                                              default: withCtx(() => [
                                                createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$m), null, {
                                              default: withCtx(() => [
                                                createVNode("p", null, "Branch location")
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
                                      createVNode(unref(_sfc_main$k), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$l), null, {
                                            default: withCtx(() => [
                                              createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$m), null, {
                                            default: withCtx(() => [
                                              createVNode("p", null, "Branch location")
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
                                createTextVNode(" Location "),
                                createVNode(unref(_sfc_main$j), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$k), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$l), null, {
                                          default: withCtx(() => [
                                            createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$m), null, {
                                          default: withCtx(() => [
                                            createVNode("p", null, "Branch location")
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
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Branch Admin`);
                            } else {
                              return [
                                createTextVNode("Branch Admin")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Staff`);
                            } else {
                              return [
                                createTextVNode("Total Staff")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Created on`);
                            } else {
                              return [
                                createTextVNode("Created on")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(_sfc_main$i), null, {
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
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              createTextVNode("Branch Name")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              createTextVNode(" Location "),
                              createVNode(unref(_sfc_main$j), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$k), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$l), null, {
                                        default: withCtx(() => [
                                          createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$m), null, {
                                        default: withCtx(() => [
                                          createVNode("p", null, "Branch location")
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
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              createTextVNode("Branch Admin")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              createTextVNode("Total Staff")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), null, {
                            default: withCtx(() => [
                              createTextVNode("Created on")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(_sfc_main$i), null, {
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
                    createVNode(unref(_sfc_main$h), null, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createTextVNode("Branch Name")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createTextVNode(" Location "),
                            createVNode(unref(_sfc_main$j), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$k), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$l), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$m), null, {
                                      default: withCtx(() => [
                                        createVNode("p", null, "Branch location")
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
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createTextVNode("Branch Admin")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createTextVNode("Total Staff")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), null, {
                          default: withCtx(() => [
                            createTextVNode("Created on")
                          ]),
                          _: 1
                        }),
                        createVNode(unref(_sfc_main$i), null, {
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
            _push2(ssrRenderComponent(unref(_sfc_main$n), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(branchList.value, (branch) => {
                    _push3(ssrRenderComponent(unref(_sfc_main$h), {
                      key: branch.id,
                      class: "border-b"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(_sfc_main$o), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(branch.name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(branch.name), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$o), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div${_scopeId4}>${ssrInterpolate(branch.locationName)}</div><div class="text-sm text-muted-foreground"${_scopeId4}>${ssrInterpolate(branch.address)}</div>`);
                              } else {
                                return [
                                  createVNode("div", null, toDisplayString(branch.locationName), 1),
                                  createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(branch.address), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$o), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="flex items-center gap-3"${_scopeId4}>`);
                                _push5(ssrRenderComponent(unref(_sfc_main$p), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$q), {
                                        src: branch.adminAvatar
                                      }, null, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(unref(_sfc_main$r), null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(branch.adminInitials)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(branch.adminInitials), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(unref(_sfc_main$q), {
                                          src: branch.adminAvatar
                                        }, null, 8, ["src"]),
                                        createVNode(unref(_sfc_main$r), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(branch.adminInitials), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`<div${_scopeId4}>${ssrInterpolate(branch.admin)}</div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "flex items-center gap-3" }, [
                                    createVNode(unref(_sfc_main$p), null, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$q), {
                                          src: branch.adminAvatar
                                        }, null, 8, ["src"]),
                                        createVNode(unref(_sfc_main$r), null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(branch.adminInitials), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("div", null, toDisplayString(branch.admin), 1)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$o), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(branch.totalStaff)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(branch.totalStaff), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$o), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(branch.createdOn)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(branch.createdOn), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(unref(_sfc_main$o), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(_sfc_main$s), null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(unref(_sfc_main$t), { asChild: "" }, {
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
                                      _push6(ssrRenderComponent(unref(_sfc_main$u), { align: "end" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(unref(_sfc_main$v), null, {
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
                                            _push7(ssrRenderComponent(unref(_sfc_main$v), null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Edit branch`);
                                                } else {
                                                  return [
                                                    createTextVNode("Edit branch")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$w), null, null, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(unref(_sfc_main$v), { class: "text-red-600" }, {
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
                                              createVNode(unref(_sfc_main$v), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("View details")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$v), null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Edit branch")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(unref(_sfc_main$w)),
                                              createVNode(unref(_sfc_main$v), { class: "text-red-600" }, {
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
                                        createVNode(unref(_sfc_main$t), { asChild: "" }, {
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
                                        createVNode(unref(_sfc_main$u), { align: "end" }, {
                                          default: withCtx(() => [
                                            createVNode(unref(_sfc_main$v), null, {
                                              default: withCtx(() => [
                                                createTextVNode("View details")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$v), null, {
                                              default: withCtx(() => [
                                                createTextVNode("Edit branch")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(unref(_sfc_main$w)),
                                            createVNode(unref(_sfc_main$v), { class: "text-red-600" }, {
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
                                  createVNode(unref(_sfc_main$s), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$t), { asChild: "" }, {
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
                                      createVNode(unref(_sfc_main$u), { align: "end" }, {
                                        default: withCtx(() => [
                                          createVNode(unref(_sfc_main$v), null, {
                                            default: withCtx(() => [
                                              createTextVNode("View details")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$v), null, {
                                            default: withCtx(() => [
                                              createTextVNode("Edit branch")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(unref(_sfc_main$w)),
                                          createVNode(unref(_sfc_main$v), { class: "text-red-600" }, {
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
                            createVNode(unref(_sfc_main$o), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(branch.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$o), null, {
                              default: withCtx(() => [
                                createVNode("div", null, toDisplayString(branch.locationName), 1),
                                createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(branch.address), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$o), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "flex items-center gap-3" }, [
                                  createVNode(unref(_sfc_main$p), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$q), {
                                        src: branch.adminAvatar
                                      }, null, 8, ["src"]),
                                      createVNode(unref(_sfc_main$r), null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(branch.adminInitials), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode("div", null, toDisplayString(branch.admin), 1)
                                ])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$o), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(branch.totalStaff), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$o), null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(branch.createdOn), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(unref(_sfc_main$o), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$s), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$t), { asChild: "" }, {
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
                                    createVNode(unref(_sfc_main$u), { align: "end" }, {
                                      default: withCtx(() => [
                                        createVNode(unref(_sfc_main$v), null, {
                                          default: withCtx(() => [
                                            createTextVNode("View details")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$v), null, {
                                          default: withCtx(() => [
                                            createTextVNode("Edit branch")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(unref(_sfc_main$w)),
                                        createVNode(unref(_sfc_main$v), { class: "text-red-600" }, {
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
                    (openBlock(true), createBlock(Fragment, null, renderList(branchList.value, (branch) => {
                      return openBlock(), createBlock(unref(_sfc_main$h), {
                        key: branch.id,
                        class: "border-b"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(_sfc_main$o), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(branch.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$o), null, {
                            default: withCtx(() => [
                              createVNode("div", null, toDisplayString(branch.locationName), 1),
                              createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(branch.address), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$o), null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode(unref(_sfc_main$p), null, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$q), {
                                      src: branch.adminAvatar
                                    }, null, 8, ["src"]),
                                    createVNode(unref(_sfc_main$r), null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(branch.adminInitials), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode("div", null, toDisplayString(branch.admin), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$o), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(branch.totalStaff), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$o), null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(branch.createdOn), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(unref(_sfc_main$o), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$s), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$t), { asChild: "" }, {
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
                                  createVNode(unref(_sfc_main$u), { align: "end" }, {
                                    default: withCtx(() => [
                                      createVNode(unref(_sfc_main$v), null, {
                                        default: withCtx(() => [
                                          createTextVNode("View details")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$v), null, {
                                        default: withCtx(() => [
                                          createTextVNode("Edit branch")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(unref(_sfc_main$w)),
                                      createVNode(unref(_sfc_main$v), { class: "text-red-600" }, {
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
              createVNode(unref(_sfc_main$g), null, {
                default: withCtx(() => [
                  createVNode(unref(_sfc_main$h), null, {
                    default: withCtx(() => [
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          createTextVNode("Branch Name")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          createTextVNode(" Location "),
                          createVNode(unref(_sfc_main$j), null, {
                            default: withCtx(() => [
                              createVNode(unref(_sfc_main$k), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$l), null, {
                                    default: withCtx(() => [
                                      createVNode(unref(CircleHelp), { class: "ml-1 h-4 w-4" })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(unref(_sfc_main$m), null, {
                                    default: withCtx(() => [
                                      createVNode("p", null, "Branch location")
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
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          createTextVNode("Branch Admin")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          createTextVNode("Total Staff")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$i), null, {
                        default: withCtx(() => [
                          createTextVNode("Created on")
                        ]),
                        _: 1
                      }),
                      createVNode(unref(_sfc_main$i), null, {
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
              createVNode(unref(_sfc_main$n), null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(branchList.value, (branch) => {
                    return openBlock(), createBlock(unref(_sfc_main$h), {
                      key: branch.id,
                      class: "border-b"
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(_sfc_main$o), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(branch.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$o), null, {
                          default: withCtx(() => [
                            createVNode("div", null, toDisplayString(branch.locationName), 1),
                            createVNode("div", { class: "text-sm text-muted-foreground" }, toDisplayString(branch.address), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$o), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode(unref(_sfc_main$p), null, {
                                default: withCtx(() => [
                                  createVNode(unref(_sfc_main$q), {
                                    src: branch.adminAvatar
                                  }, null, 8, ["src"]),
                                  createVNode(unref(_sfc_main$r), null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(branch.adminInitials), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode("div", null, toDisplayString(branch.admin), 1)
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$o), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(branch.totalStaff), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$o), null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(branch.createdOn), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(unref(_sfc_main$o), null, {
                          default: withCtx(() => [
                            createVNode(unref(_sfc_main$s), null, {
                              default: withCtx(() => [
                                createVNode(unref(_sfc_main$t), { asChild: "" }, {
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
                                createVNode(unref(_sfc_main$u), { align: "end" }, {
                                  default: withCtx(() => [
                                    createVNode(unref(_sfc_main$v), null, {
                                      default: withCtx(() => [
                                        createTextVNode("View details")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$v), null, {
                                      default: withCtx(() => [
                                        createTextVNode("Edit branch")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(unref(_sfc_main$w)),
                                    createVNode(unref(_sfc_main$v), { class: "text-red-600" }, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/admin/branch/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
