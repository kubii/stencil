import { BuildConfig, Bundle, DependentCollection } from '../../util/interfaces';
export declare function validateBuildConfig(config: BuildConfig): BuildConfig;
export declare function setProcessEnvironment(config: BuildConfig): void;
export declare function validateDependentCollection(userInput: any): DependentCollection;
export declare function validateUserBundles(bundles: Bundle[]): void;
export declare function validateComponentTag(tag: string): string;
