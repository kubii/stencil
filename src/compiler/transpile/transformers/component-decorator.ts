import { BuildConfig, ComponentMeta, ComponentOptions, Diagnostic, ModuleFile } from '../../../util/interfaces';
import { catchError } from '../../util';
import { parseComponentDecorator } from '../../../decorators/component';
import * as ts from 'typescript';


export function getComponentDecoratorData(config: BuildConfig, moduleFile: ModuleFile, diagnostics: Diagnostic[], classNode: ts.ClassDeclaration) {
  let metaData: ComponentMeta = null;

  if (!classNode.decorators) {
    return metaData;
  }

  let isComponent = false;

  classNode.decorators.forEach(decorator => {

    decorator.forEachChild(decoratorChild => {

      decoratorChild.forEachChild(componentChild => {

        if (componentChild.getText().trim() === 'Component') {
          isComponent = true;

        } else if (isComponent) {
          metaData = parseComponentMetaData(config, moduleFile, diagnostics, componentChild.getText());
        }

      });

    });
  });

  return metaData;
}


function parseComponentMetaData(config: BuildConfig, moduleFile: ModuleFile, diagnostics: Diagnostic[], text: string) {
  let cmpMeta: ComponentMeta = null;

  try {
    const fnStr = `return ${text};`;

    // parse user component options
    const userOpts: ComponentOptions = new Function(fnStr)();

    if (!userOpts.tag || userOpts.tag.trim() === '') {
      throw new Error(`tag missing in component decorator: ${text}`);
    }

    // convert user component options from user into component meta
    cmpMeta = {};

    parseComponentDecorator(config, moduleFile, cmpMeta, userOpts);

  } catch (e) {
    // derp
    const d = catchError(diagnostics, e);
    d.absFilePath = moduleFile.tsFilePath;
    d.relFilePath = config.sys.path.relative(config.rootDir, moduleFile.tsFilePath);
    d.messageText = `${e}: ${text}`;
  }

  return cmpMeta;
}
