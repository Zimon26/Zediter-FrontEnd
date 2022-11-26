import { Button, Input, message } from 'antd'
import 'antd/dist/reset.css'
import { useRef, useState } from 'react'
import './App.less'

function App() {
  const [username, setUsername] = useState('Zimon')
  const [collaborators, setCollaborators] = useState(['Zimon, Zeb'])
  const [isWorking, setIsWorking] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  const joinFormRef = useRef()
  const launchCol = (e) => {
    setIsWorking(true)
    //  请求后端获得协作码
    const code = '02026'
    messageApi.info(`您的协作码是 ${code}`)
    e.target.innerHTML = '协作中 02026'
    // 发送消息提示
    // 通知后端
  }

  const joinCol = () => {
    if (joinFormRef.current.style.display === 'block') {
      joinFormRef.current.style.display = 'none'
    } else {
      joinFormRef.current.style.display = 'block'
    }
  }

  const copyAll = () => {

  }

  const submitCode = () => {
    // 发送后端比对
    console.log('click')
  }

  return (
    <>
      {contextHolder}
      <div className="header-container">
        <div className="brand">
          <span style={{ fontStyle: 'italic', fontWeight: '700' }}>Z </span>
          <span>editer</span>
        </div>
        <div className="head-bar">
          <div className="username">当前您的用户名是: {username}</div>
          <div className="collaborators">
            {
              isWorking ?
                '正在协作: ' + collaborators.join(',')
                :
                '您还没有开始协作，请选择左侧导航栏发起协作或加入协作'
            }
          </div>
        </div>
      </div>
      <div className="body-container">
        <div className="left-container">
          <ul className="nav-bar">
            <li onClick={launchCol}>发起协作</li>
            <li onClick={joinCol}>加入协作</li>
            <li onClick={copyAll}>复制文稿</li>
            <li>使用指南</li>
            <li>Github地址</li>
            <li>关于我们</li>
          </ul>
        </div>
        <div className="main-container">
          <textarea></textarea>
          <div className="join-form" ref={joinFormRef}>
            <Input placeholder="请输入协作码" />
            <Button onClick={submitCode}>提交</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
