import './App.less'

function App() {
  return (
    <>
      <div className="header-container">
        <div className="brand">
          <span style={{ fontStyle: 'italic', fontWeight: '700' }}>Z </span>
          <span>editer</span>
        </div>
        <div className="head-bar">我是控制栏</div>
      </div>
      <div className="body-container">
        <div className="left-container">
          我是侧边栏
        </div>
        <div className="main-container">
          <textarea></textarea>
        </div>
      </div>
    </>
  )
}

export default App
