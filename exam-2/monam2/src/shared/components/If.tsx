export interface IfProps {
  condition: boolean | unknown;
  isTrue?: React.ReactNode;
  isFalse?: React.ReactNode;
}

/**
 *
 * @param condition - 조건
 * @param trueRender - 조건이 true일 때 렌더링할 컴포넌트
 * @param falseRender - 조건이 false일 때 렌더링할 컴포넌트
 * @returns 렌더링할 컴포넌트(trueRender or falseRender)
 */
export function If({ condition, isTrue, isFalse }: IfProps) {
  const conditionFlag = !!condition;

  return conditionFlag ? isTrue : isFalse;
}
