declare const metaSPA: import("@metaspa/core").default<any>;
declare const bootstrap: (config: {
    namespace: string;
    modules: any;
}) => void;
export { metaSPA, bootstrap };
