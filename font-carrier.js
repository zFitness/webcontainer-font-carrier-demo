import fontCarrier from 'font-carrier'
const transFont = fontCarrier.transfer('./a.ttf')
// 会自动根据当前的输入的文字过滤精简字体
transFont.min('我是精简后的字体，我可以重复')
transFont.output({
  path: './output/min',
})
