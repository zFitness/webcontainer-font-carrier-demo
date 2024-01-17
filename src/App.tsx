import { useEffect, useRef, useState } from 'react'
import { WebContainer } from '@webcontainer/api'
import { files } from './files'
import { Terminal } from 'xterm'
import './App.css'
import 'xterm/css/xterm.css'

declare global {
  interface Window {
    webcontainer: WebContainer | null
    execCommand: (cmd: string, args: string[]) => Promise<number | undefined>
  }
}

function App() {
  const [finish, setFinish] = useState(false)
  const terminalDivRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<Terminal>()
  const [text, setText] = useState('')
  // const
  const init = async () => {
    if (window.webcontainer || !terminalDivRef.current) return
    // 初始化终端
    if (!terminalRef.current) {
      terminalRef.current = new Terminal({
        // convertEol: true,
      })
      console.log('xxx')
      terminalRef.current.open(terminalDivRef.current)
    }

    // 初始化容器
    console.time('WebContainer')
    window.webcontainer = await WebContainer.boot({})
    await window.webcontainer.mount(files)
    console.timeEnd('WebContainer')
    setFinish(true)
  }

  async function execCommand(cmd: string, args: string[] = []) {
    const installProcess = await window.webcontainer?.spawn(cmd, args)
    installProcess?.output.pipeTo(
      new WritableStream({
        write(data) {
          terminalRef.current?.write(data)
          console.log(data)
        },
      })
    )
    return installProcess?.exit
  }

  window.execCommand = execCommand

  useEffect(() => {
    console.log('init')
    init()
    return () => {
      console.log('unmount')
      // window.webcontainer = null
    }
  }, [terminalRef.current])

  const downloadFont = async () => {
    // 下载字体
    const data = await window?.webcontainer?.fs.readFile('min.ttf')
    if (!data) return
    const blob = new Blob([data], { type: 'application/octet-stream' })
    const url = URL.createObjectURL(blob)
    const downloadLink = document.createElement('a')
    downloadLink.href = url
    downloadLink.download = 'min.ttf'
    downloadLink.click()
    URL.revokeObjectURL(url)
  }

  const viewFiles = async () => {
    // 查看文件
    await execCommand('ls', ['-lah'])
    // window.webcontainer?.fs.writeFile()
  }

  const runScript = async () => {
    // 安装依赖
    await execCommand('npm', ['install'])
    // 运行脚本
    await execCommand('node', ['./index.js'])
    const data = await window?.webcontainer?.fs.readFile('min.ttf')
    if (!data) return
    const font = new window.FontFace('test-font', data)
    document.fonts.add(font)
    viewFiles();
    alert('字体已加载')
  }


  const uploadFile = async (file: File) => {
    const unit8Array = new Uint8Array(await file.arrayBuffer())
    await window.webcontainer?.fs.writeFile('a.ttf', unit8Array)
  }
  return (
    <div className="app">
      <div>
        <h2>webcontainer + font-carrier字体子集化</h2>
      </div>
      <div>
        <label>字体：</label>
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files?.length) uploadFile(e.target.files[0])
          }}
        />
      </div>
      <div className="textarea-wrapper">
        <div>
          <label>转换前：</label>
          <textarea
            value={text}
            onChange={(e) => {
              window.webcontainer?.fs.writeFile('input.txt', e.target.value)
              setText(e.target.value)
            }}
            rows={10}
          ></textarea>
        </div>
        <div>
          <label>转换后：</label>
          <textarea disabled value={text} className="trrr" rows={10}></textarea>
        </div>
      </div>
      <div className='btn-group'>
        <button onClick={runScript}>运行脚本</button>
        <button onClick={viewFiles}>查看文件</button>
        <button disabled={!finish} onClick={downloadFont}>
          下载字体
        </button>
      </div>
      <div ref={terminalDivRef} className="terminal"></div>
    </div>
  )
}

export default App
