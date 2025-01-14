<template>
  <el-container class="layout-container-demo" style="height: 98vh">
    <el-aside width="200px">
      <el-scrollbar style="height: 100%; border-right: 1px solid grey;">
        <el-menu :default-openeds="['1', '3']">
          <el-menu-item index="0">
            <el-text>
              你好,{{ name }}
            </el-text>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><User /></el-icon>用户信息
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="setActiveTab(1)"><el-icon><Document /></el-icon>用户基本信息</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Search /></el-icon>用户信息查找
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="setActiveTab(2)">按学号查找</el-menu-item>
              <el-menu-item index="2-2" @click="setActiveTab(3)">按姓名查找</el-menu-item>
              <el-menu-item index="2-3" @click="setActiveTab(9)">按班级查找</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Edit /></el-icon>用户信息改动
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="setActiveTab(4)"><el-icon><EditPen /></el-icon>用户信息修改</el-menu-item>
              <el-menu-item index="3-2" @click="setActiveTab(5)"><el-icon><DocumentAdd /></el-icon>添加用户</el-menu-item>
              <el-menu-item index="3-3" @click="setActiveTab(6)"><el-icon><Delete /></el-icon>删除用户</el-menu-item>
              <el-menu-item index="3-4" @click="setActiveTab(11)"><el-icon><Check /></el-icon>修改密码</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-menu-item index="5" @click="logout()"><el-icon><TurnOff /></el-icon>登出</el-menu-item>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container >
      <el-main>
        <div v-if="activeTab === 1">
          <el-card class="show">
            <el-table :data="tableData" >
              <el-table-column prop="id" label="学工号" width="200" />
              <el-table-column prop="name" label="姓名" width="200" />
              <el-table-column prop="grade" label="成绩" width="200"/>
              <el-table-column prop="classes" label="班级" width="200"/>
              <el-table-column prop="major" label="专业" />
            </el-table>
          </el-card>
        </div>

        <div v-if="activeTab === 2">
          <el-card class="show">
            <div class="search">
              <input type="text" class="search_input" placeholder="请输入搜索词" v-model="search_input">
                  <label class="search_btn" @click="search_byid"  >搜索</label>
            </div>
            <el-scrollbar height="600px">
              
              <el-descriptions title="查询信息" style="margin-top: 50px; width: 75%; margin-left: 7.5%; border: 1px solid rgb(166.2, 168.6, 173.4); padding: 30px; border-radius: 5px;height: 100%;" border v-if="search_byid_result.value !== null">
                <el-descriptions-item label ="头像" :rowspan="2">
                  <el-image :src="search_byid_img" alt="" width="200px" height="200px">
                    <template #error>
                      <div class="image-slot" style="text-align: center;">
                        <el-icon style="font-size: 30px;"><Picture /></el-icon>
                      </div>
                    </template>
                  </el-image>
                </el-descriptions-item>
                <el-descriptions-item label="学工号">{{ search_byid_result.id }}</el-descriptions-item>
                <el-descriptions-item label="姓名">{{ search_byid_result.name }}</el-descriptions-item>
                <el-descriptions-item label="班级">{{ search_byid_result.classes }}</el-descriptions-item>
                <el-descriptions-item label="专业">
                  {{ search_byid_result.major }}
                </el-descriptions-item>
                <el-descriptions-item label="成绩">
                  {{ search_byid_result.grade }}
                  
                </el-descriptions-item>
                
                
              </el-descriptions>
              
            </el-scrollbar>
            
          </el-card>
        </div>

        <div v-if="activeTab === 3">
          <el-card class="show">
            <div class="search">
              <input type="text" class="search_input" placeholder="请输入搜索词" v-model="search_input">
                  <label class="search_btn" @click="search_name"  >搜索</label>
            </div>
            <el-scrollbar height="600px">
              <el-descriptions v-for="item in search_name_result" title="查询信息" style="margin-top: 50px; width: 75%; margin-left: 7.5%; border: 1px solid rgb(166.2, 168.6, 173.4); padding: 30px; border-radius: 5px;">
                <el-descriptions-item label="学工号">{{ item.id }}</el-descriptions-item>
                <el-descriptions-item label="姓名">{{ item.name }}</el-descriptions-item>
                <el-descriptions-item label="班级">{{ item.classes }}</el-descriptions-item>
                <el-descriptions-item label="专业">
                  {{ item.major }}
                </el-descriptions-item>
                <el-descriptions-item label="成绩">
                  {{ item.grade }}
                </el-descriptions-item>
              </el-descriptions>
            </el-scrollbar>
          </el-card>
        </div>

        <div v-if="activeTab === 9">
          <el-card class="show">
            <div class="search">
              <input type="text" class="search_input" placeholder="请输入搜索词" v-model="search_input">
                  <label class="search_btn" @click="search_class"  >搜索</label>
            </div>
            <el-scrollbar height="600px">
              <el-descriptions title="查询信息" v-for="item in search_class_result" style="margin-top: 50px; width: 75%; margin-left: 7.5%; border: 1px solid rgb(166.2, 168.6, 173.4); padding: 30px; border-radius: 5px;">
                <el-descriptions-item label="学工号">{{ item.id }}</el-descriptions-item>
                <el-descriptions-item label="姓名">{{ item.name }}</el-descriptions-item>
                <el-descriptions-item label="班级">{{ item.classes }}</el-descriptions-item>
                <el-descriptions-item label="专业">
                  {{ item.major }}
                </el-descriptions-item>
                <el-descriptions-item label="成绩">
                  {{ item.grade }}
                </el-descriptions-item>
              </el-descriptions>
            </el-scrollbar>
          </el-card>
        </div>

        <div v-if="activeTab === 4">
          <el-text v-if="!permission" style="font-size: 30px; margin-left: 50px; left: 50%; top : 50%; position: absolute;">无权限</el-text>
          <el-card v-if="permission" class="show" style="height: 800px; width: 1500px; margin-left: calc((100% - 1500px)/2); padding: 50px; border-radius: 10px;">
            <el-form :model="form" label-width="auto" style="max-width: 600px; padding-left: calc((100% - 600px)/2)" >
              <el-form-item>
                <el-text style="font-size: 30px;">修改用户</el-text>
              </el-form-item>
              <el-form-item label="学工号">
                <el-input v-model="idc" />
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="namec" />
              </el-form-item>
              <el-form-item label="班级">
                <el-input v-model="classc" />
              </el-form-item>
              <el-form-item label="专业">
                <el-input v-model="majorc" />
              </el-form-item>
              <el-form-item label="成绩">
                <el-input v-model="gradec" />
              </el-form-item>
              
              <el-form-item label="权限">
                <el-radio-group v-model="adminc">
                  <el-radio value=1>学生</el-radio>
                  <el-radio value=0>教师</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="update_student">修改用户</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>
        <div v-if="activeTab === 11">
          <el-card class="show">
            <el-form label-width="auto" style="max-width: 600px;">
              <el-form-item label="学号">
                <el-input
                  v-model="changePasswordId"
                  style="max-width: 600px"
                  placeholder="输入学号"
                />
              </el-form-item>
              <el-form-item label="旧密码">
                <el-input
                v-model="changeOldPassword"
                type="password"
                style="max-width: 600px"
                placeholder="输入旧密码"
                />
              </el-form-item>
              <el-form-item label="新密码">
                <el-input
                  v-model="changeNewPassword"
                  type="password"
                  style="max-width: 600px"
                  placeholder="输入新密码"
                />
              </el-form-item>
              <el-form-item >
                <el-button type="primary" round @click="changePassword">修改密码</el-button>
              </el-form-item>
              
          </el-form>
          </el-card>
        </div>
        <div v-if="activeTab === 5">
          <el-text v-if="!permission" style="font-size: 30px; margin-left: 50px; left: 50%; top : 50%; position: absolute;">无权限</el-text>
          <el-card v-if="permission" class="show" style="height: 800px; width: 1500px; margin-left: calc((100% - 1500px)/2); padding: 50px; border-radius: 10px;">
            <el-form :model="form" label-width="auto" style="max-width: 600px; padding-left: calc((100% - 600px)/2)" >
              <el-form-item>
                <el-text style="font-size: 30px;">添加用户</el-text>
              </el-form-item>
              <el-form-item label="学工号">
                <el-input v-model="idc" />
              </el-form-item>
              <el-form-item label="姓名">
                <el-input v-model="namec" />
              </el-form-item>
              <el-form-item label="班级">
                <el-input v-model="classc" />
              </el-form-item>
              <el-form-item label="专业">
                <el-input v-model="majorc" />
              </el-form-item>
              <el-form-item label="成绩" :v-if="adminc === 1">
                <el-input v-model="gradec" />
              </el-form-item >
              <el-form-item label="头像">
                <el-upload
                ref="uploadRef"
                class="avatar-uploader"
                :action="uploadUrl"
                :before-upload="beforeAvatarUpload"
                :auto-upload="false"
                >
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
              </el-form-item>
              
              <el-form-item label="权限">
                <el-radio-group v-model="adminc">
                  <el-radio value=1>学生</el-radio>
                  <el-radio value=0>教师</el-radio>
                </el-radio-group>
              </el-form-item>
              
              <el-form-item>
                <el-button type="primary" @click="add_student">添加用户</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>

        <div v-if="activeTab === 6">
          <el-text v-if="!permission" style="font-size: 30px; margin-left: 50px; left: 50%; top : 50%; position: absolute;">无权限</el-text>
          <el-card v-if="permission" class="show">
            <div>
              <el-text >删除</el-text>
              <div class="mt-4">
                <el-input
                  v-model="deleteid"
                  style="max-width: 600px"
                  placeholder="输入学号"
                >
                  <template  #append id="deletebutton"><el-button @click="delete_stu">删除学号</el-button></template>
                </el-input>
              </div>
            </div>
          </el-card>
        </div>

      </el-main>
    </el-container>
  </el-container>
