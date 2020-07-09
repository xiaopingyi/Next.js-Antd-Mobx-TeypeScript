import HTTP from '@/utils/http';

/**
 *  COOKIE
 * @type {{getItem(*): *, setItem(*, *, *): void, remove(*=): void}}
 */
export const COOKIE = {
  getItem(name) {
    const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return v ? v[2] : null;
  },
  setItem(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000 * days));
    document.cookie = `${name}=${value};path=/;expires=${d.toGMTString()}`;
  },
  remove(name) {
    this.setItem(name, '', -1);
  },
};

/**
 * 正则验证
 * @type {{isTel(*=): *, isPwd(*=): *}}
 */
export const Regx = {
  isTel(num) {
    const reg = /^((1[0-9])+\d{9})$/;
    return reg.test(num);
  },
  isPwd(str) {
    // const reg = /^[A-Za-z0-9]{6,24}$/;
    // 断言不能到结尾只有数字
    // 断言不能到结尾只有字母
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,24}$/;
    return reg.test(str);
  },
  isEmail(str) {
    const reg = /\S+@\S+\.\S+/;
    return reg.test(str);
  },
};

/**
 * 字符串转换成base64
 */
export const toBase64 = (str) => {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
    return String.fromCharCode('0x' + p1);
  }));
}

// 将对象转换为queryString
export const queryString = (params) => {
  return Object.keys(params).map(key => key + '=' + params[key]).join('&');
};

/**
 * 保存登录信息
 */
export const setAllCookie = (data) => {
  COOKIE.setItem('hmy_user_mobile', data.phoneNo);
  COOKIE.setItem('hmy_user_name', data.username);
  COOKIE.setItem('hmy_user_id', data.sourceId);
};

/**
 * 移除登录信息
 */
export const removeAllCookie = () => {
  COOKIE.remove('hmy_user_mobile');
  COOKIE.remove('hmy_user_name');
  COOKIE.remove('hmy_user_id');
  COOKIE.remove('hmy_user_reg_date');
  COOKIE.remove('infoPage');
  if (window && typeof window !== 'undefined') {
    window.sessionStorage.removeItem('noAlert');
  }
};

/**
 * 退出登录
 */
export const LogOut = (isJump) => {
  HTTP({
    url: '/humi-app-security/logout',
    method: 'GET'
  }).then(res => {
    if (res.data.success) {

      removeAllCookie();

      if (isJump) {
        const pathname = window.location.pathname;
        const urlStr = encodeURIComponent(pathname);
        window.location.href = `/login?callUrl=${urlStr}`;
      }
    }
  });
};

/**
 * 检查是否登录
 */
export const isLogin = () => {
  return new Promise((resolve, reject) => {
    HTTP({
      url: '/humi-app-security/user',
      method: 'GET'
    }).then(res => {
      if (!res.data.sourceId) {
        removeAllCookie();
        resolve(false);
      } else {
        setAllCookie(res.data);
        resolve(true)
      }
    });
  })
};

/**
 * 咨询链接
 */
export const toAdvisory = () => {
  // window.open('http://q.url.cn/CDEGUU?_type=wpa&qidian=true', '_blank')
  window.open('http://p.qiao.baidu.com/cps/chat?siteId=13850658&userId=25078465', '_blank');
};


export default {
  Regx,
  toBase64,
  queryString,
  setAllCookie,
  removeAllCookie,
  LogOut,
  isLogin,
  COOKIE,
  toAdvisory
}