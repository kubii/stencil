import { BuildConfig, ComponentMeta, ModuleFile, RuntimeDecoratorMeta } from '../util/interfaces';
import { parseComponentDecorator } from './component';
import { parseElementDecorator } from './element';


export function parseComponentDecorators(config: BuildConfig, runtimeMeta: RuntimeDecoratorMeta) {
  const cmpMeta: ComponentMeta = {
    membersMeta: {}
  };
  const moduleFile: ModuleFile = { tsFilePath: 'modulefile.ts' };

  parseComponentDecorator(config, moduleFile, cmpMeta, runtimeMeta.Component);
  parseElementDecorator(cmpMeta, runtimeMeta.Element);

  return cmpMeta;
}