</template>

<script  setup>
import { onMounted, ref,computed, onBeforeMount } from 'vue';
import axios from 'axios';
import { ElNotification } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const tableData = ref([]);
const activeTab = ref(1); // 1: 用户基本信息, 2: 按学号查找, 3: 按姓名查找, 4: 用户成绩修改, 5: 添加用户, 9: 按班级查找
const search_input = ref();
const search_byid_result = ref({});
const search_name_result = ref([]);
const search_class_result = ref([]);
const search_byid_img=ref("");
const idc = ref();
const namec = ref();
const classc = ref();
const majorc = ref();
const gradec = ref();
const adminc = ref();
const deleteid = ref();
const uploadUrl = computed(() => `pic/uploadpic?id=${idc.value}`);
const uploadRef = ref();
const permission = ref();
const changePasswordId  = ref();
const changeOldPassword = ref();
const changeNewPassword = ref();
const name = ref();

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

const changePassword = async () => {
  const passWordChange = {
    "id": changePasswordId.value,
    "password" : cyrb53(changeOldPassword.value),
    "newpassword" : cyrb53(changeNewPassword.value)
  };
  console.log(passWordChange)
  try{
    const resq = await axios.put('/api/updateUserPassword',passWordChange);
    if(resq.data.code === 200){
      console.log("修改成功")
      ElNotification.success({
          title: '成功',
          message: '修改成功',
        });
    }
    else{
      ElNotification.error({
          title: '错误',
          message: '修改失败',
        });
    }
  }
  catch(error){
    console.log(error)
  }
  changeOldPassword.value = "";
  changeNewPassword.value = "";
  changePasswordId.value = "";
}

