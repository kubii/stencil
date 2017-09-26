import { ComponentMeta, RuntimeDecoratorMeta } from '../util/interfaces';
import { MEMBER_ELEMENT_REF } from '../util/constants';


export function ElementRuntimeDecorator(): any {
  return function(target: any, propName: string) {
    target.constructor.meta = target.constructor.meta || {};
    (target.constructor.meta as RuntimeDecoratorMeta).Element = propName;
    return target;
  };
}


export function parseElementDecorator(cmpMeta: ComponentMeta, hostElementMember: string) {
  cmpMeta.membersMeta[hostElementMember] = {
    memberType: MEMBER_ELEMENT_REF
  };
}
