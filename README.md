# react-update-popup

**Ask users to refresh when there is a new version of the app available.**

[![NPM](https://img.shields.io/npm/v/react-update-popup.svg)](https://www.npmjs.com/package/react-update-popup)
[![GitHub license](https://img.shields.io/github/license/flexible-agency/react-update-popup.svg)](https://github.com/flexible-agency/react-update-popup/blob/master/LICENSE)

## Install

```bash
yarn add react-update-popup
# or: npm install --save react-update-popup
```

## Usage

```tsx
import React, { Component } from 'react'

import { UpdateNotification } from 'react-update-popup'
import 'react-update-popup/dist/index.css'

const Example = () => (
  <UpdateNotification
    checkHasUpdate={async () => {
      // Optionally do something custom to check if an update is available.
      // Called every 120 seconds.

      // If you omit this, the default behaviour is to check if `index.html`
      // has changed, which is the case with most bundlers.

      return true // tell it an update is available
    }}
  />
)
```

## Styling

By default, the popup looks like this:

![Example](.github/example.png)

Update it to fit within your application by:

- Using the component props to change the text of the popup
- Adding custom CSS for class `.update-notification-popup` to restyle the popup

## Props

All props are optional, and can be used to change the appearance of the popup.

- string `title` - popup title, wrapped in `<h3>`
- string `description` - popup description text, wrapped in `<p>`
- string `buttonText` - button text
- number `refreshInterval` - how often to check, defaults to `120_000` (2 minutes)
- function `checkHasUpdate` - replace default update check behaviour (returns boolean `hasUpdate`)
- function `onReload` - replace default reload behaviour

## Authors

This library is developed by [Includable](https://includable.com), a creative app development agency.

- Thomas Schoffelen, [@tschoffelen](https://twitter.com/tschoffelen)
