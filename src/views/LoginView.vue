<template>
    <div class="login-wrapper">
        <div class="login-container">
            <div class="form-header">
                <h2>学生管理系统登录</h2>
                <p>请登录账号</p>
            </div>
            <form @submit.prevent="handleLogin" class="floating-form">
                <div class="input-group">
                    <input id="username" v-model.trim="loginForm.username" type="text" autocomplete="off" @input="validateInput" required />
                    <label for="username">用户名</label>
                    <span class="highlight"></span>
                </div>
                <div class="input-group">
                    <input id="password" v-model.trim="loginForm.password" type="password" autocomplete="off" @input="validateInput" required />
                    <label for="password">密码</label>
                    <span class="highlight"></span>
                </div>
                <div class="error-message" v-if="errorMsg">{{ errorMsg }}</div>
                <button type="submit" class="submit-btn" :disabled="!isFormValid">
                    <span>登录</span>
                </button>
              
            </form>
        </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios';
  
  const router = useRouter()
  
  // 表单数据
  const loginForm = reactive({
    username: '',
    password: ''
  })
  const errorMsg = ref('')
  const isFormValid = ref(false)
  
  // 输入验证
  const validateInput = () => {
    // 基本验证
    if (loginForm.username && loginForm.password) {
        isFormValid.value = true
        errorMsg.value = ''
    } else {
        isFormValid.value = false
    }
  }

  const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed,
      h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) {
      ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }

    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };
  
  // 登录处理
  const handleLogin = async () => {
    // 防止XSS攻击
    const xssPattern = /(~|\{|\}|"|'|<|>|\?)/g
    if (xssPattern.test(loginForm.username) || xssPattern.test(loginForm.password)) {
        errorMessage('警告:输入内容包含非法字符');
        return
    }

    var safeUsername = encodeURIComponent(loginForm.username)
    var safePassword = encodeURIComponent(loginForm.password)

    safePassword = cyrb53(safePassword)
    console.log(safePassword)
    try {
        // 对输入进行转义处理
        
  
        // 实际的登录API调用
        console.log('登录请求:', { username: safeUsername, password: safePassword })

        const passWordCheck = {
          "id": safeUsername,
          "password": safePassword
        }
  
         // 使用axios发送登录请求
        const response = await axios.post('/api/checkPassword', passWordCheck);

        // 检查响应状态码
        if (response.data.code === 200) {
            console.log('登录成功')
            // 模拟登录成功并设置cookie，设置过期时间为1小时
            const expires = new Date(Date.now() + 3600 * 1000).toUTCString();
            document.cookie = `authToken=${safeUsername}; path=/; expires=${expires}`;
            // 跳转到主页
            router.push({name: "home"});
        }
        else {
            errorMessage('登录失败，请检查用户名和密码');}
    } catch (error) {
        errorMessage('登录失败，请检差用户名和密码或稍后重试');
    }
  }
  
  // 错误提示
  const errorMessage = (text) => {
    errorMsg.value = text
    setTimeout(() => {
        errorMsg.value = ''
    }, 3000)
  }
  
  onMounted(() => {
    validateInput()
  })
  
  </script>
  
  <style scoped>
  .login-wrapper {
    min-height: 93.5vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    padding: 20px;
  }
  
  .login-container {
    width: 100%;
    max-width: 480px;
    background: white;
    border-radius: 20px;
    padding: 40px;
    padding-right: 80px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  }
  
  .form-header {
    text-align: center;
    margin-bottom: 40px;
  }
  
  .form-header h2 {
    color: #2c3e50;
    font-size: 32px;
    margin-bottom: 10px;
    font-weight: 700;
  }
  
  .form-header p {
    color: #95a5a6;
    font-size: 16px;
  }
  
  .floating-form .input-group {
    position: relative;
    margin-bottom: 30px;
  }
  
  .input-group input {
    width: 100%;
    padding: 15px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    font-size: 16px;
    transition: all 0.3s ease;
    background: transparent;
  }
  
  .input-group label {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    padding: 0 5px;
    color: #95a5a6;
    font-size: 16px;
    transition: all 0.3s ease;
    pointer-events: none;
  }
  
  .input-group input:focus,
  .input-group input:valid {
    border-color: #3498db;
  }
  
  .input-group input:focus + label,
  .input-group input:valid + label {
    top: 0;
    font-size: 14px;
    color: #3498db;
  }
  
  .submit-btn {
    width: 100%;
    padding: 15px;
    margin-left: 15px;
    background: linear-gradient(to right, #3498db, #2980b9);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  
  .submit-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(52, 152, 219, 0.3);
  }
  
  .arrow-icon {
    border: solid white;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
  }
  
  .form-footer {
    text-align: center;
    margin-top: 20px;
    color: #95a5a6;
  }
  
  .form-footer a {
    color: #3498db;
    text-decoration: none;
    margin-left: 5px;
    font-weight: 600;
  }
  
  .form-footer a:hover {
    text-decoration: underline;
  }
  
  .error-message {
    color: #f56c6c;
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
  }
  
  @media (max-width: 480px) {
    .login-container {
        padding: 20px;
    }
    
    .form-header h2 {
        font-size: 24px;
    }
    
    .input-group input {
        padding: 12px;
    }
  }
  
  @media (max-width: 768px) {
    .login-container {
        max-width: 400px;
        padding: 30px;
    }
  
    .form-header h2 {
        font-size: 28px;
    }
  
    .form-header p {
        font-size: 14px;
    }
  }
  
  @media (max-width: 480px) {
    .login-container {
        padding: 20px;
        margin: 10px;
        max-width: 100%;
    }
    
    .form-header h2 {
        font-size: 24px;
    }
    
    .form-header p {
        font-size: 14px;
    }
  
    .input-group input {
        padding: 12px;
        font-size: 14px;
    }
  
    .input-group label {
        font-size: 14px;
    }
  
    .submit-btn {
        padding: 12px;
        font-size: 16px;
    }
  }
  
  @media (max-width: 320px) {
    .login-container {
        padding: 15px;
    }
  
    .form-header h2 {
        font-size: 20px;
    }
  
    .input-group {
        margin-bottom: 20px;
    }
  }
  </style>