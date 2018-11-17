export interface IDictionaryType {
    [x: string]: any;
}

export type IMetaSPAProvider<P extends IDictionaryType> = {
    [K in keyof P]?: P[K]
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

export type IMetaSPALoadFunction = (
    config: { namespace: string; modules: any },
) => Promise<void>;

export interface MetaSPACore<P extends IDictionaryType = {}> {
    runTime: IDictionaryType;
    providers: IMetaSPAProvider<P>;
    registeredModules: IDictionaryType;
    metaSPALoad: IMetaSPALoadFunction;
    registrations: { [x: string]: IMetaRegistration<P> };
    register<T extends IDictionaryType>(
        config: IMetaRegistration<T>,
    ): MetaSPACore;
    loadModule(namespace: string): MetaSPACore;
    unMountModule(namespace: string): MetaSPACore;
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