const checkPermission = async() => {
    var id = document.cookie.split(';')[0].split('=')[1]
    var response = await axios.get(`api/checkPermission?id=${id}`);
    permission.value = (response.data.data === "0");
    response = await axios.get('api/findById?id=' + id);
    console.log(response);
    var datastring = response.data.data;
    datastring = fixJsonString(datastring);
    const dataafter = JSON.parse(datastring);
    name.value = dataafter.name;
  }

onBeforeMount(() => {
  checkPermission();
})


function logout(){
  document.cookie = document.cookie + '=; Max-Age=-99999999;';
  alert("退出成功")
  router.push({ name: 'login' });
}
const submitUpload = () => {
  uploadRef.value.submit()
}

const beforeAvatarUpload = (file) => {
  const isPNG = file.type === 'image/png';
  if (!isPNG) {
    ElNotification.error({
      title: '错误',
      message: '只能上传 PNG 格式的图片!',
    });
  }
  return isPNG;
};
const fetchData = async () => {
  try {
    const response = await axios.get('/api/getAllUsers');
    let datastring = response.data.data;
    datastring = fixJsonString(datastring);
    const dataafter = JSON.parse(datastring);
    tableData.value = dataafter;  
  } catch (error) {
    console.error('获取数据时出错！', error);
    ElNotification.error({
      title: '数据加载失败',
      message: '无法从服务器获取数据，请稍后再试。',
    });
  }
};

