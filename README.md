## Motivation

Modals and some components work like a promise, they "pause" your main app waiting for a result. Using a local/redux state for managing this kind of components lacks ease when chaining results of different "promise" components.

Originally forked from https://github.com/cudr/react-modal-promise

## Install

```

npm install react-promise-components

```

or

```

yarn add react-promise-components

```

## How to use:

1. Place `PromiseComponentsContainer` in root of your App:

```

import PromiseComponentsContainer from 'react-promise-components'

function MyApp {
	return (
		{/* ... other components */}
		<PromiseComponentsContainer />
	)
}

```

2. Create you own promise component:

Close your and resolve promise component by calling handleClose() function from props

You can transform your props with the `mapProps` argument

```

import { createPromiseComponent } from 'react-promise-components'

import { Modal } from 'react-bootstrap'



// Bootstrap modal needs open and onHide

const bootstrapModal = createPromiseComponent(Modal,
	({ transitionState, handleClose, ...props }) => {
		open: transitionState !== 'exiting',
		onHide: handleClose,
		...props
	})

```

3. Use as Promise everywhere:

```

bootstrapModal({ /*pass any props here*/ }).then(value => {
// get value that you pass to 'close' function
})

```
