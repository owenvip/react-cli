import React, { FC, ReactNode } from 'react'
import styles from './index.module.less'
import { Avatar, Dropdown, Layout, Menu } from 'antd'
import BasicLogo from '../basic-logo'

const { Header } = Layout

interface Props {
  left?: ReactNode | null
  right?: ReactNode | null
}

const HeaderRight: FC = () => {
  return (
    <Dropdown
      trigger={['click']}
      overlay={
        <Menu>
          <Menu.Item>Logout</Menu.Item>
        </Menu>
      }
    >
      <div>
        <Avatar size="large" src="" />
        <span className={styles.userName}>User</span>
      </div>
    </Dropdown>
  )
}

const BasicHeader: FC<Props> = ({
  left = <BasicLogo />,
  right = <HeaderRight />,
}) => {
  return (
    <Header className={styles.basicHeader}>
      <div className={styles.basicHeaderLeft}>{left}</div>
      <div className={styles.basicHeaderRight}>{right}</div>
    </Header>
  )
}

export default BasicHeader
