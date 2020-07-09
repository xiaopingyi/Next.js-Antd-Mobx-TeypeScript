import React, {ReactNode} from "react";

// 全部布局
const Layout = ({children}: Props) => <div className="layout">{children}</div>

type Props = {
    children: ReactNode
}

export default Layout;