// 修正 JSON 字符串格式
const fixJsonString = (datastring) => {
  return datastring
    .trim()
    .replace(/'/g, '"')  
    .replace(/=/g, ':')  
    .replace(/\bnull\b/g, 'null')  
    .replace(/([a-zA-Z0-9_]+)(?=\s*:)/g, '"$1"')  
    .replace(/\s+/g, ' ');  
};
const setActiveTab = (tab) => {
  activeTab.value = tab;
  if(tab == 1){
    location.reload()
  }
}; 
async function search_class() {
  const name = search_input.value; 
  if (!name) {
    ElNotification.warning({
      title: '警告',
      message: '请输入用户姓名',
    });
    return;
  }
  try {
    const response = await axios.get(`api/getUserByClasses?classes=${name}`);
    let datastring = response.data.data;
    if (response.data.code === 200 && response.data.data != '[]') {
      console.log('原始数据:', datastring);
      datastring = fixJsonString(datastring);
      const dataparsed = JSON.parse(datastring);
      search_class_result.value = dataparsed;
      ElNotification.success({
        title: '成功',
        message: '查询成功',
      });
    } else {
      ElNotification.error({
        title: '错误',
        message: '查询失败，未找到相关数据。',
      });
    }
  } catch (error) {
    console.error('请求失败:', error);
    ElNotification.error({
      title: '错误',
      message: '查询失败，请稍后再试。',
    });
  }
}
async function search_name() {
  const name = search_input.value; 
  if (!name) {
    ElNotification.warning({
      title: '警告',
      message: '请输入用户姓名',
    });
    return;
  }
  try {
    const response = await axios.get(`/api/getUserByUsername?username=${name}`);
    let datastring = response.data.data;
    if (response.data.code === 200 && response.data.data != '[]') {
      console.log('原始数据:', datastring);
      datastring = fixJsonString(datastring);
      const dataparsed = JSON.parse(datastring);
      search_name_result.value = dataparsed;
      ElNotification.success({
        title: '成功',
        message: '查询成功',
      });
    } else {
      ElNotification.error({
        title: '错误',
        message: '查询失败，未找到相关数据。',
      });
    }
  } catch (error) {
    console.error('请求失败:', error);
    ElNotification.error({
      title: '错误',
      message: '查询失败，请稍后再试。',
    });
  }
}
async function search_byid() {
  const id = search_input.value; 
  if (!id) {
    ElNotification.warning({
      title: '警告',
      message: '请输入学号',
    });
    return;
  }
    const response = await axios.get(`/pic/getImgById?id=${id}`);
    let datastring = response.data.data;
    search_byid_img.value = datastring;
    
    

  try {
    const response = await axios.get(`/api/findById?id=${id}`);
    let datastring = response.data.data;
    if (response.data.code === 200 && response.data.data != '{}') {
      datastring = fixJsonString(datastring);
      const dataparsed = JSON.parse(datastring);
      search_byid_result.value = dataparsed;
      ElNotification.success({
        title: '成功',
        message: '查询成功',
      });
    } else {
      // 如果 code 不为 200 或没有数据
      ElNotification.error({
        title: '错误',
        message: '查询失败，未找到相关数据。',
      });
    }
  } catch (error) {
    // 处理请求中的错误
    console.error('请求失败:', error);
    ElNotification.error({
      title: '错误',
      message: '查询失败，请稍后再试。',
    });
  }
  console.log(search_byid_img.value);
}
async function update_student() {

  const id1 = idc.value;
  const name1 = namec.value;
  const major1 = majorc.value;
  const grade1 = gradec.value;
  const classes1 = classc.value;
  

  if (!id1) {
    ElNotification.warning({
      title: '警告',
      message: '请输入学号',
    });
    return;
  }
  const data = {
    "id": id1,
    "name": name1,
    "major": major1,
    "grade": grade1,
    "classes": classes1,

  };
  try {
    const response = await axios.put('/api/updateUser',data);
    if (response.data.code === 200) {

      ElNotification.success({
        title: '成功',
        message: '修改成功',
      });
    } 

  }
  catch (error) {
    // 处理请求中的错误
    console.error('请求失败:', error);
    ElNotification.error({
      title: '错误',
      message: '修改失败，请稍后再试。',
    });
  }
}
async function add_student() {
  const id1 = idc.value;
  const name1 = namec.value;
  const major1 = majorc.value;
  const grade1 = gradec.value;
  const classes1 = classc.value;
  const permission1 = adminc.value;
  if (!id1) {
    ElNotification.warning({
      title: '警告',
      message: '请输入学号',
    });
    return;
  }
  const data = [{
    "id": id1,
    "name": name1,
    "major": major1,
    "grade": grade1,
    "classes": classes1,
    "permission": permission1,
    "password": cyrb53("123456"),//123456
  }];
  try {
    const response = await axios.post('/api/addNewUser',data);
    if (response.data.code === 200) {
      submitUpload();
      ElNotification.success({
        title: '成功',
        message: '添加成功,默认密码:123456',
      });
    } 

  }
  catch (error) {
    // 处理请求中的错误
    console.error('请求失败:', error);
    ElNotification.error({
      title: '错误',
      message: '添加失败，请稍后再试。',
    });
  }
}
async function delete_stu(){
  const deleteid1 = deleteid.value;
  const response=await axios.delete(`/api/deleteUser?id=${deleteid1}`);
  if(response.data.code === 200){
    ElNotification.success({
      title: '成功',
      message: '删除成功',
    });
  }
  else{
    ElNotification.error({
      title: '错误',
      message: '删除失败,该用户可能不存在',
    });
  }
  
}
onMounted(() => {
  fetchData(); // 组件加载时请求数据
});
</script>

<style scoped>

@font-face{
  font-family: '方正';
  src : url('src\assets\font\STZHONGS.TTF')format('truetype');
  font-weight: normal;
  font-style: normal;


}
.show{
  height: 800px; width: 1200px; margin-left: calc((100% - 1200px)/2); padding: 50px; border-radius: 10px;
  margin-top: 20px;
}
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
.search {
  
  width: 594px;
  height: 50px;
  margin: 0 auto;
  padding: 0 0 0 0;
  top:5%;
  left: 30%;
}
.search_input {
  width: 520px;
  float: left;
  height: 28px;
  line-height: 28px;
  padding: 0 8px;
  border-radius: 0;
  border:2px solid #e5e5e5;
  border-top-left-radius: 900px; 
  border-bottom-left-radius: 900px; 
}
.search_btn {
  display: grid;
  width: 50px;
  height: 28px;
  float: right;
  margin-right: 0;
  border:2px solid rgb(102.2, 177.4, 255);
  cursor:pointer;
  text-align: center;
  border-top-right-radius: 9000px; 
  border-bottom-right-radius: 9000px;
  background-color: rgb(102.2, 177.4, 255);
}
#iddata{
  margin-top: 20px;
  position: absolute;
  top: 10%;
  font-size: 30px;
  text-align: center;
}
#namedata{
  margin-top: 20px;
  position: absolute;
  top: 10%;
}
#show{
  margin-top: 20px;
  position: absolute;
  top: 10%;
  font-size: 30px;

}
.el-form-item{
  margin-bottom: 30px;
}
</style>
