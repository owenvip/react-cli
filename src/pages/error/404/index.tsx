import { Button, Result } from 'antd'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

const Exception404: FC = () => (
  <Result
    status="404"
    title="404"
    subTitle="Page Not Found"
    extra={
      <Link to="/">
        <Button type="primary">Back Home</Button>
      </Link>
    }
  />
)

export default Exception404
