export default {
  async fetch(request, env) {
    // Static portal files are served from the assets collection.
    // API/database routes will be added here in the next stage.
    return env.ASSETS.fetch(request);
  },
};
