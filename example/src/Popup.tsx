import React from 'react'
import {
  createPromiseComponent,
  PromiseComponentProps
} from '@foundernest/react-modal-promise'

function Popup({ handleClose }: PromiseComponentProps<boolean>) {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div style={{ padding: 30, backgroundColor: 'white' }}>
        Soy un popup<button onClick={() => handleClose(true)}>Cierrame</button>
      </div>
    </div>
  )
}

export const openPopup = createPromiseComponent(Popup)
