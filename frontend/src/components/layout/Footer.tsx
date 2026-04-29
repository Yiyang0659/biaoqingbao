const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">🎭 MemeMaker</h3>
            <p className="text-gray-400">一键生成拟人化表情包，分享欢乐时刻</p>
          </div>

          <div className="flex flex-wrap gap-6">
            <div>
              <h4 className="font-semibold mb-2">产品</h4>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">功能</a></li>
                <li><a href="#" className="hover:text-white transition-colors">定价</a></li>
                <li><a href="#" className="hover:text-white transition-colors">示例</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">支持</h4>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">帮助中心</a></li>
                <li><a href="#" className="hover:text-white transition-colors">社区</a></li>
                <li><a href="#" className="hover:text-white transition-colors">联系</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2">法律</h4>
              <ul className="space-y-1 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">隐私政策</a></li>
                <li><a href="#" className="hover:text-white transition-colors">服务条款</a></li>
                <li><a href="#" className="hover:text-white transition-colors">版权说明</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} MemeMaker. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer