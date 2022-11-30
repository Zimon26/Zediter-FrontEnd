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
  const textareaRef = useRef()
  const text = []
  let startPos, endPos

  // useEffect(() => {
  //   // 初始化做的事
  //   // setInterval(() => {
  //   //   console.log(textareaRef.current.selectionStart)
  //   //   console.log(textareaRef.current.selectionEnd)
  //   // }, 1000)
  // }, [])

  const launchCol = (e) => {
    setIsWorking(true)
    //  请求后端获得协作码
    const code = '02026'
    messageApi.info(`您的协作码是 ${code}`)
    e.target.innerHTML = '协作中 02026'
    joinFormRef.current.style.display = 'none'
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
    joinFormRef.current.style.display = 'none'
  }

  const submitCode = () => {
    // 发送后端比对
    console.log('click')
  }

  const handleInput = (e) => {
    console.log(e)
    const data = e.nativeEvent.data
    // const start = textareaRef.current.selectionStart
    // const end = textareaRef.current.selectionEnd
    const start = startPos
    const end = endPos
    switch (e.nativeEvent.inputType) {
      case 'insertText':
        text.splice(start + 1, 0, data)
        // console.log(text.join(''))
        break
      case 'deleteContentBackward':
        console.log(start, startPos)
        console.log(end, endPos)
        if (start === end) {
          text.splice(start - 1, 1)
        } else if (end > start) {
          text.splice(start, end - start)
        }
        // console.log(text.join(''))
        break
      case 'deleteContentForward':
        console.log(start)
        text.splice(start, 1)
        break

    }
    console.log(text.join(''))
  }

  const trackKey = (e) => {
    startPos = textareaRef.current.selectionStart
    endPos = textareaRef.current.selectionEnd
    console.log(startPos)
    console.log(endPos)
  }

  const trackMouse = (e) => {
    startPos = textareaRef.current.selectionStart
    endPos = textareaRef.current.selectionEnd
    console.log(startPos)
    console.log(endPos)
  }

  const trackPaste = (e) => {
    const clipboardData = e.clipboardData
    const boardData = clipboardData.getData('text')
    text.splice(startPos, 0, boardData)
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
          <textarea ref={textareaRef}
            onInput={handleInput}
            onKeyDown={trackKey}
            onMouseUp={trackMouse}
            onPaste={trackPaste}
          ></textarea>
          <div className="join-form" ref={joinFormRef}>
            <Input placeholder="请输入协作码" />
            <Button onClick={submitCode}>提交</Button>
          </div>
          {/* <div className="dev-show" style={{ position: 'absolute', top: '20px', right: '20px' }}>
            {
              '这是' + text.join('-')
            }
          </div> */}
        </div>
      </div>
    </>
  )
}

export default App
