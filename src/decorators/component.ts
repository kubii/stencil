import { AssetsMeta, BuildConfig, ComponentMeta, ComponentOptions, ModuleFile, RuntimeDecoratorMeta } from '../util/interfaces';
import { parseStyles } from './parse-styles';
import { normalizePath } from '../compiler/util';
import { validateComponentTag } from '../compiler/build/validation';


export function ComponentRuntimeDecorator(opts: any): any {
  return function(target: any) {
    target.meta = target.meta || {};
    (target.meta as RuntimeDecoratorMeta).Component = opts;
    return target;
  };
}


export function parseComponentDecorator(config: BuildConfig, moduleFile: ModuleFile, cmpMeta: ComponentMeta, userOpts: ComponentOptions) {
  parseTag(userOpts, cmpMeta);
  parseStyles(config, userOpts, moduleFile, cmpMeta);
  parseAssetsDir(config, userOpts, moduleFile, cmpMeta);
  parseHost(userOpts, cmpMeta);
  parseShadow(userOpts, cmpMeta);
}


function parseTag(userOpts: ComponentOptions, cmpMeta: ComponentMeta) {
  cmpMeta.tagNameMeta = validateComponentTag(userOpts.tag);
}


function parseShadow(userOpts: ComponentOptions, cmpMeta: ComponentMeta) {
  const rawShadowValue: any = userOpts.shadow;

  // default to NOT use shadow dom
  cmpMeta.isShadowMeta = false;

  // try to figure out a best guess depending on the value they put in
  if (rawShadowValue !== undefined) {
    if (typeof rawShadowValue === 'string') {
      if (rawShadowValue.toLowerCase().trim() === 'true') {
        cmpMeta.isShadowMeta = true;
      }

    } else {
      // ensure it's a boolean
      cmpMeta.isShadowMeta = !!rawShadowValue;
    }
  }
}


function parseHost(userOpts: ComponentOptions, cmpMeta: ComponentMeta) {
  cmpMeta.hostMeta = userOpts.host || {};
}

export function parseAssetsDir(config: BuildConfig, userOpts: ComponentOptions, moduleFile: ModuleFile, cmpMeta: ComponentMeta)  {
  if (userOpts.assetsDir) {
    normalizeAssetDir(config, moduleFile, cmpMeta, userOpts.assetsDir);
  }

  if (Array.isArray(userOpts.assetsDirs)) {
    userOpts.assetsDirs.forEach(assetsDir => {
      normalizeAssetDir(config, moduleFile, cmpMeta, assetsDir);
    });
  }
}


function normalizeAssetDir(config: BuildConfig, moduleFile: ModuleFile, cmpMeta: ComponentMeta, assetsDir: string) {
  if (typeof assetsDir !== 'string' || assetsDir.trim() === '') return;

  const assetsMeta: AssetsMeta = {};

  // get the absolute path of the directory which the component is sitting in
  const componentDir = normalizePath(config.sys.path.dirname(moduleFile.tsFilePath));

  // get the relative path from the component file to the assets directory
  assetsDir = normalizePath(assetsDir.trim());

  if (config.sys.path.isAbsolute(assetsDir)) {
    // this path is absolute already!
    // add as the absolute path
    assetsMeta.absolutePath = assetsDir;

    // if this is an absolute path already, let's convert it to be relative
    assetsMeta.cmpRelativePath = config.sys.path.relative(componentDir, assetsDir);

  } else {
    // this path is relative to the component
    assetsMeta.cmpRelativePath = assetsDir;

    // create the absolute path to the asset dir
    assetsMeta.absolutePath = normalizePath(config.sys.path.join(componentDir, assetsDir));
  }

  (cmpMeta.assetsDirsMeta = cmpMeta.assetsDirsMeta || []).push(assetsMeta);
}
