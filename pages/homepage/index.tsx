import React from "react";
import './index.less'
import Http from '@/utils/http'

type Props = {
    posts: any
}

const Homepage = ({posts}: Props) => {
    return <div className='container'>{posts}这里是首页</div>
}

// 每次加载页面都会调用，构建是不会调用
export async function getServerSideProps() {
    // 调用外部 API 获取博文列表
    const res = await Http({url: 'www.baidu.com'})
    const posts = await res.json()

    // 通过返回 { props: posts } 对象，Blog 模块
    // 在构建时将接收到 `posts` 参数
    return {
        props: {
            posts
        },
    }
}

export default Homepage;