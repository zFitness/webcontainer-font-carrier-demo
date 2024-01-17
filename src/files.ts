/** @satisfies {import('@webcontainer/api').FileSystemTree} */

export const files = {
  'index.js': {
    file: {
      contents: `
      import fontCarrier from 'font-carrier'
      import fs from 'fs';
      const transFont = fontCarrier.transfer('./a.ttf')
      const text = fs.readFileSync('./input.txt', 'utf-8')
      // 会自动根据当前的输入的文字过滤精简字体
      transFont.min(text)
      transFont.output({
        path: './min'
      })
      `,
    },
  },
  'package.json': {
    file: {
      contents: `
  {
    "name": "example-app",
    "type": "module",
    "dependencies": {
      "font-carrier": "latest"
    },
    "scripts": {
      "start": "nodemon --watch './' index.js"
    }
  }`,
    },
  },
}
