import React, { useState, useEffect, FC } from 'react'
import App from '@/app'
import { ConfigProvider } from 'antd'
import { createHashHistory } from 'history'
import { Locale } from 'antd/lib/locale-provider'

// history
const history = createHashHistory()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

const Root: FC = () => {
  const [antdLocale, setAntdLocale] = useState<Locale>()

  useEffect(() => {
    let active = true
    const loadAntdLocale = async () => {
      let locale: any
      /* istanbul ignore next */
      if (process.env.NODE_ENV === 'test') {
        locale = await import('antd/lib/locale/zh_CN')
      } else {
        locale = await import('antd/es/locale/zh_CN')
      }

      if (active) {
        setAntdLocale(locale.default)
      }
    }

    loadAntdLocale()

    return () => {
      active = false
    }
  }, [])

  return (
    <ConfigProvider locale={antdLocale}>
      <App history={history} />
    </ConfigProvider>
  )
}

export default Root
