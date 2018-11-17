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
export interface MetaSPACore<P extends IDictionaryType = {}> {
    runTime: IDictionaryType;
    providers: IMetaSPAProvider<P>;
    registeredModules: IDictionaryType;
    metaSPALoad: IMetaSPALoadFunction;
    registrations: {
        [x: string]: IMetaRegistration<P>;
    };
    register<T extends IDictionaryType>(config: IMetaRegistration<T>): MetaSPACore;
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
declare const metaSPA: MetaSPACore<any>;
declare const bootstrap: (config: {
    namespace: string;
    modules: any;
}) => void;
export { metaSPA, bootstrap };
