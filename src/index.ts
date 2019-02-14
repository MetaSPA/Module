const metaSPA = window.metaSPA;

const bootstrap = (config: { namespace: string; modules: any }) => {
    if (!window.metaSPA) {
        throw new Error("You are not running without any MetaSPA provider");
    }
    window.metaSPA.metaSPALoad.call(undefined, config);
};
export { metaSPA, bootstrap };
