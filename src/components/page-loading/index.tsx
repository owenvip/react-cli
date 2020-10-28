import { Spin } from 'antd'
import React, { FC } from 'react'
import styles from './index.module.less'

const PageLoading: FC<any> = (props) => (
  <div className={styles.loading}>
    <Spin spinning size="large" />
  </div>
)
export default PageLoading
