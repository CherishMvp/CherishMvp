<template>
  <!-- 2022-04-20 19:42:03
  侧边栏。本次设计中可以加入根据用户名不同，生成不同的侧边栏。
  以此来实现管理员功能。同时，此侧边栏在之前模板的基础上，若有多个二级目录，则只会显示一个。增加美感。
   -->
  <div class="sidebar">
    <!-- <el-menu :default-active="onRoutes"
             class="el-menu-vertical-demo"
             theme="dark"
             :unique-opened="true"
             router> -->
    <el-menu
      router
      class="el-menu-vertical-demo"
      theme="dark"
      background-color="#1990c6"
      text-color="#ADD8E6"
      active-text-color="#696969"
      :unique-opened="true"
    >
      <template v-for="item in menuList">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title"
              ><i :class="item.icon"></i>{{ item.title }}</template
            >
            <el-menu-item
              v-for="(subItem, i) in item.subs"
              :key="i"
              :index="subItem.index"
              >{{ subItem.title }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      role: "",
      items: [
        {
          // 对应show模块
          icon: "el-icon-setting",
          index: "1",
          title: "数据监控",
          subs: [
            {
              index: "monitor",
              title: "温湿度监控"
            },
            {
              index: "monitor2",
              title: "设备状态监控"
            },
            {
              index: "test",
              title: "空气质量监测"
            }
          ]
        },

        {
          icon: "el-icon-setting",
          index: "control",
          title: "控制模块"
        },
        {
          // 对应show模块
          icon: "el-icon-setting",
          index: "2",
          title: "数据查询",
          subs: [
            {
              index: "db",
              title: "用户数据库"
            },
            {
              index: "db2",
              title: "环境数据库"
            }
          ]
        },

        {
          icon: "el-icon-setting",
          index: "3",
          title: "用户管理",
          subs: [
            {
              index: "upload",
              title: "文件上传"
            },
            // {
            //     index: 'modifyUser',
            //     title: '修改用户'
            // },
            {
              index: "modifyPassword",
              title: "修改密码"
            }
          ]
        }
      ]
    };
  },
  methods: {
    // 获取菜单
    getMenuLIst() {
      // 如果登录角色为 role = admin1
      if (this.role == "admin") {
        this.menuList = [
          {
            // 对应show模块
            icon: "el-icon-setting",
            index: "1",
            title: "数据监控",
            subs: [
              {
                index: "monitor",
                title: "温湿度监控"
              },
              {
                index: "test",
                title: "空气质量监测"
              },
              {
                index: "monitor2",
                title: "设备状态监控"
              }
            ]
          },

          {
            icon: "el-icon-setting",
            index: "control",
            title: "控制模块"
          },
          {
            // 对应show模块
            icon: "el-icon-setting",
            index: "2",
            title: "数据查询",
            subs: [
              {
                index: "db",
                title: "用户信息"
              },
              {
                index: "db2",
                title: "环境历史数据"
              }
            ]
          },

          {
            icon: "el-icon-setting",
            index: "3",
            title: "密码修改",
            subs: [
              // {
              //   index: 'upload',
              //   title: '文件上传',
              // },
              // {
              //     index: 'modifyUser',
              //     title: '修改用户'
              // },
              {
                index: "modifyPassword",
                title: "修改密码"
              }
            ]
          }
        ];
      }
      // 如果登录角色为 role = admin2
      // if (this.role == "admin2")
      else {
        // menuList 用于在上面模板中渲染，建议 ctrl+F 看看怎么用的
        this.menuList = [
          {
            // 对应show模块
            icon: "el-icon-setting",
            index: "1",
            title: "数据监控",
            subs: [
              {
                index: "monitor",
                title: "温湿度监控"
              },

              {
                index: "test",
                title: "空气质量监测"
              },
              {
                index: "monitor2",
                title: "设备状态监控"
              }
            ]
          },
          // 普通用户不能有控制
          // {
          //   icon: 'el-icon-setting',
          //   index: 'control',
          //   title: '控制模块',
          // },
          {
            // 对应show模块
            icon: "el-icon-setting",
            index: "db2",
            title: "环境历史数据"
          },
          {
            icon: "el-icon-setting",
            index: "modifyPassword",
            title: "修改密码"
          }

          /* {
          icon: 'el-icon-setting',
          index: '3',
          title: '用户管理',
          subs: [
            // {
            //   index: 'upload',
            //   title: '文件上传',
            // },
            // {
            //     index: 'modifyUser',
            //     title: '修改用户'
            // },
            {
              index: 'modifyPassword',
              title: '修改密码',
            },
          ],
        },
        */
        ];
      }
    }
  },
  created() {
    // 表示一打开这个页面，就运行这里
    this.role = sessionStorage.getItem("ms_username");
    this.getMenuLIst(); // 获取菜单
  },
  computed: {
    // onRoutes() {
    //   return this.$route.path.replace('/', '')
    // },
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  width: 180px;
  left: 0;
  top: 70px;
  bottom: 0;
  background: #5470c6;
  /* text-align: ; */
}
/deep/ .el-submenu .el-menu-item{ min-width:100%}

.sidebar > ul {
  height: 100%;
  }

</style>
