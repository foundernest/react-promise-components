import React, {
  useState,
  useImperativeHandle,
  useRef,
  useEffect,
  useCallback
} from 'react'

import { randHex } from './utils/randHex'
import { updateObject, removeObjectItemByKey } from './utils/immutable'
import { delay } from './utils/delay'

export type PromiseTimeout = {
  enter: number
  exit: number
}

export type PromiseComponentOptions<ComponentProps, ReturnValue> = {
  timeout?: PromiseTimeout
  mapProps?: (
    injectedProps: PromiseComponentProps<ReturnValue>,
    componentProps: ComponentProps
  ) => ComponentProps
}

export enum PromiseComponentTransitionState {
  entering = 'entering',
  entered = 'entered',
  exiting = 'exiting'
}

const defaultOptions: {
  timeout: NonNullable<PromiseComponentOptions<any, any>['timeout']>
  mapProps: NonNullable<PromiseComponentOptions<any, any>['mapProps']>
} = {
  timeout: {
    enter: 225,
    exit: 195
  },
  mapProps: (
    injectedProps: PromiseComponentProps<any>,
    componentProps: any
  ) => ({
    ...injectedProps,
    ...componentProps
  })
}

type ActivePromiseComponent<T, ReturnType> = PromiseComponentProps<
  ReturnType
> & {
  Component: React.ComponentType<T>
  props: T
  hash: string
  mapProps: (
    injectedProps: PromiseComponentProps<ReturnType>,
    componentProps: any
  ) => any
}

export type PromiseComponentProps<ReturnType> = {
  timeout: PromiseTimeout
  transitionState: PromiseComponentTransitionState
  handleClose: (value: ReturnType) => void
}

type PromiseComponentMap = Record<string, ActivePromiseComponent<any, any>>

export type PromiseComponentsFactoryProps = {
  className?: string
}

export const PromiseComponentsFactory = React.forwardRef(
  ({ className }: PromiseComponentsFactoryProps, ref) => {
    const [modals, setPromiseComponents] = useState<PromiseComponentMap>({})
    const stateRef = useRef({ modals })
    useEffect(() => {
      stateRef.current = { modals }
    })

    const getCurrentPromiseComponents = useCallback(
      () => stateRef.current.modals,
      []
    )

    async function deletePromiseComponent(hash: string) {
      let currentPromiseComponents = getCurrentPromiseComponents()
      const { timeout } = currentPromiseComponents[hash]
      setPromiseComponents(
        updateObject(currentPromiseComponents, {
          [hash]: updateObject(currentPromiseComponents[hash], {
            transitionState: PromiseComponentTransitionState.exiting
          })
        })
      )
      await delay(timeout.exit)
      currentPromiseComponents = getCurrentPromiseComponents()
      setPromiseComponents(
        removeObjectItemByKey(currentPromiseComponents, hash)
      )
    }

    function addPromiseComponent<ComponentProps, ReturnValue>(
      Component: ActivePromiseComponent<
        ComponentProps,
        ReturnValue
      >['Component'],
      options: PromiseComponentOptions<any, any> = {}
    ) {
      return (props: ComponentProps) => {
        return new Promise<ReturnValue>(async promiseResolve => {
          let currentPromiseComponents = getCurrentPromiseComponents()
          const hash = randHex()
          const resultOptions = { ...defaultOptions, ...options }
          const handleClose = (value: ReturnValue) => {
            deletePromiseComponent(hash)
            promiseResolve(value)
          }
          const newPromiseComponent: ActivePromiseComponent<
            ComponentProps,
            ReturnValue
          > = {
            Component,
            props,
            hash,
            handleClose,
            ...resultOptions,
            transitionState: PromiseComponentTransitionState.entering
          }
          setPromiseComponents(
            updateObject(currentPromiseComponents, {
              [hash]: newPromiseComponent
            })
          )
          await delay(resultOptions.timeout.enter)
          currentPromiseComponents = getCurrentPromiseComponents()
          setPromiseComponents(
            updateObject(currentPromiseComponents, {
              [hash]: updateObject(newPromiseComponent, {
                transitionState: PromiseComponentTransitionState.entered
              })
            })
          )
        })
      }
    }

    useImperativeHandle(ref, () => ({
      addPromiseComponent,
      deletePromiseComponent
    }))

    const modalComponents = Object.values(modals).map(
      ({
        Component,
        props,
        hash,
        handleClose,
        timeout,
        transitionState,
        mapProps
      }) => {
        const parsedProps = mapProps(
          { handleClose, timeout, transitionState },
          props
        )
        return <Component key={hash} {...parsedProps} />
      }
    )

    return <div className={className}>{modalComponents}</div>
  }
)
