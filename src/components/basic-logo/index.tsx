import React, { FC, useCallback, SyntheticEvent } from 'react'
import { Link } from 'react-router-dom'
import Animate from 'rc-animate'
import styles from './index.module.less'

interface LogoProps {
  collapsed?: boolean
}

const BasicLogo: FC<LogoProps> = ({ collapsed }) => {
  const handleImgLoadError = useCallback(
    (e: SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.style.visibility = 'hidden'
    },
    []
  )
  return (
    <Link to="/" className={styles.appLogo}>
      <span className={styles.appImg}>
        <img src="/logo.png" onError={handleImgLoadError} />
      </span>
      <Animate component="" transitionName="fade">
        {!collapsed ? (
          <span key="app-name" className={styles.appName}>
            {process.env.APP_NAME}
          </span>
        ) : null}
      </Animate>
    </Link>
  )
}

export default BasicLogo
