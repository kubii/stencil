import { BuildConfig, BuildResults, Diagnostic } from '../../util/interfaces';
export declare function build(config: BuildConfig, context?: any): Promise<BuildResults>;
export declare function isConfigValid(config: BuildConfig, diagnostics: Diagnostic[]): boolean;
