import React from 'react'

import {
  PromiseComponentsFactory,
  PromiseComponentOptions
} from './PromiseComponentsFactory'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

// Kind of a hack, but the easiest way of adding modals to a container
const modalFactoryRef: React.RefObject<
  typeof PromiseComponentsFactory
> = React.createRef()

export type PromiseComponentsProps = { className?: string }

export const PromiseComponents: React.FunctionComponent<
  PromiseComponentsProps
> = React.memo(({ className }) => {
  return (
    <PromiseComponentsFactory className={className} ref={modalFactoryRef} />
  )
})
PromiseComponents.displayName = 'PromiseComponentContainer'

export function createPromiseComponent<ComponentProps, ReturnValue = any>(
  Component: React.ComponentType<ComponentProps>,
  options?: PromiseComponentOptions<ComponentProps, ReturnValue>
): (
  props: Omit<ComponentProps, 'handleClose' | 'timeout' | 'transitionState'>
) => Promise<ReturnValue> {
  return props => {
    if (!modalFactoryRef || !modalFactoryRef.current) {
      throw new Error(
        "[react-modal-promise]: React modal promise hasn't been initialized, please add the <PromiseComponentContainer> in your application"
      )
    } else {
      return (modalFactoryRef.current as any).addPromiseComponent(
        Component,
        options
      )(props)
    }
  }
}

export function closePromiseComponent(hash: string) {
  if (!modalFactoryRef || !modalFactoryRef.current) {
    throw new Error(
      "[react-modal-promise]: React modal promise hasn't been initialized, please add the <PromiseComponentContainer> in your application"
    )
  } else {
    ;(modalFactoryRef.current as any).deletePromiseComponent(hash)
  }
}
