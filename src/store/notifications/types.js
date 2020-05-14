import namespace from "@/store/utils/namespace";

export default namespace("notifications", {
  getters: [],
  actions: ["confirm"],
  mutations: [
    "simple",
    "success",
    "info",
    "warning",
    "error",
    "async",
    "confirm",
    "prompt",
    "html"
  ]
});
