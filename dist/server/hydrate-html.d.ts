import { BuildConfig, BuildContext, ComponentRegistry, HostElement, PlatformApi, HydrateOptions, HydrateResults } from '../util/interfaces';
export declare function hydrateHtml(config: BuildConfig, ctx: BuildContext, registry: ComponentRegistry, opts: HydrateOptions, hydrateResults: HydrateResults, callback: (results?: HydrateResults) => void): void;
export declare function connectElement(plt: PlatformApi, elm: HostElement, connectedInfo: ConnectedInfo): void;
export interface ConnectedInfo {
    elementCount: number;
}
