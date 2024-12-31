import React from 'react'
import useSWR from 'swr'

interface Props {
  title?: string
  description?: string
  buttonText?: string
  checkHasUpdate?: () => Promise<boolean>
  refreshInterval?: number
  onReload?: () => void
}

let previousResponse = ''
export const defaultUpdateChecker: () => Promise<boolean> = async () => {
  const response = await fetch(`/index.html?_${new Date().getTime()}`, {})
  const text = await response.text()

  if (!previousResponse) {
    previousResponse = text
  } else if (text !== previousResponse) {
    return true
  }

  return false
}

export const UpdateNotification = ({
  title = 'App update available',
  description = 'Reload this page to use the latest version of the app.',
  buttonText = 'Reload now',
  checkHasUpdate = defaultUpdateChecker,
  refreshInterval = 120000,
  onReload = () => typeof window !== 'undefined' && window.location.reload()
}: Props) => {
  const { data: updateAvailable } = useSWR('', checkHasUpdate, {
    refreshInterval
  })

  if (!updateAvailable) {
    return null
  }

  return (
    <div className='update-notification-popup'>
      <h3>{title}</h3>
      <p>{description}</p>
      <button onClick={onReload}>{buttonText}</button>
      <style>
        {`
          .update-notification-popup {
            position: fixed;
            bottom: 24px;
            right: 24px;
            box-shadow: 0 -1px 6px rgba(0, 0, 0, 0.02), 0 1px 4px rgba(0, 0, 0, 0.05),
              0 10px 30px rgba(0, 0, 0, 0.02);
            border-radius: 6px;
            background-color: #fff;
            padding: 24px;
            max-width: calc(100vw - 48px);
            width: 300px;
          }

          .update-notification-popup * {
            margin: 0;
            padding: 0;
          }

          .update-notification-popup h3 {
            font-size: 1.1rem;
            font-weight: 600;
            line-height: 1.1rem;
            margin-bottom: 10px;
          }

          .update-notification-popup p {
            font-size: 0.9rem;
          }

          .update-notification-popup button {
            background-color: #2977f6;
            border-radius: 4px;
            color: #fff;
            border: 0;
            padding: 0 16px;
            font-size: 0.9rem;
            height: 38px;
            font-weight: 600;
            margin-top: 22px;
            display: inline-block;
          }
        `}
      </style>
    </div>
  )
}
