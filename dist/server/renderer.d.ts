import * as interfaces from '../util/interfaces';
export declare function createRenderer(config: interfaces.BuildConfig, registry?: interfaces.ComponentRegistry, ctx?: interfaces.BuildContext): {
    hydrateToString: {
        (hydrateOpts: interfaces.HydrateOptions): Promise<interfaces.HydrateResults>;
        (hydrateOpts: interfaces.HydrateOptions, callback: (hydrateResults: interfaces.HydrateResults) => void): void;
    };
    logger: interfaces.Logger;
};
