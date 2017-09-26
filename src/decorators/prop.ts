import { ComponentMeta, RuntimeDecoratorMeta, PropOptions } from '../util/interfaces';
import { MEMBER_ELEMENT_REF } from '../util/constants';


export function PropRuntimeDecorator(opts: PropOptions): any {
  return function(target: any, propName: string) {
    const meta: RuntimeDecoratorMeta = target.constructor.meta = target.constructor.meta || {};
    meta.Props = meta.Props || {};
    meta.Props[propName] = opts;
    return target;
  };
}


export function parsePropDecorator(cmpMeta: ComponentMeta, hostElementMember: string) {
  cmpMeta.membersMeta[hostElementMember] = {
    memberType: MEMBER_ELEMENT_REF
  };
}
