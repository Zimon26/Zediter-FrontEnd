import { Button, Input, message } from 'antd'
import 'antd/dist/reset.css'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import './App.less'

function App() {
  const [username, setUsername] = useState('Zimon')
  const [collaborators, setCollaborators] = useState(['Zimon, Luo'])
  const [isWorking, setIsWorking] = useState(false)
  const [thisArrayID, setThisArrayID] = useState(0)
  const [messageApi, contextHolder] = message.useMessage()
  const joinFormRef = useRef()
  const textareaRef = useRef()
  const joinColInputRef = useRef()
  let text = []
  let startPos, endPos

  useEffect(() => {
    // 初始化做的事
    // setInterval(() => {
    //   text.push('m')
    // }, 1000)
    // async function initID() {
    //   const { data: res } = await axios.get('http://localhost:8888/init')
    //   console.log(res)
    //   thisID = res
    // }
    // initID()
    return () => { }
  }, [])

  const launchCol = async (e) => {
    setIsWorking(true)
    //  请求后端获得协作码
    const { data: { code, collaborators, arrayID } } = await axios.get('http://localhost:8888/launch-col', {
      params: {
        username: username
      }
    })
    setCollaborators(collaborators)
    setThisArrayID(arrayID)
    console.log(arrayID)
    messageApi.info(`您的协作码是 ${code}`)
    e.target.innerHTML = `协作中 ${code}`
    joinFormRef.current.style.display = 'none'
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

  const submitCode = async () => {
    // 发送后端比对
    const code = joinColInputRef.current.input.value
    if (code.length === 5) {
      const { data: { number, collaborators, text, arrayID } } = await axios.get('http://localhost:8888/join-col', {
        params: {
          code: code,
          username: username
        }
      })
      if (number === 1) {
        setCollaborators(collaborators)
        setThisArrayID(arrayID)
        textareaRef.current.value = text.join('')
        joinFormRef.current.style.display = 'none'
        messageApi.info('您已成功加入协作')
      } else if (number === 0) {
        messageApi.info('此协作码没有对应协作，请重新输入或者发起协作')
      }
    } else {
      messageApi.info('协作码为五位数字，请重新输入')
    }


  }

  const handleInput = async (e) => {
    console.log(e)
    // console.log(textareaRef.current)
    const data = e.nativeEvent.data
    // const start = textareaRef.current.selectionStart
    // const end = textareaRef.current.selectionEnd
    const start = startPos
    const end = endPos
    let args = []
    switch (e.nativeEvent.inputType) {
      case 'insertText':
        args = [start + 1, 0, data]
        // text.splice(start + 1, 0, data)
        // console.log(text.join(''))
        break
      case 'deleteContentBackward':
        // console.log(start, startPos)
        // console.log(end, endPos)
        if (start === end) {
          args = [start - 1, 1]
          // text.splice(start - 1, 1)
        } else if (end > start) {
          args = [start, end - start]
          // text.splice(start, end - start)
        }
        // console.log(text.join(''))
        break
      case 'deleteContentForward':
        args = [start, 1]
        // text.splice(start, 1)
        break

    }
    const { data: res } = await axios.get('http://localhost:8888/handle-change', {
      params: {
        arrayID: thisArrayID,
        args: args
      }
    })
    text = res
    console.log(text.join(''))
    textareaRef.current.value = text.join('')
  }

  const trackKey = () => {
    startPos = textareaRef.current.selectionStart
    endPos = textareaRef.current.selectionEnd
    console.log(startPos)
    console.log(endPos)
  }

  const trackMouse = () => {
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
          <textarea
            ref={textareaRef}
            onInput={handleInput}
            onKeyDown={trackKey}
            onMouseUp={trackMouse}
            onPaste={trackPaste}
          ></textarea>
          <div className="join-form" ref={joinFormRef}>
            <Input ref={joinColInputRef} placeholder="请输入协作码" />
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
