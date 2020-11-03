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
        <img
          src="/favicon.png"
          width="100%"
          height="100%"
          onError={handleImgLoadError}
        />
      </span>
      <Animate component="" transitionName="fade">
        {!collapsed ? (
          <span key="app-name" className={styles.appName}>
            react app
          </span>
        ) : null}
      </Animate>
    </Link>
  )
}

export default BasicLogo
