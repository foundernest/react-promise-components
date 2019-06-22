import { PromiseComponents } from './PromiseComponents'

export {
  PromiseComponents,
  createPromiseComponent,
  closePromiseComponent
} from './PromiseComponents'
import { PromiseComponentProps } from './PromiseComponentsFactory'

export type PromiseComponentProps<ReturnType> = PromiseComponentProps<
  ReturnType
>

export default PromiseComponents
