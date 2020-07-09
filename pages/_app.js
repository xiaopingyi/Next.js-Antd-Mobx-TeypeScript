import App from 'next/app';
import Head from 'next/head';
import {Provider} from 'mobx-react';
import 'mobx-react-lite/batchingForReactDom';
import React from 'react';
import {ConfigProvider} from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import 'antd/dist/antd.less';
import Layout from '@/components/layout';
import Store from "@/store";
import './index.less';
import Http from "@/utils/http";

// 此函数在构建时被调用
export async function getStaticProps() {
    // 调用外部 API 获取博文列表
    const res = await Http({url: 'www.baidu.com'})
    const posts = await res.json()

    // 通过返回 { props: posts } 对象，Blog 模块
    // 在构建时将接收到 `posts` 参数
    return {
        props: {
            posts,
        },
    }
}

function MyApp({Component, pageProps}) {
    return <Provider store={Store}>
        <Layout>
            <Head>
                <title>工业APP</title>
                <meta
                    name="keywords"
                    content="工业APP"
                />
                <meta
                    name="description"
                    content="工业APP"
                />
            </Head>
            <ConfigProvider locale={zhCN}>
                <Component {...pageProps} />
            </ConfigProvider>
        </Layout>
    </Provider>
}

export default MyApp;