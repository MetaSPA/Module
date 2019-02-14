export interface IDictionaryType {
    [x: string]: any;
}
export declare type IMetaSPAProvider<P extends IDictionaryType> = {
    [K in keyof P]?: P[K];
} & {
    MetaSPA: MetaSPACore<P>;
};
export interface IMetaRegistration<P extends IDictionaryType> {
    namespace: string;
    entries: string | string[];
    providers: Array<{
        symbol: keyof IMetaSPAProvider<P>;
        module: () => any;
    }>;
    onLoad: (module: any, context: MetaSPACore<P>) => any;
    unMount: (module: any, context: MetaSPACore<P>) => any;
}
export declare type IMetaSPALoadFunction = (config: {
    namespace: string;
    modules: any;
}) => Promise<void>;
export declare class MetaSPACore<P extends IDictionaryType> {
    static getInstance: () => MetaSPACore<any>;
    runTime: IDictionaryType;
    providers: IMetaSPAProvider<P>;
    registeredModules: IDictionaryType;
    metaSPALoad: IMetaSPALoadFunction;
    registrations: {
        [x: string]: IMetaRegistration<P>;
    };
    register<T extends IDictionaryType>(config: IMetaRegistration<T>): this;
    private _loadModuleAsync;
    loadModule(namespace: string): this;
    private _unMountModuleAsync;
    unMountModule(namespace: string): this;
}

declare global {
    interface Window {
        metaSPA: MetaSPACore<any>;
        metaSPALoad: IMetaSPALoadFunction;
        metaSPAProvider: IMetaSPAProvider<any>;
    }
}

const metaSPA = window.metaSPA;

const bootstrap = (config: { namespace: string; modules: any }) => {
    if (!window.metaSPA) {
        throw new Error("You are not running without any MetaSPA provider");
    }
    window.metaSPA.metaSPALoad.call(undefined, config);
};
export { metaSPA, bootstrap };
