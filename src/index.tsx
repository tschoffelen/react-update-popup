import * as React from 'react'
import axios from 'axios'
import useSWR from 'swr'

import { ReactComponent as Icon } from './icon.svg'
import './styles.css'
import { useEffect, useState } from 'react'

interface Props {
  title?: string
  description?: string
  buttonText?: string
  assetManifestUrl?: string
  onReload?: () => void
}

// noinspection JSUnusedGlobalSymbols
export const UpdateNotification = (
  {
    title = 'App update available',
    description = 'Reload this page to use the latest version of the app.',
    buttonText = 'Reload now',
    assetManifestUrl = '/asset-manifest.json',
    onReload
  }: Props) => {
  const instance = axios.create({
    responseType: 'text',
    transformResponse: [(data) => {
      return data
    }]
  })
  const [assetManifest, setAssetManifest] = useState('')
  const { data } = useSWR(assetManifestUrl, instance.get)
  useEffect(() => {
    if (!assetManifest && data) {
      setAssetManifest(data.data)
    }
  }, [data, assetManifest])

  onReload = onReload || (() => typeof window !== 'undefined' && window.location.reload())

  const updateAvailable = assetManifest && data && data.data !== assetManifest
  if (!updateAvailable) {
    return null
  }

  return (
    <div className='update-notification-popup'>
      <Icon />
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <button onClick={onReload}>{buttonText}</button>
      </div>
    </div>
  )
}
